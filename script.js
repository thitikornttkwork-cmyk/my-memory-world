const API_URL =
"https://script.google.com/macros/s/AKfycbxRlqmqImuFrI5eHVsIyxoyTCH_HiS6kBQ1bCMNs3QXeS6J2126G2FS6F6yHjLmnebYGA/exec";


// =======================
// LOADER
// =======================

function hideLoader(){

const loader = document.getElementById("page-loader");

if(!loader) return;


loader.style.opacity="0";


setTimeout(()=>{

loader.style.display="none";

},500);


}



// =======================
// SAFE TEXT
// =======================

function safe(value){

return value ?? "";

}



// =======================
// DAYS COUNTER
// =======================

function updateDaysCounter(startDateString){


const counter =
document.getElementById("days-count");


if(!counter) return;



const start =
new Date(startDateString || "2026-04-28");


const now =
new Date();



const diff =
Math.max(0, now-start);



const days =
Math.floor(
diff/(1000*60*60*24)
);



counter.textContent = days;


}



// =======================
// MEMORIES FIX
// IMAGE + VIDEO ORIGINAL SIZE
// =======================

function renderMemories(memories){


const container =
document.getElementById("memory-container");


if(!container) return;



container.innerHTML="";



memories.forEach(memory=>{


const card =
document.createElement("div");



card.className =
"card memory-card reveal";



let media = "";



const url =
memory["Photo URL"];



if(url){



const lower =
url.toLowerCase();



if(
lower.includes(".mp4") ||
lower.includes(".webm") ||
lower.includes("video")
){



media = `

<video

src="${url}"

class="memory-media"

controls

loading="lazy"

playsinline>

</video>

`;



}else{



media = `

<img

src="${url}"

alt="${safe(memory.Title)}"

class="memory-media"

loading="lazy"

decoding="async"

>

`;



}



}



card.innerHTML = `


${media}



<h3>

${memory.Favorite ? "⭐" : "❤️"}

${safe(memory.Title)}

</h3>



<p>

${safe(memory.Description)}

</p>



${
memory.Location

?

`<p>📍 ${safe(memory.Location)}</p>`

:

""

}



${
memory.Mood

?

`<p>😊 ${safe(memory.Mood)}</p>`

:

""

}



${
memory.Rating

?

`<p>⭐ ${safe(memory.Rating)}</p>`

:

""

}


`;



container.appendChild(card);



});



}




// =======================
// BUCKET LIST
// =======================

function renderBucket(bucket){


const container =
document.getElementById("bucket-container");


if(!container) return;



container.innerHTML="";



bucket.forEach(item=>{


const card =
document.createElement("div");



card.className =
"card dream-card reveal";



card.innerHTML=`


<h3>

✨ ${safe(item.Dream || item.Title)}

</h3>



<p>

${safe(item.Description)}

</p>



${
item.Priority

?

`<p>🔥 Priority: ${safe(item.Priority)}</p>`

:

""

}



${
item.Status

?

`<p>📌 Status: ${safe(item.Status)}</p>`

:

""

}



`;



container.appendChild(card);



});



}




// =======================
// RELATIONSHIP
// =======================

function applyRelationship(relationshipData){


const relationship={};



relationshipData.forEach(item=>{


relationship[item.Field]=item.Value;


});



const coupleName =
relationship["Couple Name"]
||
"THUM ❤️ PHUNG";



const togetherSince =
relationship["Together Since"]
||
"28/04/2026";



const name =
document.getElementById("couple-name");



if(name)
name.textContent=coupleName;




const since =
document.getElementById("together-since");



if(since)
since.textContent =
`Together since ${togetherSince}`;





const song =
document.getElementById("song-link");



if(song && relationship["Our Song"]){

song.src =
relationship["Our Song"];

}





const parts =
togetherSince.split("/");



if(parts.length===3){


updateDaysCounter(
`${parts[2]}-${parts[1]}-${parts[0]}`
);


}else{


updateDaysCounter("2026-04-28");


}



}





// =======================
// SCROLL REVEAL
// =======================

function initReveal(){


const items =
document.querySelectorAll(
".story-item, .reveal"
);



if(!items.length) return;



const observer =
new IntersectionObserver(
entries=>{


entries.forEach(entry=>{


if(entry.isIntersecting){


entry.target.classList.add(
"show",
"active"
);



observer.unobserve(
entry.target
);


}



});


},
{
threshold:0.15
}
);



items.forEach(item=>
observer.observe(item)
);



}





// =======================
// FLOATING HEART
// =======================

function startFloatingHearts(){


setInterval(()=>{


const heart =
document.createElement("div");



heart.className =
"floating-heart-bg";



heart.textContent="❤";



heart.style.left =
Math.random()*100+"vw";



heart.style.fontSize =
14+Math.random()*22+"px";



heart.style.animationDuration =
6+Math.random()*4+"s";



document.body.appendChild(heart);



setTimeout(()=>{

heart.remove();

},10000);



},900);



}





// =======================
// LOAD WEBSITE
// =======================

async function loadWebsite(){


try{


const [
memories,
bucket,
relationshipData

]=await Promise.all([


fetch(API_URL+"?sheet=Memories")
.then(r=>r.json()),



fetch(API_URL+"?sheet=Bucket%20List")
.then(r=>r.json()),



fetch(API_URL+"?sheet=Relationship")
.then(r=>r.json())


]);




renderMemories(memories);


renderBucket(bucket);


applyRelationship(relationshipData);



initReveal();


startFloatingHearts();



console.log(
"Website loaded successfully"
);



}catch(error){


console.error(
"Loading error:",
error
);



updateDaysCounter(
"2026-04-28"
);



}finally{


hideLoader();


}



}




// =======================
// START
// =======================

document.addEventListener(
"DOMContentLoaded",
loadWebsite
);