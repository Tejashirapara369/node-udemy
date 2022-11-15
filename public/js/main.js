const form = document.querySelector("form");
const input = document.querySelector("input");
const p1 = document.querySelector("#para-1");
const p2 = document.querySelector("#para-2");
const imgSection = document.querySelector("#img-section");
const reset = document.querySelector("#reset");

const fetchWeather = (address) => {
  fetch("http://localhost:3000/weather?address=" + address).then((resp) => {
    resp.json().then((res) => {
      if (res.error) {
        p1.textContent = "Error: " + res.error;
        p2.textContent = "";
        removeAllChildNodes(imgSection);
        return;
      }
      if (res.msg) {
        p1.textContent = "Weather Info : " + res.msg;
        p2.textContent = "Location : " + res.location;
      }
      if (res.weather_icons[0]) {
        imgSection.removeAttribute("img");
        removeAllChildNodes(imgSection);

        const img = document.createElement("img");
        img.src = res.weather_icons[0];
        imgSection.appendChild(img);
      }
    });
  });
};

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    fetchWeather(input.value);
  });
}

reset.addEventListener("click", (e) => {
  p1.textContent = "";
  p2.textContent = "";
  removeAllChildNodes(imgSection);
});

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
