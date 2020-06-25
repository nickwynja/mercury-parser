import assert from 'assert';
import URL from 'url';
import cheerio from 'cheerio';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';
import { excerptContent } from 'utils/text';

const fs = require('fs');

describe('NewYorkerExtractor', () => {
  describe('initial test case', () => {
    let result;
    let url;
    beforeAll(() => {
      url =
        'https://www.newyorker.com/news/our-columnists/why-are-some-journalists-afraid-of-moral-clarity';
      const html = fs.readFileSync(
        './fixtures/www.newyorker.com/1593091410910.html'
      );
      result = Mercury.parse(url, { html, fallback: false });
    });

    it('is selected properly', async () => {
      // To pass this test, rename your extractor in
      // ./src/extractors/custom/www.newyorker.com/index.js
      // (e.g., CustomExtractor => NYTimesExtractor)
      // then add your new extractor to
      // src/extractors/all.js
      const extractor = getExtractor(url);
      assert.equal(extractor.domain, URL.parse(url).hostname);
    });

    it('returns the title', async () => {
      // To pass this test, fill out the title selector
      // in ./src/extractors/custom/www.newyorker.com/index.js.
      const { title } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(
        title,
        'Why Are Some Journalists Afraid of “Moral Clarity”?'
      );
    });

    it('returns the author', async () => {
      // To pass this test, fill out the author selector
      // in ./src/extractors/custom/www.newyorker.com/index.js.
      const { author } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(author, 'Masha Gessen');
    });

    it('returns the date_published', async () => {
      // To pass this test, fill out the date_published selector
      // in ./src/extractors/custom/www.newyorker.com/index.js.
      const { date_published } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(date_published.split('T')[0], '2020-06-24');
    });

    it('returns the lead_image_url', async () => {
      // To pass this test, fill out the lead_image_url selector
      // in ./src/extractors/custom/www.newyorker.com/index.js.
      const { lead_image_url } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(
        lead_image_url,
        'https://media.newyorker.com/photos/5ef2346cb975762d612e07a2/16:9/w_1280,c_limit/Gessen-MoralClarity.jpg'
      );
    });

    it('returns the content', async () => {
      // To pass this test, fill out the content selector
      // in ./src/extractors/custom/www.newyorker.com/index.js.
      // You may also want to make use of the clean and transform
      // options.
      const { content } = await result;

      const $ = cheerio.load(content || '');

      const first13 = excerptContent(
        $('*')
          .first()
          .text(),
        13
      );

      // Update these values with the expected values from
      // the article.
      assert.equal(
        first13,
        'What’s so terrible about moral clarity? A future historian of June of 2020—a'
      );
    });
  });

  describe('magazine content', () => {
    let result;
    let url;
    beforeAll(() => {
      url =
        'https://www.newyorker.com/magazine/2020/06/29/what-fiona-hill-learned-in-the-white-house';
      const html = fs.readFileSync(
        './fixtures/www.newyorker.com/1593090643268.html'
      );
      result = Mercury.parse(url, { html, fallback: false });
    });

    it('returns the dek when present', async () => {
      const { dek } = await result;

      assert.equal(
        dek,
        'The senior fellow at Brookings and expert on modern Russia had hoped to guide the U.S.-Russia relationship. President Trump had other ideas.'
      );
    });

    it('returns the date for magazine content', async () => {
      const { date_published } = await result;

      assert.equal(date_published.split('T')[0], '2020-06-22');
    });
  });

  describe('article with multiple authors', () => {
    let result;
    let url;
    beforeAll(() => {
      url =
        'https://www.newyorker.com/humor/daily-shouts/teas-you-should-probably-get-rid-of-already';
      const html = fs.readFileSync(
        './fixtures/www.newyorker.com/1557834611707.html'
      );
      result = Mercury.parse(url, { html, fallback: false });
    });

    it('returns multiple authors', async () => {
      const { author } = await result;

      assert.equal(
        author,
        'Ysabel YatesIllustration by Claire LordonMay 10, 2019'
      );
    });
  });
});
