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


gsap.fromTo(".presentation", { 
    x: "-100vw" 
},{ 
    x: 0, 
    duration: 2, 
    scrollTrigger: { 
        trigger: ".presentation", 
        start: "top 80%", 
        end: "top 30%", 
        scrub: true, 
    } 
});

gsap.fromTo(".pageInitiale", 
    {
        scale: 0.5,
        y: "-100%", // Départ depuis le haut de la page
        opacity: 0 // Facultatif, pour une transition plus fluide
    }, 
    {
        scale: 1,
        y: "0%", // Arrivée à sa position normale
        opacity: 1, // Facultatif
        duration: 2,
        ease: "power2.out"
    }
);

gsap.fromTo(".pageInitiale", {
        x: 0,
    },
    {
        x: "100vw",
        duration: 12,
        scrollTrigger: {
            trigger: ".portfolio",
            start: "top 80%",
            end: "top 20%",
            scrub: true,
        }
    }
);

gsap.fromTo("nav", {
        opacity: 0,
    },
    {
        opacity: 1,
        duration: 2,
        scrollTrigger: {
            trigger: ".portfolio",
            start: "top 60%",
            end: "top 20%",
            scrub: true,
        }
    }
);

// JavaScript pour ajouter la classe active au lien correspondant avec GSAP
const navLinks = document.querySelectorAll('.menu a');

navLinks.forEach(link => {
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);

    ScrollTrigger.create({
        trigger: targetSection,
        start: "top center",
        end: "bottom center",
        onEnter: () => link.classList.add('active'),
        onLeave: () => link.classList.remove('active'),
        onEnterBack: () => link.classList.add('active'),
        onLeaveBack: () => link.classList.remove('active'),
    });
});