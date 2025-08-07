

function refreshWeather(response) {
    let updateTemp = document.querySelector("#big-temp");
    let liveTemp = response.data.temperature.current;
    let roundTemp = Math.round(liveTemp);
    let cityNew = document.querySelector("#city");
    let updateHumid = document.querySelector("#humid");
    let updateWind = document.querySelector("#wind");
    let roundWind = Math.round(response.data.wind.speed);
    let icon = document.querySelector("#emoji");
    let updateDescription = document.querySelector("#description");
    let timeElement = document.querySelector("#dow");
    let date = new Date (response.data.time * 1000);

    
    updateTemp.innerHTML = roundTemp;
    cityNew.innerHTML = response.data.city;
    updateHumid.innerHTML = `${response.data.temperature.humidity}%`;
    updateWind.innerHTML = `${roundWind} miles/hr`;
    icon.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon">`;
    updateDescription.innerHTML = response.data.condition.description;
    timeElement.innerHTML = formatDate(date);

    

    function formatDate(date) {
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        let day = days[date.getDay()];
        let minutes = date.getMinutes();
        let hours = date.getHours();
        
        if (minutes < 10) {
        minutes = `0${minutes}`;
    }
        return `${day} ${hours}:${minutes}`;
        
    }

    
}


function searchCity(city) {
    let apiKey = "46e24beo66ec32a8f3dbct0f7707b1b0";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(refreshWeather);
}


function updateCity(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener ("submit", updateCity);

searchCity("Lisbon");