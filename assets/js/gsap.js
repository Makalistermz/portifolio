import Lenis from "../../node_modules/lenis/dist/lenis.mjs";

import gsap from "../libs/gsap/index.js";

import ScrollTrigger from "../libs/gsap/ScrollTrigger.js";

gsap.registerPlugin(ScrollTrigger);


/* =========================================================
   LENIS
========================================================= */

const lenis = new Lenis({
    lerp: 0.05
});


lenis.on("scroll", ScrollTrigger.update);


gsap.ticker.add((time) => {

    // GSAP entrega segundos.
    // Lenis espera milissegundos.
    lenis.raf(time * 1000);

});


gsap.ticker.lagSmoothing(0);



/* =========================================================
   HERO
========================================================= */

const heroTimeline = gsap.timeline({
    defaults: {
        ease: "power3.out"
    }
});


/* Header desce suavemente */

heroTimeline.from(".header", {

    y: -30,
    opacity: 0,

    duration: 0.7

});


/* Texto pequeno acima do título */

heroTimeline.from(".hero-eyebrow", {

    y: 20,
    opacity: 0,

    duration: 0.5

}, "-=0.3");


/* Linhas principais do hero */

heroTimeline.from(".hero-line", {

    yPercent: 100,
    opacity: 0,

    duration: 0.9,

    stagger: 0.12

}, "-=0.2");


/* Descrição */

heroTimeline.from(".hero-description", {

    y: 30,
    opacity: 0,

    duration: 0.6

}, "-=0.4");


/* Botões */

heroTimeline.from(".hero-actions", {

    y: 20,
    opacity: 0,

    duration: 0.5

}, "-=0.3");


/* Card MZ */

heroTimeline.from(".hero-visual", {

    x: 100,
    opacity: 0,
    scale: 0.95,

    duration: 1

}, "-=1");



/* =========================================================
   HERO — CÍRCULOS
========================================================= */

const circulo1 = document.querySelector(".hero-circle-one");

const circulo2 = document.querySelector(".hero-circle-two");


if (circulo1) {

    gsap.to(circulo1, {

        scale: 1.06,
        opacity: 0.55,

        duration: 3,

        repeat: -1,
        yoyo: true,

        ease: "sine.inOut"

    });

}


if (circulo2) {

    gsap.to(circulo2, {

        scale: 0.94,
        opacity: 0.45,

        duration: 4,

        repeat: -1,
        yoyo: true,

        ease: "sine.inOut"

    });

}



/* =========================================================
   HERO CARD — PARALLAX COM MOUSE
========================================================= */

const heroCard = document.querySelector(".hero-card");


if (
    heroCard &&
    window.matchMedia("(pointer: fine)").matches
) {

    gsap.set(heroCard, {

        transformPerspective: 1000,
        transformOrigin: "center"

    });


    const moverX = gsap.quickTo(
        heroCard,
        "rotationY",
        {
            duration: 0.5,
            ease: "power3.out"
        }
    );


    const moverY = gsap.quickTo(
        heroCard,
        "rotationX",
        {
            duration: 0.5,
            ease: "power3.out"
        }
    );


    heroCard.addEventListener("mousemove", (event) => {

        const rect =
            heroCard.getBoundingClientRect();


        const mouseX =
            event.clientX - rect.left;


        const mouseY =
            event.clientY - rect.top;


        const porcentagemX =
            mouseX / rect.width - 0.5;


        const porcentagemY =
            mouseY / rect.height - 0.5;


        moverX(
            porcentagemX * 8
        );


        moverY(
            porcentagemY * -8
        );

    });


    heroCard.addEventListener("mouseleave", () => {

        moverX(0);

        moverY(0);

    });

}



/* =========================================================
   SOBRE
========================================================= */

const sobre =
    document.querySelector(".about");


if (sobre) {

    gsap.from(
        sobre.querySelector(".section-index"),
        {

            y: 25,
            opacity: 0,

            duration: 0.7,

            scrollTrigger: {

                trigger: sobre,

                start: "top 75%",

            }

        }
    );


    gsap.from(
        sobre.querySelector(".section-title"),
        {

            y: 60,
            opacity: 0,

            duration: 0.9,

            ease: "power3.out",

            scrollTrigger: {

                trigger: sobre,

                start: "top 70%",

            }

        }
    );


    gsap.from(
        ".about-numbers",
        {

            x: -100,
            opacity: 0,

            duration: 1,

            ease: "power3.out",

            scrollTrigger: {

                trigger: ".about-grid",

                start: "top 80%",

            }

        }
    );


    gsap.from(
        ".about-content",
        {

            x: 100,
            opacity: 0,

            duration: 1,

            ease: "power3.out",

            scrollTrigger: {

                trigger: ".about-grid",

                start: "top 80%",

            }

        }
    );


    /* Números 01 e infinito */

    gsap.from(
        ".about-number strong",
        {

            scale: 0.5,
            opacity: 0,

            duration: 0.8,

            stagger: 0.15,

            ease: "back.out(1.7)",

            scrollTrigger: {

                trigger: ".about-numbers",

                start: "top 80%",

            }

        }
    );

}



/* =========================================================
   PROJETOS
========================================================= */

const projetos =
    gsap.utils.toArray(".project");


projetos.forEach((project) => {

    const imagem =
        project.querySelector(
            ".project-image-wrapper"
        );


    const imagemInterna =
        project.querySelector(
            ".project-image"
        );


    const conteudo =
        project.querySelector(
            ".project-content"
        );


    const tecnologias =
        project.querySelectorAll(
            ".project-stack li"
        );


    const botao =
        project.querySelector(
            ".project-link"
        );


    if (!imagem || !conteudo) {

        return;

    }


    const esquerda =
        project.classList.contains(
            "project-left"
        );


    /* Se projeto for esquerda:

       imagem vem da esquerda
       conteúdo vem da direita

       Se for direita, inverte.
    */

    const inicioImagem =
        esquerda
            ? -300
            : 300;


    const inicioConteudo =
        esquerda
            ? 300
            : -300;



    /* ========================================
       TIMELINE DO PROJETO
    ======================================== */

    const timeline =
        gsap.timeline({

            scrollTrigger: {

                trigger: project,

                start: "top 90%",

                end: "top 40%",

                scrub: 1,

            }

        });



    /* IMAGEM */

    timeline.fromTo(

        imagem,

        {

            x: inicioImagem,

            opacity: 0,

            scale: 0.94

        },

        {

            x: 0,

            opacity: 1,

            scale: 1,

            ease: "none"

        },

        0

    );



    /* CONTEÚDO */

    timeline.fromTo(

        conteudo,

        {

            x: inicioConteudo,

            opacity: 0

        },

        {

            x: 0,

            opacity: 1,

            ease: "none"

        },

        0

    );



    /*
       Pequeno parallax vertical
       dentro da imagem.
    */

    if (imagemInterna) {

        gsap.fromTo(

            imagemInterna,

            {

                y: -15

            },

            {

                y: 15,

                ease: "none",

                scrollTrigger: {

                    trigger: project,

                    start: "top bottom",

                    end: "bottom top",

                    scrub: true

                }

            }

        );

    }



    /* Tecnologias */

    if (tecnologias.length) {

        gsap.from(

            tecnologias,

            {

                y: 15,

                opacity: 0,

                duration: 0.5,

                stagger: 0.08,

                ease: "power2.out",

                scrollTrigger: {

                    trigger: conteudo,

                    start: "top 70%"

                }

            }

        );

    }



    /* Botão do projeto */

    if (botao) {

        gsap.from(

            botao,

            {

                scale: 0,
                rotation: -90,

                opacity: 0,

                duration: 0.6,

                ease: "back.out(1.7)",

                scrollTrigger: {

                    trigger: conteudo,

                    start: "top 65%"

                }

            }

        );

    }

});



/* =========================================================
   STACK
========================================================= */

const stack =
    document.querySelector(".stack");


if (stack) {

    gsap.from(
        ".stack .section-index",
        {

            y: 20,
            opacity: 0,

            scrollTrigger: {

                trigger: stack,

                start: "top 75%"

            }

        }
    );


    gsap.from(
        ".stack .section-title",
        {

            y: 60,
            opacity: 0,

            duration: 0.9,

            ease: "power3.out",

            scrollTrigger: {

                trigger: stack,

                start: "top 70%"

            }

        }
    );


    gsap.from(
        ".stack-description",
        {

            y: 30,
            opacity: 0,

            duration: 0.7,

            scrollTrigger: {

                trigger: stack,

                start: "top 65%"

            }

        }
    );


    gsap.from(
        ".stack-list li",
        {

            y: 35,
            opacity: 0,

            duration: 0.7,

            stagger: 0.09,

            ease: "power3.out",

            scrollTrigger: {

                trigger: ".stack-list",

                start: "top 80%"

            }

        }
    );

}



/* =========================================================
   STACK — HOVER
========================================================= */

const tecnologiasStack =
    gsap.utils.toArray(
        ".stack-list li"
    );


tecnologiasStack.forEach((tecnologia) => {

    tecnologia.addEventListener(
        "mouseenter",
        () => {

            tecnologiasStack.forEach(
                (item) => {

                    if (
                        item !== tecnologia
                    ) {

                        gsap.to(
                            item,
                            {

                                opacity: 0.3,

                                duration: 0.25

                            }
                        );

                    }

                }
            );


            gsap.to(
                tecnologia,
                {

                    x: 10,

                    duration: 0.25,

                    ease: "power2.out"

                }
            );

        }
    );


    tecnologia.addEventListener(
        "mouseleave",
        () => {

            gsap.to(
                tecnologiasStack,
                {

                    opacity: 1,

                    x: 0,

                    duration: 0.3

                }
            );

        }
    );

});



/* =========================================================
   CERTIFICAÇÕES
========================================================= */

const certificacoes =
    document.querySelector(
        ".certificates"
    );


if (certificacoes) {

    gsap.from(
        ".certificates .section-index",
        {

            y: 20,
            opacity: 0,

            duration: 0.5,

            scrollTrigger: {

                trigger: certificacoes,

                start: "top 75%"

            }

        }
    );


    gsap.from(
        ".certificates .section-title",
        {

            y: 50,
            opacity: 0,

            duration: 0.8,

            ease: "power3.out",

            scrollTrigger: {

                trigger: certificacoes,

                start: "top 70%"

            }

        }
    );


    gsap.from(
        ".certificate-item",
        {

            x: -70,

            opacity: 0,

            duration: 0.7,

            stagger: 0.1,

            ease: "power3.out",

            scrollTrigger: {

                trigger:
                    ".certificate-list",

                start: "top 80%"

            }

        }
    );


    gsap.from(
        ".certificates-footer",
        {

            y: 30,
            opacity: 0,

            duration: 0.6,

            scrollTrigger: {

                trigger:
                    ".certificate-list",

                start: "bottom 85%"

            }

        }
    );

}



/* =========================================================
   CONTATO
========================================================= */

const contato =
    document.querySelector(".contact-card");


if (contato) {

    gsap.from(
        contato,
        {

            y: 70,

            scale: 0.95,

            opacity: 0,

            duration: 1,

            ease: "power3.out",

            scrollTrigger: {

                trigger: contato,

                start: "top 85%"

            }

        }
    );


    gsap.from(
        ".contact-content > *",
        {

            y: 25,

            opacity: 0,

            duration: 0.6,

            stagger: 0.1,

            ease: "power2.out",

            scrollTrigger: {

                trigger: contato,

                start: "top 70%"

            }

        }
    );

}



/* =========================================================
   CÍRCULOS DO CONTATO
========================================================= */

const circulosContato =
    gsap.utils.toArray(
        ".contact-circle"
    );


if (circulosContato.length) {

    gsap.to(
        circulosContato,
        {

            scale: 1.08,

            duration: 3,

            stagger: 0.3,

            repeat: -1,

            yoyo: true,

            ease: "sine.inOut"

        }
    );

}



/* =========================================================
   FOOTER
========================================================= */

const footer =
    document.querySelector(".footer");


if (footer) {

    gsap.from(
        ".footer-container",
        {

            y: 30,

            opacity: 0,

            duration: 0.8,

            ease: "power2.out",

            scrollTrigger: {

                trigger: footer,

                start: "top 95%"

            }

        }
    );

}



/* =========================================================
   REFRESH
========================================================= */

window.addEventListener(
    "load",
    () => {

        ScrollTrigger.refresh();

    }
);