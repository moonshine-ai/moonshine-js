let currentCaption;

chrome.runtime.onMessage.addListener(async (message) => {
    if (message.target === "overlay") {
        // currentCaption = message.data
        var element = document.getElementById("moonshine-caption-overlay") 
        element.innerText = message.data
        element.scrollTop = element.scrollHeight;
    }
    return true
});

function injectCaptionOverlay() {
    let style = document.createElement("style");
    style.textContent = `
        #moonshine-caption-overlay {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: rgba(0, 0, 0, 0.75);
            color: white;
            padding: 20px;
            border-radius: 10px;
            transition: opacity 0.1s ease;
            font-size: 24px;
            max-height: 128px;
            max-width: 512px;
            overflow: scroll;
        }

        #moonshine-caption-overlay:hover {
            opacity: 0.5;
        }
    `;
    document.head.appendChild(style);

    let div = document.createElement("div");
    div.id = "moonshine-caption-overlay"
    document.body.appendChild(div);
}

injectCaptionOverlay()
