const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.getElementById("cityinput");
const card = document.querySelector(".card");
const APIkey = "fdff38c99582667e7b26147e1ab4e339";





weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = cityInput.value.trim();
  if(city) {
    try{
        const {latitude, longitude} = await getCoordinates(city);
        const weatherData = await fetchWeatherData(latitude, longitude);
        displayWeatherInfo(weatherData);
    }catch(e){
        console.error(e); 
        displayError(e);
    }

  } else {
    displayError("Seems like you haven't entered a city");
  }
});



async function getCoordinates(city) {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${APIkey}`);
    const data = await response.json();
    
    if (data.length === 0) {
        throw new Error("City not found");
        
    }
    return { latitude: data[0].lat, longitude: data[0].lon };
}

async function fetchWeatherData(latitude, longitude) {
  
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIkey}`);
    const data = await response.json();
    if (data.cod !== 200) {
        throw new Error(data.message);
    }
    return data;

}

function displayWeatherInfo(data) {
  console.log(data);
  const weatherInfoContainer = document.createElement("div");
  weatherInfoContainer.classList.add("card");

  const cityHeading = document.createElement("h1");
  cityHeading.textContent = data.name;
  weatherInfoContainer.appendChild(cityHeading);
  cityHeading.classList.add("cityDisplay");

  const weatherDescription = document.createElement("p");
  weatherDescription.textContent = `${data.weather[0].description}`;
  weatherInfoContainer.appendChild(weatherDescription);
  weatherDescription.classList.add("element");

  const temperature = document.createElement("p");
  const temperatureCelsius = data.main.temp - 273.15;
  temperature.textContent = `${temperatureCelsius.toFixed(2)}°C`;
  weatherInfoContainer.appendChild(temperature);
  temperature.classList.add("element");


  const humidity = document.createElement("p");
  humidity.textContent = `Humidity: ${data.main.humidity}%`;
  weatherInfoContainer.appendChild(humidity);
  humidity.classList.add("element");


  const windSpeed = document.createElement("p");
  windSpeed.textContent = `${data.wind.speed} m/s`;
  weatherInfoContainer.appendChild(windSpeed);
  windSpeed.classList.add("element");


  // Append weather info container to the card or any designated area on the webpage
  card.textContent = "";
  card.appendChild(weatherInfoContainer);

  // Access weather description directly
  const flag = data.weather[0].description;

  // Change background image based on weather description
  if (flag === "few clouds") {
    document.body.style.backgroundImage = `url('few clouds.png')`;
}else if (flag === "clear sky") {
  document.body.style.backgroundImage = `url('clear sky.png')`;
}else if (flag === "broken clouds") {
  document.body.style.backgroundImage = `url('broken clouds.png')`;
}else if (flag === "scattered clouds") {
  document.body.style.backgroundImage = `url('scattered clouds.png')`;
}else if (flag === "overcast clouds") {
  document.body.style.backgroundImage = `url('overcast clouds.png')`;
}else if (flag === "tornado") {
  document.body.style.backgroundImage = `url('tornado.png')`;
}else if (flag === "squlls") {
  document.body.style.backgroundImage = `url('squlls.png')`;
}else if (flag === "volcanic ash") {
  document.body.style.backgroundImage = `url('volcanic ash.png')`;
}else if ((flag === "dust")||(flag === "sand")) {
  document.body.style.backgroundImage = `url('dust.png')`;
}else if (flag === "fog") {
  document.body.style.backgroundImage = `url('fog.png')`;
}else if (flag === "smoke") {
  document.body.style.backgroundImage = `url('smoke.png')`;
}else if (flag === "haze") {
  document.body.style.backgroundImage = `url('haze.png')`;
}else if (flag === "mist") {
  document.body.style.backgroundImage = `url('mist.png')`;
}else if (flag === "fog") {
  document.body.style.backgroundImage = `url('fog.png')`;
}else if ((flag === "light snow")||(flag === "light shower sleet")||(flag === "	light shower snow")) {
  document.body.style.backgroundImage = `url('light snow.png')`;
}else if ((flag === "heavy snow")||(flag === "heavy shower snow")) {
  document.body.style.backgroundImage = `url('heavy snow.png')`;
}else if (flag === "snow") {
  document.body.style.backgroundImage = `url('snow.png')`;
}else if (flag === "sleet") {
  document.body.style.backgroundImage = `url('sleet.png')`;
}else if (flag === "rain and snow") {
  document.body.style.backgroundImage = `url('rain and snow.png')`;
}else if ((flag === "light rain")||(flag === "light intensity shower rain")||(flag === "drizzle")) {
  document.body.style.backgroundImage = `url('light rain.png')`;
}else if (flag === "moderate rain") {
  document.body.style.backgroundImage = `url('moderate rain.png')`;
}else if ((flag === "shower rain")||(flag === "heavy intensity shower rain")) {
  document.body.style.backgroundImage = `url('shower rain.png')`;
}else if ((flag === "rain")||(flag === "heavy rain")||(flag === "ragged shower rain")) {
  document.body.style.backgroundImage = `url('rain.png')`;
}else if ((flag === "thunderstorm")||(flag === "thunderstorm with light rain")
||(flag === "thunderstorm with rain")||(flag === "thunderstorm with heavy rain	")
||(flag === "light thunderstorm")||(flag === "heavy thunderstorm")
||(flag === "ragged thunderstorm")||(flag === "thunderstorm with light drizzle")
||(flag === "thunderstorm with drizzle")||(flag === "thunderstorm with heavy drizzle")) {
  document.body.style.backgroundImage = `url('thunderstorm.png')`;
}
 else {
    // Default background image if weather doesn't match conditions
    document.body.style.backgroundImage = `url('default.png')`;
}

}


function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("error");
    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}