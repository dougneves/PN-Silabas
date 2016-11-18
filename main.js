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

  const textToSpeech = (text) => {
    return new Promise((resolve,reject) => {
      tts(text);
      setTimeout(() => {resolve()},text.length*200);
    });
  }

  //fala texto
  const tts = (text) => {
    selectVoice();
    const utterThis = new SpeechSynthesisUtterance(text);
    utterThis.voice = voice;
    synth.speak(utterThis);
  }

  //desafios
  const vogais = ["a","e","i","o","u"];
  const consoantes = ["b","c","d","f","g","j","l","m","n","p","r","s","t","w","x","z"];
  const silabas = [
    {screen: "BA", tts: "bá"},
    {screen: "BE", tts: "bé"},
    {screen: "BI", tts: "bí"},
    {screen: "BO", tts: "bó"},
    {screen: "BU", tts: "bú"},
    {screen: "CA", tts: "cá"},
    {screen: "CO", tts: "có"},
    {screen: "CU", tts: "cú"},
    {screen: "DA", tts: "dá"},
    {screen: "DE", tts: "dé"},
    {screen: "DI", tts: "dí"},
    {screen: "DO", tts: "dó"},
    {screen: "DU", tts: "dú"},
  ]
  const elogios = [
    "Parabéns",
    "Muito bem",
    "Isso Mesmo",
    "Você acertou",
    "Está certo",
    "Brilhante",
    "Correto",
    "Gostei"
  ]

  //cria desafios
  let desafio;

  const verifyAnwser = (event) => {
    enabled(false);
    const src = event.srcElement;
    if(src.value === desafio.screen) {
      const frases = _.shuffle(elogios);
      textToSpeech("É "+desafio.tts+". "+frases[1]+" Alícia! "+frases[2]+"!").then(()=>{
        newChallange();
        enabled(true);
      });
    }
    else {
      textToSpeech(src.value+". Não.").then(()=>{
        enabled(true);
      })
      src.disabled = true;
    }
  }

  const newChallange = () => {
    const next = _.shuffle(silabas);
    desafio = next[0];
    textToSpeech(desafio.tts).then()

    const botoes = _.shuffle([
      next[0].screen,
      next[1].screen,
      next[2].screen
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

  const enabled = (e) => {
    let s = "none";
    if(!e) s = "block";
    document.getElementById('modalDisable').style.display = s;
  }

  newChallange();

  setInterval(() => {
    textToSpeech(desafio.tts).then()
  },6000)
}
