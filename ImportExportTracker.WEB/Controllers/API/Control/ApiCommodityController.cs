using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ImportExportTracker.MODEL.Control;
using ImportExportTracker.SERVICES.Control.CommodityServices;


namespace ImportExportTracker.WEB.Controllers.API.Control
{
    [Route("api/commodity")]
    [ApiController]
    public class ApiCommodityController : ControllerBase
    {
        ICommodityServices _actionServices;
        public ApiCommodityController(ICommodityServices actionServices) 
        { 
            _actionServices = actionServices;
        }

        [HttpPost("addItem")]
        public async Task<IActionResult> Add([FromBody] List<ImportExportModel> itemList)
        {
            var serviceResponse = await _actionServices.Add(itemList);
            return Ok(serviceResponse);
        }

        [HttpPost("saveExcelData")]
        public async Task<IActionResult> SaveExcelData(ImportExportMasterModel model)
        {
            var serviceResponse = await _actionServices.SaveExcelData(model);
            return Ok(serviceResponse);
        }
        [HttpPost("reportCommodityImport")]
        public async Task<IActionResult> ReportCommodityImport(FilterReportModel filterModel)
        {
            var serviceResponse = await _actionServices.ReportCommodityImport(filterModel);
            return Ok(serviceResponse);
        }
    }
}
