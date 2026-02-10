const navItems = document.querySelectorAll(".nav-item");
const indicator = document.querySelector(".nav-indicator");

function moveIndicator(el) {
  const rect = el.getBoundingClientRect();
  const parentRect = el.parentElement.getBoundingClientRect();

  indicator.style.width = rect.width + "px";
  indicator.style.left = rect.left - parentRect.left + "px";
}

window.addEventListener("load", () => {
  const active = document.querySelector(".nav-item.active");
  if (active) moveIndicator(active);
});

window.addEventListener("resize", () => {
  const active = document.querySelector(".nav-item.active");
  if (active) moveIndicator(active);
});

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navItems.forEach((i) => i.classList.remove("active"));
    item.classList.add("active");
    moveIndicator(item);
  });
});

const links = document.querySelectorAll(".nav-link");

function moveIndicator(el) {
  indicator.style.width = el.offsetWidth + "px";
  indicator.style.left = el.offsetLeft + "px";
}

links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    links.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
    moveIndicator(link);
  });
});

// posisi awal
window.onload = () => {
  moveIndicator(document.querySelector(".nav-link.active"));
};

document.addEventListener("DOMContentLoaded", function () {
  const reveals = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        } else {
          entry.target.classList.remove("active");
        }
      });
    },
    { threshold: 0.15 },
  );

  reveals.forEach(function (el) {
    observer.observe(el);
  });
});

// tombol scroll
document.getElementById("btnMulaiAksi").addEventListener("click", function () {
  document.getElementById("aksi-kecil").scrollIntoView({
    behavior: "smooth",
  });
});

reveals.forEach((el) => observer.observe(el));

function toggleDone(btn) {
  // kalau sudah done, STOP (biar tidak balik)
  if (btn.classList.contains("done")) {
    return;
  }

  // tandai sebagai sudah dilakukan
  btn.classList.add("done");
  btn.innerHTML = "✓ Sudah Dilakukan";

  // opsional: biar benar-benar tidak bisa diklik lagi
  btn.disabled = true;
}
