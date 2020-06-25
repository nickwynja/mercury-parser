// Rename CustomExtractor
// to fit your publication
// (e.g., NYTimesExtractor)
export const NewYorkerExtractor = {
  domain: 'www.newyorker.com',
  title: {
    selectors: [
      'h1[class^="ArticleHeader__hed"]',
      ['meta[name="og:title"]', 'value'],
      'h1[class^="content-header__hed"]',
    ],
  },

  author: {
    selectors: [
      'div[class^="ArticleContributors"] a[rel="author"]',
      'article header div[class*="Byline__multipleContributors"]',
      'div[class="content-header__byline__content"] span[class*="byline__name"]',
    ],
  },

  content: {
    selectors: ['article[class*="main-content"]'],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: [],

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [
      'div[class*="content-header__title-block"]',
      'footer[class^="ArticleFooter__footer"]',
    ],
  },

  date_published: {
    selectors: ['time[class*="__publish-date"]'],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  dek: {
    selectors: [['meta[name="description"]', 'value']],
  },

  next_page_url: null,

  excerpt: null,
};
