import Head from "next/head";

export default function SEOHead({
  title,
  languageCurent,
  slugCurrent,
  excerpt,
  translations,
}: any) {
  function getTranslatedPath(languageCurent: any, slugCurrent: any) {
    const lang = languageCurent?.slug;
    if (lang === "en") {
      return slugCurrent;
    }
    return `${lang}/${slugCurrent}`;
  }

  const currentUrl = `http://localhost:3000/${getTranslatedPath(
    languageCurent,
    slugCurrent
  )}`;
  const alternateUrls = translations?.map((translation: any) => {
    const lang = translation.language.slug;
    if (lang !== "en")
      return {
        hrefLang: lang,
        href: `http://localhost:3000/${lang}/${translation.slug}`,
      };
    return {
      hrefLang: lang,
      href: `http://localhost:3000/${translation.slug}`,
    };
  });

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={excerpt} />
      {alternateUrls?.map((url: any) => (
        <link
          rel="alternate"
          hrefLang={url.hrefLang}
          href={url.href}
          key={url.hrefLang}
        />
      ))}
      <link
        rel="alternate"
        hrefLang={languageCurent?.slug}
        key={languageCurent?.slug}
        href={currentUrl}
      />
    </Head>
  );
}
