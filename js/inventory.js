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
}function renderInventory() {
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