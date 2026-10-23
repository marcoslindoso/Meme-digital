import type { WordPressPageSnapshot as Snapshot } from "@/lib/wordpress-page";
import { SiteIntegrations } from "@/components/SiteIntegrations";
import { ModernFooter } from "@/components/ModernFooter";
import { ModernHeader } from "@/components/ModernHeader";

const typography = `<style id="next-site-typography">
@font-face {
  font-family: "Rubik";
  src: url("/fonts/rubik-normal.woff2") format("woff2");
  font-style: normal;
  font-weight: 300 900;
  font-display: swap;
}
@font-face {
  font-family: "Rubik";
  src: url("/fonts/rubik-italic.woff2") format("woff2");
  font-style: italic;
  font-weight: 300 900;
  font-display: swap;
}
.wp-snapshot-root p,
.wp-snapshot-root li,
.wp-snapshot-root a,
.wp-snapshot-root button,
.wp-snapshot-root input,
.wp-snapshot-root textarea,
.wp-snapshot-root select,
.wp-snapshot-root label,
.wp-snapshot-root .elementor-widget-text-editor,
.wp-snapshot-root .elementor-button,
.wp-snapshot-root .elementor-icon-list-text,
.wp-snapshot-root .jet-menu-item {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif !important;
}
.wp-snapshot-root h1,
.wp-snapshot-root h2,
.wp-snapshot-root h3,
.wp-snapshot-root h4,
.wp-snapshot-root h5,
.wp-snapshot-root h6,
.wp-snapshot-root .elementor-heading-title,
.wp-snapshot-root .elementor-widget-heading .elementor-heading-title {
  font-family: "Rubik", sans-serif !important;
}
</style>`;

export function WordPressSnapshot({ snapshot }: { snapshot: Snapshot }) {
  const setBodyClass = `document.body.className=${JSON.stringify(snapshot.bodyClass)};`;

  return (
    <div className="modern-site modern-site-legacy">
      <script dangerouslySetInnerHTML={{ __html: setBodyClass }} />
      <ModernHeader />
      <div
        id="conteudo"
        className="wp-snapshot-root"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: `${snapshot.headHtml}${typography}${snapshot.bodyHtml}` }}
      />
      <ModernFooter />
      <SiteIntegrations bodyClass={snapshot.bodyClass} />
    </div>
  );
}
