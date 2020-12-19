export default class Info {
    constructor() {
        this.countries = this.getCountries();
    }

    /**
     * Returns all the available countries and provinces, 
     * as well as the country slug for per country requests.
     *     
     * @return {promise}
     *     
     */
    getCountries() {
        return this.getData('countries');
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
                'X-Access-Token': '5cf9dfd5-3449-485e-b5ae-70a60e997864'
            }
        };
        return this.getData('summary', headers);
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
        const request = `dayone/country/${country}/status/${status}`;
        return this.getData(request);
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
        const request = 'dayone/country/' + country;
        return this.getData(request);
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
        const request = `dayone/country/${country}/status/${status}/live`;
        return this.getData(request);
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
        const request = `total/dayone/country/${country}/status/${status}`;
        return this.getData(request);
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
        const request = 'total/dayone/country/' + country;
        return this.getData(request);
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
        const request = `country/${country}/status/${status}?from=${dateFrom.toISOString()}&to=${dateTo.toISOString()}`;
        return this.getData(request);
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
        const request = `country/${country}?from=${dateFrom.toISOString()}&to=${dateTo.toISOString()}`;
        return this.getData(request);
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
        const request = `country/${country}/status/${status}/live?from=${dateFrom.toISOString()}&to=${dateTo.toISOString()}`;
        return this.getData(request);        
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
        const request = `total/country/${country}/status/${status}?from=${dateFrom.toISOString()}&to=${dateTo.toISOString()}`;
        return this.getData(request);        
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
        const request = `total/country/${country}`;
        return this.getData(request);        
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
        const request = `live/country/${country}/status/${status}`;
        return this.getData(request);        
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
        const request = `live/country/${country}`;
        return this.getData(request);  
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
        const request = `live/country/${country}/status/${status}/date/${afterDate.toISOString()}`;
        return this.getData(request);   
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
        const request = `world?from=${dateFrom.toISOString()}&to=${dateTo.toISOString()}`;
        return this.getData(request);   
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
        const request = `https://api.covid19api.com/world/total`;
        return this.getData(request);   
    }
        
    async getData(request, headers) {
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        const url = 'https://api.covid19api.com/' + request;
        const response = await fetch(proxyUrl + url, headers).then(data => data.json());        
        return response;
    }
}
