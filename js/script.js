let books = JSON.parse(localStorage.getItem("books") || "[]");
let orders = JSON.parse(localStorage.getItem("orders") || "[]");

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

function renderInventory() {
  const tbody = document.querySelector("#inventoryTable tbody");
  tbody.innerHTML = "";
  books.forEach(b => {
    const status = b.quantity < 5 ? "⚠ Sắp hết hàng" : "✅ Còn hàng";
    const row = `<tr>
      <td>${b.title}</td>
      <td>${b.quantity}</td>
      <td>${status}</td>
    </tr>`;
    tbody.innerHTML += row;
  });
}

function renderSelectBooks() {
  const select = document.getElementById("orderBook");
  select.innerHTML = "";
  books.forEach((b, i) => {
    select.innerHTML += `<option value="${i}">${b.title}</option>`;
  });
}

function createOrder() {
  const i = Number(document.getElementById("orderBook").value);
  const qty = Number(document.getElementById("orderQty").value);
  if (qty <= 0 || qty > books[i].quantity) {
    alert("Số lượng không hợp lệ!");
    return;
  }
  books[i].quantity -= qty;
  const total = qty * books[i].price;
  const date = new Date().toLocaleDateString("vi-VN");
  orders.push({ title: books[i].title, qty, total, date });

  localStorage.setItem("books", JSON.stringify(books));
  localStorage.setItem("orders", JSON.stringify(orders));

  renderBooks();
  renderInventory();
  renderSelectBooks();
  renderOrders();
  renderReport();
}

function renderOrders() {
  const tbody = document.querySelector("#orderTable tbody");
  tbody.innerHTML = "";
  orders.forEach((o, i) => {
    const row = `<tr>
      <td>${i + 1}</td>
      <td>${o.title}</td>
      <td>${o.qty}</td>
      <td>${o.total.toLocaleString("vi-VN")}</td