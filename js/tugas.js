import { db, auth }
from "./firebase.js";

import {
collection,
addDoc,
getDocs,
deleteDoc,
doc,
getDoc,
updateDoc
}

from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const btnTambah =
document.getElementById("tambahTugas");

const listTugas =
document.getElementById("listTugas");

btnTambah.addEventListener(
"click",
tambahTugas
);

async function tambahTugas(){

const nama =
document.getElementById(
"namaTugas"
).value;

const matkul =
document.getElementById(
"matkul"
).value;

const deadline =
document.getElementById(
"deadline"
).value;

if(
nama === "" ||
matkul === "" ||
deadline === ""
){
alert("Lengkapi data");
return;
}

await addDoc(
collection(db,"tasks"),
{

uid: auth.currentUser.uid,

nama: nama,

matkul: matkul,

deadline: deadline,

status: "aktif",

createdAt:
new Date().toISOString()

}
);

loadTugas();

document.getElementById(
"namaTugas"
).value = "";

document.getElementById(
"matkul"
).value = "";

document.getElementById(
"deadline"
).value = "";

}

function cekDeadline(deadline){

const sekarang =
new Date();

const target =
new Date(deadline);

const selisih =
(target - sekarang)
/
(1000*60*60*24);

if(selisih < 0){

return "deadline-lewat";

}

if(selisih <= 3){

return "deadline-dekat";

}

return "";

}

async function loadTugas(){

listTugas.innerHTML = "";

const querySnapshot =
await getDocs(
collection(db,"tasks")
);

querySnapshot.forEach((item)=>{

const data = item.data();

if(
data.uid !==
auth.currentUser.uid
){
return;
}

listTugas.innerHTML += `

<div class="task-card">

<h3>${data.nama}</h3>

<p>${data.matkul}</p>

<p class="${
cekDeadline(
data.deadline
)
}">
Deadline:
${data.deadline}
</p>

<button onclick="editTugas('${item.id}')">
Edit
</button>

<button onclick="selesaiTugas('${item.id}')">
Selesai
</button>

<button onclick="hapusTugas('${item.id}')">
Hapus
</button>

</div>
`;

});

}

window.hapusTugas =
async function(id){

await deleteDoc(
doc(db,"tasks",id)
);

loadTugas();

}

setTimeout(()=>{

loadTugas();

loadRiwayat();

},1000);

window.editTugas =
async function(id){

const tugasRef =
doc(db,"tasks",id);

const tugasSnap =
await getDoc(tugasRef);

const data =
tugasSnap.data();

const namaBaru =
prompt(
"Nama Tugas",
data.nama
);

if(!namaBaru) return;

const matkulBaru =
prompt(
"Mata Kuliah",
data.matkul
);

if(!matkulBaru) return;

await updateDoc(
tugasRef,
{
nama:namaBaru,
matkul:matkulBaru
}
);

loadTugas();

}

window.hapusRiwayat =
async function(id){

if(
!confirm(
"Hapus riwayat?"
)
){
return;
}

await deleteDoc(
doc(
db,
"history_tasks",
id
)
);

loadRiwayat();

}

window.selesaiTugas =
async function(id){

const tugasRef =
doc(db,"tasks",id);

const tugasSnap =
await getDoc(tugasRef);

const data =
tugasSnap.data();

await addDoc(
collection(db,"history_tasks"),
{

uid:data.uid,

nama:data.nama,

matkul:data.matkul,

deadline:data.deadline,

status:"selesai",

tanggalSelesai:
new Date().toLocaleDateString()

}
);

await deleteDoc(
doc(db,"tasks",id)
);

loadTugas();

loadRiwayat();

}

async function loadRiwayat(){

const container =
document.getElementById(
"riwayatTugas"
);

container.innerHTML = "";

const querySnapshot =
await getDocs(
collection(db,"history_tasks")
);

querySnapshot.forEach((item)=>{

const data =
item.data();

if(
data.uid !==
auth.currentUser.uid
){
return;
}

container.innerHTML += `

<div class="task-card">

<h3>${data.nama}</h3>

<p>${data.matkul}</p>

<p>
Selesai:
${data.tanggalSelesai}
</p>

<button
onclick="hapusRiwayat('${item.id}')">

Hapus Permanen

</button>

</div>

`;

});

}