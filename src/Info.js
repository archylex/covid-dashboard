export default class Info {
  constructor() {
    this.apiUrl = 'https://api.covid19api.com/';
    this.proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  }

  /**
     * Returns all the available countries and provinces,
     * as well as the country slug for per country requests.
     *
     * @return {promise}
     *
     */
  getCountries() {
    return this.getData(`${this.apiUrl}countries`);
  }

  /**
     * A summary of new and total cases per country updated daily.
     *
     * @return {promise}
     *
     */
  getSummary() {
    const headers = {
      headers: {
        'X-Access-Token': '5cf9dfd5-3449-485e-b5ae-70a60e997864',
      },
    };
    return this.getData(`${this.apiUrl}summary`, headers);
  }

  /**
     * Returns all cases by case type for a country from the first recorded case.
     * Country must be the Slug from /countries or /summary.
     * Cases must be one of: confirmed, recovered, deaths
     *
     * @param {string} country
     * @param {string} status
     * @return {promise}
     *
     */
  getDayOne(country, status) {
    const url = `${this.apiUrl}dayone/country/${country}/status/${status}`;
    return this.getData(url);
  }

  /**
     * Returns all cases by case type for a country from the first recorded case.
     * Country must be the Slug from /countries or /summary.
     * Cases must be one of: confirmed, recovered, deaths
     *
     * @param {string} country
     * @return {promise}
     *
     */
  getDayOneAllStatus(country) {
    const url = `${this.apiUrl}dayone/country/${country}`;
    return this.getData(url);
  }

  /**
     * Returns all cases by case type for a country from the first recorded case
     * with the latest record being the live count.
     * Country must be the Slug from /countries or /summary.
     * Cases must be one of: confirmed, recovered, deaths
     *
     * @param {string} country
     * @param {string} status
     * @return {promise}
     *
     */
  getDayOneLive(country, status) {
    const url = `${this.apiUrl}dayone/country/${country}/status/${status}/live`;
    return this.getData(url);
  }

  /**
     * Returns all cases by case type for a country from the first recorded case.
     * Country must be the slug from /countries or /summary.
     * Cases must be one of: confirmed, recovered, deaths
     *
     * @param {string} country
     * @param {string} status
     * @return {promise}
     *
     */
  getDayOneTotal(country, status) {
    const url = `${this.apiUrl}total/dayone/country/${country}/status/${status}`;
    return this.getData(url);
  }

  /**
     * Returns all cases by case type for a country from the first recorded case.
     * Country must be the slug from /countries or /summary.
     * Cases must be one of: confirmed, recovered, deaths
     *
     * @param {string} country
     * @return {promise}
     *
     */
  getDayOneTotalAllStatus(country) {
    const url = `${this.apiUrl}total/dayone/country/${country}`;
    return this.getData(url);
  }

  /**
     * Returns all cases by case type for a country.
     * Country must be the slug from /countries or /summary.
     * Cases must be one of: confirmed, recovered, deaths
     *
     * @param {string} country
     * @param {string} status
     * @param {date} dateFrom
     * @param {date} dateTo
     * @return {promise}
     *
     */
  getByCountry(country, status, dateFrom, dateTo) {
    const url = `${this.apiUrl}country/${country}/status/${status}?from=${dateFrom.toISOString()}&to=${dateTo.toISOString()}`;
    return this.getData(url);
  }

  /**
     * Returns all cases by case type for a country.
     * Country must be the slug from /countries or /summary.
     * Cases must be one of: confirmed, recovered, deaths
     *
     * @param {string} country
     * @param {date} dateFrom
     * @param {date} dateTo
     * @return {promise}
     *
     */
  getByCountryAllStatus(country, dateFrom, dateTo) {
    const url = `${this.apiUrl}country/${country}?from=${dateFrom.toISOString()}&to=${dateTo.toISOString()}`;
    return this.getData(url);
  }

  /**
     * @param {string} country
     * @param {string} status
     * @param {date} dateFrom
     * @param {date} dateTo
     * @return {promise}
     *
     */
  getByCountryLive(country, status, dateFrom, dateTo) {
    const url = `${this.apiUrl}country/${country}/status/${status}/live?from=${dateFrom.toISOString()}&to=${dateTo.toISOString()}`;
    return this.getData(url);
  }

  /**
     * Returns all cases by case type for a country.
     * Country must be the slug from /countries or /summary.
     * Cases must be one of: confirmed, recovered, deaths
     *
     * @param {string} country
     * @param {string} status
     * @param {date} dateFrom
     * @param {date} dateTo
     * @return {promise}
     *
     */
  getByCountryTotal(country, status, dateFrom, dateTo) {
    const url = `${this.apiUrl}total/country/${country}/status/${status}?from=${dateFrom.toISOString()}&to=${dateTo.toISOString()}`;
    return this.getData(url);
  }

  /**
     * Returns all cases by case type for a country.
     * Country must be the slug from /countries or /summary.
     * Cases must be one of: confirmed, recovered, deaths
     *
     * @param {string} country
     * @return {promise}
     *
     */
  getByCountryTotalAllStatus(country) {
    const url = `${this.apiUrl}total/country/${country}`;
    return this.getData(url);
  }

  /**
     * Returns all live cases by case type for a country.
     * These records are pulled every 10 minutes and are ungrouped.
     * Country must be the slug from /countries or /summary.
     * Cases must be one of: confirmed, recovered, deaths
     *
     * @param {string} country
     * @param {string} status
     * @return {promise}
     *
     */
  getLiveByCountryAndStatus(country, status) {
    const url = `${this.apiUrl}live/country/${country}/status/${status}`;
    return this.getData(url);
  }

  /**
     * Returns all live cases by case type for a country.
     * These records are pulled every 10 minutes and are ungrouped.
     * Country must be the slug from /countries or /summary.
     * Cases must be one of: confirmed, recovered, deaths
     *
     * @param {string} country
     * @return {promise}
     *
     */
  getLiveByCountryAllStatus(country) {
    const url = `${this.apiUrl}live/country/${country}`;
    return this.getData(url);
  }

  /**
     * Returns all live cases by case type for a country after a given date.
     * These records are pulled every 10 minutes and are ungrouped.
     * Country must be the slug from /countries or /summary.
     * Cases must be one of: confirmed, recovered, deaths
     *
     * @param {string} country
     * @param {string} status
     * @param {date} afterDate
     * @return {promise}
     *
     */
  getLiveByCountryAndStatusAfterDate(country, status, afterDate) {
    const url = `${this.apiUrl}live/country/${country}/status/${status}/date/${afterDate.toISOString()}`;
    return this.getData(url);
  }

  /**
     * Returns all live cases by case type for a country after a given date.
     * These records are pulled every 10 minutes and are ungrouped.
     * Country must be the slug from /countries or /summary.
     * Cases must be one of: confirmed, recovered, deaths
     *
     * @param {string} country
     * @param {string} status
     * @param {date} dateFrom
     * @param {date} dateTo
     * @return {promise}
     *
     */
  getWorldWIP(dateFrom, dateTo) {
    const url = `${this.apiUrl}world?from=${dateFrom.toISOString()}&to=${dateTo.toISOString()}`;
    return this.getData(url);
  }

  /**
     * Returns all live cases by case type for a country after a given date.
     * These records are pulled every 10 minutes and are ungrouped.
     * Country must be the slug from /countries or /summary.
     * Cases must be one of: confirmed, recovered, deaths
     *
     * @return {promise}
     *
     */
  getWorldTotalWIP() {
    const url = `${this.apiUrl}https://api.covid19api.com/world/total`;
    return this.getData(url);
  }

  /**
     * Returns JSON with countries center coords
     *
     * @return {promise}
     *
     */
  getCountriesCoords() {
    const url = 'https://gist.githubusercontent.com/erdem/8c7d26765831d0f9a8c62f02782ae00d/raw/248037cd701af0a4957cce340dabb0fd04e38f4c/countries.json';
    return this.getData(url);
  }

  /**
     * Returns geoJSON
     *
     * @return {promise}
     *
     */
  getGeoJSON() {
    const url = 'https://archylex.github.io/js-homework/custom.geo.json';
    return this.getData(url);
  }

  async getData(url, headers) {
    this.eslint = null;
    const response = await fetch(url, headers).then((data) => data.json());
    return response;
  }
}
