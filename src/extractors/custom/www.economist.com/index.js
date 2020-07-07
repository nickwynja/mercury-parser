export const WwwEconomistComExtractor = {
  domain: 'www.economist.com',

  title: {
    selectors: ['h1 span[class*="article__headline"]'],
  },

  author: {
    selectors: [['meta[itemprop="author"]', 'value']],
  },

  date_published: {
    selectors: [['time', 'datetime']],
  },

  dek: {
    selectors: ['p[class*="article__description"]'],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['div[class*="layout-article-body"]'],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {},

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: ['.layout-article-links'],
  },
};
