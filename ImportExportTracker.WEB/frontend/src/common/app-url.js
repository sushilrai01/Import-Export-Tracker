const apiBaseUrl = "https://localhost:7135/api/";

// Select
const apiSelectBaseUrl = apiBaseUrl + "select/";

// Commodity Import Export
const apiCommodityBaseUrl = apiBaseUrl + "commodity/";

const apiUrl = {
  apiSelectUrl: {
    getFiscalYear: apiSelectBaseUrl + "getFiscalYear",
  },
  apiCommodityUrl: {
    saveExcelData: apiCommodityBaseUrl + "saveExcelData",
    commodityImportReport: apiCommodityBaseUrl + "reportCommodityImport",
  },
};

export default apiUrl;
