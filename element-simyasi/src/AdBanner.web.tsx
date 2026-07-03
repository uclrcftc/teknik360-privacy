// AdMob has no web SDK, and this file's .web.tsx extension means Metro
// bundles it (instead of AdBanner.tsx) for the web target, so the native ad
// module is never pulled into the web build.
export default function AdBanner() {
  return null;
}
