// fetch("http://api.openweathermap.org/data/2.5/forecast?id=524901&appid={c41b8a39a3c402e02819bd223ee1f116}")
//     .then(response => response.json())
//     .then((data) => {
//         console.log(data);
//         console.log("first");
//     });

// fetch("http://api.openweathermap.org/geo/1.0/direct?q=Bocholt&limit=5&appid=c41b8a39a3c402e02819bd223ee1f116")
//     .then(response => response.json())
//     .then((data) => {
//         console.log(data);
//         console.log("first");
//     });

// fetch("https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=c41b8a39a3c402e02819bd223ee1f116")
//     .then(response => response.json())
//     .then((data) => {
//         console.log(data);
//         console.log("first");
//     });

// fetch("https://api.openweathermap.org/data/2.5/weather?q=" +
//     "Bocholt" +
//     "&units=metric&appid=" +
//     "c41b8a39a3c402e02819bd223ee1f116")
//     .then(response => response.json())
//     .then((data) => {
//         console.log(data);
//         console.log("first");
//     });
let imgOut = document.getElementById("imgOut");
let temperaturOut = document.getElementById("temperatur");
let descriptionOut = document.getElementById("description");
let timeOut = document.getElementById("localeTime");
let windOut = document.getElementById("wind");
let cloudOut = document.getElementById("cloudiness");
let pressureOut = document.getElementById("pressure");
let humidityOut = document.getElementById("humidity");
let sunriseOut = document.getElementById("sunrise");
let sunsetOut = document.getElementById("sunset");
let geoCordsOut = document.getElementById("geocords");
let weatherCity = document.getElementById("city");

let country = "germany";
let city = "Bocholt";
let lat;
let lon;
let windDirection;


async function showWeather() {
    // country = document.getElementById("countryInput").value;
    city = document.getElementById("cityInput").value;
    weatherCity.innerHTML = city;
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&limit=5&appid=c41b8a39a3c402e02819bd223ee1f116`)
        .then(response => response.json())
        .then(async (data) => {
            console.log(data);
            console.log("first");
            lat = await data[0].lat;
            lon = await data[0].lon;
            console.log(lon);
            console.log(lat);
            lat = lat.toFixed(2);
            lon = lon.toFixed(2);
            // api.openweathermap.org / data / 2.5 / weather ? lat = { lat } & lon={ lon; }& appid={API key; }
            // console.log(data[1].lat);
            // fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=c41b8a39a3c402e02819bd223ee1f116`)
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c41b8a39a3c402e02819bd223ee1f116`)
                .then(response => response.json())
                .then((data) => {
                    console.log(data);
                    console.log(data.main.temp);
                    console.log("first");
                    console.log(data.main.temp - 274.15);
                    let i = data.wind.deg;
                    if (i >= 349 && i <= 11) {
                        windDirection = +i + "° -=- N";
                    } else if (i >= 12 && i <= 33) {
                        windDirection = +i + "° -=- NNE";
                    } else if (i >= 34 && i <= 56) {
                        windDirection = +i + "° -=- NE";
                    } else if (i >= 57 && i <= 78) {
                        windDirection = +i + "° -=- ENE";
                    } else if (i >= 79 && i <= 101) {
                        windDirection = +i + "° -=- E";
                    } else if (i >= 102 && i <= 123) {
                        windDirection = +i + "° -=- ESE";
                    } else if (i >= 124 && i <= 146) {
                        windDirection = +i + "° -=- SE";
                    } else if (i >= 147 && i <= 168) {
                        windDirection = +i + "° -=- SSE";
                    } else if (i >= 169 && i <= 191) {
                        windDirection = +i + "° -=- S";
                    } else if (i >= 192 && i <= 213) {
                        windDirection = +i + "° -=- SSW";
                    } else if (i >= 214 && i <= 236) {
                        windDirection = +i + "° -=- SW";
                    } else if (i >= 237 && i <= 258) {
                        windDirection = +i + "° -=- WSW";
                    } else if (i >= 259 && i <= 281) {
                        windDirection = +i + "° -=- W";
                    } else if (i >= 282 && i <= 303) {
                        windDirection = +i + "° -=- WNW";
                    } else if (i >= 304 && i <= 326) {
                        windDirection = +i + "° -=- NW";
                    } else if (i >= 327 && i <= 348) {
                        windDirection = +i + "° -=- NNW";
                    }
                    console.log(data.timezone);
                    temperaturOut.innerHTML = (data.main.temp - 274.15).toFixed(2) + "°C";
                    descriptionOut.innerHTML = data.weather[0].description;
                    timeOut.innerHTML = (new Date()).toLocaleTimeString(data.timezone);
                    descriptionOut.innerHTML = data.weather[0].description;
                    windOut.innerHTML = data.wind.speed + " m/s " + windDirection;
                    cloudOut.innerHTML = data.weather[0].description;
                    pressureOut.innerHTML = data.main.pressure + " hpa";
                    humidityOut.innerHTML = data.main.humidity + "%";
                    sunriseOut.innerHTML = (new Date(data.sys.sunrise * 1000)).toLocaleTimeString(data.timezone);
                    sunsetOut.innerHTML = (new Date(data.sys.sunset * 1000)).toLocaleTimeString(data.timezone);
                    geoCordsOut.innerHTML = ` [${lat}, ${lon}] `;
                    imgOut.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
                });


        });

    ;
}