function fetchAndDisplayAreaname() {
  // Fetch data from the API endpoint
  fetch("http://localhost:3000/TvsA")
    .then((response) => response.json()) // Parse the response as JSON
    .then((data) => {
      const userContainer = document.getElementById("Area"); // Get the container element to display the data
      userContainer.innerHTML = ""; // Clear any existing content

      // Loop through the data and create a card for each user
      data.forEach((user) => {
        const userCard = document.createElement("div"); // Create a new card element
        userCard.classList.add("card"); // Add the "card" class to the card element

        // Set the HTML content of the card
        userCard.innerHTML = `
          <div class="card-body">
            <h5 class="card-title">Total Cases in each State: ${user.area_name}</h5>
          </div>
        `;

        userContainer.appendChild(userCard); // Append the card to the container
      });
    })
    .catch((error) => {
      console.log("Error:", error); // Handle any errors that occur during the fetch or data processing
    });
}

function fetchAndDisplaySumtc() {
  // Fetch data from the API endpoint
  fetch("http://localhost:3000/sumtc")
    .then((response) => response.json()) // Parse the response as JSON
    .then((data) => {
      const sumContainer = document.getElementById("sumtc"); // Get the container element to display the sum
      sumContainer.textContent = `${data.sum}`; // Set the sum value as the text content of the container
    })
    .catch((error) => {
      console.log("Error:", error); // Handle any errors that occur during the fetch or data processing
    });
}

function fetchAndDisplaySump_ar() {
  fetch("http://localhost:3000/sump_ar")
    .then((response) => response.json())
    .then((data) => {
      const sumContainer = document.getElementById("sump_ar");
      sumContainer.textContent = `${data.sum}`;
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}

function fetchAndDisplaySump_cv() {
  fetch("http://localhost:3000/sump_cv")
    .then((response) => response.json())
    .then((data) => {
      const sumContainer = document.getElementById("sump_cv");
      sumContainer.textContent = `${data.sum}`;
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}

function fetchAndDisplaySump_aq() {
  fetch("http://localhost:3000/sump_aq")
    .then((response) => response.json())
    .then((data) => {
      const sumContainer = document.getElementById("sump_aq");
      sumContainer.textContent = `${data.sum}`;
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}

function fetchAndDisplayPCVbyYear() {
  fetch("http://localhost:3000/PCVvsYear")
    .then((response) => response.json())
    .then((data) => {
      const PCVvsYear = document.getElementById("PCVvsYear");
      PCVvsYear.innerHTML = "";
      data.forEach((user) => {
        const userCard = document.createElement("div");
        userCard.classList.add("card");
        userCard.innerHTML = `
    <div class="card-body">
    <h5 class="card-title">Total people convicted: ${user.year}</h5>    
    </div> `;
        PCVvsYear.appendChild(userCard);
      });
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}

function fetchAndDisplayPARbyYear() {
  fetch("http://localhost:3000/ParvsYear")
    .then((response) => response.json())
    .then((data) => {
      const ParvsYear = document.getElementById("ParvsYear");
      ParvsYear.innerHTML = "";
      data.forEach((user) => {
        const userCard = document.createElement("div");
        userCard.classList.add("card");
        userCard.innerHTML = `
    <div class="card-body">
    <h5 class="card-title">People Arrested every year: ${user.year}</h5>    
    </div> `;
        ParvsYear.appendChild(userCard);
      });
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}

function fetchAndDisplayTCbyYear() {
  fetch("http://localhost:3000/TCvsYear")
    .then((response) => response.json())
    .then((data) => {
      const TCvsYear = document.getElementById("TCvsYear");
      TCvsYear.innerHTML = "";
      data.forEach((user) => {
        const userCard = document.createElement("div");
        userCard.classList.add("card");
        userCard.innerHTML = `
    <div class="card-body">
    <h5 class="card-title">total cases : ${user.year}</h5>    
    </div> `;
        TCvsYear.appendChild(userCard);
      });
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}

function fetchAndDisplaytrialrate() {
  fetch("http://localhost:3000/trialrate")
    .then((response) => response.json())
    .then((data) => {
      const trialrate = document.getElementById("trialrate");
      trialrate.innerHTML = "";
      data.forEach((user) => {
        const userCard = document.createElement("div");
        userCard.classList.add("card");
        userCard.innerHTML = `
    <div class="card-body">
    <h5 class="card-title">People Arrested every year: ${user.area_name}</h5>    
    </div> `;
        trialrate.appendChild(userCard);
      });
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  fetchAndDisplayarea();
});

function fetchAndDisplayarea() {
  fetch("http://localhost:3000/area")
    .then((response) => response.json())
    .then((data) => {
      const area = document.getElementById("area");
      area.innerHTML = "";
      data.forEach((user) => {
        const userCard = document.createElement("div");
        userCard.classList.add("card");
        userCard.innerHTML = `
    <div class="card-body">
    <h5 class="card-title">All the states: ${user.area_name}</h5>    
    </div> `;
        area.appendChild(userCard);
      });
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}

function fetchAndDisplaytotalcrimes() {
  fetch("http://localhost:3000/totalcrimes")
    .then((response) => response.json())
    .then((data) => {
      const totalcrimes = document.getElementById("totalcrimes");
      totalcrimes.innerHTML = "";
      data.forEach((user) => {
        const userCard = document.createElement("div");
        userCard.classList.add("card");
        userCard.innerHTML = `
    <div class="card-body">
    <h5 class="card-title">All the states: ${user.group_name}</h5>    
    </div> `;
        totalcrimes.appendChild(userCard);
      });
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}

function fetchAndDisplayarrestrate() {
  fetch("http://localhost:3000/arrestrate")
    .then((response) => response.json())
    .then((data) => {
      const arrestrate = document.getElementById("arrestrate");
      arrestrate.innerHTML = "";
      data.forEach((user) => {
        const userCard = document.createElement("div");
        userCard.classList.add("card");
        userCard.innerHTML = `
    <div class="card-body">
    <h5 class="card-title">All the states: ${user.area_name}</h5>    
    </div> `;
        arrestrate.appendChild(userCard);
      });
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}

fetchAndDisplayAreaname();
fetchAndDisplaySumtc();
fetchAndDisplaySump_ar();
fetchAndDisplaySump_cv();
fetchAndDisplaySump_aq();
fetchAndDisplayPCVbyYear();
fetchAndDisplayTCbyYear();
fetchAndDisplayPARbyYear();
fetchAndDisplaytrialrate();
fetchAndDisplayarea();
fetchAndDisplaytotalcrimes();
fetchAndDisplayarrestrate();
