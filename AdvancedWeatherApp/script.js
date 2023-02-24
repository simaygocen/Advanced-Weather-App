

//http://api.weatherapi.com/v1/current.json?key=b2dcb168bda541d2b1d83621222509&q=London&aqi=no

const url= 'http://api.weatherapi.com/v1/current.json?key='
const key='a7875dcf562a479c999154145232402'
const app=document.querySelector('.weather-app');
const temp=document.querySelector('.temp');
const dateOutput=document.querySelector('.date');
const timeOutput=document.querySelector('.time');
const condition=document.querySelector('.condition');
const feelslikeDetail=document.querySelector('.feelslike');
const cloudDetail=document.querySelector('.cloud');
const humidityDetail=document.querySelector('.humidity');
const windDetail=document.querySelector('.wind');
const windDirDetail=document.querySelector('.wind_dir');
const pressureDetail=document.querySelector('.pressure');
const cityName=document.querySelector('.name');
const icon=document.querySelector('.icon');
const form=document.getElementById('locationInput');
const search=document.querySelector('.search');
const btn=document.querySelector('.submit');

//Defaul city when the page loads
let cityInput="London";



//Add submit event to the form
form.addEventListener('submit',(e) => {
    //If the input field is empty throw an alert
    if(search.value.length==0){
        alert('Please type in a city name');
        console.log('Please type in a city name');
    }
    else{
        //Change city
        cityInput=search.value;
        getResult(cityInput);
        search.value="";
        //app.style.opacity="0";

    }
    e.preventDefault();
});

function dayOfTheWeek(day,month,year){

    //const d = new Date("July 21, 1983 01:15:00");
    //let day = d.getDay();
    const weekday=[
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesdey",
    "Thursday",
    "Friday",
    "Saturday",
    ];
    
    let d=`${year},${month},${day}`;
    const dayName=new Date(d).getDay();
    console.log(dayName);
    return weekday[dayName];
};

const getResult=(cityInput)=>{
    let query=`${url}${key}&q=${cityInput}&aqi=no`
    fetch(query)
    .then(weather =>{
        return weather.json()
    })
    .then(displayResult)
}


const displayResult=(result)=>{
    console.log(result);
    temperature=Math.round(result.current.temp_c);
    temp_c=`${temperature}°C`;
    temp.innerHTML=temp_c;
    condition.innerHTML=result.current.condition.text;

    const date=result.location.localtime;
    const year=parseInt(date.substr(0,4));
    const month=parseInt(date.substr(5,2));
    const day=parseInt(date.substr(8,2));
    const time=date.substr(11);

    
    
    dateOutput.innerHTML=`${dayOfTheWeek(day,month,year)} ${year}/${month}/${day};`
    timeOutput.innerHTML=time;
    cityName.innerHTML=result.location.name;
    
    const iconId=result.current.condition.icon.substr(
        "//cdn.weatherapi.com/weather/64x64/".length
    );

    icon.src="./icons/"+iconId;

    feelsliketemperature=Math.round(result.current.feelslike_c);
    feelslikeDetail.innerHTML=feelsliketemperature+"°C";
    cloudDetail.innerHTML=result.current.cloud + "%";
    humidityDetail.innerHTML=result.current.humidity +"%";
    windDetail.innerHTML=result.current.wind_kph + " km/h";
    windDirDetail.innerHTML=result.current.wind_dir;
    pressureDetail.innerHTML=result.current.pressure_mb +" mb";

    let timeOfDay="day";

    const code=result.current.condition.code;

    if(!result.current.is_day){
        timeOfDay="night";
    }

    let randomNumber=Math.floor(Math.random() * 3);

    //clear
    if(code==1000){

        switch(randomNumber){
            case 0:
                app.style.backgroundImage=`url(./images/${timeOfDay}/clear1.jpg)`;
                break;
            case 1:
                app.style.backgroundImage=`url(./images/${timeOfDay}/clear2.jpg)`;
                break;
        }
        
        btn.style.background="#e5ba92";

        if(timeOfDay=="night"){
            btn.style.background="#181e27";
        }
    }

    //cloudy
    else if(
        code==1003 ||
        code==1006 ||
        code==1009 ||
        code==1030 ||
        code==1069 ||
        code==1087 ||
        code==1135 ||
        code==1273 ||
        code==1276 ||
        code==1279 ||
        code==1282)
    {

        switch(randomNumber){
            case 0:
                app.style.backgroundImage=`url(./images/${timeOfDay}/cloudy1.jpg)`;
                break;
            case 1:
                app.style.backgroundImage=`url(./images/${timeOfDay}/cloudy2.jpg)`;
                break;
            case 2:
                app.style.backgroundImage=`url(./images/${timeOfDay}/cloudy3.jpg)`;
                break;
        }

        
        btn.style.background='#fa6d1b';
        if(timeOfDay=="night"){
            btn.style.background="#181e27";
        }

    }
    //rainy
    else if(
        code==1063 ||
        code==1069 ||
        code==1072 ||
        code==1150 ||
        code==1153 ||
        code==1180 ||
        code==1183 ||
        code==1186 ||
        code==1189 ||
        code==1192 ||
        code==1195 ||
        code==1204 ||
        code==1207 ||
        code==1240 ||
        code==1243 ||
        code==1246 ||
        code==1249 ||
        code==1252 

    ){
        switch(randomNumber){
            case 0:
                app.style.backgroundImage=`url(./images/${timeOfDay}/rainy1.jpg)`;
                break;
            case 1:
                app.style.backgroundImage=`url(./images/${timeOfDay}/rainy2.jpg)`;
                break;
            case 2:
                app.style.backgroundImage=`url(./images/${timeOfDay}/rainy3.jpg)`;
                break;
        }
        btn.style.background='#647d75';
        if(timeOfDay=="night"){
            btn.style.background="#325c80";
        }
    }
    //snowy
    else{
        switch(randomNumber){
            case 0:
                app.style.backgroundImage=`url(./images/${timeOfDay}/snowy1.jpg)`;
                break;
            case 1:
                app.style.backgroundImage=`url(./images/${timeOfDay}/snowy2.jpg)`;
                break;
            case 2:
                app.style.backgroundImage=`url(./images/${timeOfDay}/snowy3.jpg)`;
                break;
        }
        btn.style.background='#4d72aa';
        if(timeOfDay=="night"){
            btn.style.background="#1b1b1b";
        }
    }

    app.style.opacity="1";
}

getResult(cityInput);