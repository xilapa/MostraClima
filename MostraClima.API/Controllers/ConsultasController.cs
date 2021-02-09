using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MostraClima.API.Data;
using MostraClima.API.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MostraClima.API.Controllers
{
    [ApiController]
    [Produces("application/json")]
    [Route("v1/[controller]")]
    public class ConsultasController : ControllerBase
    {
        /// <summary>
        /// Consulta o histórico de um usuário
        /// </summary>
        /// <param name="userKey">chave armazenada no navegador do usuário</param>
        /// <response code="200">Lista de consultas</response>
        [HttpGet]
        public async Task<ActionResult<List<Consulta>>> ConsultarHistorico([FromServices] MostraClimaDbContext dbContext, [FromQuery] string userKey)
        {
            var consultas = await dbContext.Consultas.Where(c => c.UserKey == userKey).ToListAsync();
            return Ok(consultas);
        }

        /// <summary>
        /// Retorna o id da última consulta realizada pelo usuário
        /// </summary>
        /// <param name="userKey">chave armazenada no navegador do usuário</param>
        /// <response code="200">Id da última consulta</response>
        /// <response code="204">User não realizou consultas, retorna 0</response>
        [HttpGet]
        [Route("ultimoId")]
        public async Task<ActionResult<int?>> ConsultarIdDoUltimoHistoricoDoUsuario([FromServices] MostraClimaDbContext dbContext, [FromQuery] string userKey)
        {
            var UltimaConsulta = await dbContext.Consultas.Where(c => c.UserKey == userKey).OrderBy(c => c.Id).LastOrDefaultAsync();
            int idUltimaConsulta;

            if (UltimaConsulta == null)
                idUltimaConsulta = 0;
            else
                idUltimaConsulta = UltimaConsulta.Id;

            return Ok(idUltimaConsulta);
        }

        /// <summary>
        /// Consulta todos os históricos registrados no banco
        /// </summary>
        /// <response code="200">Lista de consultas</response>
        [HttpGet]
        [Route("todas")]
        public async Task<ActionResult<List<Consulta>>> ConsultarTodosOsHistoricos([FromServices] MostraClimaDbContext dbContext)
        {
            var todasConsultas = await dbContext.Consultas.ToListAsync();
            return Ok(todasConsultas);
        }


        /// <summary>
        /// Insere o resultado de uma consulta no banco
        /// </summary>
        /// <param name="consulta">Consulta de clima realizada pelo usuário</param>
        /// <returns>void</returns>
        /// <response code="200">consulta salva com sucesso</response>
        /// <response code="400">a consulta foi enviada fora do padrão esperado</response>
        /// <response code="500">erro ao salvar a consulta</response>
        [HttpPost]
        public async Task<ActionResult> SalvarConsulta([FromServices] MostraClimaDbContext dbContext, [FromBody] Consulta consulta)
        {
            dbContext.Consultas.Add(consulta);
            await dbContext.SaveChangesAsync();
            return Ok("consulta salva com sucesso");
        }
    }
}
