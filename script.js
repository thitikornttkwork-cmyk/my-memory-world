const API_URL = "https://script.google.com/macros/s/AKfycbxRlqmqImuFrI5eHVsIyxoyTCH_HiS6kBQ1bCMNs3QXeS6J2126G2FS6F6yHjLmnebYGA/exec";


// =======================
// PAGE LOADER
// =======================

function hideLoader(){

    const loader =
    document.querySelector(".page-loader");


    if(loader){

        loader.style.opacity = "0";


        setTimeout(()=>{

            loader.style.display = "none";

        },500);

    }

}





// =======================
// LOAD ALL DATA
// =======================


Promise.all([

    fetch(API_URL + "?sheet=Memories")
    .then(res=>res.json()),


    fetch(API_URL + "?sheet=Bucket%20List")
    .then(res=>res.json()),


    fetch(API_URL + "?sheet=Relationship")
    .then(res=>res.json())


])

.then(([memories, dreams, relationshipData])=>{


    console.log("MEMORIES:", memories);

    console.log("BUCKET:", dreams);

    console.log("RELATIONSHIP:", relationshipData);



    // =======================
    // MEMORIES
    // =======================


    const memoryContainer =
    document.getElementById("memory-container");



    if(memoryContainer){


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
    // BUCKET LIST
    // =======================



    const bucketContainer =
    document.getElementById("bucket-container");



    if(bucketContainer){


        dreams.forEach(dream=>{


            bucketContainer.innerHTML += `


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


            `;


        });


    }







    // =======================
    // RELATIONSHIP + SONG
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





    const song =
    document.getElementById("song-link");



    if(song && relationship["Our Song"]){

        song.src =
        relationship["Our Song"];

    }





    // =======================
    // REMOVE LOADER AFTER DATA READY
    // =======================


    hideLoader();



})

.catch(error=>{


    console.error("LOAD ERROR:",error);


    hideLoader();


});








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