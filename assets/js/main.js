
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
let cityInput = document.getElementById("cityInput");
// let tds = Array.from(document.getElementsByTagName("td"));
let table = document.querySelector("table");
let tempdiv = document.getElementById("tempDiv");
let headerH1 = document.getElementById("headerH1");
let country = "germany";
let city = "Bocholt";
let lat;
let lon;
let windDirection;
let clockInterval



function showWeather() {
    // country = document.getElementById("countryInput").value;
    city = document.getElementById("cityInput").value;
    weatherCity.innerHTML = city;
    // die nachfolgende Zeile ist nicht relevant, diese sind für 
    // fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&limit=5&appid=APIKEY`)
    // .then(response => response.json())
    // let a = (() => {
    // console.log();
    // console.log("first");
    // lat = await data[0].lat;
    // lon = await data[0].lon;
    // console.log(lon);
    // console.log(lat);
    // lat = lat.toFixed(2);
    // lon = lon.toFixed(2);
    // api.openweathermap.org / data / 2.5 / weather ? lat = { lat } & lon={ lon; }& appid={API key; }
    // console.log(data[1].lat);
    // fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=API Key`)
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=de&appid=c41b8a39a3c402e02819bd223ee1f116`)
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            table.style.opacity = "0";
            headerH1.style.opacity = "0";
            tempdiv.style.opacity = "0";
            descriptionOut.style.opacity = "0";

            if (data.cod == "404") {
                console.log("undefinded");
                setTimeout(() => {
                    cityInput.value = "";
                    alert("Leider konnte die eingegebene Stadt nicht gefunden Werden");
                }, 100);
                return;
            }
            console.log(data.main.temp);
            console.log("first");
            console.log(data.main.temp - 274.15);
            let i = data.wind.deg;
            if (i >= 349 && i <= 11) {
                windDirection = +i + "° -=- North";
            } else if (i >= 12 && i <= 33) {
                windDirection = +i + "° -=- North-Northeast";
            } else if (i >= 34 && i <= 56) {
                windDirection = +i + "° -=- Northeast";
            } else if (i >= 57 && i <= 78) {
                windDirection = +i + "° -=- East-Northeast";
            } else if (i >= 79 && i <= 101) {
                windDirection = +i + "° -=- East";
            } else if (i >= 102 && i <= 123) {
                windDirection = +i + "° -=- East-Southeast";
            } else if (i >= 124 && i <= 146) {
                windDirection = +i + "° -=- Southeast";
            } else if (i >= 147 && i <= 168) {
                windDirection = +i + "° -=- South-Southeast	";
            } else if (i >= 169 && i <= 191) {
                windDirection = +i + "° -=- South";
            } else if (i >= 192 && i <= 213) {
                windDirection = +i + "° -=- South-Southwest";
            } else if (i >= 214 && i <= 236) {
                windDirection = +i + "° -=- Southwest";
            } else if (i >= 237 && i <= 258) {
                windDirection = +i + "° -=- West-Southwest	";
            } else if (i >= 259 && i <= 281) {
                windDirection = +i + "° -=- West";
            } else if (i >= 282 && i <= 303) {
                windDirection = +i + "° -=- West-Northwest	";
            } else if (i >= 304 && i <= 326) {
                windDirection = +i + "° -=- Northwest";
            } else if (i >= 327 && i <= 348) {
                windDirection = +i + "° -=- North-Northwest	";
            }
            console.log(data)
            let localeTime = new Date().getTime();
            let shift = 3600
            if (new Date().getMonth() + 1 >= 4 || new Date().getMonth() + 1 <= 11) {
                shift = 7200
            }
            let date = new Date(localeTime - shift * 1000 + data.timezone * 1000);
            let time = date.toLocaleTimeString();
            let today = date.toLocaleDateString();
            let formattedTime = time;
            timeOut.innerHTML = formattedTime;
            clearInterval(clockInterval)
            clockInterval = setInterval(() => {
                let localeTime = new Date().getTime();
                let date = new Date(localeTime - shift * 1000 + data.timezone * 1000);
                let time = date.toLocaleTimeString();
                let today = date.toLocaleDateString();
                // let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
                let formattedTime = time;
                timeOut.innerHTML = formattedTime;
            }, 1000);

            table.style.opacity = "1";
            headerH1.style.opacity = "1";
            tempdiv.style.opacity = "1";
            descriptionOut.style.opacity = "1";


            temperaturOut.innerHTML = (data.main.temp - 274.15).toFixed(2) + "°C";
            descriptionOut.innerHTML = data.weather[0].description;
            descriptionOut.innerHTML = data.weather[0].description;
            windOut.innerHTML = data.wind.speed + " m/s " + windDirection;
            cloudOut.innerHTML = data.weather[0].description;
            pressureOut.innerHTML = data.main.pressure + " hpa";
            humidityOut.innerHTML = data.main.humidity + "%";


            sunriseOut.innerHTML = (new Date(data.sys.sunrise * 1000 + data.timezone * 1000 - 3600 * 1000)).toLocaleTimeString(data.sys.country);

            sunsetOut.innerHTML = (new Date(data.sys.sunset * 1000 + data.timezone * 1000 - 3600 * 1000)).toLocaleTimeString(data.sys.country);
            geoCordsOut.innerHTML = ` [${data.coord.lat}, ${data.coord.lon}] `;
            imgOut.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        });


    // });

    ;
}

cityInput.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
        showWeather();
    }
    console.log(e.key);
});