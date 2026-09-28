import { HeroCarousel } from "@/components/hero/HeroCarousel";
import { IntroSection } from "@/components/intro/IntroSection";
import { CategoryPanels } from "@/components/panels/CategoryPanels";
import { SiteFooter } from "@/components/footer/SiteFooter";
import { SiteChrome } from "@/components/shell/SiteChrome";
import { getCategories, getHeroSlides, getSearchIndex, getSiteSettings } from "@/lib/content";

export default async function HomePage() {
  const [site, slides, categories, searchIndex] = await Promise.all([
    getSiteSettings(),
    getHeroSlides(),
    getCategories(),
    getSearchIndex(),
  ]);

  return (
    <>
      <SiteChrome site={site} categories={categories} searchIndex={searchIndex} />
      <main id="main">
        <HeroCarousel slides={slides} />
        <IntroSection intro={site.intro} />
        <CategoryPanels categories={categories} />
      </main>
      <SiteFooter site={site} />
    </>
  );
}
