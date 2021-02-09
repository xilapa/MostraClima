async function getWeather()
{
    try
    {      
        // displaying load image                       
        document.getElementById("loading").style.display="block";
        document.getElementById("clima-wrapper").style.display="none";
        document.getElementById("sem-resultado").style.display="none";
        
        // sending query
        console.log("query sent");
        const baseURL = "http://api.weatherstack.com/current?access_key=022a6de21c85dc80d7c13528ca39dce8&query=";
        let searchInput = document.getElementById("searchInput");
        let {data} = await axios.get(`${baseURL}/${searchInput.value}`);
        console.log("query response",data);

        return data;     
    }
    catch (error)
    {
        console.log(error);
    }
    finally
    {
        document.querySelector(".loading").style.display="none";
    }
}

function displayWeather(res)
{
    if(res.success !=false)
    {
        document.getElementById("city-name").innerHTML = res.location.name;
        document.getElementById("state-country").innerHTML =  res.location.region + " - " + res.location.country;

        document.getElementById("weather-icon").src = res.current.weather_icons[0];
        document.getElementById("weather-description").innerHTML = res.current.weather_descriptions[0];
        document.getElementById("weather-temp").innerHTML = res.current.temperature + " °C";

        document.getElementById("weather-feelslike").innerHTML = res.current.feelslike + " °C";
        document.getElementById("weather-wind-speed").innerHTML = res.current.wind_speed + " Km/h";
        document.getElementById("weather-precip").innerHTML = res.current.precip + " mm";
        document.getElementById("weather-humidity").innerHTML = res.current.humidity + " %";
        document.getElementById("weather-visibility").innerHTML = res.current.visibility + " Km";

        document.getElementById("clima-wrapper").style.display = "block";
    }
    else{
        document.getElementById("sem-resultado").style.display = "block";
    }
}

async function saveSearch(res)
{

    if(res.success != false)
    {
        
        let dataToSend = 
        {
            userKey: userKeyStored,
            weather: JSON.stringify(res)
        };
        console.log("trying to save this:",dataToSend);

        const response = await axios.post("https://mostraclima.azurewebsites.net/v1/consultas",dataToSend);

        console.log(response);
    }
    else
    {
        console.log("no data to save");
    }

}

async function makeSearch(e)
{   
    const idClicked = e.path[0].id;
    if (idClicked == "searchButton")
    {
        const weather = await getWeather();
        displayWeather(weather);
        saveSearch(weather);
    }
}


