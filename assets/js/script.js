const resposta = await fetch("./assets/data/projetos.json");

if (!resposta.ok) {
    throw new Error(
        `Erro ao carregar projetos.json: ${resposta.status}`
    );
}

const dados = await resposta.json();

const container__projetos = document.querySelector('.projects-list');

dados.projetos.forEach((projeto) => {

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
                href="#"
                class="project-link"
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