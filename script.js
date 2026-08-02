const API_URL = "https://script.google.com/macros/s/AKfycbxRlqmqImuFrI5eHVsIyxoyTCH_HiS6kBQ1bCMNs3QXeS6J2126G2FS6F6yHjLmnebYGA/exec";


// =======================
// Relationship
// =======================

fetch(API_URL + "?sheet=Relationship")

.then(response => response.json())

.then(data => {


    let relationship = {};


    data.forEach(item => {

        relationship[item.Field] = item.Value;

    });



    document.getElementById("couple-name").innerText =
    relationship["Couple Name"] || "";



    document.getElementById("together-since").innerText =
    "Together Since " + (relationship["Together Since"] || "");


})

.catch(error => {

    console.error("Relationship Error:", error);

});





// =======================
// Memories
// =======================

const MEMORY_API = API_URL + "?sheet=Memories";



fetch(MEMORY_API)

.then(response => response.json())

.then(memories => {


    const container =
    document.getElementById("memory-container");



    memories.forEach(memory => {



        container.innerHTML += `


        <div class="card memory-card">


            ${
            memory.Favorite === "TRUE"
            ?
            `
            <div class="favorite-badge">
                ⭐ Favorite
            </div>
            `
            :
            ""
            }



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

            ${
            memory.Favorite === "TRUE"
            ?
            "⭐ "
            :
            "❤️ "
            }

            ${memory.Title || ""}

            </h3>



            <p>
            ${memory.Description || ""}
            </p>



            <p>
            👥 ${memory.People || ""}
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



})


.catch(error => {

    console.error("Memory Error:", error);

});








// =======================
// Bucket List
// =======================


const BUCKET_API = API_URL + "?sheet=Bucket%20List";



fetch(BUCKET_API)


.then(response => response.json())


.then(dreams => {



    const container =
    document.getElementById("bucket-container");



    dreams.forEach(dream => {



        container.innerHTML += `



        <div class="card dream-card">



            <h3>

            ✨ ${dream.Dream || ""}

            </h3>




            <p>

            ${dream.Description || ""}

            </p>





            <p>

            <span class="priority-badge">

            🔥 ${dream.Priority || ""}

            </span>

            </p>





            <p>

            <span class="status-badge">

            📌 ${dream.Status || ""}

            </span>

            </p>



        </div>



        `;



    });



})


.catch(error => {

    console.error("Bucket Error:", error);

});








// =======================
// Anniversary Counter
// =======================


const startDate = new Date("2026-04-28");


const today = new Date();


const difference = today - startDate;



const days = Math.floor(

    difference /
    (1000 * 60 * 60 * 24)

);



document.getElementById("days-count").innerText = days;








// =======================
// Our Song
// =======================


fetch(API_URL + "?sheet=Relationship")


.then(response => response.json())


.then(data => {


    let relationship = {};



    data.forEach(item => {


        relationship[item.Field] = item.Value;


    });



    const song = relationship["Our Song"];



    if(song){


        document.getElementById("song-link").src = song;


    }



})


.catch(error => {

    console.error("Song Error:", error);

});

// =======================
// Page Loader
// =======================


window.addEventListener("load", () => {


    const loader =
    document.querySelector(".page-loader");



    if(loader){


        setTimeout(()=>{


            loader.classList.add("hide");


        },1000);


    }


});

// =======================
// Scroll Reveal
// =======================


const revealElements = document.querySelectorAll(
    ".story-item, .memory-card, .dream-card"
);



const revealOnScroll = () => {


    revealElements.forEach(element => {


        const windowHeight =
        window.innerHeight;


        const elementTop =
        element.getBoundingClientRect().top;



        if(elementTop < windowHeight - 100){


            element.classList.add("show");


        }


    });


};



window.addEventListener(
    "scroll",
    revealOnScroll
);



revealOnScroll();

// =======================
// Floating Hearts Effect
// =======================


function createHeart(){


    const heart = document.createElement("div");


    heart.className = "floating-heart-bg";


    heart.innerHTML = "❤️";


    heart.style.left =
    Math.random() * 100 + "%";


    heart.style.animationDuration =
    (5 + Math.random() * 5) + "s";


    heart.style.fontSize =
    (10 + Math.random() * 20) + "px";



    document.body.appendChild(heart);



    setTimeout(()=>{

        heart.remove();

    },10000);


}



setInterval(
    createHeart,
    1200
);