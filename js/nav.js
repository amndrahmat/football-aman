document.addEventListener("DOMContentLoaded", function () {
  // Activate sidebar nav ( mengaktifkan elemen sidebar bawaan framework Materialize agar dapat muncul saat burger menu diklik)
  const elems = document.querySelectorAll(".sidenav");
  M.Sidenav.init(elems);
  loadNav();

  // berisi kode AJAX menggunakan method XMLHttpRequest untuk mengambil isi dari berkas nav.html dan menyimpannya ke dalam elemen menu .topnav dan .sidenav.
  function loadNav() {
    const http = new XMLHttpRequest();
    http.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status !== 200) return;

        // Muat daftar tautan menu
        document.querySelectorAll(".topnav, .sidenav").forEach(function (elm) {
          elm.innerHTML = http.responseText;
        });

        // Daftarkan event listener untuk setiap tautan menu
        document
          .querySelectorAll(".sidenav a, .topnav a")
          .forEach(function (elm) {
            elm.addEventListener("click", function (event) {
              // Tutup sidenav
              const sidenav = document.querySelector(".sidenav");
              M.Sidenav.getInstance(sidenav).close();

              // Muat konten halaman yang dipanggil
              page = event.target.getAttribute("href").substr(1);
              loadPage(page);
            });
          });
      }
    };

    http.open("GET", "pages/nav.html", true);
    http.send();
  }
});

// Load page content

let page = window.location.hash.substr(1);
//   Misalnya kita buka url http://127.0.0.1:8887/#contact berarti kita mengakses halaman contact.
// Bila hash tidak ditemukan berarti halaman default yakni home yang akan ditampilkan.
if (page === "") page = "home";
loadPage(page);

function loadPage(page) {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4) {
      const content = document.querySelector("#body-content");
      if (page === "home") {
        loadContent();
      } else if (page === "teams") {
        loadTeam();
      } else if (page === "favorite") {
        getFavoriteTeam();
      }
      if (this.status === 200) {
        content.innerHTML = xhttp.responseText;
        console.log(content.innerHTML);
      } else if (this.status === 404) {
        content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
      } else {
        content.innerHTML = "<p>Ups... halaman tidak dapat diakses.</p>";
      }
    }
  };

  xhttp.open("GET", "pages/" + page + ".html", true);
  xhttp.send();
}
