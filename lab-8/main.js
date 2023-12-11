document.addEventListener("DOMContentLoaded", function () {
    displayWeather()
    setInterval(updateWeather, 300000)
})


async function updateWeather() {
    let weatherListData = JSON.parse(localStorage.getItem("weatherData")) || []

    // Aktualizacja danych dla każdego miasta
    for (let i = 0; i < weatherListData.length; i++) {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${weatherListData[i].name}&appid=a5913bf8ca2ef4f3d8bf2e3bbf49cb82`)
        let updatedData = await response.json()
        weatherListData[i] = updatedData
    }

    localStorage.setItem("weatherData", JSON.stringify(weatherListData))
    displayWeather()
}

async function GetWeatherData(){
    const city = document.getElementById("city-input").value

    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a5913bf8ca2ef4f3d8bf2e3bbf49cb82`)
    let data = await response.json()

    saveToLocalStorage(data);
}

function saveToLocalStorage(data){
    let weatherListData = JSON.parse(localStorage.getItem("weatherData")) || []

    if(weatherListData.length > 10){
        alert("You can only display info about 10 cities maximum")
        return 
    }

    weatherListData.push(data)
    localStorage.setItem("weatherData", JSON.stringify(weatherListData))

    displayWeather()
}

function displayWeather() {
    const weatherList = document.getElementById("weather-list")
    weatherList.innerHTML = ""

    let weatherListData = JSON.parse(localStorage.getItem("weatherData")) || [] //Pusty array jezeli local storage jest pusty

    weatherListData.forEach((data, index) => {
        const weatherElement = createWeatherElement(data, index)
        weatherList.appendChild(weatherElement)
    })
}

function createWeatherElement(data, index) {
    console.log(data)
    const weatherElement = document.createElement("div")
    weatherElement.classList.add("weather-block")

    weatherElement.innerHTML = `
        <div class="weather-info">
            <p>City: ${data.name} </p>
            <p>Temperature: ${data.main.temp} K</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Description: ${data.weather[0].description}</p>
            <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png">
        </div>
        <div class="weather-actions">
            <button onclick="deleteWeather(${index})">Delete</button>
        </div>
    `

    return weatherElement
}

function deleteWeather(index) {
    let weatherListData = JSON.parse(localStorage.getItem("weatherData"))
    weatherListData.splice(index, 1)
    localStorage.setItem("weatherData", JSON.stringify(weatherListData))

    displayWeather()
}