"use strict";

update();

let errorMessage = document.querySelectorAll(".error");
// Выбор даты
flatpickr(".input-date", {
  locale: "ru",
  dateFormat: "d.m.y",
});

//#region Добавление новой записи
let noteBlock = document.querySelector(".notes");

document.querySelector(".addNote").addEventListener("click", function () {
  let date = document.querySelector(".input-date");

  let noteTitle = document.querySelector("#note-title");

  let noteText = document.querySelector("#note-text");

  if (date.value === "" || noteTitle.value === "" || noteText.value === "") {
    errorMessage[0].textContent = "Заполните все поля!";

    errorMessage[0].style.opacity = 1;

    setTimeout(() => (errorMessage[0].style.opacity = 0), 2000);
    setTimeout(() => (errorMessage[0].textContent = ""), 3000);

    return;
  }
  noteBlock.insertAdjacentHTML(
    "beforeend",
    `<div class="col note">
      <div class="note__header">
        <p class="note__data">${date.value}</p>
        <p class="h5 note__title">${noteTitle.value}</p>
        <button class="note-del"><i class="fa fa-trash"></i></button>
      </div>
      ${noteText.value}
    </div>`
  );

  localStorage.setItem(noteTitle.value, [date.value, noteText.value]);

  date.value = "";
  noteTitle.value = "";
  noteText.value = "";

  document.querySelector(".note-close").click();
});
//#endregion

//#region Удаление записи
document.querySelector(".notes").addEventListener("click", function (e) {
  if (e.target.className != "note-del") return;

  let note = e.target.closest(".note");

  let head = e.target.closest(".note__header").children;

  note.remove();

  localStorage.removeItem(head[1].innerText);
});
//#endregion

//#region добавление новых дел
let caseColumn;
let caseTitle;
document.querySelector(".case-row").addEventListener("click", function (e) {
  if (e.target.className != "btn-plus btn-primary") return;

  caseColumn = e.target.closest(".case__column");

  caseTitle = e.target.closest(".case__column").children;
});

document.querySelector(".addCase").addEventListener("click", function () {
  let caseText = document.querySelector("#case-text");

  if (caseText.value === "") {
    errorMessage[1].textContent = "Заполните поле!";

    errorMessage[1].style.opacity = 1;

    setTimeout(() => (errorMessage[1].style.opacity = 0), 2000);
    setTimeout(() => (errorMessage[1].textContent = ""), 3000);

    return;
  }

  caseColumn.insertAdjacentHTML(
    "beforeend",
    `<div class="col case__item">
      ${caseText.value} <button
      type="button"
      class="btn-minus btn-primary"
    >
      <i class="fa fa-minus"></i>
    </button>
      </div>`
  );

  localStorage.setItem(caseText.value, caseTitle[0].innerText);

  caseText.value = "";

  document.querySelector(".case-close").click();
});
//#endregion

//#region Удаление дел
document.querySelector(".case-row").addEventListener("click", function (e) {
  if (e.target.className != "btn-minus btn-primary") return;

  let caseItem = e.target.closest(".case__item");
  let innerText = e.target.closest(".case__item").innerText;

  caseItem.remove();

  localStorage.removeItem(innerText);
});
//#endregion

// Вывод данных
function update() {
  Object.keys(localStorage).forEach((key) => {
    let values = localStorage.getItem(key).split(",");

    if (values.length == 2) {
      document.querySelector(".notes").insertAdjacentHTML(
        "beforeend",
        `<div class="col note">
      <div class="note__header">
        <p class="note__data">${values[0]}</p>
        <p class="h5 note__title">${key}</p>
        <button class="note-del"><i class="fa fa-trash"></i></button>
      </div>
      ${values[1]}
    </div>`
      );
    } else {
      let caseRow = document.querySelector(".case-row").children;

      Array.from(caseRow).forEach((el) => {
        let innerText = String(el.innerText).split("\n");

        if (innerText[0] == localStorage.getItem(key)) {
          el.insertAdjacentHTML(
            "beforeend",
            `<div class="col case__item">
              ${key} <button
              type="button"
              class="btn-minus btn-primary"
            >
              <i class="fa fa-minus"></i>
            </button>
              </div>`
          );
        }
      });
    }
  });
}
