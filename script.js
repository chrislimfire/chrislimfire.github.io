let noClicks = 1;
const maxNoClicks = 4;
const minNoScale = 0.65;
let noScale = 1;
let yesScale = 1; // This now tracks the scaling factor directly
const gifElement = document.getElementById("togepi-gif");
const noButton = document.getElementById("no-btn");
const yesButton = document.getElementById("yes-btn");
const langButton = document.getElementById("lang-btn");
const buttonContainer = document.querySelector(".btn-container");
const yesButtonStyle = window.getComputedStyle(yesButton);
const maxYesWidth = parseFloat(yesButtonStyle.maxWidth);

// array of gifs - in order
const gifs = [
  "assets/images/togepi-happy.gif",
  "assets/images/togepi-sad-1.gif",
  "assets/images/togepi-sad-2.gif",
  "assets/images/togepi-crying.gif",
];
// array of messages for English
const buttonMessagesEN = [
  "Are you sure??",
  "Noooo",
  "NOOOO!!!",
  "You can't do this to me!",
];
// array of messages for Chinese
const buttonMessagesCN = [
  "你确定吗？？",
  "不行", // "Noooo"
  "真的不行！！！", // "NOOOO!!!"
  "你不能这样对我！",
];

// Language state
let language = "EN"; // Default language is English

langButton.addEventListener("click", () => {
  if (language === "EN") {
    // Change to Chinese
    language = "CN";
    langButton.textContent = "中文";
    document.getElementById("claim").textContent =
      "邱瑜晴, 我可以认领你吗？(˶ᵔ ᵕ ᵔ˶)";
    document.getElementById("stock").innerHTML = "<del>股票</del> 女朋友授予日";
    document.getElementById("yes-btn").textContent = "同意";
  } else {
    // Change to English
    language = "EN";
    langButton.textContent = "EN";
    document.getElementById("claim").textContent =
      "Qiu Yuqing, can I claim you? (˶ᵔ ᵕ ᵔ˶)";
    document.getElementById("yes-btn").textContent = "Yes";
    document.getElementById("stock").innerHTML =
      "<del>Stock</del> Girlfriend vesting day";
  }

  // Update the button text based on the current language
  updateButtonMessages();
});

// Update the no button message based on current language
function updateButtonMessages() {
  if (language === "EN") {
    noButton.textContent = buttonMessagesEN[noClicks % maxNoClicks];
  } else if (language === "CN") {
    noButton.textContent = buttonMessagesCN[noClicks % maxNoClicks];
  }
}

noButton.addEventListener("click", () => {
  // Update the no button message based on current language
  updateButtonMessages();

  if (noClicks < maxNoClicks) {
    // Change image
    gifElement.src = gifs[noClicks];
  }

  // Adjust button width to fit text
  noButton.style.width = "auto";
  noButton.style.width = `${noButton.scrollWidth}px`;

  // Decrease the size of the no button
  if (noScale > minNoScale) {
    noScale -= 0.1;
    noButton.style.transform = `scale(${noScale})`;
  }

  // Calculate the scaled width of the yesButton
  const baseWidth = parseFloat(yesButtonStyle.width);
  const scaledWidth = baseWidth * yesScale; // Reflects the actual visual size of the button

  console.log(`Scaled Width: ${scaledWidth}, Max Width: ${maxYesWidth}`);

  // Check if the scaled width is less than the max width
  if (scaledWidth < maxYesWidth) {
    yesScale += 0.5; // Increment scale by a smaller step
    yesButton.style.transform = `scale(${yesScale})`;

    // Get the current gap scale factor from CSS
    const rootStyles = getComputedStyle(document.documentElement);
    const gapScaleFactor =
      parseFloat(rootStyles.getPropertyValue("--gap-scale-factor")) || 250;

    // Adjust the gap dynamically
    const currentGap = parseFloat(buttonContainer.style.gap) || 20;
    const newGap = Math.sqrt(currentGap * gapScaleFactor); // Scale based on the factor
    buttonContainer.style.gap = `${newGap}px`;
  }

  // Increment the number of clicks
  noClicks++;
});
