export const sections = document.querySelectorAll("section");

export function tabs() {
  document.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", (e) => {
      sections.forEach((el) => {
        if (el.dataset.bartender === link.dataset.bartender) {
          el.classList.remove("hidden");
        } else {
          el.classList.add("hidden");
        }
      });
    });
  });
}
