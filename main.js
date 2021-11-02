// --------- Nodes ---------- //
const navlistbtn = document.querySelector('.nav-list-btn')
const darkModeToggle = navlistbtn.querySelector('#dark-mode-toggle')
const stepper = document.querySelector('.stepper-container')
const stepList = stepper.querySelectorAll('.step')
const connectLine = stepper.querySelector('.connect-line')
const formpanel = document.querySelector('.form-panel')
const formList = formpanel.querySelectorAll('.part-container')
const formOfShipping = formpanel.querySelector('.form-part-shipping')
const btnControlpanel = document.querySelector('.btn-control-panel')
const btnPrevious = btnControlpanel.querySelector('.btn-previous')
const btnNext = btnControlpanel.querySelector('.btn-next')
const btnSubmit = btnControlpanel.querySelector('.btn-submit')
const checkoutpanel = document.querySelector('.checkout-panel')
const checkoutcontainer = checkoutpanel.querySelector('.checkout-container')

// ------- Functions -------- //

// Functions related to Event handle
function handleBtnsClick(event) {

  event.preventDefault()

  const targetItem = event.target
  
  // back to previous stage
  if (targetItem.classList.contains('btn-previous') && indexActiveForm > 0) {
    const nextForm = formList[indexActiveForm - 1]
    updateFormPart(nextForm)
    indexActiveForm--
    changeBtnStyle(indexActiveForm)
    changeStepperStyle(indexActiveForm)
    updateProgressLine(indexActiveForm, formList.length)

  // go to next step
  } else if (targetItem.classList.contains('btn-next') && indexActiveForm < formList.length - 1) {
    const nextForm = formList[indexActiveForm + 1]
    updateFormPart(nextForm)
    indexActiveForm++
    changeBtnStyle(indexActiveForm)
    changeStepperStyle(indexActiveForm)
    updateProgressLine(indexActiveForm, formList.length)

  // submit form
  } else if (targetItem.classList.contains('btn-submit') && indexActiveForm === formList.length - 1) {
    alert('訂單已送出')
    window.location.reload()
  } 
}


// 背景明暗切換
function toggleDarkMode() {
  const darkIcon = navlistbtn.querySelector('.light-theme')
  const lightIcon = navlistbtn.querySelector('.dark-theme')
  
  if (event.target.checked) {
    document.documentElement.setAttribute('dark-theme', 'dark')
  } else {
    document.documentElement.setAttribute('dark-theme', 'light')
  } 
  darkIcon.classList.toggle('d-none')
  lightIcon.classList.toggle('d-none')
}

function updateFormPart(nextForm) {
  const currentForm = formList[indexActiveForm]
  currentForm.classList.add('d-none')
  nextForm.classList.remove('d-none')
}

function changeBtnStyle(currentIndex) {
  // change btn style according to current stage
  switch (currentIndex) {
    case 0 :
      btnPrevious.classList.add('d-none')
      break
    case formList.length - 1:
      btnNext.classList.add('d-none')
      btnSubmit.classList.remove('d-none')
      break
    default:
      btnPrevious.classList.remove('d-none')
      btnNext.classList.remove('d-none')
      btnSubmit.classList.add('d-none')
  }
}

function changeStepperStyle(currentIndex) {
  // change stepper style according to current step
  stepList.forEach((step, stepIndex) => {
    step.classList.remove('active')
    if(stepIndex < currentIndex) {
      step.classList.add('checked')
    }
  })
  stepList[currentIndex].classList.remove('checked')
  stepList[currentIndex].classList.add('active')
}



// ------- Functions execution or invoked ------- //

// Event listener for form page controls
btnControlpanel.addEventListener('click', handleBtnsClick)

// Event listener for dark mode shifting
darkModeToggle.addEventListener('change', toggleDarkMode)