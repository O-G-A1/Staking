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

const perPage = 10;
let currentPage = 1;

// Function to fetch and display crypto data
async function fetchCryptoData(page, perPage) {
  try {
    const offset = (page - 1) * perPage;

    const response = await fetch(
      `${apiUrl}?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=${page}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    const tickerContent = document.getElementById("ticker-content");
    if (!tickerContent) {
      console.error("Ticker content element not found");
      return;
    }

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

    tickerContent.innerHTML = formattedData + formattedData;
  } catch (error) {
    console.error("Error fetching crypto data:", error);
    const tickerContent = document.getElementById("ticker-content");
    if (tickerContent) {
      tickerContent.innerHTML = "<span>Error loading crypto data</span>";
    }
  }
}

// Function to start the ticker
function startTicker() {
  fetchCryptoData(currentPage, perPage);

  setInterval(() => {
    currentPage++;
    fetchCryptoData(currentPage, perPage);
  }, 100000);
}

// Ensure the event listener works for navigation
document.addEventListener("DOMContentLoaded", () => {
  // Attach navigation or button listeners
  const nextPageButton = document.getElementById("startEarning");
  if (nextPageButton) {
    nextPageButton.addEventListener("click", () => {
      currentPage++;
      fetchCryptoData(currentPage, perPage);
    });
  }

  // Start the ticker
  startTicker();
});

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
