// Selecting the DOM elements
const container = document.querySelector(".container");
const qrCodeBtn = document.querySelector("#qr-form button");

const qrCodeInput = document.querySelector("#qr-form input");

const qrCodeImg = document.querySelector("#qr-code img");

const clearBtn = document.querySelector("#clear-btn");
const copyBtn = document.querySelector("#copy-btn");

// Function
// Generate QR Code
function generateQrCode() {
  // Get the text or link the user typed
  const qrCodeInputValue = qrCodeInput.value;

  // Check: if there is no input value, function execution is cancelled
  if (!qrCodeInputValue) return;

  copyBtn.innerText = "Copiar!";

  // Visual feedback
  qrCodeBtn.innerText = "Gerando QrCode...";

  // Change the src property of the HTML image, concatenating the API link with the value entered by the user
  qrCodeImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrCodeInputValue}`;
}

// Clear Input and qr code image
const clearForm = () => {
  qrCodeInput.value = "";
  qrCodeInput.focus();
  container.classList.remove("active");
  qrCodeBtn.innerText = "Gerar QR Code";
};

// Copy generated qr code
async function copyQrCode() {
  try {
    /* Fetch the QR Code image (same URL shown on screen) to get its binary data,
    not just the visual reference */
    const response = await fetch(qrCodeImg.src);

    /* Convert the response into a Blob (binary object data), the format
    required by the Clipboard API */
    const blob = await response.blob();

    // Write the blob to the system clipboard
    await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);

    // Visual success feedback on the button
    copyBtn.innerText = "QR Code Copiado com Sucesso!";

    // Revert the button text after 3s
    setTimeout(() => {
      copyBtn.innerText = "Copiar!";
    }, 3000);
  } catch (error) {
    // If falls here, the browser doesn't support image Clipboard API
    console.log("Erro ao copiar o QR Code:", error);
    copyBtn.innerText = "Erro ao copiar o QR Code!";

    setTimeout(() => {
      copyBtn.innerText = "Copiar!";
    }, 3000);
  }
}

// Events
// Click event to call the QR Code generation function
qrCodeBtn.addEventListener("click", () => {
  generateQrCode();
});

// Triggers the "load" event for the 'img' tag, adds the ".active" class and changes the button text
qrCodeImg.addEventListener("load", () => {
  container.classList.add("active");

  qrCodeBtn.innerText = "QR Code Gerado!";
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

// Click event to clear input and qrcode img
clearBtn.addEventListener("click", () => {
  clearForm();
});

// Click event to copy generated qr code
copyBtn.addEventListener("click", () => {
  copyQrCode();
});
