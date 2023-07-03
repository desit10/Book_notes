"use strict";

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

  note.remove();
});
//#endregion

//#region добавление новых дел
let caseColumn;
document.querySelector(".aaa").addEventListener("click", function (e) {
  if (e.target.className != "btn btn-primary plus") return;

  caseColumn = e.target.closest(".case__column");
});

document.querySelector(".addCase").addEventListener("click", function () {
  let caseText = document.querySelector("#case-text");

  caseColumn.insertAdjacentHTML(
    "beforeend",
    `<div class="col case__item">
      ${caseText.value} <button
      type="button"
      class="btn btn-primary minus"
    >
      <i class="fa fa-minus"></i>
    </button>
      </div>`
  );

  caseText.value = "";

  document.querySelector(".case-close").click();
});
//#endregion

//#region Удаление дел
document.querySelector(".aaa").addEventListener("click", function (e) {
  if (e.target.className != "btn btn-primary minus") return;

  let caseItem = e.target.closest(".case__item");

  caseItem.remove();
});
//#endregion
