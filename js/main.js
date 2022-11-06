const elForm = document.querySelector("form");
const elInput = document.querySelector(".input");
const elDivDetails = document.querySelector(".details");
const elH2 = document.querySelector(".word");
const elDivDefinitions = document.querySelector(".definitons");
const elDivPlay = document.querySelector(".footer");
const elBtnPlay = document.querySelector(".play");
const elAudio = document.querySelector("audio");

elDivPlay.style.display = "none";

const successRender = (data) => {
  elDivDefinitions.innerHTML = "";
  elDivDetails.style.display = "block";

  let word = data[0].word;
  let phonetic;

  data.forEach((element) => {
    if (element.phonetic) {
      phonetic = element.phonetic.replace(/([/])/g, "");
    } else if (element.phonetics) {
      element.phonetics.forEach((element) => {
        if (element.text) {
          phonetic = element.text.replace(/([/])/g, "");
        }
      });
    }
  });

  if (phonetic) {
    elH2.textContent = word + " - " + phonetic;
  } else elH2.textContent = word;

  data[0].meanings[0].definitions.forEach((element) => {
    let elPDef = document.createElement("p");

    elPDef.className = "desc";
    elPDef.textContent = `"` + element.definition + `"`;

    if (element.example) {
      let elPexample = document.createElement("p");

      elPexample.className = "example";
      elPexample.textContent = `Example: ` + element.example;

      elDivDefinitions.appendChild(elPDef);
      elDivDefinitions.appendChild(elPexample);
    } else elDivDefinitions.appendChild(elPDef);
  });

  if (data[0]?.phonetics[0]?.audio) {
    elDivPlay.style.display = "flex";

    elAudio.setAttribute("src", `${data[0].phonetics[0].audio}`);
    audio = elBtnPlay.addEventListener("click", () => {
      elAudio.play();
    });
  } else elDivPlay.style.display = "none";
};

const errorRender = (data) => {
  let elPDef = document.createElement("p");
  let elPexample = document.createElement("p");

  elDivDetails.style.display = "block";
  elDivPlay.style.display = "none";

  elH2.textContent = data.title;
  elDivDefinitions.innerHTML = null;

  elPDef.className = "desc";
  elPexample.className = "example";

  elPDef.textContent = data.message;
  elPexample.textContent = data.resolution;

  elDivDefinitions.appendChild(elPDef);
  elDivDefinitions.appendChild(elPexample);
};

const render = (evt) => {
  evt.preventDefault();

  (async () => {
    const RES = await fetch(
      "https://api.dictionaryapi.dev/api/v2/entries/en/" + elInput.value
    );
    const DATA = await RES.json();

    if ((await RES.status) === 200) {
      successRender(await DATA);
    } else if ((await RES.status) === 404) {
      errorRender(await DATA);
    }
  })();
};

elForm.addEventListener("submit", render);
