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

const clickDefi = document.getElementById("Deficlick");
clickDefi.addEventListener("click", function () {
  window.location.href = "defimarketanalysis.html";
});
const clickStaking = document.getElementById("stakingclick");
clickStaking.addEventListener("click", function () {
  window.location.href = "staking.html";
});

function showSection(sectionId, clickedTab) {
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => {
    section.style.display = "none";
  });
  document.getElementById(sectionId).style.display = "block";

  document.querySelectorAll(".tab").forEach((tab) => {
    tab.classList.remove("active");
  });
  clickedTab.classList.add("active");
}
