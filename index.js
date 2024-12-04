const navBar = document.getElementById("navBar");
const dropDownMenu = document.getElementById("dropdownMenu");
const closeBtn = document.getElementById("closeBtn");

navBar.addEventListener("click", () => {
  dropDownMenu.style.top = "0";
  dropDownMenu.style.opacity = "1";
  document.body.classList.add("noscroll");
});
closeBtn.addEventListener("click", () => {
  dropDownMenu.style.top = "-100%";
  dropDownMenu.style.opacity = "0";
  document.body.classList.remove("noscroll");
});
async function fetchCryptoPrices() {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_per_page=10&page=1",
    {
      method: "GET",
      headers: { Accept: "application/json" },
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: 4,
        page: 1,
      },
    }
  );
  if (response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }
  const data = await response.json();
  const tickerContent = document.querySelector(".ticker-content");
  if (!tickerContent) {
    console.error("Element with class 'ticker-content' not found in the DOM.");
    return;
  }
  tickerContent.innerHTML = "";

  data.forEach((coin) => {
    tickerContent.innerHTML += `<span>${coin.name}
    (${coin.symbol.toUpperCase()}): $${coin.current_price.toFixed(2)}
    ${
      coin.price_change_percentage_24h >= 0 ? "+" : ""
    }${coin.price_change_percentage_24h.toFixed(2)}%</span>`;
  });
}
fetchCryptoPrices();
setInterval(fetchCryptoPrices, 60000);
