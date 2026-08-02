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