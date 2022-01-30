async function clipboardPermission() {
    const result = await navigator.permissions.query({name: "clipboard-write"});
    return result;
}

(async function () {
    const permissionForUseClipboard = (await clipboardPermission()).state;

    const textInput = document.getElementById("textInput");
    const resultOutput = document.getElementById("resultOutput");
    const btnEncrypt = document.getElementById("btnEncrypt");
    const btnDecrypt = document.getElementById("btnDecrypt");
    const btnCopy = document.getElementById("btnCopy");
    const textNotFound = document.getElementById("textNotFound");

    /**
     * 
     * A letra "e" é convertida para "enter"
     * A letra "i" é convertida para "imes"
     * A letra "a" é convertida para "ai"
     * A letra "o" é convertida para "ober"
     * A letra "u" é convertida para "ufat"
     *  
     */

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
        resultOutput.classList.add("show");
        btnCopy.classList.add("show");
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
})();