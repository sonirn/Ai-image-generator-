const API_KEY = "FPSX07291e4267744c0183fe22e277bfc9f6";
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
                const img = document.createElement("img");
                img.src = imgUrl;
                imageContainer.appendChild(img);
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

// Event listener for button click
generateBtn.addEventListener("click", () => {
    const prompt = document.getElementById("prompt").value;
    if (prompt) fetchImage(prompt);
});

// Load history on page load
window.onload = loadHistory;
