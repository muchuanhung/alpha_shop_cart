// ------ Variables -------- //
const userShoppingList = [
  {
    id: 1,
    productName: '破壞補丁修身牛仔褲',
    productImg: './src/image/product_01.jpg',
    unitPrice: 3999,
    purchaseQty: 1,
  },
  {
    id: 2,
    productName: '刷色直筒牛仔褲',
    productImg: './src/image/product_02.jpg',
    unitPrice: 1299,
    purchaseQty: 1,
  }
]
let indexActiveForm = 0

// --------- Nodes ---------- //
const headerActions = document.querySelector('.header-actions')
const darkModeToggle = headerActions.querySelector('#dark-mode-toggle')
const stepper = document.querySelector('.steps-wrapper')
const stepList = stepper.querySelectorAll('.step')
const progressLine = stepper.querySelector('.progress-line')
const formGroup = document.querySelector('.form-group')
const formList = formGroup.querySelectorAll('.form-part')
const formOfShipping = formGroup.querySelector('.form-part-shipping')
const btnGroup = document.querySelector('.btn-groups')
const btnPrevious = btnGroup.querySelector('.btn-previous')
const btnNext = btnGroup.querySelector('.btn-next')
const btnSubmit = btnGroup.querySelector('.btn-submit')
const shoppingCart = document.querySelector('.shopping-cart')
const shoppingList = shoppingCart.querySelector('.shopping-list')

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

function handleQtyAdjustment(event) {
  const targetItem = event.target
  if (targetItem.matches('.qty-controller')) {
    const shoppingItem = targetItem.closest('.shopping-item')
    updateProductQty(targetItem, shoppingItem)
    updateSubtotal(shoppingItem)
    updateShoppingAmount() 
  }
}

function toggleDarkMode() {
  const darkIcon = headerActions.querySelector('.fa-moon')
  const lightIcon = headerActions.querySelector('.fa-sun')
  
  if (event.target.checked) {
    document.documentElement.setAttribute('dark-theme', 'dark')
  } else {
    document.documentElement.setAttribute('dark-theme', 'light')
  } 
  darkIcon.classList.toggle('d-none')
  lightIcon.classList.toggle('d-none')
}

// Functions related to Views
const renderShoppingCart = function() {
  userShoppingList.forEach(item => 
    shoppingList.innerHTML += `
      <div class="shopping-item d-flex justify-content-between" data-id=${item.id}>
        <img src="${item.productImg}" alt="product-img" class="product-img">
        <div class="item-info flex-grow-1 d-flex flex-column justify-content-between align-items-end">
          <p class="product-name">${item.productName}</p>
          <div class="qty-wrapper">
            <span class="qty-controller qty-minus-circle d-inline-block rounded-circle">-</span>
            <span class="qty mx-3">${item.purchaseQty}</span>
            <span class="qty-controller qty-add-circle d-inline-block rounded-circle">+</span>
          </div>
          <div class="price-wrapper">
            <span>$</span>
            <span class="subtotal">${item.unitPrice}</span>
          </div>
        </div>
      </div>
    `
    )
  updateShoppingAmount()
}()

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

function updateProgressLine(currentIndex, totalStage) {
  const lineWidth = currentIndex / (totalStage - 1) * 100
  progressLine.style.width = `${lineWidth}%`
}

function updateProductQty(targetItem, shoppingItem) {
  const qtyNode = shoppingItem.querySelector('.qty')
  const currentQty = qtyNode.innerHTML
  if (targetItem.matches('.qty-minus-circle') && currentQty > 0) {
    qtyNode.innerHTML--
  } else if (targetItem.matches('.qty-add-circle')) {
    qtyNode.innerHTML++
  }
}

function updateSubtotal(shoppingItem) {
  const productId = shoppingItem.dataset.id
  // get unit price from DB
  const targetProduct = userShoppingList.find(product => product.id.toString() === productId)
  const unitPrice = targetProduct.unitPrice
  const subtotal = shoppingItem.querySelector('.subtotal')
  const qtyNode = shoppingItem.querySelector('.qty')
  subtotal.innerHTML = qtyNode.innerHTML * unitPrice
}

function updateShoppingAmount() {
  const totalAmount = shoppingCart.querySelector('.total-amount')
  const allSubtotal = shoppingCart.querySelectorAll('.subtotal')
  let sum = 0
  allSubtotal.forEach(subtotal => {
    if (!isNaN(Number(subtotal.innerHTML))) { 
    sum += Number(subtotal.innerHTML)
    }
  })
  totalAmount.innerHTML = sum
}

function updateShippingFee() {
  const shippingSubtotal = shoppingCart.querySelector('.shipping-subtotal')
  const shippingFee =  shippingSubtotal.querySelector('.subtotal')
  const selectedShipping = event.target.parentElement.querySelector('.subtotal') 
  shippingFee.innerHTML = selectedShipping.innerHTML
  updateShoppingAmount()
}
// ------- Functions execution or invoked ------- //

// Event listener for form page controls
btnGroup.addEventListener('click', handleBtnsClick)

// Event listener for shipping fee selection
formOfShipping.addEventListener('change', updateShippingFee)

// Event listener for detecting qty change of shopping items
shoppingList.addEventListener('click', handleQtyAdjustment)

// Event listener for dark mode shifting
darkModeToggle.addEventListener('change', toggleDarkMode)