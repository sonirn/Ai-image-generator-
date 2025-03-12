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
        displayImage(item.prompt, item.imgUrl, historyContainer);
    });
}
