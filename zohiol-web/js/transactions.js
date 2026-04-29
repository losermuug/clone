document.addEventListener("DOMContentLoaded", () => {
  initTransactionsPage();
});

const transactions = [
  { id:"#1001", plan:"1 сар", date:"2026-04-16", status:"success", amount:5000 },
  { id:"#1002", plan:"3 сар", date:"2026-03-20", status:"success", amount:12000 },
  { id:"#1003", plan:"12 сар", date:"2026-02-10", status:"pending", amount:40000 },
  { id:"#1004", plan:"1 сар", date:"2026-01-05", status:"failed", amount:5000 }
];

function initTransactionsPage(){
  const user = localStorage.getItem("user");
  const heroName = document.getElementById("txHeroName");

  if (user && heroName) {
    heroName.textContent = user;
  }

  renderTable();
}

function renderTable(){
  const tbody = document.getElementById("tableBody");
  if (!tbody) return;

  tbody.innerHTML = "";

  transactions.forEach(t => {

    let statusText = "";
    let color = "";

    if(t.status === "success"){
      statusText = "Амжилттай";
      color = "success";
    } else if(t.status === "pending"){
      statusText = "Хүлээгдэж байна";
      color = "pending";
    } else {
      statusText = "Амжилтгүй";
      color = "failed";
    }

    const row = document.createElement("tr");
    row.className = "transaction-row";

    row.innerHTML = `
      <td>${t.id}</td>
      <td>${t.plan}</td>
      <td>${t.date}</td>
      <td class="status ${color}">${statusText}</td>
      <td class="amount">${t.amount.toLocaleString()}₮</td>
    `;

    tbody.appendChild(row);
  });
}