using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MostraClima.API.Model
{
    public class Consulta
    {
        /// <summary>
        /// Chave primária, gerada pelo banco de dados
        /// </summary>
        /// <example>
        /// 1
        /// </example>
        public int Id { get; set; }

        /// <summary>
        /// Chave armazenada no navegador do usuário, gerada automaticamente na primeira consulta
        /// </summary>
        /// <example>
        /// 2021-02-08T21:45:55.008Z
        /// </example>
        public string UserKey { get; set; }

        /// <summary>
        /// Consulta de clima realizada
        /// </summary>
        /// <example>
        /// {
        ///  "request": {
        ///    "type": "City",
        ///    "query": "Guatemala City, Guatemala",
        ///    "language": "en",
        ///    "unit": "m"
        ///  },
        ///  "location": {
        ///    "name": "Guatemala City",
        ///    "country": "Guatemala",
        ///    "region": "Guatemala",
        ///    "lat": "14.621",
        ///    "lon": "-90.527",
        ///    "timezone_id": "America/Guatemala",
        ///    "localtime": "2021-02-07 19:07",
        ///    "localtime_epoch": 1612724820,
        ///    "utc_offset": "-6.0"
        ///  },
        ///  "current": {
        ///    "observation_time": "01:07 AM",
        ///    "temperature": 25,
        ///    "weather_code": 116,
        ///    "weather_icons": [
        ///      "https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0004_black_low_cloud.png"
        ///    ],
        ///    "weather_descriptions": [
        ///      "Partly cloudy"
        ///    ],
        ///    "wind_speed": 19,
        ///    "wind_degree": 20,
        ///    "wind_dir": "NNE",
        ///    "pressure": 1021,
        ///    "precip": 0,
        ///    "humidity": 44,
        ///    "cloudcover": 50,
        ///    "feelslike": 26,
        ///    "uv_index": 7,
        ///    "visibility": 10,
        ///    "is_day": "no"
        ///  }
        /// }
        /// </example>
        public string Weather { get; set; }

        /// <summary>
        /// Data em que a consulta foi realizada, é gerada pelo banco de dados 
        /// </summary>
        /// <example>
        ///  2007-05-03 18:34:11.933  
        /// </example>
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime QueryDate { get; set; }
    }
}
