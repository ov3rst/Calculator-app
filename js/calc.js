const d = document,
  $screen = d.getElementById("screen"),
  $backScreen = d.getElementById("back-screen"),
  $keypad = d.getElementById("keypad"),
  data = [];

let result;

const backRender = () => {
  $backScreen.textContent = `${data[0]} ${data[1]}`;
};

const mathAction = (content) => {
  if (data.length > 0) {
    data.pop();
    data.push(content);
    backRender();
    return;
  }

  data.push($screen.textContent.replaceAll(",", ""), content.toLowerCase());
  backRender();
  $screen.textContent = null;
};

const reset = () => {
  data.splice(0);
  $screen.textContent = null;
  $backScreen.textContent = null;
};

const textFormat = (number) => {
  let numberParts = number.split(".");

  numberParts[0] = numberParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return numberParts.join(".");
};

const deleted = () => {
  $screen.textContent = $screen.textContent.slice(
    0,
    $screen.textContent.length - 1
  );
  $screen.textContent = textFormat($screen.textContent.replaceAll(",", ""));
};

const results = () => {
  if (data.length > 0 && $screen.textContent !== "") {
    if (data.includes("+")) {
      result =
        parseFloat(data[0]) +
        parseFloat($screen.textContent.replaceAll(",", ""));
    }

    if (data.includes("-")) {
      result =
        parseFloat(data[0]) -
        parseFloat($screen.textContent.replaceAll(",", ""));
    }

    if (data.includes("x")) {
      result =
        parseFloat(data[0]) *
        parseFloat($screen.textContent.replaceAll(",", ""));
    }

    if (data.includes("/")) {
      result =
        parseFloat(data[0]) /
        parseFloat($screen.textContent.replaceAll(",", ""));
    }

    $screen.textContent = textFormat(result.toString());
    $backScreen.textContent = null;
    data.splice(0);
  }
};

const numberPress = (key) => {
  $screen.textContent = textFormat(
    $screen.textContent.replaceAll(",", "") + key
  );
};

const calculator = () => {
  $keypad.addEventListener("click", (e) => {
    if (e.target.matches(".number")) numberPress(e.target.textContent);

    if (e.target.matches(".math-action")) mathAction(e.target.textContent);

    if (e.target.matches(".reset")) reset();

    if (e.target.matches(".del")) deleted();

    if (e.target.matches(".result")) results();
  });

  d.addEventListener("keyup", (e) => {
    console.log(e.target);
    if (/^[\d\.]$/.test(e.key)) numberPress(e.key);

    if (e.key === "Backspace") deleted();

    if (/^[\+\-x\/]$/.test(e.key) && $screen.textContent !== "") {
      console.log("entre");
      mathAction($screen.textContent);
    }

    if (e.key === "Enter") results();
  });
};

export default calculator;
