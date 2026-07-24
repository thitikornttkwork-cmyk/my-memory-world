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

        <div class="card">

            <h3>
            ❤️ ${memory.Title}
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

.catch(error => {

    console.error("Bucket Error:", error);

});