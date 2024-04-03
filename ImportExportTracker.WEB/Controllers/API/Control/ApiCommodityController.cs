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
        public async Task<IActionResult> Add([FromBody] ImportExportModel model)
        {
            var serviceResponse = await _actionServices.Add(model);
            return Ok(serviceResponse);
        }
    }
}
