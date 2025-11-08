let books = JSON.parse(localStorage.getItem("books") || "[]");

function saveBook(event) {
  event.preventDefault();
  const title = titleInput.value;
  const author = authorInput.value;
  const price = Number(priceInput.value);
  const quantity = Number(quantityInput.value);
  const index = editIndex.value;

  if (index) {
    books[index] = { title, author, price, quantity };
  } else {
    books.push({ title, author, price, quantity });
  }

  localStorage.setItem("books", JSON.stringify(books));
  document.getElementById("bookForm").reset();
  editIndex.value = "";
  renderBooks();
  renderInventory();
  renderSelectBooks();
}

function renderBooks() {
  const tbody = document.querySelector("#bookTable tbody");
  tbody.innerHTML = "";
  books.forEach((b, i) => {
    const row = `<tr>
      <td>${i + 1}</td>
      <td>${b.title}</td>
      <td>${b.author}</td>
      <td>${b.price.toLocaleString("vi-VN")}</td>
      <td>${b.quantity}</td>
      <td>
        <button onclick="editBook(${i})">Sửa</button>
        <button onclick="deleteBook(${i})">Xóa</button>
      </td>
    </tr>`;
    tbody.innerHTML += row;
  });
}

function editBook(i) {
  const b = books[i];
  titleInput.value = b.title;
  authorInput.value = b.author;
  priceInput.value = b.price;
  quantityInput.value = b.quantity;
  editIndex.value = i;
}

function deleteBook(i) {
  if (confirm("Xóa sách này?")) {
    books.splice(i, 1);
    localStorage.setItem("books", JSON.stringify(books));
    renderBooks();
    renderInventory();
    renderSelectBooks();
  }
}