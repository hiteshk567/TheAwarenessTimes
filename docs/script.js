let API_KEY = "UyBUfD6lGAANmoAVv3v9IDEUiMBbfXnB";

// --------- Newspaper title creation --------------

let titleSection = createSection("title");

let firstContainer = createDiv("container");
let firstRow = createDiv("row");
let firstCol12 = createDiv("col-12");
let paperName = createH1("paperName", "THE AWARENESS TIMES");
firstCol12.appendChild(paperName);
firstRow.appendChild(firstCol12);
firstContainer.appendChild(firstRow);
let hr1 = document.createElement("hr");
titleSection.append(firstContainer, hr1);

// ---------- Sticky Navbar creation --------------

let navBarDiv = createDiv("row navBarRow header");
let navBarCol1 = createDiv("col-6");
let label = createLabel("section", "Select category of the news");
navBarCol1.append(label);
let navBarCol2 = createDiv("col-6");
let selectTag = createSelect("custom-select", "sections", "section");
navBarCol2.append(selectTag);
navBarDiv.append(navBarCol1, navBarCol2);

// ------------ Content section creation -------------

let contentSection = createSection("content");

document.body.append(titleSection, navBarDiv, contentSection);

// ------------ DOM elements ----------------

let dropDown = document.querySelector("#section");
let content = document.querySelector("#content");
let contentContainer = createDiv("container");

// ----------- Options for the select tag ------------------

let sections = {
  0: "arts",
  1: "automobiles",
  2: "books",
  3: "business",
  4: "fashion",
  5: "food",
  6: "health",
  7: "home",
  8: "insider",
  9: "magazine",
  10: "movies",
  11: "nyregion",
  12: "obituaries",
  13: "opinion",
  14: "politics",
  15: "realestate",
  16: "science",
  17: "sports",
  18: "sundayreview",
  19: "technology",
  20: "theater",
  21: "travel",
  22: "t-magazine",
  23: "travel",
  24: "upshot",
  25: "us",
  26: "world",
};

// ---------- Fetching data from the api --------------

fetchData(
  "https://api.nytimes.com/svc/topstories/v2/home.json?api-key=" + API_KEY
);

// ---------- Event listener for the select tag ----------------

dropDown.addEventListener("change", (event) => {
  let selectedOption = event.target.value;
  if (!selectedOption) return;
  let url =
    "https://api.nytimes.com/svc/topstories/v2/" +
    selectedOption +
    ".json?api-key=" +
    API_KEY;
  fetchData(url);
  content.innerHTML = "";
});

// ---------- Change the content according to the selected option ----------

async function fetchData(url) {
  try {
    let response = await fetch(url);
    let data = await response.json();
    if (data.status !== "OK") {
      throw new Error("Something went wrong");
    }
    contentContainer.innerHTML = " ";
    for (let index = 0; index < data.results.length; index++) {
      let card = createDiv("card mb-3");
      let div = createDiv("row no-gutters");
      let cardBody = createDiv("card-body");
      let contentCol = createDiv("col-lg-8 col-md-8 col-sm-8");
      let imageCol = createDiv("col-lg-4 col-md-4 col-sm-4");
      let sectionCard = createSectionCard(
        "card-subtitle mb-2 text-muted section-card",
        data.results[index]["section"]
      );
      let cardTitle = createTitle(data.results[index]["title"]);
      let date = createDate(
        "date-card text-muted",
        data.results[index]["created_date"]
      );
      let abstractCard = createPara(
        "card-text abstract-card",
        data.results[index]["abstract"]
      );
      let anchorTag = createAnchor(data.results[index]["short_url"]);
      var image;
      for (let i = 0; i < data.results[index]["multimedia"].length; i++) {
        if (
          data.results[index]["multimedia"][i]["url"].includes("articleInline")
        ) {
          image = createImage(data.results[index]["multimedia"][i]["url"]);
          break;
        }
      }
      cardBody.append(sectionCard, cardTitle, date, abstractCard, anchorTag);
      contentCol.append(cardBody);
      imageCol.append(image);
      div.append(contentCol, imageCol);
      card.append(div);
      contentContainer.appendChild(card);
      content.append(contentContainer);
    }
  } catch (err) {
    console.log(err);
  }
}

// ---------- Create options of the select tag ----------------

for (let key in sections) {
  let option = createOption(sections[key]);
  dropDown.append(option);
}

// ------------ different functions to create the DOM elements --------------

function createOption(text) {
  let element = document.createElement("option");
  element.value = text;
  if (text === "home") {
    element.defaultSelected = true;
  }
  element.innerHTML = text.toUpperCase();
  return element;
}

function createDiv(className, text) {
  let element = document.createElement("div");
  element.className = className;
  if (text) {
    element.innerHTML = text;
  }
  return element;
}

function createPara(className, text) {
  let element = document.createElement("p");
  element.className = className;
  element.innerHTML = text;
  return element;
}

function createDate(className, date) {
  let element = document.createElement("h6");
  let time = new Date(date).toDateString().split(" ");
  element.className = className;
  element.innerHTML = time[1] + " " + time[2];
  return element;
}

function createAnchor(url) {
  let element = document.createElement("a");
  element.href = url;
  element.target = "_blank";
  element.innerHTML = "Continue reading...";
  return element;
}

function createSectionCard(className, text) {
  let element = document.createElement("h6");
  element.className = className;
  element.innerHTML = text.toUpperCase();
  return element;
}

function createImage(url) {
  let element = document.createElement("img");
  element.src = url;
  element.className = "img-thumbnail card-img";
  return element;
}

function createTitle(text) {
  let element = document.createElement("h5");
  element.className = "card-title";
  element.innerHTML = text;
  return element;
}

function createSection(id) {
  let element = document.createElement("section");
  element.id = id;
  return element;
}

function createH1(className, text) {
  let element = document.createElement("h1");
  element.className = className;
  element.innerHTML = text;
  return element;
}

function createLabel(forValue, text) {
  let element = document.createElement("label");
  element.for = forValue;
  element.innerHTML = text;
  return element;
}

function createSelect(className, selectName, id) {
  let element = document.createElement("select");
  element.className = className;
  element.name = selectName;
  element.id = id;
  return element;
}

// ------------------ Sticky Navbar creation ----------------------

window.onscroll = function () {
  myFunction();
};

var header = document.querySelector(".header");
var sticky = header.offsetTop;

function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}