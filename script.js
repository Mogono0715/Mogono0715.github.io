const year = document.querySelector("#year");
const themeToggle = document.querySelector(".theme-toggle");
const themeToggleLabel = document.querySelector(".theme-toggle__label");
const supportsFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (year) {
  year.textContent = new Date().getFullYear();
}

const getPreferredTheme = () => {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "day" || savedTheme === "night") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "night"
    : "day";
};

const setTheme = (theme) => {
  const isNight = theme === "night";

  document.documentElement.dataset.theme = theme;
  localStorage.setItem("theme", theme);

  if (themeToggle) {
    themeToggle.setAttribute("aria-pressed", String(isNight));
    themeToggle.setAttribute(
      "aria-label",
      isNight ? "切換成白天亮色模式" : "切換成夜晚暗色模式",
    );
  }

  if (themeToggleLabel) {
    themeToggleLabel.textContent = isNight ? "夜晚" : "白天";
  }
};

setTheme(getPreferredTheme());

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme =
      document.documentElement.dataset.theme === "night" ? "day" : "night";

    setTheme(nextTheme);
  });
}

if (supportsFinePointer.matches && !reduceMotion.matches) {
  window.addEventListener("pointermove", (event) => {
    document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`);
    document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`);
    document.documentElement.dataset.cursor = "active";
  });

  window.addEventListener("pointerleave", () => {
    delete document.documentElement.dataset.cursor;
  });
}
