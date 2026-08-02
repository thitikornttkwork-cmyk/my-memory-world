const API_URL = "https://script.google.com/macros/s/AKfycbxRlqmqImuFrI5eHVsIyxoyTCH_HiS6kBQ1bCMNs3QXeS6J2126G2FS6F6yHjLmnebYGA/exec";


// =======================
// PAGE LOADER
// =======================

function hideLoader(){

    const loader = document.querySelector(".page-loader");


    if(loader){

        loader.style.opacity = "0";


        setTimeout(()=>{

            loader.style.display = "none";

        },500);

    }

}




// =======================
// FETCH DATA
// =======================

async function loadData(){


try{


const [
    memories,
    dreams,
    relationshipData

] = await Promise.all([


fetch(API_URL + "?sheet=Memories")
.then(res=>res.json()),


fetch(API_URL + "?sheet=Bucket%20List")
.then(res=>res.json()),


fetch(API_URL + "?sheet=Relationship")
.then(res=>res.json())


]);





console.log("MEMORIES:", memories);

console.log("BUCKET:", dreams);

console.log("RELATIONSHIP:", relationshipData);





// =======================
// LOAD MEMORIES
// =======================


const memoryContainer =
document.getElementById("memory-container");



if(memoryContainer){


let memoryHTML = [];



memories.forEach(memory=>{


memoryHTML.push(`


<div class="card memory-card">



${
memory["Photo URL"]

?

`

<img

src="${memory["Photo URL"]}"

class="memory-image"

loading="lazy"

decoding="async"

onerror="this.style.display='none'">

`

:

""

}





<h3>

${memory.Favorite ? "⭐" : "❤️"}

${memory.Title || ""}

</h3>




<p>

${memory.Description || ""}

</p>




<p>

📍 ${memory.Location || ""}

</p>




<p>

😊 ${memory.Mood || ""}

</p>




<p>

⭐ ${memory.Rating || ""}

</p>



</div>


`);


});



memoryContainer.innerHTML =
memoryHTML.join("");

}





// =======================
// LOAD BUCKET LIST
// =======================



const bucketContainer =
document.getElementById("bucket-container");



if(bucketContainer){


let bucketHTML = [];



dreams.forEach(dream=>{


bucketHTML.push(`


<div class="card dream-card">


<h3>

✨ ${dream.Dream || ""}

</h3>




<p>

${dream.Description || ""}

</p>




<p>

🔥 Priority:

${dream.Priority || ""}

</p>




<p>

📌 Status:

${dream.Status || ""}

</p>



</div>


`);



});



bucketContainer.innerHTML =
bucketHTML.join("");

}





// =======================
// RELATIONSHIP
// =======================


let relationship = {};



relationshipData.forEach(item=>{


relationship[item.Field] =
item.Value;


});





const name =
document.getElementById("couple-name");



if(name){

name.innerText =
relationship["Couple Name"]
||
"THUM ❤️ PHUNG";

}




const since =
document.getElementById("together-since");



if(since){

since.innerText =
"Together Since "
+
(relationship["Together Since"] || "");

}






// =======================
// SONG
// =======================


const song =
document.getElementById("song-link");



if(song && relationship["Our Song"]){


song.src =
relationship["Our Song"];


}






// =======================
// FINISH LOADING
// =======================


hideLoader();



}


catch(error){


console.error(
"LOAD ERROR:",
error
);



hideLoader();


}



}





loadData();






// =======================
// ANNIVERSARY COUNTER
// =======================


const startDate =
new Date("2026-04-28");



const today =
new Date();



const difference =
today - startDate;



const days =
Math.floor(

difference /

(1000 * 60 * 60 * 24)

);




const counter =
document.getElementById("days-count");



if(counter){


counter.innerText =
days;


}