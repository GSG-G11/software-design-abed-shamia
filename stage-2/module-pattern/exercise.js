/*
 * Exercise: Create some modules!
 *
 * When you think you have finished, run the command:
 *   npm run s2.modules
 * This will run a series of tests which should all pass.
 */
'use strict';

/*
 * Create a single module (using an IIFE) which contains functionality to parse
 * URLs.
 *
 * We have started you off with the basic structure.
 *
 *     https    ://   www.example.com  /   hello  ?  foo=1&bar=2
 * |          |     |                |   |      |  |             |
 * | protocol |     |    domain      |   | path |  | querystring |
 */
const UrlParser = (function () {
  return {
    // a function that takes a URL and returns its protocol
    protocol(url) {
      return url.split(':')[0];
    },

    // a function that takes a URL and returns its domain
    domain(url) {
      return url.split('//')[1].split('/')[0];
    },

    // a function that takes a URL and returns its path
    path(url) {
      return url.split('//')[1].split('/')[1].split('?')[0];
    },

    // a function that takes a URL and returns its query string
    querystring(url) {
      return url.split('?')[1];
    },
  };
})();

/*
 * Create a module that can support multiple instances (like in our example).
 * The module should be a function with several additional methods attached as
 * attributes.
 *
 * Example:
 * var exampleBuilder = createUrlBuilder('https://example.com');
 *
 * var url = exampleBuilder({ query: { foo: 1, bar: 2 }, path: 'hello' });
 *
 * console.log(url); // https://example.com/hello?foo=1&bar=2
 *
 * exampleBuilder.
 */

const createUrlBuilder = host => {
  // fill in ...

  var urlBuilder = function ({path, query}) {
    urlBuilder.path = function path(path) {
      return `${host}/${path}`;
    };

    urlBuilder.query = function query(query) {
      return `${host}?${Object.keys(query)
        .map(key => `${key}=${query[key]}`)
        .join('&')}`;
    };

    return urlBuilder.path(path) + '?' + urlBuilder.query(query).split('?')[1];
  };

  return urlBuilder;
};

module.exports = {
  UrlParser,
  createUrlBuilder,
};
