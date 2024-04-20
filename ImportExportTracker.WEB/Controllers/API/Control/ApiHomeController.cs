using ImportExportTracker.SERVICES.Control.HomeServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ImportExportTracker.WEB.Controllers.API.Control
{
    [Route("api/home")]
    [ApiController]
    public class ApiHomeController : ControllerBase
    {
        IHomeServices _actionServices;
        public ApiHomeController(IHomeServices actionServices)
        {
            _actionServices = actionServices;
        }

        [HttpGet("topFiveCommodity")]
        public async Task<IActionResult> ListTopCommodity()
        {
            var serviceResponse = await _actionServices.TopCommodityImport();
            return Ok(serviceResponse);
        }
        [HttpGet("topFiveCategory")]
        public async Task<IActionResult> ListTopCategory()
        {
            var serviceResponse = await _actionServices.TopCategoryImport();
            return Ok(serviceResponse);
        }
        //[HttpGet("getFiscalYearTitle")]
        //public async Task<IActionResult> GetFiscalYearTitle()
        //{
        //    var serviceResponse = await _actionServices.GetFiscalYearTitle();
        //    return Ok(serviceResponse);
        //}
    }
}
