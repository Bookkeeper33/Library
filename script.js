"use strict";

// Library object
class Library {
    books = [];
    #openModal = document.querySelector(".btn-open");
    #modal = document.querySelector(".modal");
    #form = document.getElementById("modal-form");
    #container = document.querySelector(".card-wrapper");

    constructor() {
        this.#initEventListeners();
    }

    addBookToLibrary(title, author, pages, read) {
        const book = new Book(title, author, pages, read);
        this.books.push(book);
        book.displayBook(this.#container);
    }

    #removeBook(index, card) {
        this.books.splice(this.books[index], 1);
        this.#container.removeChild(card);
    }

    #handleForm = (event) => {
        event.preventDefault();
        // Form Inputs
        const title = document.getElementById("title");
        const author = document.getElementById("author");
        const pages = document.getElementById("pages");
        const read = document.getElementById("read");

        this.addBookToLibrary(
            title.value,
            author.value,
            pages.value,
            read.checked
        );

        this.#modal.close();
        this.#form.reset();
    };

    #onOpenModal = () => {
        this.#modal.showModal();
        this.#openModal.classList.add("active");
    };

    #onCloseModal = (event) => {
        if (event.target === this.#modal) {
            this.#modal.close();
            this.#openModal.classList.remove("active");
        }
    };

    #onUpdateCard = (event) => {
        const card = event.target.closest(".card");

        if (card) {
            const index = card.dataset.index;

            if (event.target.classList.contains("btn-remove")) {
                this.#removeBook(index, card);
            }

            if (event.target.classList.contains("btn-status")) {
                const btn = event.target;
                const status = card.querySelector(".card-status h3");

                this.books[index].toggleReadStatus(btn, status);
            }
        }
    };

    #initEventListeners() {
        this.#openModal.addEventListener("click", this.#onOpenModal);
        this.#modal.addEventListener("click", this.#onCloseModal);
        this.#form.addEventListener("submit", this.#handleForm);
        this.#container.addEventListener("click", this.#onUpdateCard);
    }
}

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    displayBook(container) {
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
    }

    toggleReadStatus(btn, status) {
        this.read = !this.read;
        this.addContent(btn, this.read ? "Read" : "Not Read");
        this.addContent(status, this.read ? "Completed" : "In progress");
    }

    addElement(elementName, addTo, ...classes) {
        const element = document.createElement(elementName);

        addTo.appendChild(element);
        element.classList.add(...classes);

        return element;
    }
    addContent(element, content) {
        element.textContent = content;
    }
}

const myLibrary = new Library();
myLibrary.addBookToLibrary("The Hobbit", "J.R.Tolkien", 500, true); // Mock data
