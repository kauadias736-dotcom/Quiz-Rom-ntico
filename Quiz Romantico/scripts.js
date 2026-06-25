const inicio = document.getElementById("inicio");
const quiz = document.getElementById("quiz");
const resultado = document.getElementById("resultado");

const simBtn = document.getElementById("simBtn");
const naoBtn = document.getElementById("naoBtn");
const mensagemNao = document.getElementById("mensagemNao");

const mensagens = [
    "🥺 Tem certeza?",
    "😅 Pensa mais um pouquinho...",
    "👀 Vai ser divertido!",
    "😂 Última chance!",
    "😆 Tá bom, vou parar de insistir!"
];

let tentativas = 0;

function moverBotao(){

    const maxX = window.innerWidth - 150;
    const maxY = window.innerHeight - 100;

    naoBtn.style.position = "fixed";
    naoBtn.style.left = Math.random() * maxX + "px";
    naoBtn.style.top = Math.random() * maxY + "px";

    if(tentativas < mensagens.length){
        mensagemNao.textContent = mensagens[tentativas];
    }

    tentativas++;
}

naoBtn.addEventListener("mouseover", moverBotao);
naoBtn.addEventListener("click", moverBotao);

simBtn.addEventListener("click", () => {
    inicio.classList.add("hidden");
    quiz.classList.remove("hidden");
});

let atividade = "";
let comida = "";
let filme = "";
let extra = "";

const mensagemEscolha = document.getElementById("mensagemEscolha");
const comidaStep = document.getElementById("comidaStep");
const filmeStep = document.getElementById("filmeStep");
const sobremesaStep = document.getElementById("sobremesaStep");
const pipocaStep = document.getElementById("pipocaStep");
const dataInput = document.getElementById("data");
const horarioInput = document.getElementById("horario");

function showStep(step){
    step.classList.remove("hidden");
}

function hideStep(step){
    step.classList.add("hidden");
}

document.querySelectorAll("#atividades button").forEach(btn => {
    btn.addEventListener("click", () => {

        document
        .querySelectorAll("#atividades button")
        .forEach(b => b.classList.remove("selected"));

        btn.classList.add("selected");
        atividade = btn.dataset.value;

        if(atividade === "comer"){
            mensagemEscolha.textContent = "Ótimo! Agora me conta o que vamos devorar, a sobremesa, e o horário ideal.";
            showStep(comidaStep);
            showStep(sobremesaStep);
            hideStep(filmeStep);
            hideStep(pipocaStep);
            filme = "";
            extra = "";
            document.querySelectorAll("#filmes button").forEach(b => b.classList.remove("selected"));
            document.querySelectorAll("#pipocas button").forEach(b => b.classList.remove("selected"));
        } else {
            mensagemEscolha.textContent = "Perfeito! Escolha o filme, a pipoca, e depois manda o horário para eu me arrumar.";
            showStep(filmeStep);
            showStep(pipocaStep);
            hideStep(comidaStep);
            hideStep(sobremesaStep);
            comida = "";
            extra = "";
            document.querySelectorAll("#comidas button").forEach(b => b.classList.remove("selected"));
            document.querySelectorAll("#sobremesas button").forEach(b => b.classList.remove("selected"));
        }
    });
});

document.querySelectorAll("#comidas button").forEach(btn => {
    btn.addEventListener("click", () => {

        document
        .querySelectorAll("#comidas button")
        .forEach(b => b.classList.remove("selected"));

        btn.classList.add("selected");
        comida = btn.dataset.value;
    });
});

document.querySelectorAll("#filmes button").forEach(btn => {
    btn.addEventListener("click", () => {

        document
        .querySelectorAll("#filmes button")
        .forEach(b => b.classList.remove("selected"));

        btn.classList.add("selected");
        filme = btn.dataset.value;
    });
});

document.querySelectorAll("#sobremesas button").forEach(btn => {
    btn.addEventListener("click", () => {

        document
        .querySelectorAll("#sobremesas button")
        .forEach(b => b.classList.remove("selected"));

        btn.classList.add("selected");
        extra = btn.dataset.value;
    });
});

document.querySelectorAll("#pipocas button").forEach(btn => {
    btn.addEventListener("click", () => {

        document
        .querySelectorAll("#pipocas button")
        .forEach(b => b.classList.remove("selected"));

        btn.classList.add("selected");
        extra = btn.dataset.value;
    });
});

document
.getElementById("confirmar")
.addEventListener("click", () => {

    const data = dataInput.value;
    const horario = horarioInput.value;

    if(!atividade || !data || !horario || (atividade === "comer" && (!comida || !extra)) || (atividade === "cinema" && (!filme || !extra))){
        alert("Preencha todas as opções 😊");
        return;
    }

    localStorage.setItem("atividade", atividade);
    localStorage.setItem("comida", comida);
    localStorage.setItem("filme", filme);
    localStorage.setItem("extra", extra);
    localStorage.setItem("data", data);
    localStorage.setItem("horario", horario);

    quiz.classList.add("hidden");
    resultado.classList.remove("hidden");

    document.getElementById("resAtividade")
    .textContent = atividade === "comer"
        ? "🍽️ Atividade: Sair para comer"
        : "🎬 Atividade: Ir ao cinema";

    document.getElementById("resComida")
    .textContent = atividade === "comer"
        ? "🍕 Comida: " + comida
        : "";

    document.getElementById("resFilme")
    .textContent = atividade === "cinema"
        ? "🎬 Filme: " + filme
        : "";

    document.getElementById("resExtra")
    .textContent = atividade === "comer"
        ? "🍰 Sobremesa: " + extra
        : "🍿 Pipoca: " + extra;

    document.getElementById("resData")
    .textContent = "📅 Data: " + data;

    document.getElementById("resHorario")
    .textContent = "⏰ Horário: " + horario;

    document.getElementById("resFinal").textContent = atividade === "comer"
        ? "Vou chegar com fome e com vontade de rir. Espero que você esteja pronta para me escolher o melhor prato!"
        : "Prepare a pipoca e o sorriso—esse cinema vai ser roteiro perfeito para nós.";

    confetti();
});

function confetti(){

    for(let i = 0; i < 120; i++){

        const piece =
        document.createElement("div");

        piece.classList.add("confetti-piece");

        piece.style.left =
        Math.random() * 100 + "vw";

        piece.style.background =
        `hsl(${Math.random()*360},100%,50%)`;

        piece.style.animationDelay =
        Math.random() * 2 + "s";

        document.body.appendChild(piece);

        setTimeout(() => {
            piece.remove();
        }, 4000);
    }
}