"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

type Locale = "pt" | "en" | "es";
type TranslationJob = { source: string; apply: (translated: string) => void };
type TextState = { source: string; rendered: string };

const languages: { code: Locale; label: string; name: string }[] = [
  { code: "pt", label: "PT", name: "Português" },
  { code: "en", label: "EN", name: "English" },
  { code: "es", label: "ES", name: "Español" },
];
const cache = new Map<string, string>();
const textStates = new WeakMap<Text, TextState>();
const attributeStates = new WeakMap<Element, Map<string, TextState>>();
const excluded = "script,style,noscript,svg,code,pre,iframe,textarea,[contenteditable],[data-no-translate],[translate='no'],.notranslate,.skiptranslate";
const attributes = ["alt", "aria-label", "placeholder", "title", "value"] as const;

function isLocale(value: string | null): value is Locale {
  return value === "pt" || value === "en" || value === "es";
}

function shouldTranslate(value: string) {
  return /[A-Za-zÀ-ÿ]/.test(value) && value.trim().length > 1 && !/^(https?:|mailto:|\+?\d[\d\s+().-]*)$/i.test(value.trim());
}

function escapeHtml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function readCache(locale: Locale, source: string) {
  const key = `${locale}:${source}`;
  const saved = cache.get(key);
  if (saved !== undefined) return saved;
  try {
    const stored = window.localStorage.getItem(`meme-translation:${key}`);
    if (stored !== null) { cache.set(key, stored); return stored; }
  } catch { /* Storage is optional. */ }
  return undefined;
}

function writeCache(locale: Locale, source: string, translated: string) {
  const key = `${locale}:${source}`;
  cache.set(key, translated);
  try { window.localStorage.setItem(`meme-translation:${key}`, translated); } catch { /* Quota or private mode. */ }
}

async function translateGroup(locale: Locale, sources: string[]): Promise<string[]> {
  if (sources.length === 1 && sources[0].length > 2300) {
    const chunks = sources[0].match(/[\s\S]{1,1800}(?:\s|$)/g) ?? [sources[0]];
    const translated = await Promise.all(chunks.map((chunk) => translateGroup(locale, [chunk])));
    return [translated.map((part) => part[0]).join("")];
  }
  const markup = sources.map((source, index) => `<span id="meme-t${index}">${escapeHtml(source)}</span>`).join("");
  const url = new URL("https://translate.googleapis.com/translate_a/single");
  url.search = new URLSearchParams({ client: "gtx", sl: "pt", tl: locale, dt: "t", q: markup }).toString();
  const response = await fetch(url, { signal: AbortSignal.timeout(15000) });
  if (!response.ok) throw new Error(`Translation service returned ${response.status}`);
  const data = await response.json() as [Array<[string]>];
  const html = data[0]?.map((part) => part[0]).join("") ?? "";
  const parsed = new DOMParser().parseFromString(html, "text/html");
  return sources.map((source, index) => {
    const value = parsed.getElementById(`meme-t${index}`)?.textContent?.trim();
    if (!value) return source;
    return `${source.match(/^\s*/)?.[0] ?? ""}${value}${source.match(/\s*$/)?.[0] ?? ""}`;
  });
}

async function translateSources(locale: Locale, sources: string[]) {
  const groups: string[][] = [];
  let group: string[] = [];
  let length = 0;
  for (const source of sources) {
    const size = source.length + 40;
    if (group.length && (length + size > 2300 || group.length >= 24)) {
      groups.push(group);
      group = [];
      length = 0;
    }
    group.push(source);
    length += size;
  }
  if (group.length) groups.push(group);

  let cursor = 0;
  let failures = 0;
  await Promise.all(Array.from({ length: Math.min(4, groups.length) }, async () => {
    while (cursor < groups.length) {
      const current = groups[cursor++];
      try {
        const translated = await translateGroup(locale, current);
        translated.forEach((value, index) => writeCache(locale, current[index], value));
      } catch {
        failures++;
      }
    }
  }));
  return failures === 0;
}

function collectJobs(locale: Locale): TranslationJob[] {
  const jobs: TranslationJob[] = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node: Node | null;
  while ((node = walker.nextNode())) {
    const text = node as Text;
    if (!text.parentElement || text.parentElement.closest(excluded)) continue;
    const current = text.textContent ?? "";
    let state = textStates.get(text);
    if (!state) { state = { source: current, rendered: current }; textStates.set(text, state); }
    else if (current !== state.rendered) { state.source = current; state.rendered = current; }
    if (!shouldTranslate(state.source)) continue;
    if (locale === "pt") {
      if (current !== state.source) { text.textContent = state.source; state.rendered = state.source; }
      continue;
    }
    if (current !== state.source) { text.textContent = state.source; state.rendered = state.source; }
    const source = state.source;
    jobs.push({ source, apply: (translated) => {
      if (translated !== source && text.isConnected && textStates.get(text)?.source === source && text.textContent === source) {
        text.textContent = translated;
        const currentState = textStates.get(text);
        if (currentState) currentState.rendered = translated;
      }
    } });
  }

  document.querySelectorAll<HTMLElement>("[alt],[aria-label],[placeholder],[title],input[type='submit'][value],input[type='button'][value]").forEach((element) => {
    if (element.closest(excluded)) return;
    let states = attributeStates.get(element);
    if (!states) { states = new Map(); attributeStates.set(element, states); }
    for (const attribute of attributes) {
      if (attribute === "value" && !(element instanceof HTMLInputElement && (element.type === "submit" || element.type === "button"))) continue;
      const current = element.getAttribute(attribute);
      if (current === null) continue;
      let state = states.get(attribute);
      if (!state) { state = { source: current, rendered: current }; states.set(attribute, state); }
      else if (current !== state.rendered) { state.source = current; state.rendered = current; }
      if (!shouldTranslate(state.source)) continue;
      if (locale === "pt") {
        if (current !== state.source) { element.setAttribute(attribute, state.source); state.rendered = state.source; }
        continue;
      }
      if (current !== state.source) { element.setAttribute(attribute, state.source); state.rendered = state.source; }
      const source = state.source;
      jobs.push({ source, apply: (translated) => {
        if (translated !== source && element.isConnected && states?.get(attribute)?.source === source && element.getAttribute(attribute) === source) {
          element.setAttribute(attribute, translated);
          const currentState = states?.get(attribute);
          if (currentState) currentState.rendered = translated;
        }
      } });
    }
  });
  return jobs;
}

export function LanguageSwitcher() {
  const pathname = usePathname();
  const [locale, setLocale] = useState<Locale>("pt");
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  const localeRef = useRef<Locale>("pt");
  const scanRef = useRef<() => void>(() => {});
  const mounted = useRef(false);
  const scanning = useRef(false);
  const scanAgain = useRef(false);

  const scan = useCallback(async () => {
    const selected = localeRef.current;
    const jobs = collectJobs(selected);
    if (selected === "pt") { setBusy(false); setFailed(false); return; }
    const missing = [...new Set(jobs.map((job) => job.source))].filter((source) => readCache(selected, source) === undefined);
    jobs.forEach((job) => { const value = readCache(selected, job.source); if (value !== undefined) job.apply(value); });
    if (!missing.length) { setBusy(false); return; }
    setBusy(true);
    const success = await translateSources(selected, missing);
    if (localeRef.current !== selected) return;
    jobs.forEach((job) => { const value = readCache(selected, job.source); if (value !== undefined) job.apply(value); });
    setBusy(false);
    setFailed(!success);
  }, []);

  useEffect(() => {
    scanRef.current = () => {
      if (scanning.current) { scanAgain.current = true; return; }
      scanning.current = true;
      void scan().finally(() => {
        scanning.current = false;
        if (scanAgain.current) { scanAgain.current = false; scanRef.current(); }
      });
    };
  }, [scan]);

  useEffect(() => {
    let saved: string | null = null;
    try { saved = window.localStorage.getItem("meme-language"); } catch { /* Storage is optional. */ }
    const query = new URLSearchParams(window.location.search).get("lang");
    const initial = isLocale(query) ? query : isLocale(saved) ? saved : "pt";
    const timer = window.setTimeout(() => {
      localeRef.current = initial;
      mounted.current = true;
      setLocale(initial);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!mounted.current) return;
    localeRef.current = locale;
    document.documentElement.lang = locale === "pt" ? "pt-BR" : locale;
    try { window.localStorage.setItem("meme-language", locale); } catch { /* Storage is optional. */ }
    const timer = window.setTimeout(() => scanRef.current(), locale === "pt" ? 0 : 600);
    return () => window.clearTimeout(timer);
  }, [locale, pathname]);

  useEffect(() => {
    let timer = 0;
    const observer = new MutationObserver(() => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => scanRef.current(), 120);
    });
    observer.observe(document.body, { subtree: true, childList: true, characterData: true });
    return () => { observer.disconnect(); window.clearTimeout(timer); };
  }, []);

  function choose(next: Locale) {
    if (next === locale) return;
    localeRef.current = next;
    setLocale(next);
    setFailed(false);
    const url = new URL(window.location.href);
    if (next === "pt") url.searchParams.delete("lang");
    else url.searchParams.set("lang", next);
    window.history.replaceState(window.history.state, "", url);
  }

  return <nav className="site-language-switcher" aria-label="Selecionar idioma" data-no-translate>
    <span className="site-language-globe" aria-hidden="true">◎</span>
    {languages.map((language) => <button key={language.code} type="button" lang={language.code} aria-label={language.name} aria-current={locale === language.code ? "true" : undefined} onClick={() => choose(language.code)}>{language.label}</button>)}
    {busy && <span className="site-language-status" role="status" aria-label="Traduzindo">…</span>}
    {failed && <span className="site-language-error" role="status" title="Não foi possível traduzir todo o conteúdo. Tente novamente.">!</span>}
  </nav>;
}
