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
// CoinGecko API URL for fetching cryptocurrency data
const apiUrl = "https://api.coingecko.com/api/v3/coins/markets";

// DOM element for the ticker
const tickerContent = document.getElementById("ticker-content");

// Adjustable per_page and page variables
const perPage = 10; // Number of cryptos to display at a time
let currentPage = 1; // Tracks the current page

// Function to fetch crypto data for a specific page with images
async function fetchCryptoData(page, perPage) {
  try {
    // Calculate offset based on page number
    const offset = (page - 1) * perPage;

    // Fetch data from CoinGecko API
    const response = await fetch(
      `${apiUrl}?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=${page}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Generate ticker items from data
    const formattedData = data
      .map((coin) => {
        const price = parseFloat(coin.current_price).toFixed(2);
        const change24h = parseFloat(coin.price_change_percentage_24h).toFixed(
          2
        );
        const changeColor = change24h >= 0 ? "green" : "red";
        return `
        <span>
          <img src="${coin.image}" alt="${
          coin.name
        }" style="width: 20px; height: 20px; margin-right: 10px; vertical-align: middle;">
          ${coin.name} (${coin.symbol.toUpperCase()}): $${price} 
          <span style="color:${changeColor}">(${change24h}%)</span>
        </span>
      `;
      })
      .join("");

    // Update ticker content with images
    tickerContent.innerHTML = formattedData + formattedData; // Duplicate for seamless scrolling
  } catch (error) {
    console.error("Error fetching crypto data:", error);
    tickerContent.innerHTML = "<span>Error loading crypto data</span>";
  }
}

// Function to handle periodic updates and cycling through pages
function startTicker() {
  fetchCryptoData(currentPage, perPage);

  // Move to the next page every 10 seconds
  setInterval(() => {
    currentPage++;
    fetchCryptoData(currentPage, perPage);
  }, 100000); // 10 seconds for each page
}

// Start the ticker
startTicker();
