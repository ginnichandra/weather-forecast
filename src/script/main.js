"use strict";

const ZERO_ABS = -273.15;

/**
 * Make some usefull conversions
 */
const CONV = {
    /**
     * Convert °K -> °C
     */
    k_a_c: k => (k + ZERO_ABS).toFixed(1),
    k_a_f: f => (((f + ZERO_ABS) * 9 / 5) + 32).toFixed(1),
    /**
     * Provides time with format hh:mm from timestamp
     */
    dt_a_hm: dt => {
        let date = new Date(dt * 1000);
        return ("0" + date.getHours()).substr(-2) + "h" + (date.getMinutes() + "0").substr(0, 2);
    }

}

/**
 * Latitude and longitude of Montréal city 
 */
const
    MONTREAL = {
        lat: 45.508320,
        lon: -73.566431,
    },

    HYDERABAD =
    {
        lat: 17.387140,
        lon: 78.491684,
    },

    TORONTO =
    {
        lat: 43.6532,
        lon: 79.3832,
    },
    MISSUSAGA =
    {
        lat: 43.5890,
        lon: 79.6441,
    },
    ALBERTA =
    {
        lat: 53.9333,
        lon: 116.5765,
    };




const OW_API = {
    base_api_url: 'http://api.openweathermap.org/data/2.5/',
    base_icon_url: 'http://openweathermap.org/img/w/',
    weather: 'weather?lat={lat}&lon={lon}',
    forecast: 'forecast?lat={lat}&lon={lon}',
    key: '&APPID=d372021858e26c181fc642ca0f0dbd18',

    //http://api.openweathermap.org/data/2.5/weather?lat=45.508320&lon=-73.566431&appid=d372021858e26c181fc642ca0f0dbd18
    get_weather_url: function (lat, lon) {
        return this.base_api_url + this.weather.replace('{lat}', lat).replace('{lon}', lon) + this.key;
    },

    //http://api.openweathermap.org/data/2.5/forecast?lat=45.508320&lon=-73.566431&appid=d372021858e26c181fc642ca0f0dbd18
    get_forecast_url: function (lat, lon) {
        return this.base_api_url + this.forecast.replace('{lat}', lat).replace('{lon}', lon) + this.key;
    },

    //http://openweathermap.org/img/w/10d.png
    get_icon_url: function (icon_id) {
        return this.base_icon_url + icon_id + ".png";
    },
};


let go = document.getElementsByTagName("button")[0];
console.log(go);

let table = document.getElementById("tb_forecast").getElementsByClassName("model")[0];
console.log(table);
let tbody = document.getElementsByTagName("tbody")[0];
console.log(tbody);


go.addEventListener('click', function () {
    let select = document.getElementById('select_city');
    let value = select.value;
    switch (value) {
        case "Montreal":
            displayWeather(MONTREAL.lat, MONTREAL.lon);
            break;
        case "Hyderabad":
            console.log("inside Hyderabad");
            displayWeather(HYDERABAD.lat, HYDERABAD.lon);
            break;
        case "Toronto":
            console.log("inside toronto");
            displayWeather(TORONTO.lat, TORONTO.lon);
            break;
        case "Missusaga":
            console.log("inside missusaga");
            displayWeather(MISSUSAGA.lat, MISSUSAGA.lon);
            break;
        case "Alberta":
            console.log("inside Alberta");
            displayWeather(ALBERTA.lat, ALBERTA.lon);
            break;
        default:
            console.log("defaut");
            break;
    }
});

function displayWeather(latitude, longitude) {

    fetch(OW_API.get_forecast_url(latitude, longitude))
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            console.log(data.city.name);
            console.log(data.city.coord.lat);
            console.log(data.city.coord.lon);
            console.log(tbody.getElementsByTagName("tr").length);

            if(tbody.getElementsByTagName("tr").length > 1)
            toRemoveRow();

            for (let l of data.list) 
            {
                let cln = table.cloneNode(true);
                cln.classList.remove("model");
                tbody.appendChild(cln);
                table.getElementsByClassName("hour")[0].innerHTML = l.dt_txt;
                if (document.getElementById("temp").value === "celcius")
                    table.getElementsByClassName("temperature")[0].innerHTML = CONV.k_a_c(l.main.temp) + "<span>&#176</span>";
                else
                    table.getElementsByClassName("temperature")[0].innerHTML = CONV.k_a_f(l.main.temp);
                table.getElementsByClassName("wind")[0].innerHTML = l.wind.speed;
                table.getElementsByClassName("icon")[0].getElementsByTagName("img")[0].src = OW_API.get_icon_url(l.weather[0].icon);
                table.getElementsByClassName("description")[0].innerHTML = l.weather[0].description;

            }
        });
}


function toRemoveRow() {
    for(let i=40;i>0;i--)
    {
        //tbody.removeChild(tbody.firstElementChild.nextElementSibling)
    tbody.deleteRow(i);
    }
}

