export const SubstackComExtractor = {
  domain: 'substack.com',

  title: {
    selectors: [
      // enter title selectors
      'h1[class*="post-title"]',
    ],
  },

  author: {
    selectors: [
      // enter author selectors
      'td[class*="author"]',
    ],
  },

  date_published: {
    selectors: [
      // enter selectors
    ],
  },

  dek: {
    selectors: [
      // enter selectors
      'h3[class*="subtitle"]',
    ],
  },

  lead_image_url: {
    selectors: [
      // enter selectors
      ['meta[name="og:image"]', 'value'],
    ],
  },

  content: {
    selectors: ['div[class="body markup"]'],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {
      img: $node => {
        const jAttrs = $node.data('attrs');
        $node.attr('src', jAttrs.src);
      },
    },

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [],
  },
};
