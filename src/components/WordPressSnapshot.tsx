import type { WordPressPageSnapshot as Snapshot } from "@/lib/wordpress-page";
import { SiteIntegrations } from "@/components/SiteIntegrations";

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
body,
body p,
body li,
body a,
body button,
body input,
body textarea,
body select,
body label,
body .elementor-widget-text-editor,
body .elementor-button,
body .elementor-icon-list-text,
body .jet-menu-item {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif !important;
}
body h1,
body h2,
body h3,
body h4,
body h5,
body h6,
body .elementor-heading-title,
body .elementor-widget-heading .elementor-heading-title {
  font-family: "Rubik", sans-serif !important;
}
</style>`;

export function WordPressSnapshot({ snapshot }: { snapshot: Snapshot }) {
  const setBodyClass = `document.body.className=${JSON.stringify(snapshot.bodyClass)};`;

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: setBodyClass }} />
      <div
        className="wp-snapshot-root"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: `${snapshot.headHtml}${typography}${snapshot.bodyHtml}` }}
      />
      <SiteIntegrations />
    </>
  );
}
