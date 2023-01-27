let comboCounter = 0;
let timeoutComboReset;
let timeoutTime = 1*1000;
let colorDefault = "#4effa1";
let currentColor = colorDefault;
let breakPoints = [{
  point: 100,
  color: "#ca0e0e"
},{
  point: 20,
  color: "#00ddff"
}];
let exclamation = {
  every: 10,
  text: ["Super!", "Radical!", "Fantastic!", "Great!", "OMG", "Whoah!", ":O", "Nice!", "Splendid!", "Wild!", "Grand!", "Impressive!", "Stupendous!", "Extreme!", "Awesome!"],
  opacity: 0.65
}

function increaseComboCounter() {
  comboCounter++;
  updateComboCounter();
  injectCounter();
}

function resetComboCounter() {
  comboCounter = 0;
  updateComboCounter();
  injectCounter();
}

function injectFont(){
  // Injecta las fuentes 
  let font = new FontFace("PressStart2P", `url('${chrome.runtime.getURL ("fonts/PressStart2P-Regular.woff")}')`);
  document.fonts.add(font);
}

function updateComboCounter() {
  // Actualiza el contador de combos en la interfaz de usuario
  const comboCounterElement = document.getElementById("comboCounter");
  comboCounterElement.textContent = comboCounter;

  if(timeoutComboReset) window.clearTimeout(timeoutComboReset);
  if(comboCounter > 0){
    timeoutComboReset = setTimeout(()=>{
      resetComboCounter();
    }, timeoutTime);
  }
}

function getTextColor(){
  currentColor = colorDefault;
  for(let i in breakPoints){
    if(breakPoints[i].point <= comboCounter){
      currentColor= breakPoints[i].color;
      break;
    }
  }
  return currentColor;
}

function getMessage(){
  const lenArray = exclamation.text.length;
  const indexArray = Math.trunc(comboCounter / exclamation.every) % lenArray;

  console.log({lenArray, indexArray})

  return comboCounter<=10 ? "":exclamation.text[indexArray];
}

function injectCounter() {
  // Elimina el elemento de párrafo que muestra el contador de combos de la página web
  let wrapperElement = document.getElementById("wrapperElement");
  if (wrapperElement) {
    wrapperElement.remove();
  }
  
    wrapperElement = document.createElement("div");
    wrapperElement.setAttribute("id", "wrapperElement");
    wrapperElement.style.position = "fixed";
    wrapperElement.style.top = "0";
    wrapperElement.style.right = "0";
    wrapperElement.style.zIndex = "9999";
    wrapperElement.style.color = getTextColor();
    wrapperElement.style.fontSize = "32px";
    wrapperElement.style.fontFamily = "PressStart2P";
    wrapperElement.style.pointerEvents = "none";
    wrapperElement.style.textAlign = "end";
  
  // Crea un elemento con el contador de combos
  let comboCounterElement = document.createElement("div");
  comboCounterElement.setAttribute("id", "comboCounter");
  comboCounterElement.textContent = comboCounter;
  comboCounterElement.style.lineHeight = "127%";

  let textComboElement = document.createElement("div");
  textComboElement.textContent = getMessage();
  textComboElement.style.fontSize = "30%";
  textComboElement.style.opacity = exclamation.opacity;

  wrapperElement.appendChild(comboCounterElement)
  wrapperElement.appendChild(textComboElement)

  document.body.appendChild(wrapperElement);
}

// Asigna la función increaseComboCounter al evento keydown
document.addEventListener("keydown", increaseComboCounter);

injectFont();
injectCounter();
