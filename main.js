const themeDark = document.getElementsByClassName("theme-mode-dark");
const themeLight = document.getElementsByClassName("theme-mode-light");
const themeDarkLg = document.getElementById("theme-mode-dark");
const themeLightLg = document.getElementById("theme-mode-light");
const form = document.getElementById("a-form");
const formParts = form.querySelectorAll(".part");
const stepControl = document.getElementById("step-control");
const steps = stepControl.querySelectorAll(".step");
const btnControl = document.getElementById("btn-control");
const nextBtn = btnControl.querySelector(".btn-next");
const prevBtn = btnControl.querySelector(".btn-prev");
const cartOrder = document.getElementById("cart-order");
const amountTotal = document.getElementById("amount-total");
const shippingFee = document.getElementById("shipping-fee");
const chargeType = document.getElementById("charge-type");
const commonFee = shippingFee.firstElementChild.lastElementChild;
const dhlFee = shippingFee.lastElementChild.lastElementChild;

let step = 0; //計算步驟0 1 2
let total = 5298;
let type = "";

// amountTotal.innerHTML = '$ ' + `${total.toString().replace(/(\d)(?=(?:\d{3})+$)/g,"$1,")}`
amountTotal.innerHTML = "$ " + new Intl.NumberFormat().format(total);

function purchaseTotal(e) {
  e.preventDefault();

  let price =
    e.target.parentElement.parentElement.nextElementSibling.firstElementChild
      .textContent;
  console.log(price);
  if (e.target.matches(".goods-loss")) {
    let count = e.target.nextElementSibling.value;
    if (count > 1) {
      e.target.nextElementSibling.value--;
      total = total - Number(price);
    }
    amountTotal.innerHTML = "$ " + new Intl.NumberFormat().format(total);
  } else if (e.target.matches(".goods-add")) {
    let count = e.target.previousElementSibling.value++;
    total = total + Number(price);
    amountTotal.innerHTML = "$ " + new Intl.NumberFormat().format(total);
  }
}

function handleBtnControlClicked(e) {
  e.preventDefault();
  const nowStep = steps[step];
  if (e.target.matches(".btn-next")) {
    if (step === 2) {
      return;
    }
    const nextStep = steps[step + 1];
    nowStep.classList.remove("steps-item-process");
    nowStep.classList.add("steps-item-done");
    nextStep.classList.add("steps-item-process");
    formParts[step].classList.toggle("d-none");
    formParts[step + 1].classList.toggle("d-none");
    step += 1;
  } else if (e.target.matches(".btn-prev")) {
    const prevStep = steps[step - 1];
    nowStep.classList.remove("steps-item-process");
    prevStep.classList.remove("steps-item-done");
    prevStep.classList.add("steps-item-process");
    formParts[step].classList.toggle("d-none");
    formParts[step - 1].classList.toggle("d-none");
    step -= 1;
  }
  setBtnDisabled();
}

function setBtnDisabled() {
  if (step === 0) {
    prevBtn.setAttribute("disabled", "disabled");
  } else {
    prevBtn.removeAttribute("disabled");
  }

  // if (step === 2) {
  //   nextBtn.innerHTML = "確認下單";
  // } else {
  //   nextBtn.innerHTML = "下一步 →";
  // }
}

function shippingTotal(e) {
  if (e.target.matches(".mark")) {
    total -= 500;
    type = "免運";
    commonFee.classList.remove("mark");
    dhlFee.classList.add("mark2");
  } else { 
    if (e.target.matches(".mark2")) {
      total += 500;
      type = "$500";
      dhlFee.classList.remove("mark2");
      commonFee.classList.add("mark");
    } else {
      total += 0;
    }
  }
  chargeType.innerText = type;
  amountTotal.innerHTML = "$ " + new Intl.NumberFormat().format(total);
}

btnControl.addEventListener("click", handleBtnControlClicked);
shippingFee.addEventListener("click", shippingTotal);
cartOrder.addEventListener("click", purchaseTotal);

themeDark[0].addEventListener("click", () => {
  trans();
  document.documentElement.setAttribute("data-theme", "dark");
  themeDark[0].classList.add("d-none");
  themeLight[0].classList.remove("d-none");
});

themeLight[0].addEventListener("click", () => {
  trans();
  document.documentElement.setAttribute("data-theme", "light");
  themeDark[0].classList.remove("d-none");
  themeLight[0].classList.add("d-none");
});

themeDarkLg.addEventListener("click", () => {
  trans();
  document.documentElement.setAttribute("data-theme", "dark");
  themeLightLg.classList.remove("d-none");
  themeDarkLg.classList.add("d-none");
});

themeLightLg.addEventListener("click", () => {
  trans();
  document.documentElement.setAttribute("data-theme", "light");
  themeDarkLg.classList.remove("d-none");
  themeLightLg.classList.add("d-none");
});

let trans = () => {
  document.documentElement.classList.add("transition");
  window.setTimeout(() => {
    document.documentElement.classList.remove("transition");
  }, 1000);
};
