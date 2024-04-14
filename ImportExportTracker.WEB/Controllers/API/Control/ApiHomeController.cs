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

        [HttpGet("topFiveRecords")]
        public async Task<IActionResult> Index()
        {
            var serviceResponse = await _actionServices.ListImportExport();
            return Ok(serviceResponse);
        }
    }
}
