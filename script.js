import gsap from "gsap";

function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
}

// Met à jour l'horloge toutes les secondes
setInterval(updateClock, 1000);

// Appelle immédiatement pour afficher dès le chargement
updateClock();

// =========================================================================================

// URL de l'API
let weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Muzillac,fr&APPID=05ae9412bf7b1d52f4b0de68b0a04068&units=metric`;

fetch(weatherApiUrl)
    .then((response) => 
        response.json().then((data) => {
            console.log(data);
            document.querySelector('#city').innerHTML = data.name;
            document.querySelector('#temp').innerHTML = data.main.temp;
            document.querySelector('#humidity').innerHTML = data.main.humidity;
            document.querySelector('#wind').innerHTML = data.wind.speed;
        })
    )
    .catch((err) => console.log('Erreur : ' + err));

// Animation de fond dynamique pour .pageInitiale
gsap.to("pageInitiale", {
    backgroundColor: "violet", // Première couleur
    duration: 2, // Durée de transition
    repeat: -1, // Animation infinie
    yoyo: true, // Revenir à l'état initial
    ease: "power2.inOut", // Douceur de l'animation
    onRepeat: () => {
      // Alterner les couleurs à chaque répétition
        const colors = ["violet", "green", "black"];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        gsap.to(".pageInitiale", { backgroundColor: randomColor, duration: 2 });
    },
    });