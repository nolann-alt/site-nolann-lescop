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

gsap.fromTo(".about-me-content", { 
    x: "-100vw" 
},{ 
    x: 0, 
    duration: 2, 
    scrollTrigger: { 
        trigger: ".about-me-content", 
        start: "top 80%", 
        end: "top 30%", 
        scrub: true, 
    } 
});

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

/*----------------------------------------------------------------------------------------------------------------------------------------------------*/

const horizontalLinks = document.querySelectorAll('.horizontal-menu a');
const contentSections = document.querySelectorAll('.content-section');

// Cache toutes les sections sauf la première
contentSections.forEach((section, index) => {
    if (index !== 0) {
        gsap.set(section, { 
            display: 'none', 
            opacity: 0,
            y: 50 
        });
    }
});

// Active le premier lien et affiche la première section
horizontalLinks[0].classList.add('active');
gsap.set(contentSections[0], { 
    display: 'block', 
    opacity: 1,
    y: 0 
});

horizontalLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        
        // Supprime la classe active de tous les liens
        horizontalLinks.forEach(l => l.classList.remove('active'));
        
        // Ajoute la classe active au lien cliqué
        link.classList.add('active');
        
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        // Animation de sortie pour la section active
        const activeSection = Array.from(contentSections).find(section => 
            getComputedStyle(section).display !== 'none'
        );
        
        if (activeSection) {
            gsap.to(activeSection, {
                opacity: 0,
                y: 50,
                duration: 0.3,
                onComplete: () => {
                    activeSection.style.display = 'none';
                    
                    // Animation d'entrée pour la nouvelle section
                    targetSection.style.display = 'block';
                    gsap.fromTo(targetSection, {
                            opacity: 0,
                            y: 50
                        },{
                            opacity: 1,
                            y: 0,
                            duration: 0.3
                        }
                    );
                }
            });
        }
    });
});


