import { db }
from "./firebase.js";

import {

doc,
getDoc,
updateDoc

}
from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

async function loadProfile(){

const profileRef =
doc(
db,
"profile",
"profil_saya"
);

const profileSnap =
await getDoc(
profileRef
);

if(profileSnap.exists()){

const data =
profileSnap.data();

document.getElementById(
"nama"
).innerText =
data.nama;

document.getElementById(
"jurusan"
).innerText =
data.jurusan;

document.getElementById(
"kampus"
).innerText =
data.kampus;

document.getElementById(
"tentang"
).innerText =
data.tentang;

document.getElementById(
"skill"
).innerText =
data.skill;

document.getElementById(
"project"
).innerText =
data.project;

}

}

loadProfile();

document
.getElementById(
"editProfil"
)
.addEventListener(
"click",
editProfil
);

async function editProfil(){

const profileRef =
doc(
db,
"profile",
"profil_saya"
);

const profileSnap =
await getDoc(
profileRef
);

console.log("Ada dokumen:", profileSnap.exists());

if(profileSnap.exists()){
    console.log(profileSnap.data());
}

const data =
profileSnap.data();

const nama =
prompt(
"Nama",
data.nama
);

const jurusan =
prompt(
"Jurusan",
data.jurusan
);

const kampus =
prompt(
"Kampus",
data.kampus
);

const tentang =
prompt(
"Tentang Saya",
data.tentang
);

const skill =
prompt(
"Skill",
data.skill
);

const project =
prompt(
"Project",
data.project
);

await updateDoc(
profileRef,
{

nama,
jurusan,
kampus,
tentang,
skill,
project

}
);

loadProfile();

}