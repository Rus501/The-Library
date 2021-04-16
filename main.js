const addBook = document.querySelector('.plus_btn')
const body = document.querySelector('body')
const modal = document.querySelector('.modal')
const closeModal = document.querySelector('.modal_close')
const modalSubmit = document.querySelector('#submit')
const bookShelf = document.querySelector('.book_shelf')
const bookExample = document.querySelector('.book')
const bookName = document.querySelector('#name')
const bookAuthor = document.querySelector('#author')
const bookPages = document.querySelector('#pages')
const bookRead = document.querySelector('#read')


function openModal() {
    body.style.backgroundColor = 'rgba(0, 0, 0, 0.9)'
    body.style.overflow = 'hidden'
    modal.style.visibility = 'visible'
}
addBook.onclick = () => openModal()

function closeModalWindow() {
    body.style.backgroundColor = 'rgba(0, 0, 0, 0)'
    body.style.overflow = 'visible'
    modal.style.visibility = 'hidden'
}
closeModal.onclick = () => closeModalWindow()

let myLibrary = []

// function loopOverMyLibrary() {
//     myLibrary.forEach(item => {
//         item =
//     })
// }

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

function addBookToLibrary() {
    const book = new Book(
        bookName.value,
        bookAuthor.value,
        bookPages.value,
        bookRead.value
    )
    myLibrary.push(book)
    const newBook = bookExample.cloneNode(true)
    newBook.querySelector('.book_name').innerHTML = book.title
    newBook.querySelector('.book_author').innerHTML = book.author
    newBook.querySelector('.book_pages').innerHTML = book.pages
    bookShelf.appendChild(newBook)
    closeModalWindow()
}

modalSubmit.onclick = () => addBookToLibrary()