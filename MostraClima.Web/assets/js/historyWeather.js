function displayHistoryResult(e)
{
    let idClicked = e.path[1].id;
    if (historicoResponse && idClicked)
    {
        
        if (historicoResponse.Ids.indexOf(idClicked))
        {
            document.getElementById("main").innerHTML= "";
            main.appendChild(climaResultadoHistorico);

            let histData = historicoResponse.filter(h => h.id==idClicked)
            let histDataParsed = JSON.parse(histData[0].weather);
            console.log("item selecionado do histórico: ",histDataParsed);
            displayWeather(histDataParsed);
        }

    }
}