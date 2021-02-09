const busca = document.getElementById("busca-wrapper");
const loading = document.getElementById("loading");
const climaResultado = document.getElementById("clima-wrapper");
const semResultado = document.getElementById("sem-resultado");
const historico = document.getElementById("historico-wrapper");
const climaResultadoHistorico = climaResultado.cloneNode(true);

var historicoResponse;
var userKeyStored;


function createclickListener()
{
    document.addEventListener("click",clickHandler);
    let observers = [];

    function susbcribe(observer)
    {
        observers.push(observer);
    }

    function notifyAll(e)
    {
        for(obs of observers)
        {
            obs(e);
        }
    }

    function clickHandler(e)
    {
        notifyAll(e);
    }   

    return {susbcribe}
}


function activeLink(e)
{
    const navLinks = ["consultarLink", "historicoLink"];
    const idClicked = e.path[0].id;

    if (navLinks.includes(idClicked))
    {
        console.log(`clicked at ${idClicked}`);
        const activeLink = document.querySelector(".active");
        if (idClicked != activeLink.id)
        {
            activeLink.classList.remove("active");
            document.getElementById(idClicked).classList.add("active");
        } 
    }
  
}

function getUserKey()
{
    let _userKey = localStorage.getItem('userKey');

    if(!_userKey)
    {
        let hj = new Date();
        _userKey = hj.toISOString();
        localStorage.setItem('userKey',_userKey);

    }
    return _userKey;
}



function showPageConsultar(e)
{
    const idClicked = e.path[0].id;

    if (idClicked == "consultarLink")
    {
        document.getElementById("main").innerHTML= "";
        
        main.appendChild(busca);
        main.appendChild(loading);
        main.appendChild(climaResultado); 
        main.appendChild(semResultado);     
    }
    
}

async function showPageHistorico(e)
{
    const idClicked = e.path[0].id;

    if (idClicked == "historicoLink")
    {   
        document.getElementById("main").innerHTML= "";
        main.appendChild(historico); 
        main.appendChild(loading);       
        historico.style.display="block";
    }

}

userKeyStored = getUserKey();
clickListener = createclickListener();
clickListener.susbcribe(activeLink);
clickListener.susbcribe(showPageConsultar);
clickListener.susbcribe(showPageHistorico);
clickListener.susbcribe(makeSearch);
clickListener.susbcribe(makeHistory);
clickListener.susbcribe(displayHistoryResult);


