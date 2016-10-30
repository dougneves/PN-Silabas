window.onload = () => {
  console.log("INICIANDO...");
  const synth = window.speechSynthesis;
  let voice = null;
  const gameBoard = document.getElementById("game");

  //seleciona voz
  const selectVoice = () => {
    synth.getVoices().forEach((v,i) => {
      if(v.name.toUpperCase().indexOf("GOOGLE") >= 0 && v.lang === "pt-BR"){
        voice = v;
        console.log("VOZ SELECIONADA: "+v.name+" - "+v.lang);
      }
    })
  }

  //fala texto
  const textToSpeech = (text) => {
    selectVoice();
    const utterThis = new SpeechSynthesisUtterance(text+".");
    utterThis.voice = voice;
    console.log("lendo "+text);
    synth.speak(utterThis);
  }

  //desafios
  const vogais = ["a","e","i","o","u"];
  const consoantes = ["b","c","d","f","g","j","l","m","n","p","r","s","t","w","x","z"];

  //cria desafios
  let desafio;

  const verifyAnwser = (event) => {
    const src = event.srcElement;
    console.log(src.value);
    if(src.value === desafio) {
      textToSpeech(src.value+". Muito bem Alícia! Você acertou!")
      newChallange();
    }
    else {
      textToSpeech(src.value+". Não.")
      src.disabled = true;
    }
  }

  const newChallange = () => {
    desafio = _.sample(consoantes)+_.sample(vogais);
    console.log("novo desafio = " +desafio);
    textToSpeech(desafio)

    const botoes = _.shuffle([
      desafio,
      _.sample(consoantes)+_.sample(vogais),
      _.sample(consoantes)+_.sample(vogais)
    ]);

    const div = document.createElement("div");
    botoes.forEach((text,i) => {
      const b = document.createElement("button");
      b.value = text;
      b.appendChild(document.createTextNode(text.toUpperCase()));
      div.appendChild(b);
      b.onclick = verifyAnwser;
    })
    game.innerHTML = '';
    game.appendChild(div);

  }

  newChallange();

  setInterval(() => {
    console.log("falando: " + desafio);
    textToSpeech(desafio)
  },6000)
}
