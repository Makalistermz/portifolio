const respostaProjetos = await fetch("./assets/data/projetos.json");
const respostaCertificados = await fetch("./assets/data/certificacoes.json");

if (!respostaProjetos.ok) {
    throw new Error(
        `Erro ao carregar projetos.json: ${respostaProjetos.status}`
    );
}

const dadosProjetos = await respostaProjetos.json();

const container__projetos = document.querySelector('.projects-list');

dadosProjetos.projetos.forEach((projeto) => {

    const ladoProjeto =
        projeto.lado === "esquerdo"
            ? "project-left"
            : "project-right";

    const tecnologias = projeto.tecnologias
        .map((tecnologia) => {
            return `<li>${tecnologia}</li>`;
        })
        .join("");

    const imagemProjeto = `
        <div class="project-image-wrapper reveal">

            <figure class="project-image">

                <img
                    src="${projeto.caminho_img}"
                    alt="${projeto.descricao_img}"
                    loading="lazy"
                >

            </figure>

        </div>
    `;

    const conteudoProjeto = `
        <div class="project-content reveal">

            <span class="project-type">
                ${projeto.tipo_sistema}
            </span>

            <h3>
                ${projeto.nome}
            </h3>

            <p>
                ${projeto.descricao}
            </p>

            <ul class="project-stack">
                ${tecnologias}
            </ul>

            <a
                href="${projeto.link}"
                class="project-link"
                target="_blank"
                aria-label="Ver projeto ${projeto.nome}"
            >
                ↗
            </a>

        </div>
    `;

    const ordemProjeto =
        projeto.lado === "esquerdo"
            ? `${imagemProjeto}${conteudoProjeto}`
            : `${conteudoProjeto}${imagemProjeto}`;

    container__projetos.insertAdjacentHTML(
        "beforeend",
        `
        <article class="project ${ladoProjeto}">

            ${ordemProjeto}

            <span class="project-number">
                ${projeto.numero_projeto}
            </span>

        </article>
        `
    );

});

if (!respostaCertificados.ok) {
    throw new Error(
        `Erro ao carregar projetos.json: ${respostaCertificados.status}`
    );
}

const dadosCertificado = await respostaCertificados.json();

const container_certificados = document.querySelector('.certificate-list');

dadosCertificado.certificados.forEach((certificado) => {
    container_certificados.insertAdjacentHTML(
        "beforeend",
        `
            <article class="certificate-item reveal">
                <span
                    class="certificate-arrow"
                    aria-hidden="true"
                >
                    ↗
                </span>


                <h3>
                    ${certificado.nome}
                </h3>


                <span class="certificate-school">
                    ${certificado.instituicao}
                </span>


                <span class="certificate-duration">
                    ${certificado.horas}
                </span>


                <span class="certificate-year">
                    ${certificado.ano}
                </span>


                <a
                    href="${certificado.link}"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Ver certificado

                    <span aria-hidden="true">
                        ↗
                    </span>
                </a>

            </article>
        `);
});

const track = document.querySelector(".marquee-track");
const group = document.querySelector(".marquee-group");

let position = 0;
let groupWidth = 0;

const speed = 60;

function criarCopias() {

    track
        .querySelectorAll("[data-marquee-clone]")
        .forEach((clone) => clone.remove());


    groupWidth = group.getBoundingClientRect().width;


    const quantidadeCopias =
        Math.ceil(window.innerWidth / groupWidth) + 2;


    for (let i = 0; i < quantidadeCopias; i++) {

        const clone = group.cloneNode(true);

        clone.setAttribute("aria-hidden", "true");
        clone.setAttribute("data-marquee-clone", "");

        track.appendChild(clone);

    }

}

criarCopias();


let ultimoTempo = performance.now();

function animarMarquee(tempoAtual) {

    const deltaTime =
        (tempoAtual - ultimoTempo) / 1000;

    ultimoTempo = tempoAtual;


    position -= speed * deltaTime;


    if (Math.abs(position) >= groupWidth) {
        position += groupWidth;
    }


    track.style.transform =
        `translate3d(${position}px, 0, 0)`;


    requestAnimationFrame(animarMarquee);

}

requestAnimationFrame(animarMarquee);


window.addEventListener("resize", () => {

    criarCopias();

});