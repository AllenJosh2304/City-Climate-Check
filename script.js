const button = document.getElementById("getWeather");
const input = document.getElementById("cityInput");
const tem = document.getElementById("temp");
const humid = document.getElementById("humid");
const winds = document.getElementById("wind");
const sec2 = document.querySelector(".sec2"); // Select sec2

const apiKey = "ce8c5c787065fcd6a8204006ac08b4f1";

button.addEventListener("click", () => {
  const city = input.value.trim();

  if (city === "") {
    alert("Please enter a city name.");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error("City not found");
      }
      return res.json();
    })
    .then((data) => {
      const temp = data.main.temp;
      const humidity = data.main.humidity;
      const wind = data.wind.speed;
      
      const oldHeading = sec2.querySelector("h2");
      if (oldHeading) {
        oldHeading.remove();
      }

      const cityname = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();

      const cn = document.createElement("h2");
      cn.textContent =cityname; 
      sec2.insertBefore(cn, sec2.firstChild);

      tem.innerHTML = `${temp} °C`;
      humid.innerHTML = `${humidity}%`;
      winds.innerHTML = `${wind} km/h`;
    })
    .catch((error) => {
      alert(error.message);
      tem.innerHTML = "-------";
      humid.innerHTML = "------";
      winds.innerHTML = "------";
    });
});
