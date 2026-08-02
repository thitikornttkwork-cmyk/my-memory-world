const API_URL = "https://script.google.com/macros/s/AKfycbxRlqmqImuFrI5eHVsIyxoyTCH_HiS6kBQ1bCMNs3QXeS6J2126G2FS6F6yHjLmnebYGA/exec";


// =======================
// LOAD MEMORIES
// =======================

fetch(API_URL + "?sheet=Memories")

.then(res => res.json())

.then(data => {


    console.log("MEMORIES:", data);


    const container =
    document.getElementById("memory-container");


    data.forEach(memory => {


        container.innerHTML += `

        <div class="card">


            ${
                memory["Photo URL"]
                ?
                `
                <img 
                src="${memory["Photo URL"]}"
                class="memory-image">
                `
                :
                ""
            }


            <h3>
            ${memory.Favorite ? "⭐" : "❤️"}
            ${memory.Title}
            </h3>


            <p>
            ${memory.Description}
            </p>


            <p>
            📍 ${memory.Location}
            </p>


            <p>
            😊 ${memory.Mood}
            </p>


            <p>
            ⭐ ${memory.Rating}
            </p>


        </div>

        `;


    });


})

.catch(err=>{

console.error(err);

});



// =======================
// REMOVE LOADER
// =======================

window.addEventListener("load",()=>{


setTimeout(()=>{


const loader =
document.querySelector(".page-loader");


if(loader){

loader.style.display="none";

}


},2000);


});

// =======================
// LOAD BUCKET LIST
// =======================

fetch(API_URL + "?sheet=Bucket%20List")

.then(res => res.json())

.then(data => {


    console.log("BUCKET:", data);


    const container =
    document.getElementById("bucket-container");


    data.forEach(dream => {


        container.innerHTML += `

        <div class="card">


            <h3>
            ✨ ${dream.Dream}
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

        `;


    });


})

.catch(err=>{

console.error("Bucket Error:", err);

});

// =======================
// LOAD RELATIONSHIP
// =======================

fetch(API_URL + "?sheet=Relationship")

.then(res => res.json())

.then(data => {


    console.log("RELATIONSHIP:", data);


    let relationship = {};


    data.forEach(item => {

        relationship[item.Field] = item.Value;

    });



    document.getElementById("couple-name").innerText =
    relationship["Couple Name"] || "THUM ❤️ PHUNG";



    document.getElementById("together-since").innerText =
    "Together Since " + (relationship["Together Since"] || "");



})

.catch(err=>{

    console.error("Relationship Error:", err);

});

// =======================
// ANNIVERSARY COUNTER
// =======================

const startDate = new Date("2026-04-28");


const today = new Date();


const difference = today - startDate;


const days = Math.floor(
    difference / (1000 * 60 * 60 * 24)
);


const counter =
document.getElementById("days-count");


if(counter){

    counter.innerText = days;

}

// =======================
// LOAD OUR SONG
// =======================

fetch(API_URL + "?sheet=Relationship")

.then(res => res.json())

.then(data => {


    let relationship = {};


    data.forEach(item => {

        relationship[item.Field] = item.Value;

    });



    const song =
    relationship["Our Song"];



    const player =
    document.getElementById("song-link");



    if(song && player){

        player.src = song;

    }


})

.catch(err => {

    console.error("Song Error:", err);

});