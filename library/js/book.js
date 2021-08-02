let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(book) {
    console.log("add book to Library");
    myLibrary.push(book);
    update_table();
}

const book1 = new Book("Hobbit", "Toklein", "295", "yes");
addBookToLibrary(book1);

const book2 = new Book("LOTR1", "Toklein", "700", "yes");
addBookToLibrary(book2);

const book3 = new Book("LOTR2", "Toklein", "650", "no");
addBookToLibrary(book3);

function createTable(){
    let body = document.body;
    let tbl = document.createElement('table');
    tbl.setAttribute("id", "book table");
    tbl.style.width = "100px";
    tbl.style.border = "1px solid black";

    let header = tbl.createTHead();
    let row = header.insertRow();
    for (let key in myLibrary[0]) {
        let th = row.insertCell();
        th.appendChild(document.createTextNode(key));
        th.style.border = "1px solid black";
    }

    let th = row.insertCell();
    th.appendChild(document.createTextNode("Delete"));
    th.style.border = "1px solid black";

    for (let i = 0; i < myLibrary.length; i++) {
        let tr = tbl.insertRow();
        for (let key in myLibrary[i]) {
            let td = tr.insertCell();
            td.appendChild(document.createTextNode(myLibrary[i][key]));
            td.style.border = "1px solid black";

            if (key === "read") {
                let update_button = document.createElement("button");
                update_button.setAttribute("id", i);
                update_button.innerHTML = "change";
                update_button.addEventListener("click", function() {
                    update_read_value(update_button.id);
                })
                td.appendChild(update_button);
            }
        }
        let td = tr.insertCell();
        let delete_button = document.createElement("button");
        delete_button.setAttribute("id", i);
        delete_button.innerHTML = "Delete";
        delete_button.addEventListener("click", function() {
            delete_book(delete_button.id);
        })
        td.appendChild(delete_button);
        td.style.border = "1px solid black";
    }
    body.appendChild(tbl);

}

function addBookButton() {
    let button = document.createElement("button");
    button.innerHTML = "Add Books";
    let body = document.body;
    body.appendChild(button);

    button.addEventListener("click", function() {
        addBookForm();
        console.log("added book");
        button.remove();
    })
}

function addBookForm() {
    let body = document.body;
    for (let key in myLibrary[0]) {
        let label_text = document.createTextNode(key);
        let label = document.createElement("div");
        label.appendChild(label_text);
        label.setAttribute("id", "label, " + key);
        let input_field = document.createElement("INPUT");
        input_field.setAttribute("type", "text");
        input_field.setAttribute("id", key);
        body.appendChild(label);
        body.appendChild(input_field);
    }
    let button = document.createElement("button");
    button.innerHTML = "Submit";
    body.appendChild(button);

    button.addEventListener("click", function() {
        submitBookForm();
        button.remove();
        for (let key in myLibrary[0]) {
            let field = document.getElementById(key);
            field.remove();
            let label = document.getElementById("label, " + key);
            label.remove();
        }
        addBookButton();
    })
}

function submitBookForm() {
    let new_book_vals = []
    for (let key in myLibrary[0]) {
        let input = document.getElementById(key).value;
        new_book_vals.push(input);
    }
    let new_book = new Book(new_book_vals[0], new_book_vals[1], new_book_vals[2], new_book_vals[3]);
    addBookToLibrary(new_book);
}

function delete_book(id) {
    myLibrary.splice(id,1);
    update_table();
}

function update_read_value(id) {
    if (myLibrary[id].read === "yes") {
        myLibrary[id].read = "no";
    } else {
        myLibrary[id].read = "yes";
    }
    update_table();
}

function update_table() {
    let table = document.getElementById("book table");
    if (table) {
        table.remove();
    }
    createTable();
}

addBookButton();