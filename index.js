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

document.addEventListener("DOMContentLoaded", function () {
  new Splide("#paragraph-slider", {
    type: "loop",
    perPage: 1,
    autoplay: true,
    pauseOnHover: true,
    pagination: false,
    arrows: false,
    speed: 100,
    interval: 8000,
    drag: false,
  }).mount();
});

// Count-up animation for statistics
function countUp() {
  const counters = document.querySelectorAll(".counter");
  counters.forEach((counter) => {
    const target = +counter.getAttribute("data-target");
    let count = 0;
    const speed = 500; // Adjust speed for counting (lower is faster)
    const increment = target / speed;

    const updateCounter = () => {
      if (count < target) {
        count += increment;
        counter.textContent = Math.floor(count);
        setTimeout(updateCounter, 1);
      } else {
        counter.textContent = target;
        // Restart counting after reaching the target
        setTimeout(() => {
          counter.textContent = 0; // Reset the number
          count = 0; // Reset the count
          updateCounter(); // Start counting again
        }, 19000); // Delay before restarting (1 second)
      }
    };
    updateCounter();
  });
}

// Start counting when the page loads and then continuously recount
window.onload = function () {
  countUp();
  setInterval(countUp, 7000); // Recount every 3 seconds (adjust as needed)
};
