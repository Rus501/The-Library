const addBook = document.querySelector('.plus_btn')
const body = document.querySelector('body')
const modal = document.querySelector('.modal')
const modalWindow = document.querySelector('.modal_window')
const modalClose = document.querySelector('.modal_close')
const modalSubmit = document.querySelector('input[submit]')
const bookShelf = document.querySelector('.book_shelf')
const bookExample = document.querySelector('.book')
const bookName = document.querySelector('input[name="name"]')
const bookAuthor = document.querySelector('input[name="author"]')
const bookPages = document.querySelector('input[name="pages"]')
const bookRead = document.querySelector('input[name="read"]')
let removeButtons = document.querySelectorAll('.book_remove')
let readButtons = document.querySelectorAll('.book_read_btn')
let data = 0

function openModal() {
  body.style.backgroundColor = 'rgba(0, 0, 0, 0.9)'
  body.style.overflow = 'hidden'
  modal.style.visibility = 'visible'
  // bookName.focus()
  modal.addEventListener('click', checkClick)
}
addBook.addEventListener('click', openModal)

function closeModal() {
  body.style.backgroundColor = 'rgba(0, 0, 0, 0)'
  body.style.overflow = 'visible'
  modal.style.visibility = 'hidden'
  modal.removeEventListener('click', checkClick)
}
modalClose.addEventListener('click', closeModal)

function checkClick(event) {
  if (!modalWindow.contains(event.target)) closeModal()
}

let myLibrary = [
  {
    // default book
    title: 'Lord Of The Rings',
    author: 'J.R.R. Tolkien',
    pages: 479,
    read: true,
  },
]

class Book {
  constructor(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
  }
}

function addBookToLibrary() {
  const book = new Book(
    bookName.value,
    bookAuthor.value,
    bookPages.value,
    bookRead.checked
  )
  const newBook = bookExample.cloneNode(true)
  newBook.setAttribute('data', data)
  newBook.querySelector('.book_name').innerHTML = book.title
  newBook.querySelector('.book_author').innerHTML = `By ${book.author}`
  newBook.querySelector('.book_pages').innerHTML = `Pages: ${book.pages}`
  newBook.querySelector('.book_read').innerHTML = `Read: ${
    book.read ? 'Yes' : 'No'
  }`
  newBook.querySelector('.book_read_btn').innerHTML = book.read
    ? 'Unread'
    : 'Read'
  newBook.style.display = 'flex'
  myLibrary.push(book)
  myLibrary.forEach((item) => {
    item.data = item.data ?? data++
  })
  bookShelf.appendChild(newBook)
  removeButtons = document.querySelectorAll('.book_remove')
  readButtons = document.querySelectorAll('.book_read_btn')
  removeBook() // redefine all remove buttons
  readBook() // redefine all read buttons
  closeModal()
  saveLocally()
  document.querySelector('form').reset()
}

function removeBook() {
  removeButtons.forEach((item) => {
    item.onclick = function () {
      let currentBook = this.parentNode.parentNode
      currentBook.remove()
      for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].data === parseInt(currentBook.getAttribute('data'))) {
          myLibrary.splice(i, 1)
        }
      }
      saveLocally()
    }
  })
}
removeBook()

function readBook() {
  readButtons.forEach((item) => {
    item.onclick = function () {
      for (let i = 0; i < myLibrary.length; i++) {
        if (
          myLibrary[i].data ===
          parseInt(this.parentNode.parentNode.getAttribute('data'))
        ) {
          this.innerHTML === 'Unread'
            ? (myLibrary[i].read = false)
            : (myLibrary[i].read = true)
        }
      }
      if (this.innerHTML === 'Unread') {
        this.innerHTML = 'Read'
        this.parentNode.parentNode.querySelector('.book_read').innerHTML =
          'Read: No'
      } else {
        this.innerHTML = 'Unread'
        this.parentNode.parentNode.querySelector('.book_read').innerHTML =
          'Read: Yes'
      }
      saveLocally()
    }
  })
}
readBook()

// Local Storage
function saveLocally() {
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary))
}

function restoreLocally() {
  myLibrary = JSON.parse(localStorage.getItem('myLibrary'))
  if (myLibrary === null)
    myLibrary = [
      {
        title: 'Lord Of The Rings',
        author: 'J.R.R. Tolkien',
        pages: 479,
        read: true,
        data: 0,
      },
    ]
  if (myLibrary.length > 0) {
    data = myLibrary[myLibrary.length - 1].data + 1
  } else {
    data = 0
  }
  myLibrary.forEach((item) => {
    const newBook = bookExample.cloneNode(true)
    newBook.setAttribute('data', item.data)
    newBook.querySelector('.book_name').innerHTML = item.title
    newBook.querySelector('.book_author').innerHTML = `By ${item.author}`
    newBook.querySelector('.book_pages').innerHTML = `Pages: ${item.pages}`
    newBook.querySelector('.book_read').innerHTML = `Read: ${
      item.read ? 'Yes' : 'No'
    }`
    newBook.querySelector('.book_read_btn').innerHTML = item.read
      ? 'Unread'
      : 'Read'
    newBook.style.display = 'flex'
    myLibrary.forEach((item) => {
      item.data = item.data ?? data++
    })
    bookShelf.appendChild(newBook)
    removeButtons = document.querySelectorAll('.book_remove')
    readButtons = document.querySelectorAll('.book_read_btn')
    removeBook() // redefine all remove buttons
    readBook() // redefine all read buttons
    closeModal()
  })
}
// localStorage.clear()
restoreLocally()
