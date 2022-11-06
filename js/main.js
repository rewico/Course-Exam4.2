const elForm = document.querySelector("form");
const elInput = document.querySelector(".input");
const elH2 = document.querySelector(".word");
const elDivDefinitions = document.querySelector(".definitons");

const seperateData = (element) => {
  console.log(element.meanings);
};

const successRender = (data) => {
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

  elH2.textContent = word + " - " + phonetic;

  data[0].meanings[0].definitions.forEach((element) => {
    let elPDef = document.createElement("p");

    elPDef.className = "desc";
    elPDef.textContent = `"` + element.definition + `"`;

    if (element.example) {
      let elPexample = document.createElement("p");
      let elSpan = document.createElement("span");

      elPexample.className = "example";
      elSpan.textContent = element.example;
      elPexample.textContent = `Example: ` + element.example;

      elDivDefinitions.appendChild(elPDef);
      elDivDefinitions.appendChild(elPexample);

      console.log(elPexample);
    } else elDivDefinitions.appendChild(elPDef);
    // console.log(element);
  });

  // data.forEach(seperateData);
};

const errorRender = (data) => {
  elH2.textContent = data.title;
  console.log(data);
};

const render = (evt) => {
  evt.preventDefault();

  (async () => {
    const RES = await fetch(
      "https://api.dictionaryapi.dev/api/v2/entries/en/" + elInput.value
    );
    const DATA = await RES.json();

    if (RES.status === 200) {
      successRender(await DATA);
    } else if (RES.status === 404) {
      errorRender(await DATA);
    }
  })();
};

elForm.addEventListener("submit", render);
