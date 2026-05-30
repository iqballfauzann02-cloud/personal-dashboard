import { db, auth }
from "./firebase.js";

import {

collection,
addDoc,
getDocs,
deleteDoc,
doc,
getDoc

}
from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const btnTambah =
document.getElementById(
"tambahProgres"
);

const listProgres =
document.getElementById(
"listProgres"
);

btnTambah.addEventListener(
"click",
tambahProgres
);

async function tambahProgres(){

const kegiatan =
document.getElementById(
"kegiatan"
).value;

if(kegiatan===""){

alert(
"Pilih kegiatan"
);

return;

}

await addDoc(
collection(db,"progress"),
{

uid:
auth.currentUser.uid,

kegiatan:
kegiatan,

status:
"aktif",

tanggal:
new Date()
.toLocaleDateString()

}
);

loadProgres();

}

async function loadProgres(){

listProgres.innerHTML = "";

const querySnapshot =
await getDocs(
collection(db,"progress")
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

listProgres.innerHTML += `

<div class="task-card">

<h3>
${data.kegiatan}
</h3>

<p>
${data.tanggal}
</p>

<button
onclick="selesaiProgres('${item.id}')">

Selesai

</button>

<button
onclick="hapusProgres('${item.id}')">

Hapus

</button>

</div>

`;

});

}

window.hapusProgres =
async function(id){

await deleteDoc(
doc(db,"progress",id)
);

loadProgres();

}

window.selesaiProgres =
async function(id){

const progresRef =
doc(db,"progress",id);

const progresSnap =
await getDoc(progresRef);

const data =
progresSnap.data();

await addDoc(
collection(
db,
"history_progress"
),
{

uid:data.uid,

kegiatan:data.kegiatan,

status:"selesai",

tanggalSelesai:
new Date()
.toLocaleDateString()

}
);

await deleteDoc(
doc(db,"progress",id)
);

loadProgres();

loadRiwayat();

}

async function loadRiwayat(){

const container =
document.getElementById(
"riwayatProgres"
);

container.innerHTML = "";

const querySnapshot =
await getDocs(
collection(
db,
"history_progress"
)
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

<h3>
${data.kegiatan}
</h3>

<p>
Selesai :
${data.tanggalSelesai}
</p>

</div>

`;

});

}

setTimeout(()=>{

loadProgres();

loadRiwayat();

},1000);