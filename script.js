gsap.registerPlugin(ScrollTrigger);

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

gsap.to(".portfolio", {
    scrollTrigger: {
        trigger: ".portfolio", // La deuxième page agit comme déclencheur
        start: "top 80%",      // Début de l'animation
        end: "top 30%",        // Fin de l'animation
        scrub: true,           // Synchronise avec le défilement
        markers: true          // Affiche les marqueurs pour vérifier
    },
    y: -300,                  // Déplacement horizontal
});

gsap.fromTo(".presentation", { 
    x: "-100vw" 
},{ 
        x: "0",  // Revient à sa position initiale
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".presentation",
            start: "top 80%",
            end: "top 30%",
            scrub
        }
    }
);

