const wrapper = document.querySelector(".wrapper"),
form = wrapper.querySelector("form"),
fileInp = form.querySelector("input"),
infoText = form.querySelector("p"),
copyBtn = wrapper.querySelector(".copy"),
closeBtn = wrapper.querySelector(".close");


function fetchRequest(formData, file) {
    infoText.innerText = "Scanning QR Code...."
    // sending post request to qr server api with passing 
    // form data as body and getting response from it
    fetch("http://api.qrserver.com/v1/read-qr-code/", {
        method: "Post", body: formData
    }).then (res => res.json()).then (result => {
        result = result[0].symbol[0].data;
        infoText.innerText = result ?  "Upload QR Code to Scan" : "Couldn't Scan QR Code";
        if(!result) return;
        wrapper.querySelector("textarea").innerText = result;
        form.querySelector("img").src = URL.createObjectURL(file);
        wrapper.classList.add("active");
    }).catch(() => {
        infoText.innerText = "Couldn't Scan QR Code";
    });
}

fileInp.addEventListener("change", e => {
    // Get User selected file
    let file = e.target.files[0];
    if(!file) return;
    // Create new FormData Object
    let formData = new FormData(); 
    // Adding selected file to FormData
    formData.append("file", file);
    fetchRequest(formData, file);
});

copyBtn.addEventListener("click", ()=> {
    let text = wrapper.querySelector("textarea").textContent;
    navigator.clipboard.writeText(text);
})


form.addEventListener("click", () => fileInp.click());

closeBtn.addEventListener("click", () => {
    wrapper.classList.remove("active");
    window.location.reload();
});