function renderReport() {
  document.getElementById("totalOrders").textContent = orders.length;
  const revenue = orders.reduce((sum, o) => sum + o.total, 0);
  document.getElementById("totalRevenue").textContent = revenue.toLocaleString("vi-VN");
}