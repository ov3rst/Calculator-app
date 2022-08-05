const d = document,
  $checkbox = d.querySelectorAll("input[type='checkbox']");

const setTheme = () => {
  d.addEventListener("click", (e) => {
    if (e.target.matches(".inputs input[type='checkbox']")) {
      $checkbox.forEach((el) => {
        if (el.checked) {
          el.click();
        }
      });
      d.body.className = "";
      e.target.click();
      d.body.classList.add(e.target.id);
      defaulTheme(d.body.className);
    }

    if (e.target.matches(".circle")) {
      for (let i = 0; i < $checkbox.length; i++) {
        if ($checkbox[i].checked) {
          $checkbox[i].click();

          if (
            $checkbox[i].nextElementSibling.matches("input[type='checkbox']")
          ) {
            $checkbox[i].nextElementSibling.click();
            defaulTheme(d.body.className);
            return;
          } else {
            $checkbox[0].click();
            defaulTheme(d.body.className);
            return;
          }
        }
      }
    }
  });
};

function defaulTheme(theme) {
  localStorage.setItem("theme", theme);
}

const getTheme = () => {
  let theme = localStorage.getItem("theme");
  if (theme) {
    d.body.classList.add(theme);
  } else {
    d.body.classList.add("theme-1");
  }
};

export default {
  setTheme,
  getTheme,
};
