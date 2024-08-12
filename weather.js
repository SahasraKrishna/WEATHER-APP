const weatherform=document.querySelector(".weatherForm");
const cityInput=document.querySelector(".cityName");
const card= document.querySelector(".details");
const apiKey="41a8377f6ac4d403ede4abe8812972d8";

weatherform.addEventListener("submit" , async event =>{
    event.preventDefault();
    const city=cityInput;
    if(city){
         try{
            const weatherData=await getWeatherData(city);
            displayWeatherInfo(weatherData);
         }
         catch(error){
            console.error(error);
            displayError(error.message);
         }
    }
    else{
        displayError("Please enter correctly");
    }
}) ;

async function getWeatherData(city) {
    apiurl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    const response=await fetch(apiurl);
    if(!response.ok){
        throw new Error("could not fetch weather data");
    }
     return await response.json();
}

function displayWeatherInfo(data){
    const{ name: city, 
        main:{temp,humidity},
        weather:[{description,id}]}=data;
        card.textContent="";
        card.style.display="flex";

        const cityDisplay=document.createElement("h1");
        const tempDisplay=document.createElement("p");
        const humidityDisplay=document.createElement("p");
        const descDisplay=document.createElement("p");
        const emojiDisplay=document.createElement("p");

         cityDisplay.textContent=city;
         tempDisplay.textContent=`${temp} °C`;
        humidityDisplay.textContent='Humidity: ${humidity}%';
        descDisplay.textContent=description;
        emojiDisplay.textContent=getWeatgerEmoji(id);

         cityDisplay.classList.add("cityName");
         tempDisplay.classList.add("temp");
         humidityDisplay.classList.add("humidity");
        descDisplay.classList.add("desc");
        emojiDisplay.classList.add("emoji");

         card.appendChild(cityDisplay);
         card.appendChild(tempDisplay);
         card.appendChild(humidityDisplay);
         card.appendChild(descDisplay);
         card.appendChild(emojiDisplay);

}
function getWeatherEmoji(weatherId){
    switch(true){
        case (weatherId >=200 && weatherId <300):
        return "⛈️";
        case (weatherId >=300 && weatherId <400):
        return "🌧️";
        case (weatherId >=500 && weatherId <600):
        return "☁️";
        case (weatherId >=600 && weatherId <700):
        return "❄️";
        case (weatherId >=700):
        return "☀️";
        default :
        return "🤔❓";
    }

}
function displayError(message){
      const errorDisplay=document.createElement("p");
      errorDisplay.textContent=message;
      errorDisplay.classList.add("errorDisplay");

      card.textContent = "";
      card.style.display="flex";
      card.appendChild(errorDisplay);

}