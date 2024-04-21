const apiBaseUrl = "https://localhost:7135/api/";

// Select
const apiSelectBaseUrl = apiBaseUrl + "select/";

// Commodity Import Export
const apiCommodityBaseUrl = apiBaseUrl + "commodity/";

// Home
const apiHomeBaseUrl = apiBaseUrl + "home/";

const apiUrl = {
  apiSelectUrl: {
    getFiscalYear: apiSelectBaseUrl + "getFiscalYear",
  },
  apiCommodityUrl: {
    saveExcelData: apiCommodityBaseUrl + "saveExcelData",
    commodityImportReport: apiCommodityBaseUrl + "reportCommodityImport",
  },
  apiHomeUrl: {
    getFiscalYearTitle: apiHomeBaseUrl + "getFiscalYearTitle",
    getTopCommodityImport: apiHomeBaseUrl + "topFiveCommodity",
    getTopCategoryImport: apiHomeBaseUrl + "topFiveCategory",
  },
};

export default apiUrl;
