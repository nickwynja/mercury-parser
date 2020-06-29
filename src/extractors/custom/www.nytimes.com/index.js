export const NYTimesExtractor = {
  domain: 'www.nytimes.com',

  title: {
    selectors: [
      'h1.g-headline',
      'h1[itemprop="headline"]',
      'h1.headline',
      'h1 .balancedHeadline',
    ],
  },

  author: {
    selectors: [
      ['meta[name="author"]', 'value'],
      '.g-byline',
      '.byline',
      ['meta[name="byl"]', 'value'],
    ],
  },

  content: {
    selectors: ['div.g-blocks', 'section[name="articleBody"]', 'article#story'],

    transforms: {
      'img.g-lazy': $node => {
        let src = $node.attr('src');
        const width = 640;

        src = src.replace('{{size}}', width);
        $node.attr('src', src);
      },
      figure: ($node, $) => {
        // const imgCaption = $node.find('figcaption');
        const imgSrc = $node.attr('itemid');
        const imgContainer = $node.find(
          'div[data-testid="lazyimage-container"]'
        );
        const $img = $('<img />').attr('src', imgSrc);
        const figChild = $node
          .children()
          .children()
          .first();
        if (figChild.text() === 'Image') {
          figChild.remove();
        }
        imgContainer.replaceWith($img);
      },
      h2: $node => {
        // The "id" attribute values would result in low scores and the element being
        // removed.
        $node.attr('id', null);
        $node.attr('class', null);

        // A heading will be removed if there is not a paragraph before it, so
        // add a paragraph here. It will be removed anyway because it is empty.
        $node.before('<p></p>');

        // h1 elements will be demoted to h2, so demote h2 elements to h3.
        return 'h3';
      },
    },

    clean: [
      '.ad',
      'header#story-header',
      '.story-body-1 .lede.video',
      '.visually-hidden',
      '#newsletter-promo',
      '.promo',
      '.comments-button',
      '.hidden',
      '.comments',
      '.supplemental',
      '.nocontent',
      '.story-footer-links',
      '#styln-faq-coronavirus',
    ],
  },

  date_published: {
    selectors: [['meta[name="article:published"]', 'value']],
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
