document.addEventListener("DOMContentLoaded", () => {
  const endpoint = "http://127.0.0.1:5000/api/messages";

  const tableBody = document.querySelector("#messages-table tbody");
  const searchInput = document.getElementById("search");
  const dateFromInput = document.getElementById("date-from");
  const dateToInput = document.getElementById("date-to");

  const totalReceivedEl = document.querySelector("#total-received p");
  const totalSentEl = document.querySelector("#total-sent p");
  const totalTransactionsEl = document.querySelector("#total-transactions p");

  let messages = [];

  fetch(endpoint)
    .then((res) => res.json())
    .then((data) => {
      messages = data;
      updateDashboard(messages);
      renderChart(messages);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });

  searchInput.addEventListener("input", filterAndUpdate);
  dateFromInput.addEventListener("change", filterAndUpdate);
  dateToInput.addEventListener("change", filterAndUpdate);

  function filterAndUpdate() {
    const query = searchInput.value.toLowerCase();
    const from = new Date(dateFromInput.value).getTime();
    const to = new Date(dateToInput.value).getTime();

    const filtered = messages.filter((msg) => {
      const msgDate = new Date(msg.date).getTime();
      return (
        (!isNaN(from) ? msgDate >= from : true) &&
        (!isNaN(to) ? msgDate <= to : true) &&
        (msg.sender_or_receiver.toLowerCase().includes(query) ||
          msg.extracted_amount.toLowerCase().includes(query) ||
          msg.transaction_type.toLowerCase().includes(query) ||
          msg.body.toLowerCase().includes(query))
      );
    });
    updateDashboard(filtered);
    renderChart(filtered);
  }

  function updateDashboard(data) {
    tableBody.innerHTML = "";

    let totalReceived = 0;
    let totalSent = 0;

    data.forEach((msg) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${msg.readable_date}</td>
        <td>${capitalize(msg.transaction_type)}</td>
        <td>${msg.sender_or_receiver}</td>
        <td>${parseFloat(msg.extracted_amount).toLocaleString()} RWF</td>
        <td>${extractBalance(msg.body)}</td>
        <td>${truncateText(msg.body, 60)}</td>
      `;

      tableBody.appendChild(row);

      if (msg.transaction_type === "received") {
        totalReceived += parseFloat(msg.extracted_amount);
      } else if (msg.transaction_type === "sent") {
        totalSent += parseFloat(msg.extracted_amount);
      }
    });

    totalReceivedEl.textContent = `${totalReceived.toLocaleString()} RWF`;
    totalSentEl.textContent = `${totalSent.toLocaleString()} RWF`;
    totalTransactionsEl.textContent = data.length;
  }

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function extractBalance(text) {
    const match = text.match(/balance:([\d,]+\s*RWF)/i);
    return match ? match[1] : "N/A";
  }

  function truncateText(str, len) {
    return str.length > len ? str.substring(0, len) + "..." : str;
  }

  function renderChart(data) {
    const canvas = document.getElementById("chart");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const received = data.filter(m => m.transaction_type === "received").length;
    const sent = data.filter(m => m.transaction_type === "sent").length;
    const other = data.length - received - sent;

    const total = received + sent + other;
    const angles = [received, sent, other].map(c => (c / total) * 2 * Math.PI);
    const colors = ["#28a745", "#dc3545", "#6c757d"];
    const labels = ["Received", "Sent", "Other"];

    let startAngle = 0;
    angles.forEach((angle, i) => {
      ctx.beginPath();
      ctx.moveTo(100, 75);
      ctx.arc(100, 75, 70, startAngle, startAngle + angle);
      ctx.closePath();
      ctx.fillStyle = colors[i];
      ctx.fill();
      startAngle += angle;
    });

    // Legend
    const legend = document.getElementById("legend");
    legend.innerHTML = "";
    labels.forEach((label, i) => {
      const item = document.createElement("div");
      item.innerHTML = `<span style="background:${colors[i]};width:10px;height:10px;display:inline-block;margin-right:5px;"></span> ${label}`;
      legend.appendChild(item);
    });
  }
});
