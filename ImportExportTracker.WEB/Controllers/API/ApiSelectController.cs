using ImportExportTracker.SERVICES;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.Design;

namespace ImportExportTracker.WEB.Controllers.API
{
    [Route("api/select")]
    [ApiController]
    public class ApiSelectController : ControllerBase
    {
        private ISelectServices _actionServices;
        public ApiSelectController(ISelectServices actionServices) 
        {
            _actionServices = actionServices;
        }

        [HttpGet("getFiscalYear")]
        public async Task<IActionResult> GetFiscalYear()
        {
            var response = await _actionServices.GetFiscalYear();
            return Ok(response);
        }
    }
}
