<?php
$isPartial = isset($_GET['partial']) && $_GET['partial'] == '1';

if (!$isPartial && basename($_SERVER['SCRIPT_NAME']) === 'board.php') {
    header('Location: index.php?page=board');
    exit;
}
?>
<?php

require_once __DIR__ . '/includes/session.php';
require_once __DIR__ . '/config/db.php';

// =======================
// Simulate a logged-in user (testing only)
// =======================
//$_SESSION['user_id'] = 2;

// =======================
// Database connection
// =======================
//$host = "localhost";
//$userDB = "root";
//$passDB = "";
//$db = "shop_db";

//$conn = new mysqli($host, $userDB, $passDB, $db);
//if ($conn->connect_error) die("Connection failed: " . $conn->connect_error);


$name = "";
$email = "";
$isLoggedIn = false;

if (isset($_SESSION['user_id'])) {
  $user_id = (int) $_SESSION['user_id'];
  $stmt = $conn->prepare("SELECT userName, email FROM account WHERE userId = ?");
  $stmt->bind_param("i", $user_id);
  $stmt->execute();
  $res = $stmt->get_result();

  if ($res && $res->num_rows > 0) {
    $row = $res->fetch_assoc();
    $name = $row['userName'];
    $email = $row['email'];
    $isLoggedIn = true;
  }
  $stmt->close();
}

$conn->close();
?>
<script>
  window.APP_BASE = <?= json_encode(rtrim(dirname($_SERVER['SCRIPT_NAME']), '/')) ?>;
</script>


<script>
  const base = window.APP_BASE || "";
  const url = (p) => "/" + p.replace(/^\/+/, "");

  const user = <?php echo json_encode([
    'isLoggedIn' => $isLoggedIn,
    'name' => $name,
    'email' => $email,
    'id' => $_SESSION['user_id'] ?? null
  ]); ?>;
</script>
<nav>

  <a href="boardStory/donation.html" class=" donationbtn" target="_blank"> Donation</a>

</nav>

<h1 class="title">🌟 Community Stories 🌟</h1>

<div class="main-page">

  <h1>welcom to join our community</h1>
  <button class="circle" id="openBtn">
    <p class="open">share your story</p>
  </button>
</div>


<div class="goal">
  <p>Welcome to our community of faith and inspiration.
    This page is a place where you can share your personal stories and experiences in Islam to inspire, support, and
    strengthen your brothers and sisters in faith. Together, we can spread hope, remind one another of Allah’s mercy,
    and grow closer as an Ummah through the beauty of our shared journeys.
  </p>
</div>

<!-- Carousel Container -->
<div class="carousel-container">
  <div class="movment" id="movment">
    <p> Be the motivation to your brothers and sisters in islam</p>
  </div>

  <div class="carousel" id="carousel">
    <!-- Example starting cards -->
    <div class="card">
      <div class="card-inner">
        <div class="card-face front" style="background-image:url(boardStory/ECRANT.jpg)"></div>
        <div class="card-face back">
          <div class="story">
            <h3> SARAH</h3>
            <p><small>sarah.collins@peacepath.com</small></p>
            <p> I never believed in religion. I trusted only science and reason. But the more I learned about the
              universe, the more I realized everything was too perfect to be by chance.
              I started reading about different religions, and Islam caught my attention.
              It didn’t ask me to stop thinking — it invited me to think more deeply.
              The Qur’an spoke to my mind. It said things like, “Do they not reflect?” and “Do they not look at the
              creation?”
              I spent months studying. Then one evening, I simply knew it — there is only One God.
              I whispered the Shahada alone in my room. I felt tears fall, not from sadness, but from truth.</p>
            <div class="likes">
              <button class="like-btn">❤️</button>
              <span class="like-count"> 55</span>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="card">
      <div class="card-inner">
        <div class="card-face front" style="background-image:url(boardStory/KAABA.jpg)"></div>
        <div class="card-face back">
          <div class="story">

            <h3>David Miller</h3>
            <p><small>david.miller@rationalpath.net</small></p>
            <p> My life was falling apart. My parents were gone, my marriage was broken, and my soul was tired.
              I met an old Muslim woman who told me, “God tests those He loves.”
              She gave me a Qur’an in my language. I read it every night with tears.
              When I reached the verse, “Your Lord has not forsaken you,” I cried until dawn.
              I felt like Allah was talking directly to me, healing my heart word by word.
              That night, I accepted Islam. I didn’t feel alone anymore. Every prayer became a conversation with the
              One who never left me </p>
            <div class="likes">
              <button class="like-btn">❤️</button>
              <span class="like-count"> 80</span>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="card">
      <div class="card-inner">
        <div class="card-face front" style="background-image:url(boardStory/PRIER.jpg)"></div>
        <div class="card-face back">
          <div class="story">
            <h3> Mei Lin</h3>
            <p><small>mei.lin@heartpath.cn</small></p>
            <p> I grew up in a Christian family, but I always had questions no one could answer.
              I wanted to understand why God needed partners, why we prayed through someone instead of to Him.
              During my time in college, I met a Muslim roommate. He never argued; he just lived his faith calmly.
              I started asking him about Islam, and every answer made sense.
              He told me, “We worship the same God who sent Jesus, but we don’t associate anyone with Him.”
              That night, I couldn’t sleep. I kept thinking about the simplicity of it all — One God.
              A week later, I went to the mosque and said the Shahada.
              I walked out feeling reborn — pure, light, and at peace.</p>
            <div class="likes">
              <button class="like-btn">❤️</button>
              <span class="like-count"> 2400</span>
            </div>
          </div>
        </div>
      </div>
    </div>



    <div class="card">
      <div class="card-inner">
        <div class="card-face front" style="background-image:url(boardStory/india.jpg)"></div>
        <div class="card-face back">
          <div class="story">
            <h3> Arjun Patel</h3>
            <p><small>arjun.patel@oneness.in</small></p>
            <p> I was raised in a Hindu family in India, surrounded by temples and rituals.
              I respected all beliefs but always wondered why there were so many gods.
              When I went to university, I met a Muslim roommate. He prayed five times a day, no matter how busy he
              was.
              I once asked him, “How can you be sure your way is right?”
              He smiled and said, “Because it’s the way of pure monotheism — one Creator, one purpose.”
              That answer stayed in my heart.
              I started reading about Islam and the Qur’an’s explanation of creation and life.
              It was simple and beautiful.
              One morning, I stood alone in my dorm and said the Shahada.
              Now, every time I pray, I feel closer to the One I had been searching for all my life.
            </p>
            <div class="likes">
              <button class="like-btn">❤️</button>
              <span class="like-count">120</span>
            </div>
          </div>
        </div>
      </div>
    </div>




    <div class="card">
      <div class="card-inner">
        <div class="card-face front"
          style="background-image:url(boardStory/merve-kalafat-yilmaz-am0iq-lfb0U-unsplash.jpg)"></div>
        <div class="card-face back">
          <div class="story">
            <h3>Maria Torres</h3>
            <p><small>maria.torres@newlightmail.com</small></p>
            <p> At university, I used to watch Muslims praying between classes. The way they bowed and whispered so
              humbly made me wonder what they were feeling.
              I started reading about Islam just out of curiosity. But the more I read, the more I felt something
              awakening inside me.
              One Friday, I attended a sermon. I didn’t understand all the words, but the recitation touched my soul.
              I went home and cried for hours. Then I said the Shahada.
              My name changed later, but my heart changed first.
              Now every day feels like a new beginning, guided by Allah.</p>
            <div class="likes">
              <button class="like-btn">❤️</button>
              <span class="like-count"> 160</span>
            </div>
          </div>
        </div>
      </div>
    </div>





    <div class="card">
      <div class="card-inner">
        <div class="card-face front" style="background-image:url(boardStory/FLOWER.jpg)">
        </div>
        <div class="card-face back">
          <div class="story">
            <h3> Alex Johnson</h3>
            <p><small> alex.johnson@quietpath.org</small>
            </p>
            <p> I had always been searching for meaning and peace in life. One day, I met an old friend who seemed
              calm and kind. He told me that his peace came from faith and gave me a small copy of the Qur’an.

              I started reading it every night, and the words touched my heart. Over time, I visited the mosque, met
              new people, and saw how Islam teaches honesty, kindness, and compassion.

              After months of learning and reflection, I decided to say the Shahada (the declaration of faith). It
              wasn't a sudden change, but a peaceful decision that gave my life purpose and calmness.

              Now, faith helps me to be more patient, grateful, and caring toward others every day.


            </p>

            <div class="likes">
              <button class="like-btn">❤️</button>
              <span class="like-count"> 55</span>
            </div>
          </div>
        </div>
      </div>
    </div>


  </div>
  <button class="scroll-btn left">⬅</button>
  <button class="scroll-btn right">➡</button>


</div>



<!-- Second Page (Form) -->
<div class="second-page" id="secondPage">
  <div class="content">

    <div class="form-container">
      <!-- سابقاً كان span أو div -->
      <button class="close-btn-x" type="button">&times;</button>



      <h2 class="fade-loop">Fill the form</h2>
      <form id="storyForm">
        <input type="text" id="name" placeholder="Your Name">
        <span class="error-message" id="nameError" aria-live="polite"></span>


        <input type="email" id="email" placeholder="Your Email">

        <span class="error-message" id="emailError" aria-live="polite"></span>

        <input type="file" id="photo" accept="image/*">
        <span class="error-message" id="photoError" aria-live="polite"></span>

        <textarea id="story" placeholder="Write your story..."></textarea>
        <span class="error-message" id="storyError" aria-live="polite"></span>

        <button type="submit">Add Story</button>
        <div id="formSuccess" class="form-success" role="status" aria-live="polite"></div>
      </form>

    </div>

  </div>
</div>

<style>
  :root {
    --error-red: #e23b3b;
    --success-green: #3aa35a;
    --input-border: #ccc;
    --gap: 20px;
  }


  body {
    background-image: url(boardStory/nick-fewings-ZcBY_mxVBCE-unsplash.jpg);
    font-family: Arial, sans-serif;
    background-size: cover;
    background-position: center;
    background-color: #fcf9f8;
    background-repeat: no-repeat;
    text-align: center;
    overflow-x: hidden;
    transition: filter 0.3s ease;

  }

  body::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.1);
    z-index: 1;

  }




  .carousel {
    display: flex;
    gap: 20px;
    transition: transform 0.5s ease;
    will-change: transform;
  }

  .card {
    width: 250px;
    height: 400px;
    perspective: 900px;
    flex-shrink: 0;
    margin: 20px;
  }


  div,
  p,
  nav,
  title,
  h1,
  button {
    position: relative;
    z-index: 1;
  }


  .goal {

    background-color: #f9f9f9;
    border-radius: 10%;
    background-size: contain;

  }


  .goal p {

    position: relative;
    color: rgb(14, 1, 14);
    font-size: 16px;
    text-align: center;
    padding: 20px;
    font-family: "Cormorant Garamond", serif;

    font-size: large;
    font-weight: 600;


  }

  nav {
    background: rgba(51, 51, 51, 0.5);
    color: white;
    padding: 15px;
    display: flex;
    justify-content: center;
    gap: 30px;
  }

  .title {
    margin-top: 20px;
    font-size: 28px;
    color: #f5f5f5;
  }

  /* Main page */
  .main-page {
    text-align: center;
    margin-top: 20px;
  }

  .us {
    color: white;
    display: flex;
    transition: color;
    text-decoration: none;
    font-weight: bold;
    font-size: large;
    padding: 10px 60px;
    transition: all 0.3s ease;
    transform-origin: center;
  }

  .us:hover {
    color: #81C995;
  }

  .donationbtn {
    color: rgb(245, 241, 241);
    display: flex;
    transition: color;
    text-decoration: none;
    font-weight: bold;
    font-size: 30px;
    text-align: left;
    padding: 10px 60px;
    transition: all 0.3s ease;
    transform-origin: left;
  }

  .donationbtn:hover {

    color: #81C995;
    transform: translateX(20px);


  }



  .circle {
    height: 100px;
    width: 100px;
    background-color: #fac2ec;

    color: #1c1b1a;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    margin-top: 0px;
    transition: transform 0.2s ease, color 0.3s ease;
  }


  .edited-label {
    color: gray;
    font-style: italic;
    margin-left: 5px;
  }


  .circle:hover {
    background: repeating-linear-gradient(135deg,
        #aef1f3,

        #a4c2e5 240px,
        #bc95e6 360px);
    background-size: 300% 300%;
    animation: auroraFlow 12s ease infinite;
    color: rgb(24, 23, 23);

    transform: scale(1.1);
  }

  /* Carousel */
  .carousel-container {
    background-color: #a0dce4;
    border-radius: 20%;
    position: relative;
    margin: 40px auto;
    width: 90%;
    overflow: hidden;
  }

  .movment {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-0%, -50%);
    width: 100%;

    font-size: 40px;
    animation: slideLeft 8s linear infinite;

  }

  .open {
    font-family: Georgia, 'Times New Roman', Times, serif;
    font-weight: bold;





  }


  @keyframes slideLeft {
    0% {
      left: 100%;
    }

    100% {
      left: -100%;
    }
  }



  .card-inner {
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.8s;
    cursor: pointer;
  }

  .card.flipped .card-inner {
    transform: rotateY(180deg);
  }

  .card-face {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 15px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    overflow: hidden;
  }

  .front {
    background-size: cover;
    background-position: center;
  }

  .back {
    background: #FFFFFF;
    transform: rotateY(180deg);
    padding: 10px;
    box-sizing: border-box;
    text-align: center;
  }

  .scroll-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgb(16, 15, 15);
    color: white;
    border: none;
    cursor: pointer;
    font-size: 22px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    width: 60px;
    height: 60px;
  }

  .scroll-btn.left {
    left: 10px;
  }

  .scroll-btn.right {
    right: 10px;
  }


  /* Delete button inside the story card */
  button.delete-btn {
    width: 90px;
    height: 50px;
  }

  .delete-btn {
    background-color: #eb858f;
    color: white;
    border: none;
    padding: 8px 14px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;


    transition: background-color 0.3s ease, transform 0.2s ease;
  }

  /* Hover effect */
  .delete-btn:hover {
    background-color: #e04b55;
    transform: scale(1.05);
  }

  /* Optional: subtle pressed effect */
  .delete-btn:active {
    transform: scale(0.95);
  }


  .likes {
    display: flex;
    align-items: center;
    gap: 3px;

  }

  .like-btn {
    background: transparent;
    border: none;
    font-size: 20px;
    cursor: pointer;
    transition: transform 0.2s ease;
  }

  .like-btn:hover {
    transform: scale(1.2);

  }

  .like-btn.liked {
    color: rgb(226, 28, 28);
  }



  /* Form Page */
  .second-page {
    position: fixed;
    top: 0;
    right: -100%;
    width: 60%;
    height: 100%;
    background: rgba(255, 255, 255, 0.3);
    box-shadow: -5px 0 20px rgba(0, 0, 0, 0.2);
    transition: right 0.6s ease;
    backdrop-filter: blur(0px);
    z-index: 100;
  }

  .second-page.active {
    right: 0;
  }

  .second-page .content {
    padding: 40px;
    color: #333;
  }

  .form-container {
    margin: 30px auto;
    width: 450px;
    background: repeating-linear-gradient(135deg,
        #aef1f3,
        #a2cee4 120px,
        #a4c2e5 240px,
        #c4afda 360px);
    background-size: 300% 300%;
    animation: auroraFlow 12s ease infinite;
    color: white;

    padding: 40px;
    border-radius: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .error-message {
    color: var(--error-red);
    font-size: 0.9em;
    min-height: 1.1em;
    text-align: left;
    margin-bottom: 6px;
  }

  .error {
    border-color: var(--error-red) !important;
    box-shadow: 0 0 0 3px rgba(226, 59, 59, 0.08);
  }

  .success {
    border-color: var(--success-green) !important;
    box-shadow: 0 0 0 3px rgba(58, 163, 90, 0.06);
  }

  .form-success {
    color: var(--success-green);
    margin-top: 8px;
    font-weight: 600;
    min-height: 1.1em;
    text-align: left;
  }



  @keyframes auroraFlow {
    0% {
      background-position: 0% 50%;
    }

    50% {
      background-position: 100% 50%;
    }

    100% {
      background-position: 0% 50%;
    }
  }

  input,
  textarea,
  button {
    width: 100%;
    margin: 8px 0;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;

  }

  .form-container button {
    background: #ff9a9e;
    color: white;
    cursor: pointer;
  }

  .fade-loop {
    font-size: 20px;
    font-weight: bold;
    font-size: medium;
    color: #eb8693;
    opacity: 10;
    transform: translateX(-50px);
    animation: fadeInOut 4s ease-in-out infinite;
  }

  @keyframes fadeInOut {
    0% {
      opacity: 0;
      transform: translateX(-50px);
    }

    25% {
      opacity: 1;
      transform: translateX(0);
    }

    75% {
      opacity: 1;
      transform: translateX(0);
    }

    100% {
      opacity: 0;
      transform: translateX(50px);
    }
  }

  .story {
    margin: 10px;
  }

  .story p {
    font-size: large;
  }

  .card .back .story {
    max-height: 100%;
    /* limit the visible story height */
    overflow-y: auto;
    /* enable vertical scrolling */
    padding-right: 6px;
    /* space for scrollbar */
    font-size: 14px;
    line-height: 1.4;
    color: #333;
    scrollbar-width: thin;
    /* for Firefox */
    scrollbar-color: #f3a4a4 #f9f9f9;
  }

  /* Custom scrollbar for Chrome, Edge, Safari */
  .card .back .story::-webkit-scrollbar {
    width: 8px;
  }

  .card .back .story::-webkit-scrollbar-track {
    background: #f9f9f9;
    border-radius: 10px;
  }

  .card .back .story::-webkit-scrollbar-thumb {
    background-color: #f3a4a4;
    border-radius: 10px;
  }

  .card .back .story::-webkit-scrollbar-thumb:hover {
    background-color: #e27373;
  }

  /* Card menu container */
  .card-menu {
    position: absolute;
    top: 10px;
    right: 10px;
    /* position at top-right of the card */
    z-index: 5;
  }

  .card-menu summary {
    list-style: none;
    cursor: pointer;
    font-size: 18px;
    color: #555;
    padding: 5px 10px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.8);
    transition: background 0.3s ease, color 0.3s ease;
  }

  .card-menu summary:hover {
    background: #f0f0f0;
    color: #333;
  }

  /* The dropdown list */
  .card-menu ul {
    position: absolute;
    top: 30px;
    right: 0;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    padding: 5px 0;
    min-width: 120px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 14px;
    text-align: left;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
  }

  /* Show dropdown when summary is clicked */
  .card-menu[open] ul {
    opacity: 1;
    pointer-events: auto;
  }

  /* List items */
  .card-menu li {
    padding: 8px 15px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: background 0.2s ease, color 0.2s ease;
    border-bottom: 1px solid #eee;
  }

  .card-menu li:last-child {
    border-bottom: none;
  }

  /* Hover effects */
  .card-menu li:hover {
    background: #fce4ec;
    color: #e23b3b;
    font-weight: bold;
    border-radius: 6px;
  }

  /* Optional: icons color */
  .card-menu li i {
    color: #e23b3b;
  }

  /* Adjust for mobile */
  @media screen and (max-width: 600px) {
    .card-menu {
      top: 5px;
      right: 5px;
    }

    .card-menu ul {
      min-width: 100px;
    }

    .card-menu li {
      padding: 6px 10px;
      font-size: 13px;
    }
  }



  @media screen and (max-width: 600px) {

    body {
      background-position: center;
      background-size: cover;
      text-align: center;
    }

    .title {
      font-size: 20px;
      margin-top: 10px;
    }

    .main-page h1 {
      font-size: 18px;
      padding: 0 10px;
    }

    .circle {
      width: 80px;
      height: 80px;
      font-size: 12px;
    }

    .carousel-container {
      width: 90%;
      margin: 20px auto;
      border-radius: 10%;
      padding: 20px;

    }

    .carousel {
      gap: 10px;
      margin: 0;
    }

    .card {
      width: 250px;
      height: 300px;
      margin: 10px auto;
    }

    .card .story {
      font-size: 12px;
      font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
      font-weight: bold;
    }

    .scroll-btn {
      width: 40px;
      height: 40px;
      font-size: 16px;
    }

    .second-page {
      width: 100%;
    }

    .form-container {
      width: 90%;

      padding: 50px;
    }

    input,
    textarea,
    button {
      font-size: 14px;
    }

    .fade-loop {
      font-size: 16px;
    }

    .movment {
      font-size: 20px;
      animation-duration: 10s;
    }

    .story p {
      font-size: small;
    }

    .goal {

      background-color: #fcf9f8;
      border-radius: 10%;
    }

    .goal p {

      position: relative;
      color: rgb(24, 23, 24);
      font-size: 15px;
      padding: 10px;
      font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
      font-weight: bolder;

    }
  }
</style>
<script>
  // ===================================

  // 👤 USER (must exist)
  // ===================================
  const form = document.getElementById("storyForm");
  const carousel = document.getElementById("carousel");
  const openBtn = document.getElementById("openBtn");
  const closeBtnX = document.querySelector(".close-btn-x");
  const secondPage = document.getElementById("secondPage");
  const leftBtn = document.querySelector(".scroll-btn.left");
  const rightBtn = document.querySelector(".scroll-btn.right");

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const storyInput = document.getElementById("story");
  const photoInput = document.getElementById("photo");

  const storyError = document.getElementById("storyError");
  const photoError = document.getElementById("photoError");
  const formSuccess = document.getElementById("formSuccess");

  let currentIndex = 0;
  const getCards = () => Array.from(document.querySelectorAll(".card"));

  // ===================================
  // 🔐 Login check for Name & Email
  // ===================================
  nameInput.addEventListener("focus", handleAuthField);
  emailInput.addEventListener("focus", handleAuthField);

  function handleAuthField(e) {
    if (!user.isLoggedIn) {
      secondPage.classList.remove("active");
      document.body.classList.remove("blur");
      window.location.href = url("pages/signin.php");
      return false;
    }
  }

  // ===================================
  // 🧠 Auto-fill Name & Email
  // ===================================
  function initBoard() {
    if (user.isLoggedIn) {
      nameInput.value = user.name;
      emailInput.value = user.email;

      nameInput.addEventListener("keydown", e => e.preventDefault());
      emailInput.addEventListener("keydown", e => e.preventDefault());
    }
    loadStories();
  }

  // Run immediately (works for injected view)
  initBoard();


  // ===================================
  // ===== Helpers ======
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // ===================================
  // ===== Carousel ======
  function updateCarousel() {
    const cards = getCards();
    if (!cards.length) {
      carousel.style.transform = "translateX(0)";
      return;
    }

    const cardWidth = cards[0].getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(carousel).gap || 20);

    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex >= cards.length) currentIndex = cards.length - 1;

    carousel.style.transform = `translateX(${-(cardWidth + gap) * currentIndex}px)`;
  }

  leftBtn.addEventListener("click", () => {
    currentIndex--;
    if (currentIndex < 0) currentIndex = Math.max(0, getCards().length - 1);
    updateCarousel();
  });
  rightBtn.addEventListener("click", () => {
    currentIndex++;
    if (currentIndex >= getCards().length) currentIndex = 0;
    updateCarousel();
  });

  // ===================================
  // ===== Card Flip ======
  function attachCardFlip(card) {
    card.addEventListener("click", e => {
      if (e.target.closest(".card-menu") || e.target.classList.contains("edit-textarea") || e.target.classList.contains("save-edit-btn")) return;
      getCards().forEach(c => { if (c !== card) c.classList.remove("flipped"); });
      card.classList.toggle("flipped");
    });
  }
  getCards().forEach(attachCardFlip);

  // ===================================
  // ❤️ Likes system
  // ===================================
  document.addEventListener("click", async e => {
    if (e.target.classList.contains("like-btn")) {
      const card = e.target.closest(".card");
      const storyId = card.dataset.storyId;
      const action = e.target.classList.contains("liked") ? "unlike" : "like";

      try {
        const res = await fetch(url(("./boardStory/like_story.php")), {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `storyId=${storyId}&userId=${user.id}&action=${action}`
        });
        const text = await res.text();
        console.log("EDIT status:", res.status);
        console.log("EDIT response:", text);

        let data;
        try { data = JSON.parse(text); }
        catch { alert("edit_story.php did not return JSON (check console)"); return; }

        if (data.success) {
          e.target.classList.toggle("liked");
          card.querySelector(".like-count").textContent = data.likes;
        }
      } catch (err) {
        console.error(err);
      }
    }
  });

  // ===================================
  // 🪟 Open / Close Form
  // ===================================
  openBtn.addEventListener("click", () => {
    secondPage.classList.add("active");
    document.body.classList.add("blur");
  });
  closeBtnX.addEventListener("click", () => {
    secondPage.classList.remove("active");
    document.body.classList.remove("blur");
  });

  // ===================================
  // 📷 Photo Validation
  // ===================================
  photoInput.addEventListener("change", () => {
    const file = photoInput.files[0];
    if (file && !file.type.startsWith("image/")) {
      photoError.textContent = "Uploaded file is not an image.";
    } else {
      photoError.textContent = "";
    }
  });

  // ===================================
  // 🧱 Create Card
  // ===================================
  function createCard({ storyId, name, email, story, imgURL, likes = 0, liked = false, updatedAt = null }) {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.owner = email;
    card.dataset.storyId = storyId;

    const editedLabel = updatedAt ? `<small class="edited-label">(Edited)</small>` : "";

    
     card.innerHTML = `
  <div class="card-inner">
    <div class="card-face front" style="background-image:url('${imgURL || "boardStory/FLOWER.jpg"}')"></div>
    <div class="card-face back">
      <div class="story">
        <h3 style="margin-top: 10px;">${escapeHtml(name)}</h3>
        ${editedLabel}
        <details class="card-menu">
          <summary>⋮</summary>
          <ul>
            <li class="delete-option">Delete</li>
            <li class="edit-option">Edit</li>
            <li class="report-option">Report</li>
          </ul>
        </details>
        <p style="margin-top: 60px;">${escapeHtml(story)}</p>
        <div class="likes" style="margin-top: 10px;">
          <button class="like-btn ${liked ? "liked" : ""}">❤️</button>
          <span class="like-count">${likes}</span>
        </div>
      </div>
    </div>
  </div>
`;

    carousel.prepend(card);
    attachCardFlip(card);
    updateCarousel();
  }

  // ===================================
  // Delete / Report / Edit
  // ===================================
  document.addEventListener("click", async e => {
    const card = e.target.closest(".card");
    if (!card) return;
    const storyId = card.dataset.storyId;

    // Delete
    if (e.target.classList.contains("delete-option")) {
      if (card.dataset.owner !== user.email) return alert("❌ You can only delete your own story.");
      if (!confirm("Are you sure you want to delete this story?")) return;

      try {
        const res = await fetch(url("boardStory/delete_story.php"), {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `storyId=${storyId}&userId=${user.id}`
        });
        const data = await res.json();
        if (data.success) {
          card.remove();
          updateCarousel();
        } else alert(data.message);
      } catch (err) {
        console.error(err);
      }
    }

    // Report
    if (e.target.classList.contains("report-option")) {
      try {
        const res = await fetch(url(("boardStory/report_story.php")), {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `storyId=${storyId}&userId=${user.id}`
        });
        const data = await res.json();
        if (data.success) alert("🚩 Story reported!");
      } catch (err) {
        console.error(err);
      }
    }

    // Edit
    if (e.target.classList.contains("edit-option")) {
      if (card.dataset.owner !== user.email) return alert("❌ You can only edit your own story.");

      const storyP = card.querySelector(".story p");
      const currentStory = storyP.textContent;

      // Close menu
      const details = card.querySelector("details.card-menu");
      if (details) details.removeAttribute("open");

      // Replace with textarea
      const textarea = document.createElement("textarea");
      textarea.value = currentStory;
      textarea.className = "edit-textarea";
      storyP.replaceWith(textarea);
      textarea.focus();

      // Buttons container
      const btnContainer = document.createElement("div");
      btnContainer.className = "edit-btn-container";
      textarea.insertAdjacentElement("afterend", btnContainer);

      const saveBtn = document.createElement("button");
      saveBtn.textContent = "Save";
      saveBtn.className = "save-edit-btn";
      btnContainer.appendChild(saveBtn);

      const cancelBtn = document.createElement("button");
      cancelBtn.textContent = "Cancel";
      cancelBtn.className = "cancel-edit-btn";
      btnContainer.appendChild(cancelBtn);

      // Save
      saveBtn.addEventListener("click", async () => {
        const updatedStory = textarea.value.trim();
        if (!updatedStory) return alert("Story cannot be empty");

        saveBtn.disabled = true;
        saveBtn.textContent = "Saving...";

        try {
          const formData = new FormData();
          formData.append("storyId", storyId);
          formData.append("story", updatedStory);

          // const res = await fetch(url(("boardStory/edit_story.php")), { method: "POST", body: formData });
          //const data = await res.json();

          const editUrl = url("boardStory/edit_story.php");
          const res = await fetch(editUrl, { method: "POST", body: formData });
          const text = await res.text();

          console.log("EDIT URL:", url);
          console.log("EDIT status:", res.status);
          console.log("EDIT raw response:", text);
          alert(text.slice(0, 300));


          let data;
          try {
            data = JSON.parse(text);
          } catch (e) {
            alert("edit_story.php returned NOT JSON. Check console (EDIT raw response).");
            throw e;
          }


          if (data.success) {
            const p = document.createElement("p");
            p.textContent = data.story;
            textarea.replaceWith(p);
            btnContainer.remove();

            // Add (Edited) label
            const editedLabel = card.querySelector(".edited-label");
            if (!editedLabel) {
              const h3 = card.querySelector(".story h3");
              const label = document.createElement("small");
              label.className = "edited-label";
              label.textContent = "(Edited)";
              h3.insertAdjacentElement("afterend", label);
            }
          } else {
            alert(data.message);
            saveBtn.disabled = false;
            saveBtn.textContent = "Save";
          }
        } catch (err) {
          console.error(err);
          alert("Error updating story");
          saveBtn.disabled = false;
          saveBtn.textContent = "Save";
        }
      });

      // Cancel
      cancelBtn.addEventListener("click", () => {
        const p = document.createElement("p");
        p.textContent = currentStory;
        textarea.replaceWith(p);
        btnContainer.remove();
      });
    }
  });

  // ===================================
  //   Form Submit
  // ===================================
  form.addEventListener("submit", async e => {
    e.preventDefault();

    if (!user.isLoggedIn) {
      alert("Please log in first");
      window.location.href = url("pages/signin.php");
      return;
    }

    const story = storyInput.value.trim();
    const photo = photoInput.files[0];
    let hasError = false;

    storyInput.addEventListener("input", () => storyError.textContent = "");

    if (!story) {
      storyError.textContent = "Please write your story.";
      hasError = true;
    }
    if (hasError) return;

    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("story", story);
    if (photo) formData.append("photo", photo);

    try {
  const res = await fetch(url("boardStory/add_story.php"), {
    method: "POST",
    body: formData
  });

  const data = await res.json();

  if (data.success) {
    createCard({
      storyId: data.storyId,
      name: data.name,
      email: data.email,
      story: data.story,
      imgURL: data.imgURL,
      likes: 0,
      liked: false
    });

    form.reset();
    nameInput.value = user.name;
    emailInput.value = user.email;
    formSuccess.textContent = "Story added successfully!";
    setTimeout(() => formSuccess.textContent = "", 3000);
  } else {
    alert(data.message);
  }
} catch (err) {
  console.error(err);
  alert("Error submitting story");
}

  });

  // ===================================
  // Load stories from DB
  // ===================================
  async function loadStories() {
    try {
      const res = await fetch(url('boardStory/get_stories.php'));
      const stories = await res.json();

      stories.forEach(s => {
        createCard({
          storyId: s.storyId,
          name: s.userName,
          email: s.email,
          story: s.story,
          imgURL: s.image_path || "boardStory/FLOWER.jpg",
          likes: s.totalLikes,
          liked: s.userLiked > 0,
          updatedAt: s.updatedAt // persists edited label
        });
      });
    } catch (err) {
      console.error("Failed to load stories:", err);
    }
  }

  window.addEventListener("resize", updateCarousel);


</script>