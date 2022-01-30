async function clipboardPermission() {
    const result = await navigator.permissions.query({name: "clipboard-write"});
    return result;
}

(async function () {
    const permissionForUseClipboard = (await clipboardPermission()).state;

    const textInput = document.getElementById("textInput");
    const resultOutput = document.getElementById("resultOutput");
    const textNotFound = document.getElementById("textNotFound");
    const btnEncrypt = document.getElementById("btnEncrypt");
    const btnDecrypt = document.getElementById("btnDecrypt");
    const btnCopy = document.getElementById("btnCopy");
    const btnClean = document.getElementById("btnClean");

    function encrypt(text) {
        text = text.replaceAll("e", "enter");
        text = text.replaceAll("i", "imes");
        text = text.replaceAll("a", "ai");
        text = text.replaceAll("o", "ober");
        text = text.replaceAll("u", "ufat");
        return text;
    }

    function decrypt(text) {
        text = text.replaceAll("enter", "e");
        text = text.replaceAll("imes", "i");
        text = text.replaceAll("ai", "a");
        text = text.replaceAll("ober", "o");
        text = text.replaceAll("ufat", "u");
        return text;
    }

    function showResult(text) {
        resultOutput.value = text;
        textNotFound.classList.add("hidden");
        resultOutput.classList.add("show-result");
        btnCopy.parentNode.classList.add("show-button")
    }

    function hiddenResult() {
        textNotFound.classList.remove("hidden")
        resultOutput.classList.remove("show-result");
        btnCopy.parentNode.classList.remove("show-button")
    }

    btnEncrypt.onclick = () => {
        let text = textInput.value;

        if (text.trim() === "") return false;

        showResult(encrypt(text));
    }

    btnDecrypt.onclick = () => { 
        let text = textInput.value;

        if (text.trim() === "") return false;

        showResult(decrypt(text));
    }

    btnCopy.onclick = () => { 
        if (resultOutput.value.trim() === "") return false;
        
        if (permissionForUseClipboard === "granted") {
            navigator.clipboard.writeText(resultOutput.value);
        }
    }

    btnClean.onclick = () => {
        resultOutput.value = "";
        hiddenResult();
    }

})();