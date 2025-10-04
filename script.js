async function loadShop() {
  // Replace this with your own Google Sheet published CSV URL
  const sheetURL = "YOUR_GOOGLE_SHEET_PUBLISHED_CSV_URL";  

  const response = await fetch(sheetURL);
  const data = await response.text();

  const rows = data.split("\n").map(r => r.split(","));
  const headers = rows.shift();

  const shopDiv = document.getElementById("shop");

  rows.forEach(row => {
    let item = {};
    headers.forEach((h, i) => item[h.trim()] = row[i]);

    if (!item.Name) return;

    // Create card
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">
          <img src="${item.ImageURL}" alt="${item.Name}">
          <h2>${item.Name}</h2>
        </div>
        <div class="card-back">
          <h3>${item.Name}</h3>
          <p>${item.Description}</p>
          <p><strong>Price:</strong> $${item.Price}</p>
          <p><strong>Stock:</strong> ${item.Stock}</p>
        </div>
      </div>
    `;

    // Flip on click
    card.addEventListener("click", () => {
      card.classList.toggle("flip");
    });

    shopDiv.appendChild(card);
  });
}

loadShop();
