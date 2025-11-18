 const familyBtn = document.getElementById("familyBtn");
const associationBtn = document.getElementById("associationBtn");
const familyBox = document.getElementById("familyBox");
const associationBox = document.getElementById("associationBox");
const familyList = document.getElementById("familyList");
const addFamilyForm = document.getElementById("addFamilyForm");

// --- Show Family box ---
familyBtn.addEventListener("click", () => {
  familyBox.classList.remove("hidden");
  associationBox.classList.add("hidden");
});

// --- Show Association box ---
associationBtn.addEventListener("click", () => {
  associationBox.classList.remove("hidden");
  familyBox.classList.add("hidden");
});

// --- Add family ---
addFamilyForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("familyName").value.trim();
  const link = document.getElementById("familyLink").value.trim();

  const pattern = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})([\/\w .-]*)*\/?$/i;

  //   Check name  
  if (name === "") {
    alert("Please enter a family name!");
    return;  
  }

  //  check link validity
  if (!pattern.test(link)) {
    alert("Please enter a valid link!");
    return;  
  }

  // If everything is valid 
  const card = document.createElement("div");
  card.classList.add("family-card");
  card.innerHTML = `<a href="${link}" target="_blank">${name}</a>`;
  familyList.appendChild(card);

 
  addFamilyForm.reset();
  alert(" Family added successfully!");
});
