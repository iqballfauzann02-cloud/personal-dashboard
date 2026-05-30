import { auth, db }
from "./firebase.js";

import {
signOut
}
from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
collection,
getDocs
}
from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const logout =
document.getElementById("logoutBtn");

logout.addEventListener("click",()=>{

signOut(auth)
.then(()=>{

window.location.href =
"login.html";

});

});

async function loadDashboard(){

let tugasAktif = 0;
let tugasSelesai = 0;

let progresAktif = 0;
let progresSelesai = 0;

const tasks =
await getDocs(
collection(db,"tasks")
);

tasks.forEach((doc)=>{

const data = doc.data();

if(
data.uid ===
auth.currentUser.uid
){

tugasAktif++;

}

});

const history =
await getDocs(
collection(db,"history_tasks")
);

history.forEach((doc)=>{

const data = doc.data();

if(
data.uid ===
auth.currentUser.uid
){

tugasSelesai++;

}

});

const progress =
await getDocs(
collection(
db,
"progress"
)
);

progress.forEach((doc)=>{

const data =
doc.data();

if(
data.uid ===
auth.currentUser.uid
){

progresAktif++;

}

});

const historyProgress =
await getDocs(
collection(
db,
"history_progress"
)
);

historyProgress.forEach((doc)=>{

const data =
doc.data();

if(
data.uid ===
auth.currentUser.uid
){

progresSelesai++;

}

});

document.getElementById(
"jumlahProgres"
).innerText =
progresAktif;

document.getElementById(
"jumlahRiwayatProgres"
).innerText =
progresSelesai;

document.getElementById(
"jumlahTugas"
).innerText =
tugasAktif;

document.getElementById(
"jumlahRiwayatTugas"
).innerText =
tugasSelesai;

}

import {
onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

onAuthStateChanged(auth,(user)=>{

if(user){

loadDashboard();

let progresAktif = 0;
let progresSelesai = 0;
}

});

const hariIni =
new Date();

document.getElementById(
"tanggalHari"
).innerText =
hariIni.toLocaleDateString(
"id-ID",
{
weekday:"long",
year:"numeric",
month:"long",
day:"numeric"
}
);