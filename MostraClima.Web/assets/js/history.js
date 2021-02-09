async function getHistory()
{
    try
    {   
        const baseURL = "https://mostraclima.azurewebsites.net/v1/consultas";

        // set loading
        document.getElementById("loading").style.display="block";         

        // comparing data from server
        let ultimoItemServidor = await axios.get(`${baseURL}/ultimoId?userKey=${userKeyStored}`);
        let idUltimoItemRenderizado;

        if ((document.getElementById("histBody").lastElementChild) == null)
            idUltimoItemRenderizado = 0;
        else
            idUltimoItemRenderizado = document.getElementById("histBody").lastElementChild.id;

        console.log("ultimo id renderizado", idUltimoItemRenderizado);
        console.log("ultimo id do servidor", ultimoItemServidor.data);

        if (ultimoItemServidor.data == idUltimoItemRenderizado)
        {
            console.log ("sem dados novos no servidor");
            return historicoResponse;
        }           
        else
        {   

            // sending query
            console.log("solicitando novos dados ao servidor...");
            let {data} = await axios.get(`${baseURL}?userKey=${userKeyStored}`);
            console.log("query response",data);

            let listaIds = [];
            data.map(h => listaIds.push(h.id));
            data.Ids = listaIds;
            console.log(listaIds);
            return data;
        }        

                 
    }
    catch (error)
    {
        console.log(error);
    }
    finally
    {
        document.querySelector(".loading").style.display="none";
        document.getElementById("historico-wrapper").style.display="block";

    }
}

function dateToDisplay(dataString)
{
    let padraoData =/([0-9]{4}\W)([0-9]{2}\W)([0-9]{2}\w)([0-9]{2}[\W])([0-9]{2}[\W])([0-9]{2}[\W])/;
    //{"Padrão inteiro","Ano-","Mês-","DiaT","HH:","MM:","SS."}

    let gruposData = dataString.match(padraoData);

    dataArray = [...gruposData];
    dataArray.shift(); // removendo o primeiro elemento
    dataArray = dataArray.map(d => { // tirando o último caractere
        return d.slice(0,-1);
    });      

    // Hora do servidor esta adianta em 3h
    let hora = dataArray[3]-3;
    if (hora < 0)
        hora += 24;

    return `${hora}:${dataArray[4]}:${dataArray[5]} - ${dataArray[2]}/${dataArray[1]}/${dataArray[0]}`;
    
}

function displayHistory(res)
{
    let histTable = document.getElementById("histBody"); 

    if (res)
    {
        document.getElementById("historico-wrapper").style.display="none";
        histTable.innerHTML = "";

        function createLine(item) {
    
            let climaItem = JSON.parse(item.weather);
    
            let tr = document.createElement('tr');
            let tdData = tr.appendChild(document.createElement('td'));
            let tdLocal = tr.appendChild(document.createElement('td'));
    
            tdData.innerHTML = dateToDisplay(item.queryDate);
            tdLocal.innerHTML = climaItem.location.name + ", " + climaItem.location.region + " - " + climaItem.location.country;
    
            tr.setAttribute("id",item.id);
            console.log(tr);
    
            return tr;
        }
    
        res.map(r => {
            histTable.appendChild(createLine(r));
        });
    
        document.getElementById("historico-wrapper").style.display="block";
    }   
    
}

async function makeHistory(e)
{
    const idClicked = e.path[0].id;
    if (idClicked == "historicoLink")
    {
        historicoResponse = await getHistory();
        displayHistory(historicoResponse);
        
    }

}


