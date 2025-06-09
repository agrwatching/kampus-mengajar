//footer
fetch("footer.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("footer").innerHTML = data;
  });
//footer tutup

//arrow
function handleHover(el) {
  const img = el.querySelector(".arrow-img");
  img.classList.remove("animate-leave");
  img.classList.add("animate-hover");
}

function handleLeave(el) {
  const img = el.querySelector(".arrow-img");
  img.classList.remove("animate-hover");
  img.classList.add("animate-leave");
}
document.addEventListener("click", function (e) {
  const link = e.target.closest('a[href="#next-section"]');
  if (!link) return;

  e.preventDefault();
  const target = document.querySelector("#next-section");
  if (target) {
    target.scrollIntoView({ behavior: "smooth" });
  }
});
//tutuparrow
