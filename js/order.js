let orders = JSON.parse(localStorage.getItem("orders") || "[]");

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
      <td>${o.total.toLocaleString("vi-VN")}</td>
      <td>${o.date}</td>
    </tr>`;
    tbody.innerHTML += row;
  });
}