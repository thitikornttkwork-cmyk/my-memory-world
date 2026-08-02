const API_URL = "https://script.google.com/macros/s/AKfycbxRlqmqImuFrI5eHVsIyxoyTCH_HiS6kBQ1bCMNs3QXeS6J2126G2FS6F6yHjLmnebYGA/exec";


// =======================
// LOADER
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
// LOAD DATA
// =======================

async function loadWebsite(){


try{


const memories =
await fetch(API_URL + "?sheet=Memories")
.then(res=>res.json());



const bucket =
await fetch(API_URL + "?sheet=Bucket%20List")
.then(res=>res.json());



const relationshipData =
await fetch(API_URL + "?sheet=Relationship")
.then(res=>res.json());





// =======================
// MEMORIES
// =======================


const memoryContainer =
document.getElementById("memory-container");


if(memoryContainer){


memoryContainer.innerHTML="";


memories.forEach(memory=>{


memoryContainer.innerHTML += `


<div class="card memory-card">


${
memory["Photo URL"]

?

`
<img 
src="${memory["Photo URL"]}"
class="memory-image"
loading="lazy">
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


`;


});


}





// =======================
// BUCKET
// =======================


const bucketContainer =
document.getElementById("bucket-container");


if(bucketContainer){


bucketContainer.innerHTML="";


bucket.forEach(item=>{


bucketContainer.innerHTML += `


<div class="card dream-card">


<h3>
✨ ${item.Dream || item.Title || ""}
</h3>


<p>
${item.Description || ""}
</p>


<p>
🔥 Priority:
${item.Priority || ""}
</p>


<p>
📌 Status:
${item.Status || ""}
</p>


</div>


`;


});


}





// =======================
// RELATIONSHIP
// =======================


let relationship={};


relationshipData.forEach(item=>{


relationship[item.Field]=item.Value;


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




const song =
document.getElementById("song-link");


if(song && relationship["Our Song"]){

song.src =
relationship["Our Song"];

}





console.log("Website Loaded Successfully");



hideLoader();



}


catch(error){


console.error(
"Loading Error:",
error
);


hideLoader();


}


}





// =======================
// DAYS COUNTER
// =======================


const start =
new Date("2026-04-28");


const now =
new Date();


const days =
Math.floor(
(now-start)
/(1000*60*60*24)
);



const counter =
document.getElementById("days-count");


if(counter){

counter.innerText =
days;

}





// START

loadWebsite();