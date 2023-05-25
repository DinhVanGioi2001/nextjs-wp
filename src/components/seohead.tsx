import Head from "next/head";

export default function SeoHead({
  languageCurent,
  slugCurrent,
  excerpt,
  translations,
}: any) {
  const URL = "https://nextjs-wp-xi.vercel.app";
  function getTranslatedPath(languageCurent: any, slugCurrent: any) {
    const lang = languageCurent?.slug;
    if (lang === "en") {
      return slugCurrent;
    }
    // return `${lang}/${slugCurrent}`;
    return `${slugCurrent}`;
  }

  const currentUrl = `${URL}/${getTranslatedPath(languageCurent, slugCurrent)}`;
  const alternateUrls = translations?.map((translation: any) => {
    const lang = translation.language.slug;
    if (lang !== "en")
      return {
        hrefLang: lang,
        // href: `${URL}/${lang}/${translation.slug}`,
        href: `${URL}/${translation.slug}`,
      };
    return {
      hrefLang: lang,
      href: `${URL}/${translation.slug}`,
    };
  });

  if (excerpt) {
    var strippedHtml = excerpt.replace(/<[^>]+>/g, "");
  }

  return (
    <Head>
      <html lang="vi" />
      <meta name="description" content={strippedHtml} />
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
