/* ==========================================
   ELEMENTOS
========================================== */

const intro = document.getElementById("intro");
const startBtn = document.getElementById("startBtn");
const scene = document.getElementById("scene");
const specialFlower = document.getElementById("specialFlower");

const stars = document.getElementById("stars");
const petals = document.getElementById("petals");
const butterflies = document.getElementById("butterflies");
const particles = document.getElementById("particles");


/* ==========================================
   ESTRELLAS
========================================== */

function createStars() {

    for (let i = 0; i < 100; i++) {

        const star = document.createElement("div");

        star.className = "star";

        star.style.left = Math.random() * 100 + "%";
        star.style.top = Math.random() * 70 + "%";

        star.style.setProperty(
            "--duration",
            (2 + Math.random() * 4) + "s"
        );

        star.style.animationDelay =
            Math.random() * 5 + "s";

        stars.appendChild(star);
    }
}


/* ==========================================
   PÉTALOS
========================================== */

function createPetal() {

    const petal = document.createElement("div");

    petal.className = "falling-petal";

    petal.style.left =
        Math.random() * 100 + "vw";

    petal.style.setProperty(
        "--fall-time",
        (5 + Math.random() * 6) + "s"
    );

    petal.style.setProperty(
        "--sway",
        (-100 + Math.random() * 200) + "px"
    );

    petal.style.transform =
        `rotate(${Math.random() * 360}deg)`;

    petals.appendChild(petal);

    setTimeout(() => {
        petal.remove();
    }, 12000);
}


/* ==========================================
   MARIPOSAS
========================================== */

function createButterfly() {

    const butterfly =
        document.createElement("div");

    butterfly.className = "butterfly";

    const fromLeft =
        Math.random() > .5;

    const startY =
        20 + Math.random() * 55;

    butterfly.style.top =
        startY + "vh";

    butterfly.style.left =
        fromLeft ? "-50px" : "calc(100vw + 50px)";

    butterflies.appendChild(butterfly);

    const duration =
        7000 + Math.random() * 5000;

    const direction =
        fromLeft ? 1 : -1;

    let start = null;

    function fly(timestamp) {

        if (!start) start = timestamp;

        const progress =
            (timestamp - start) / duration;

        if (progress >= 1) {

            butterfly.remove();

            return;
        }

        const x =
            fromLeft
                ? progress * (window.innerWidth + 100) - 50
                : window.innerWidth + 50 -
                  progress * (window.innerWidth + 100);

        const wave =
            Math.sin(progress * Math.PI * 4)
            * 70;

        const y =
            window.innerHeight *
            (startY / 100)
            + wave;

        butterfly.style.transform =
            `translate(${x}px, ${y - window.innerHeight * (startY / 100)}px)
             scale(${.7 + Math.sin(progress * Math.PI) * .3})`;

        requestAnimationFrame(fly);
    }

    requestAnimationFrame(fly);
}


/* ==========================================
   EXPLOSIÓN DE LUZ
========================================== */

function createBurst(x, y) {

    for (let i = 0; i < 45; i++) {

        const particle =
            document.createElement("div");

        particle.className = "particle";

        particle.style.left = x + "px";
        particle.style.top = y + "px";

        const angle =
            Math.random() * Math.PI * 2;

        const distance =
            60 + Math.random() * 180;

        particle.style.setProperty(
            "--x",
            Math.cos(angle) * distance + "px"
        );

        particle.style.setProperty(
            "--y",
            Math.sin(angle) * distance + "px"
        );

        const size =
            2 + Math.random() * 5;

        particle.style.width = size + "px";
        particle.style.height = size + "px";

        particles.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 1400);
    }
}


/* ==========================================
   FLORES: PEQUEÑA VARIACIÓN NATURAL
========================================== */

function animateFlowers() {

    const flowers =
        document.querySelectorAll(
            ".flower:not(.special-flower)"
        );

    flowers.forEach((flower, index) => {

        flower.style.animationDelay =
            `${-index * .7}s`;

    });
}


/* ==========================================
   MOVIMIENTO DEL RAMO CON EL MOUSE
========================================== */

function mouseParallax() {

    document.addEventListener(
        "mousemove",
        (event) => {

            const x =
                (event.clientX /
                    window.innerWidth - .5);

            const y =
                (event.clientY /
                    window.innerHeight - .5);

            const bouquet =
                document.getElementById("bouquet");

            bouquet.style.marginLeft =
                `${x * 12}px`;

            bouquet.style.marginTop =
                `${y * 8}px`;

            specialFlower.style.filter =
                `drop-shadow(
                    ${x * -10}px
                    ${y * -10}px
                    20px
                    rgba(255, 215, 80, .45)
                )`;
        }
    );
}


/* ==========================================
   CLICK EN LA FLOR M
========================================== */

specialFlower.addEventListener(
    "click",
    (event) => {

        const rect =
            specialFlower.getBoundingClientRect();

        const x =
            rect.left + rect.width / 2;

        const y =
            rect.top + rect.height / 2;

        createBurst(x, y);

        specialFlower.classList.add("clicked");

        setTimeout(() => {
            specialFlower.classList.remove("clicked");
        }, 700);

        for (let i = 0; i < 10; i++) {

            setTimeout(() => {
                createPetal();
            }, i * 80);
        }
    }
);


/* ==========================================
   BOTÓN DE ENTRADA
========================================== */

startBtn.addEventListener(
    "click",
    () => {

        intro.classList.add("hide");

        setTimeout(() => {
            scene.classList.add("show");
        }, 500);

        /* Primera lluvia de pétalos */

        for (let i = 0; i < 15; i++) {

            setTimeout(
                createPetal,
                i * 150
            );
        }

        /* Primera mariposa */

        setTimeout(
            createButterfly,
            1800
        );
    }
);


/* ==========================================
   INTERVALOS
========================================== */

createStars();

animateFlowers();

mouseParallax();

setInterval(
    createPetal,
    900
);

setInterval(
    createButterfly,
    6500
);

