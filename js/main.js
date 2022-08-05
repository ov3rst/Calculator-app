import calculator from "./calc.js";
import theme from "./theme.js";

document.addEventListener("DOMContentLoaded", () => {
  theme.getTheme();
  theme.setTheme();
  calculator();
});
