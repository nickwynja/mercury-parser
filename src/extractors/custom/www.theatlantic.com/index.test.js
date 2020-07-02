import assert from 'assert';
import URL from 'url';
import cheerio from 'cheerio';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';

const fs = require('fs');

// Rename CustomExtractor
describe('AtlanticExtractor', () => {
  describe('initial test case', () => {
    let result;
    let url;
    beforeAll(() => {
      url =
        'https://www.theatlantic.com/politics/archive/2020/06/how-white-house-coronavirus-response-went-wrong/613591/';
      const html = fs.readFileSync(
        './fixtures/www.theatlantic.com/1593722335841.html'
      );
      result = Mercury.parse(url, { html, fallback: false });
    });

    it('is selected properly', async () => {
      // To pass this test, rename your extractor in
      // ./src/extractors/custom/www.theatlantic.com/index.js
      // then add your new extractor to
      // src/extractors/all.js
      const extractor = getExtractor(url);
      assert.equal(extractor.domain, URL.parse(url).hostname);
    });

    it('works with a starter story', async () => {
      // To pass this test, begin filling out your
      // selectors in ./src/extractors/custom/www.theatlantic.com/index.js. This test is just
      // a stub; you can add more fields to test as much of
      // your parser as possible.
      const { content, title, author, dek, lead_image_url } = await result;

      const $ = cheerio.load(content);
      const text = $('*')
        .first()
        .text()
        .trim()
        .slice(0, 20);

      assert.equal(title, 'The 3 Weeks That Changed Everything');
      assert.equal(author, 'James Fallows');
      assert.equal(text, 'Coping with a pandem');
      assert.equal(
        dek,
        'Imagine if the National Transportation Safety Board investigated America’s response to the coronavirus pandemic.'
      );
      assert.equal(
        lead_image_url,
        'https://cdn.theatlantic.com/thumbor/VHMt0Zi3dFnqEzDnuMl38E9SgB4=/0x43:2000x1085/960x500/filters:format(png)/media/img/mt/2020/06/Atlantic_NTSB_v2/original.png'
      );
    });
  });
});
