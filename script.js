"use strict";
// Elements
const openModal = document.querySelector(".btn-open");
const modal = document.querySelector(".modal");
const form = document.getElementById("modal-form");
const container = document.querySelector(".card-wrapper");

const myLibrary = new Library([]);

// Library object
function Library() {
    this.books = [];
}

Library.prototype.addBookToLibrary = function (title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    this.books.push(book);
    book.displayBook();
};

Library.prototype.removeBook = function (index, card) {
    this.books.splice(this.books[index], 1);
    container.removeChild(card);
};

Library.prototype.handleForm = function (event) {
    event.preventDefault();
    // Form Inputs
    const title = document.getElementById("title");
    const author = document.getElementById("author");
    const pages = document.getElementById("pages");
    const read = document.getElementById("read");

    this.addBookToLibrary(title.value, author.value, pages.value, read.checked);

    modal.close();
    form.reset();
};

// Book Object
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.displayBook = function () {
    // Main card container
    const card = this.addElement("div", container, "card");
    const cardInfo = this.addElement("div", card, "card-info");
    const bookTitle = this.addElement("h4", cardInfo, "book-title");
    const author = this.addElement("p", cardInfo, "author");
    const pages = this.addElement("p", cardInfo, "pages");
    const cardActionBtns = this.addElement("div", card, "card-action-btns");
    const btnStatus = this.addElement(
        "button",
        cardActionBtns,
        "btn",
        "btn-status"
    );
    const btnRemove = this.addElement(
        "button",
        cardActionBtns,
        "btn",
        "btn-remove"
    );
    const cardStatus = this.addElement("div", card, "card-status");
    const status = this.addElement("h3", cardStatus);

    this.addContent(bookTitle, this.title);
    this.addContent(author, this.author);
    this.addContent(pages, `Pages: ${this.pages}`);
    this.addContent(btnStatus, this.read ? "Read" : "Not Read");
    this.addContent(btnRemove, "Remove");
    this.addContent(status, this.read ? "Completed" : "In progress");

    card.dataset.index = myLibrary.books.indexOf(this);

    return this;
};

Book.prototype.toggleReadStatus = function (btn, status) {
    this.read = !this.read;
    this.addContent(btn, this.read ? "Read" : "Not Read");
    this.addContent(status, this.read ? "Completed" : "In progress");
};

Book.prototype.addElement = function (elementName, addTo, ...classes) {
    const element = document.createElement(elementName);

    addTo.appendChild(element);
    element.classList.add(...classes);

    return element;
};

Book.prototype.addContent = function (element, content) {
    element.textContent = content;
};

// event listeners
openModal.addEventListener("click", () => {
    modal.showModal();
});
form.addEventListener("submit", (event) => {
    myLibrary.handleForm(event);
});

container.addEventListener("click", (event) => {
    const card = event.target.closest(".card");

    if (card) {
        const index = card.dataset.index;

        if (event.target.classList.contains("btn-remove")) {
            myLibrary.removeBook(index, card);
        }

        if (event.target.classList.contains("btn-status")) {
            const btn = event.target;
            const status = card.querySelector(".card-status h3");

            myLibrary.books[index].toggleReadStatus(btn, status);
        }
    }
});

myLibrary.addBookToLibrary("The Hobbit", "J.R.Tolkien", 500, true); // Mock data
