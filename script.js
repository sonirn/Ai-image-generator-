const API_KEY = "YOUR_FREEPIK_API_KEY";
const generateBtn = document.getElementById("generateBtn");
const imageContainer = document.getElementById("imageContainer");
const loading = document.getElementById("loading");
const historyContainer = document.getElementById("historyContainer");

// Function to fetch image from Freepik API
async function fetchImage(prompt) {
    loading.style.display = "block";
    imageContainer.innerHTML = "";

    try {
        const response = await fetch(`https://api.freepik.com/v1/text-to-image?text=${encodeURIComponent(prompt)}`, {
            headers: { "Authorization": `Bearer ${API_KEY}` }
        });

        const data = await response.json();
        loading.style.display = "none";

        if (data && data.images) {
            data.images.forEach(imgUrl => {
                displayImage(prompt, imgUrl, imageContainer);
                saveToHistory(prompt, imgUrl);
            });
        } else {
            alert("No images found! Try a different prompt.");
        }
    } catch (error) {
        loading.style.display = "none";
        alert("Error fetching image: " + error.message);
    }
}

// Function to create image element with download button
function displayImage(prompt, imgUrl, container) {
    const imageItem = document.createElement("div");
    imageItem.classList.add("image-item");

    const img = document.createElement("img");
    img.src = imgUrl;
    img.alt = prompt;

    const downloadBtn = document.createElement("button");
    downloadBtn.classList.add("download-btn");
    downloadBtn.textContent = "Download";
    downloadBtn.onclick = () => downloadImage(imgUrl, prompt);

    imageItem.appendChild(img);
    imageItem.appendChild(downloadBtn);
    container.appendChild(imageItem);
}

// Function to download image
function downloadImage(imgUrl, prompt) {
    const a = document.createElement("a");
    a.href = imgUrl;
    a.download = prompt.replace(/\s+/g, "_") + ".jpg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Event listener for button click
generateBtn.addEventListener("click", () => {
    const prompt = document.getElementById("prompt").value;
    if (prompt) fetchImage(prompt);
});

// Load history on page load
window.onload = loadHistory;
