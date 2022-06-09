const api = {
    key: "b6df0e300c487b7a46f4cc9636628f4a",
    baseurl:"https://api.openweathermap.org/data/2.5/",
    
};

const searchBox = document.querySelector(".seacrh-box");

/* Kolbek funksiya qilib berib qoyamiza setQuery */
searchBox.addEventListener("keypress", setQuery)


/* Kolbek funksiya; setQuery inputimiza ichidigi malumotla */
function setQuery(e) {
    if(e.keyCode == 13){
        getResults(searchBox.value);
        console.log(searchBox.value);
    }
  }
  
  function getResults(query) {
       /*fetch bizani api bilan vzaimodeystviye qiladigon funksiya boladi   */
    fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
        return weather.json();
    })
    .then(displayResults);
     /* displayResults - funksiya */
  }
  
  function displayResults(weather) {  
      console.log(weather);
      let city  = document.querySelector(".location .city")
      city.innerHTML = `${weather.name}, ${weather.sys.country}`;
      
      let now  = new Date();
      let  date = document.querySelector(".location .date");
      date.innerHTML = dateBuilder(now);
      
      let temp = document.querySelector('.temp');
      temp.innerHTML = `${Math.round(weather.main.temp)} <span>&#176c</span>`;
      
      let weatherEl = document.querySelector('.weather');
      weatherEl.innerHTML = weather.weather[0].main;
      let hilow = document.querySelector(".hi-low");
      hilow.innerHTML = `${Math.round (weather.main.temp_min)}&#176c / ${Math.round (weather.main.temp_max)}&#176c`;
  }
  
  /* getter biza olamiza; setter biza ustanovka qilamiza */
  function dateBuilder(s) {
      let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      let day = days[s.getDay()];
      
      /* bu bizada metod va uni chaqiramiza */
      let date = s.getDate();
      let month = months[s.getMonth()];
      let year = s.getFullYear();
      
      /* import qilamiza */
      return`${day} ${date} ${month} ${year}`
      /* oy bilan kuni ozimiza sozdat qildi */
    };