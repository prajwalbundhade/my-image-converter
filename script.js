const form = document.getElementById("converter-form");
const preview = document.getElementById("preview");
const downloadButton = document.getElementById("download-button");
const outputFormat = document.getElementById("output-format");

form.addEventListener("submit", event => {
  event.preventDefault();

  const fileInput = document.getElementById("input-image");
  const file = fileInput.files[0];
  if (!file) {
    alert("Please select an image file.");
    return;
  }

  const reader = new FileReader();
  reader.onload = event => {
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      canvas.getContext("2d").drawImage(image, 0, 0);
      const dataUrl = canvas.toDataURL(outputFormat.value);
      preview.innerHTML = '';
      preview.appendChild(image);
      downloadButton.style.display = "block";
      downloadButton.onclick = () => download(dataUrl, `converted.${outputFormat.value}`);
    };
    image.src = event.target.result;
  };
  reader.readAsDataURL(file);
});

function download(dataUrl, fileName) {
  const link = document.createElement("a");
  link.download = fileName;
  link.href = dataUrl;
  link.click();
}

const toggler = document.getElementById("toggler");
const navLinks = document.querySelector("nav ul");

toggler.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});
