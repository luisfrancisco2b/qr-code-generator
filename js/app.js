// Selecting the DOM elements
const container = document.querySelector(".container");
const qrCodeBtn = document.querySelector("#qr-form button");

const qrCodeInput = document.querySelector("#qr-form input");

const qrCodeImg = document.querySelector("#qr-code img");

// Function
// Generate QR Code
function generateQrCode() {

  // Get the text or link the user typed
  const qrCodeInputValue = qrCodeInput.value;

  // Check: if there is no input value, function execution is cancelled
  if (!qrCodeInputValue) return;

  // Visual feedback
  qrCodeBtn.innerText = "Gerando QrCode...";

  // Change the src property of the HTML image, concatenating the API link with the value entered by the user
  qrCodeImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrCodeInputValue}`;

  // Triggers the "load" event for the 'img' tag, adds the ".active" class and changes the button text 
  qrCodeImg.addEventListener("load", () => {
    container.classList.add("active");

    qrCodeBtn.innerText = "QR Code Gerado!";
  });
}

// Events
// Click event to call the QR Code generation function
qrCodeBtn.addEventListener("click", () => {
  generateQrCode();
});

// Triggers the function when the user presses the Enter key
qrCodeInput.addEventListener("keydown", (event) => {
  if (event.code === "Enter") {
    generateQrCode();
  }
});

// Dynamic cleaning of the QR Code area
qrCodeInput.addEventListener("keyup", () => {
  if (!qrCodeInput.value) {
    container.classList.remove("active");

    qrCodeBtn.innerText = "Gerar QR Code";
  }
});
