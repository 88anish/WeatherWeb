const api={
    key: "94d62bf65eca87ad10c881a2c0f27108",
    baseurl: "http://api.openweathermap.org/data/2.5/",
}

const searchbox= document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt){
    if(evt.keyCode==13){
        getResults(searchbox.value);
        console.log(searchbox.value);
    }
}

function getResults(query){
    fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather=>{
        return weather.json();
    }).then(displayResults);
}

function displayResults(weather){
    console.log(weather);
    let city=document.querySelector('.location .city');
    city.innerText=`${weather.name}, ${weather.sys.country}`;

    let now=new Date();
    let date=document.querySelector('.location .date');
    date.innerText=dateBuilder(now);

    let temp=document.querySelector('.current .temp');
    temp.innerHTML=`${Math.round(weather.main.temp)}<span>°c</span>`;

    let weather_temp=document.querySelector('.current .weather');
    weather_temp.innerText=weather.weather[0].main;

    let hilow=document.querySelector('.current .hi-low');
    hilow.innerText=`${weather.main.temp_min}°c/${weather.main.temp_max}°c`;
}

function dateBuilder(d){
    let months=["January", "February", "March","April","May","June","July","August","September","October","November", "December"];
    let days=["Sunday", "Monday","Tuesday","Wednesday","Thrusday","Friday","Saturday"];
    let day=days[d.getDay()];
    let date=d.getDate();
    let month=months[d.getMonth()];
    let year=d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}

