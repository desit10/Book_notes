"use strict";

//#region Переменные
// Данные заметок и памяток
let data = {
  note: {
    title: [],
    text: [],
  },
  memo: {
    date: [],
    text: [],
  },
};

// Присвоение данных из локального хранилища
if (localStorage.length > 0) {
  data = JSON.parse(localStorage.getItem("data"));
  console.log(data);
  update();
}

// Выбор даты
flatpickr(".input-date", {
  locale: "ru",
  enableTime: true,
  dateFormat: "d.m.y H:i",
});

// Поле ошибки
let errorMessage = document.querySelectorAll(".error");
//#endregion

//#region Добавление новой записи
let noteBlock = document.querySelector(".notes");

document.querySelector(".addNote").addEventListener("click", function () {
  let noteTitle = document.querySelector("#note-title");

  let noteText = document.querySelector("#note-text");

  if (noteTitle.value === "" || noteText.value === "") {
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
        <p></p>
        <p class="h5 note__title">${noteTitle.value}</p>
        <button class="note-del"><i class="fa fa-trash"></i></button>
      </div>
      ${noteText.value}
    </div>`
  );

  data.note.title.push(noteTitle.value);
  data.note.text.push(noteText.value);

  localStorage.setItem("data", JSON.stringify(data));

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

  let notes = data.note.title;

  let index = notes.indexOf(head[1].innerText);
  if (index > -1) {
    notes.splice(index, 1);
    data.note.text.splice(index, 1);
  }

  localStorage.setItem("data", JSON.stringify(data));
});
//#endregion

//#region добавление новой памятки
let caseColumn;
document.querySelector(".btn-case").addEventListener("click", function () {
  caseColumn = document.querySelector(".case-row");
});

document.querySelector(".addCase").addEventListener("click", function () {
  let date = document.querySelector(".input-date");

  let caseText = document.querySelector("#case-text");

  if (date.value === "" || caseText.value === "") {
    errorMessage[1].textContent = "Заполните все поля!";

    errorMessage[1].style.opacity = 1;

    setTimeout(() => (errorMessage[1].style.opacity = 0), 2000);
    setTimeout(() => (errorMessage[1].textContent = ""), 3000);

    return;
  }

  caseColumn.insertAdjacentHTML(
    "beforeend",
    `<div class="col-xxl-3 col-xl-6 col-sm-12 mb-3 mt-3 case__column">
    <div class="col case__item ">
    <p class="memo__data">${date.value}</p>
      ${caseText.value}
      <button type="button" class="btn-minus btn-primary">
        <i class="fa fa-minus"></i>
      </button>
    </div>
  </div>`
  );

  data.memo.date.push(date.value);
  data.memo.text.push(caseText.value);

  localStorage.setItem("data", JSON.stringify(data));

  date.value = "Дата";
  caseText.value = "";

  document.querySelector(".case-close").click();
});
//#endregion

//#region Удаление памятки
document.querySelector(".case-row").addEventListener("click", function (e) {
  if (e.target.className != "btn-minus btn-primary") return;

  let caseItem = e.target.closest(".case__column");
  let innerText = e.target.closest(".case__item").children;

  console.log(caseItem);
  console.log(innerText);

  caseItem.remove();

  let memoDate = data.memo.date;

  let index = memoDate.indexOf(innerText[0].innerText);
  if (index > -1) {
    memoDate.splice(index, 1);
    data.memo.text.splice(index, 1);
  }

  localStorage.setItem("data", JSON.stringify(data));
});
//#endregion

//#region Выво данных
function update() {
  updateNote();
  updateMemo();
}

function updateNote() {
  for (let i = 0; i < data.note.title.length; i++) {
    document.querySelector(".notes").insertAdjacentHTML(
      "beforeend",
      `<div class="col note">
      <div class="note__header">
        <p></p>
        <p class="h5 note__title">${data.note.title[i]}</p>
        <button class="note-del"><i class="fa fa-trash"></i></button>
      </div>
      ${data.note.text[i]}
    </div>`
    );
  }
}

function updateMemo() {
  for (let i = 0; i < data.memo.date.length; i++) {
    document.querySelector(".case-row").insertAdjacentHTML(
      "beforeend",
      `<div class="col-xxl-3 col-xl-6 col-sm-12 mb-3 mt-3 case__column">
  <div class="col case__item ">
  <p class="memo__data">${data.memo.date[i]}</p>
  ${data.memo.text[i]}
    <button type="button" class="btn-minus btn-primary">
      <i class="fa fa-minus"></i>
    </button>
  </div>
</div>`
    );
  }
}
//#endregion
