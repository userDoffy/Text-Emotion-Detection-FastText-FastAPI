function detectEmotion() {
    var text = document.getElementById("textInput").value;

    // Perform AJAX request to backend
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                var label = response.label;
                var prob = response.prob;

                // Display emoji corresponding to emotion
                var emoji = document.getElementById("emoji");
                emoji.innerHTML = getEmoji(label);

                // Display emotion and probability
                var emotionResult = document.getElementById("emotionResult");
                emotionResult.innerHTML = "<p><strong>Emotion:</strong> " + label + "</p>" +
                                          "<p><strong>Probability:</strong> " + prob + "%</p>";

                // Update progress bar
                var progressBar = document.getElementById("progressBar");
                progressBar.style.width = prob + "%";

                // Show result
                var resultDiv = document.getElementById("result");
                resultDiv.style.display = "block";
            } else {
                alert("Error: " + xhr.statusText);
            }
        }
    };
    xhr.send("text=" + encodeURIComponent(text));
}

function getEmoji(emotion) {
    switch (emotion) {
        case "sadness":
            return "😢";
        case "joy":
            return "😄";
        case "fear":
            return "😨";
        case "anger":
            return "😡";
        case "surprised":
            return "😲";
        case "love":
            return "💖";
        default:
            return "❓";
    }
}
