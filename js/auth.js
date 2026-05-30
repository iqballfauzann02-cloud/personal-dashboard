import { auth }
from "./firebase.js";

import {
signInWithEmailAndPassword
}
from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const tombol =
document.getElementById("loginBtn");

tombol.addEventListener("click", () => {

let email =
document.getElementById("email").value;

let password =
document.getElementById("password").value;

signInWithEmailAndPassword(
auth,
email,
password
)

.then(() => {

window.location.href =
"index.html";

})

.catch((error) => {

document.getElementById(
"pesan"
).innerText =
error.message;

});

});