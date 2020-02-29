const superagent = require("superagent");
const jsdom = require("jsdom");
const jquery = require("jquery");

exports.fetchHTML = async (url, retry = 5, tries = 1) => {
  try {
    if (tries == retry) {
      return false;
    }
    return (await superagent(url)).text;
  } catch (error) {
    if (error.status != 404) {
      await sleep(1000);
      tries++;
      return (await fetchHTML(url, retry, tries)).text;
    }
  }
};

exports.HTMLPlainToDOM = async html => {
  const { JSDOM } = jsdom;
  const document = new JSDOM(html);
  return jquery(document.window);
};
