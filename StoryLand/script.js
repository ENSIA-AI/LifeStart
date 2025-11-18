 const form = document.getElementById("storyForm");
form.setAttribute("novalidate", true);
const carousel = document.getElementById("carousel");
const getCards = () => document.querySelectorAll(".card");

let currentIndex = 0;
const cardWidth = 260;

// === Smooth Carousel Update ===
function updateCarousel() {
  const offset = -currentIndex * cardWidth;
  carousel.style.transform = `translateX(${offset}px)`;
  carousel.style.transition = "transform 0.5s ease";
}

// === Scroll Buttons (Circular Loop) ===
document.querySelector(".scroll-btn.left").addEventListener("click", () => {
  currentIndex--;
  if (currentIndex < 0) currentIndex = getCards().length - 1;
  updateCarousel();
});

document.querySelector(".scroll-btn.right").addEventListener("click", () => {
  currentIndex++;
  if (currentIndex >= getCards().length) currentIndex = 0;
  updateCarousel();
});

// === Flip Existing Cards ===
getCards().forEach(card => {
  card.addEventListener("click", () => {
    getCards().forEach(c => {
      if (c !== card) c.classList.remove("flipped");
    });
    card.classList.toggle("flipped");
  });
});

// === Add New Story Card ===
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const storyInput = document.getElementById("story");
  const photoInput = document.getElementById("photo");

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const story = storyInput.value.trim();
  const photo = photoInput.files[0];

  if (!name || !email || !story) {
    alert("Please fill the whole form");
    return;
  }

  const isEmail = (email) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/.test(email);

  if (!isEmail(email)) {
    alert("Invalid email format.");
    emailInput.classList.add("error");
    return;
  } else {
    emailInput.classList.remove("error");
    emailInput.classList.add("success");
  }

  const reader = new FileReader();

  const createCard = (imgURL) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <div class="card-inner">
        <div class="card-face front" style="background-image:url('${imgURL}')"></div>
        <div class="card-face back">
          <div class="story">
            <h3>${name}</h3>
             
            <p><small>${email}</small></p>
            <button class="delete-btn">🗑️ Delete</button>
            
            <p>${story}</p>
              <div class="likes">
      <button class="like-btn">❤️</button>
      <span class="like-count">0</span>
    </div>
            
          </div>
        </div>
      </div>
    `;

    // === Flip behavior ===
    card.addEventListener("click", (e) => {
      if (e.target.classList.contains("delete-btn")) return; // skip flip on delete click
      getCards().forEach(c => {
        if (c !== card) c.classList.remove("flipped");
      });
      card.classList.toggle("flipped");
    });

    // === Delete Button with Confirmation ===
    const deleteBtn = card.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => {
      const confirmed = confirm(`Are you sure you want to delete ${name}'s story?`);
      if (confirmed) {
        card.remove();
        alert(`${name}'s story deleted.`);
        currentIndex = 0; // reset carousel position
        updateCarousel();
      }
    });

    // === Add new card to carousel ===
    carousel.insertBefore(card, carousel.firstChild);
    alert(`Story added for ${name}`);
    form.reset();
  };

  // === Use uploaded photo or default ===
  if (!photo || !photo.type.startsWith("image/")) {
    const defaultPhoto = "FLOWER.jpg";
    createCard(defaultPhoto);
  } else {
    reader.onload = (event) => {
      const imgURL = event.target.result;
      createCard(imgURL);
    };
    reader.readAsDataURL(photo);
  }
});

// === Slide-in Form Page ===
const openBtn = document.getElementById("openBtn");
const closeBtn = document.getElementById("closeBtn");
const secondPage = document.getElementById("secondPage");

openBtn.addEventListener("click", () => {
  secondPage.classList.add("active");
  document.body.classList.add("blur");
});

closeBtn.addEventListener("click", () => {
  secondPage.classList.remove("active");
  document.body.classList.remove("blur");
});


// Simple local system (frontend only)
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("like-btn")) {
    const btn = e.target;
    const countSpan = btn.nextElementSibling;
    let count = parseInt(countSpan.textContent);

    if (btn.classList.contains("liked")) {
      // If already liked, remove like
      count--;
      btn.classList.remove("liked");
    } else {
      // Add like
      count++;
      btn.classList.add("liked");
    }

    countSpan.textContent = count;
  }
});
