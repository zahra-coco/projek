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

const cards = document.querySelectorAll(".ttc-card");
const arrows = document.querySelectorAll(".arrow");

/* gabungkan urutan: card → arrow → card → arrow */
const sequence = [];

cards.forEach((card, i) => {
  sequence.push(card);
  if (arrows[i]) sequence.push(arrows[i]);
});

const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        sequence.forEach((el, i) => {
          setTimeout(() => {
            el.classList.add("show");
          }, i * 350); // ⬅️ kecepatan muncul satu-satu
        });

        obs.disconnect(); // biar cuma sekali animasi
      }
    });
  },
  { threshold: 0.3 },
);

/* target section pembungkus */
observer.observe(document.querySelector(".ttc-section"));

observer.observe(document.querySelector(".ttc-section"));

const dataProduk = {
  plastik: [
    { nama: "Keychain / Gantungan Kunci", img: "img/produk-plastik1.png" },
    { nama: "Ecobrick Meja", img: "img/produk-plastik2.png" },
    {
      nama: "Ecobrick Fondasi Tempat Menanam",
      img: "img/produk-plastik3.png",
    },
    { nama: "Tempat Minuman", img: "img/produk-plastik4.png" },
    { nama: "Hiasan Meja", img: "img/produk-plastik5.png" },
    { nama: "Vas Bunga", img: "img/produk-plastik6.png" },
  ],
  kertas: [
    { nama: "Kertas Daur Ulang ", img: "img/produk-kertas1.png" },
    { nama: "Buku Catatan", img: "img/produk-kertas2.png" },
    { nama: "Topeng dari Bubur Kertas", img: "img/produk-kertas3.png" },
    { nama: "Kertas Lukis", img: "img/produk-kertas4.png" },
  ],
  kaleng: [
    { nama: "Tempat Pensil", img: "img/produk-kaleng1.png" },
    { nama: "Hiasan Dinding", img: "img/produk-kaleng2.png" },
    { nama: "Miniatur Kendaraan", img: "img/produk-kaleng3.png" },
    { nama: "Tempat Lilin", img: "img/produk-kaleng4.png" },
  ],
  organik: [
    { nama: "Kompos Padat", img: "img/produk-organik1.png" },
    { nama: "Pupuk Cair Organik", img: "img/produk-organik2.png" },
    { nama: "Mulsa Daun Kering", img: "img/produk-organik3.png" },
    { nama: "Lilin Aroma Terapi", img: "img/produk-organik4.png" },
    { nama: "Media Tanam Jamur", img: "img/produk-organik5.png" },
    { nama: "Briket Bioarang", img: "img/produk-organik6.png" },
  ],
};

const modal = document.getElementById("modal");
const modalSub = document.getElementById("modalSub");
const produkGrid = document.getElementById("produkGrid");

document.querySelectorAll(".card-sampah").forEach((card) => {
  card.addEventListener("click", () => {
    const jenis = card.dataset.jenis;
    modal.classList.add("active");
    modalSub.textContent =
      "Sampah " + jenis.charAt(0).toUpperCase() + jenis.slice(1);

    produkGrid.innerHTML = "";
    dataProduk[jenis].forEach((item) => {
      const el = document.createElement("div");
      el.className = "produk-card";
      el.innerHTML = `
            <img src="${item.img}" alt="produk">
            <p>${item.nama}</p>
          `;
      produkGrid.appendChild(el);
    });
  });
});

document.getElementById("closeModal").onclick = () => {
  modal.classList.remove("active");
};

modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.remove("active");
});
