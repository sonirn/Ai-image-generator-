// Function to save images to local history
function saveToHistory(prompt, imgUrl) {
    let history = JSON.parse(localStorage.getItem("imageHistory")) || [];
    history.push({ prompt, imgUrl });
    localStorage.setItem("imageHistory", JSON.stringify(history));
    loadHistory();
}

// Function to load history from local storage
function loadHistory() {
    const historyContainer = document.getElementById("historyContainer");
    historyContainer.innerHTML = "";
    let history = JSON.parse(localStorage.getItem("imageHistory")) || [];

    history.forEach(item => {
        const historyItem = document.createElement("div");
        historyItem.classList.add("history-item");

        const img = document.createElement("img");
        img.src = item.imgUrl;
        img.alt = item.prompt;

        const caption = document.createElement("p");
        caption.textContent = item.prompt;

        historyItem.appendChild(img);
        historyItem.appendChild(caption);
        historyContainer.appendChild(historyItem);
    });
}
