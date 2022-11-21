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


let city = "Bocholt";
let lat;
let lon;


async function showWeather() {
    country = document.getElementById("countryInput").value;
    city = document.getElementById("cityInput").value;
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
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=c41b8a39a3c402e02819bd223ee1f116`)
                .then(response => response.json())
                .then((data) => {
                    console.log(data.main.temp);
                    console.log("first");
                    console.log(data.main.temp - 274.15);
                    temperaturOut.innerHTML = (data.main.temp - 274.15).toFixed(2) + "°C";
                    descriptionOut.innerHTML = data.weather[0].description;
                    timeOut.innerHTML = (new Date()).toLocaleTimeString(data.timezone);
                    descriptionOut.innerHTML = data.weather[0].description;
                    windOut.innerHTML = data.wind.speed + " m/s " + data.wind.deg;
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