<?php
$isPartial = isset($_GET['partial']) && $_GET['partial'] == '1';

if (!$isPartial && basename($_SERVER['SCRIPT_NAME']) === 'home.php') {
    header('Location: index.php?page=home');
    exit;
}
?>

<?php
require_once __DIR__ . '/includes/session.php';
require_once __DIR__ . '/config/db.php';

function getTopProducts(mysqli $conn, int $limit = 3): array
{
    $sql = "SELECT id, name, price, description, rating, image
            FROM product
            ORDER BY rating DESC, id DESC
            LIMIT ?";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $limit);
    $stmt->execute();
    $res = $stmt->get_result();

    $products = [];
    while ($row = $res->fetch_assoc()) {
        $products[] = $row;
    }

    $stmt->close();
    return $products;
}

$topProducts = getTopProducts($conn, 3);
?>

<div class="islamic-home-container">
    <div class="headerContainer">
        <div class="header">
            <div class="headerLinks left-links">
                <a href="#shop">Our Shop</a>
                <a href="#concept">Site Concept</a>
            </div>

            <a href="#home" class="logo">
                <img src="logo.jpg" class="lg" alt="LifeStart logo">
            </a>

            <div class="headerLinks right-links">
                <a href="#aboutus">About Us</a>
                <a href="#courses">Courses</a>
                <?php if (empty($_SESSION['logged_in'])): ?>
                    <a href="pages/signin.php" target="_blank">
                        <button class="btn">Join-Us</button>
                    </a>
                <?php else: ?>

                    <a href="pages/profile.php" target="_blank">
                        <button class="btn">Profile</button>
                    </a>

                <?php endif; ?>

            </div>
        </div>
    </div>

    <!-- HERO SECTION -->
    <div class="hero-section">
        <div class="hero-content">
            <p class="welcome-text">Welcome to Islam Guide</p>
            <h1 class="main-heading">YOUR ISLAMIC LEARNING JOURNEY STARTS HERE!</h1>
            <p class="hero-description">
                Islam Guide is a comprehensive platform dedicated to helping new Muslims
                learn about Islam through authentic resources, educational materials,
                and a supportive community. Start your spiritual journey with us today.
            </p>
        </div>
    </div>

    <!-- PRODUCTS SECTION -->
    <div class="products-section" id="shop">
        <div class="section-header">
            <span class="section-badge">Islamic Products</span>
            <div class="title-row">
                <h2>Best Rated Items</h2>
                <a href="Shop/s.php" target="_blank"><button class="btn view-all-btn" onclick="viewAllProducts()">View
                        All Products</button>
                </a>
            </div>
        </div>
        <div class="products-grid">
            <?php if (empty($topProducts)): ?>
                <p style="text-align:center;color:#4299e1;padding:2rem;">No products available.</p>
            <?php else: ?>
                <?php foreach ($topProducts as $p): ?>
                    <?php
                    $name = htmlspecialchars($p['name']);
                    $desc = htmlspecialchars($p['description']);
                    $img = htmlspecialchars($p['image']);   // ex: photo/w4.jpeg
                    $rating = htmlspecialchars($p['rating']);
                    $price = htmlspecialchars($p['price']);
                    ?>
                    <a href="Shop/s.php" target="_blank" class="product-card" style="text-decoration:none;display:block;">
                        <div class="product-info">
                            <img src="Shop/<?= $img ?>" alt="<?= $name ?>">
                            <div class="product-name"><?= $name ?></div>
                            <div class="product-rating">⭐ <?= $rating ?>/5</div>
                            <div class="product-price"><?= $price ?> DA</div>
                            <div class="product-description">
                                <?= htmlspecialchars_decode($desc, ENT_QUOTES) ?>
                            </div>

                        </div>
                    </a>
                <?php endforeach; ?>
            <?php endif; ?>
        </div>



    </div>
    <!-- SIMPLE COURSES SECTION -->
    <section class="content-section courses-section" id="courses">
        <div class="section-inner">
            <div class="section-header">
                <span class="section-badge">Start Learning</span>
                <h2 class="section-title">Islamic Courses</h2>
            </div>
            <div class="simple-course-cta">
                <p>Start your Islamic learning journey with our comprehensive courses designed for all knowledge levels.
                    Learn Quran, Hadith, Islamic history, and more with qualified teachers.</p>
                <a href="Courses/welcoming-page.php" target="_blank"><button class="course-btn">Explore All
                        Courses</button></a>
            </div>
        </div>
    </section>


    <!-- LEARNING APPROACH -->
    <div class="content-section concept-section" id="concept">
        <div class="section-inner">
            <h2>Our Learning Approach</h2>
            <div class="text-content">
                <p>At LifeStart, we believe that true life begins when the heart finds its way back to Allah. Our goal
                    is to guide every seeker—from curious non-Muslims to young Muslims—to discover Islam in a clear,
                    inspiring, and authentic way. We combine traditional Islamic knowledge with modern tools to help you
                    move from confusion to clarity, from darkness to light.
                </p>

                <h3>Educational Philosophy</h3>
                <p>Knowledge that opens the heart and strengthens faith.A clear path for beginners and those who want to
                    reconnect with Islam.
                    Authentic teachings presented in a simple, welcoming, and inspiring way.</p>

                <h3>Teaching Methodology</h3>
                <p>Real-life examples that show how Islam brings peace, purpose, and meaning.
                    Interactive lessons to help you reflect, understand, and practice.
                    Practical guidance for daily life, worship, manners, and spiritual growth.
                    .</p>


                <h3>Curriculum Structure</h3>
                <p>The essential basics every newcomer needs to start their journey.
                    Strengthening lessons for Muslims who want to deepen or restore their faith.
                    Modules on Quran, Hadith, Seerah, Islamic history, belief, and purification of the heart.
                    A progressive path that takes you from foundational knowledge to a brighter, stronger practice.</p>
            </div>
        </div>
    </div>

    <!-- ABOUT US -->
    <div class="content-section about-section" id="aboutus">
        <div class="section-inner">
            <div class="section-title">
                <span class="title-badge">who we are</span>
                <h2>About Islam Guide</h2>
            </div>
            <div class="text-content">
                <h3>Our Story</h3>
                <p>Founded in 2025 by a group of second-year AI students in Algeria, LifeStart began as a vision:
                    to help light up hearts around the world with the guidance of Islam.
                    What started as a small idea grew into a project designed to inspire the world, one learner at a
                    time..</p>

                <h3>Our Mission</h3>
                <p>To illuminate the path of Islam for seekers everywhere—making it accessible, clear, and deeply
                    inspiring.
                    To help every person begin their true life: the life that starts with Allah.</p>

                <h3>Our Vision</h3>
                <p>A world where every searching heart finds its way to the truth.
                    A world where Islam is understood, loved, and lived.
                    A world where darkness turns into light through knowledge, faith, and guidance.</p>
            </div>
        </div>
    </div>


    <!-- FOOTER -->
    <div class="footer-section">
        <div class="footer-content">
            Copyright &copy;All rights reserved.
            Dedicated to serving the Muslim community.
        </div>
    </div>
</div>

<style>
    /* ===== RESET & BASE ===== */
    @media screen and (min-width:600px) {
        .lg {
            width: 250px;
            height: 170px;
        }
    }

    .islamic-home-container * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .islamic-home-container {
        font-family: 'Poppins', 'Segoe UI', sans-serif;
        background: #1a1f36;
        color: #e2e8f0;
        line-height: 1.6;
        width: 100%;
        min-height: 100vh;
        overflow-x: hidden;
    }

    /* ===== HEADER ===== */
    .headerContainer {
        background: linear-gradient(135deg, #2d3748 0%, #4a5568 100%);
        border-bottom: 1px solid #4a5568;
        position: sticky;
        top: 0;
        z-index: 50;
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 2rem;
        max-width: 1200px;
        margin: 0 auto;
        height: 150px;
    }

    .headerLinks {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        flex: 1;
    }

    .left-links {
        justify-content: flex-start;
    }

    .right-links {
        justify-content: flex-end;
    }

    .headerLinks a {
        color: #e2e8f0;
        text-decoration: none;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        transition: all 0.3s ease;
        font-weight: 500;
        font-size: 0.9rem;
    }

    .headerLinks a:hover {
        background: rgba(66, 153, 225, 0.2);
        color: #fff;
    }

    .logo-placeholder {
        width: 180px;
        height: 60px;
        background: linear-gradient(135deg, #2b6cb0, #4299e1);
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 1.2rem;
        text-decoration: none;
    }

    /* ===== BUTTONS ===== */
    .btn {
        background: linear-gradient(135deg, #2b6cb0, #4299e1);
        color: #fff;
        border: none;
        padding: 0.7rem 1.5rem;
        border-radius: 25px;
        font-weight: 600;
        font-size: 0.8rem;
        text-transform: uppercase;
        cursor: pointer;
        transition: all 0.3s ease;
        text-decoration: none;
        display: inline-block;
    }

    .btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(66, 153, 225, 0.3);
    }

    /* ===== HERO SECTION ===== */
    .hero-section {
        background: linear-gradient(135deg, #2d3748 0%, #4a5568 50%, #1a202c 100%);
        padding: 4rem 2rem;
        text-align: center;
        border-radius: 0 0 60px 60px;
    }

    .hero-content {
        max-width: 800px;
        margin: 0 auto;
    }

    .welcome-text {
        color: #90cdf4;
        font-size: 1.1rem;
        font-weight: 600;
        margin-bottom: 1rem;
    }

    .main-heading {
        font-size: 2.5rem;
        font-weight: 700;
        background: linear-gradient(135deg, #fff, #90cdf4, #4299e1);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin-bottom: 1.5rem;
        line-height: 1.2;
    }

    .hero-description {
        color: #cbd5e0;
        font-size: 1.1rem;
        line-height: 1.6;
        max-width: 600px;
        margin: 0 auto;
    }

    /* ===== PRODUCTS SECTION ===== */
    .products-section {
        padding: 4rem 2rem;
        max-width: 1200px;
        margin: 0 auto;
    }

    .section-header {
        margin-bottom: 3rem;
    }

    .section-badge {
        color: #4299e1;
        font-weight: 600;
        text-transform: uppercase;
        font-size: 0.9rem;
        letter-spacing: 1px;
    }

    .title-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 0.5rem;
    }

    .title-row h2 {
        color: #e2e8f0;
        font-size: 2rem;
        font-weight: 700;
    }

    .view-all-btn {
        background: linear-gradient(135deg, #2d3748, #4a5568);
        border: 1px solid #4299e1;
    }

    .products-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 2rem;
    }

    .product-card {
        background: rgba(255, 255, 255, 0.05);
        border-radius: 15px;
        overflow: hidden;
        border: 1px solid rgba(66, 153, 225, 0.2);
        transition: all 0.3s ease;
        cursor: pointer;
    }

    .product-card:hover {
        transform: translateY(-8px);
        border-color: #4299e1;
        background: rgba(255, 255, 255, 0.08);
        box-shadow: 0 10px 30px rgba(66, 153, 225, 0.2);
    }

    .product-card img {
        width: 100%;
        height: 200px;
        object-fit: cover;
        display: block;
    }

    .product-info {
        padding: 1.5rem;
    }

    .product-category {
        color: #90cdf4;
        font-size: 0.8rem;
        font-weight: 600;
        text-transform: uppercase;
        margin-bottom: 0.5rem;
    }

    .product-name {
        color: #e2e8f0;
        font-size: 1.1rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
    }

    .product-rating {
        color: #f59e0b;
        font-size: 0.9rem;
        margin-bottom: 0.5rem;
    }

    .product-price {
        color: #48bb78;
        font-size: 1.2rem;
        font-weight: 700;
    }
    .product-description {
        color: #f2f6f3;
        font-size: 1rem;
        font-weight: 700;
    }


    .product-actions {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 1rem;
    }

    .add-to-cart {
        background: rgba(66, 153, 225, 0.2);
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        color: #90cdf4;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .add-to-cart:hover {
        background: rgba(66, 153, 225, 0.4);
        transform: scale(1.05);
    }

    /* ===== CONTENT SECTIONS ===== */
    .content-section {
        padding: 4rem 2rem;
    }

    .section-inner {
        max-width: 1200px;
        margin: 0 auto;
    }

    .concept-section {
        background: rgba(66, 153, 225, 0.08);
        border-radius: 30px;
        margin: 2rem auto;
        border: 1px solid rgba(66, 153, 225, 0.15);
    }

    .about-section {
        background: rgba(255, 255, 255, 0.05);
        border-radius: 20px;
        margin: 2rem auto;
        border: 1px solid rgba(66, 153, 225, 0.2);
    }

    .content-section h2 {
        color: #e2e8f0;
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 2rem;
        text-align: center;
    }

    .section-title {
        text-align: center;
        margin-bottom: 2rem;
    }

    .title-badge {
        color: #4299e1;
        font-weight: 600;
        text-transform: uppercase;
        font-size: 0.9rem;
        letter-spacing: 1px;
    }

    .text-content {
        color: #cbd5e0;
        line-height: 1.7;
    }

    .text-content h3 {
        color: #90cdf4;
        font-size: 1.3rem;
        margin: 1.5rem 0 0.5rem 0;
    }

    .text-content p {
        margin-bottom: 1rem;
    }

    /* ===== COURSES SECTION ===== */
    .courses-section {
        background: rgba(66, 153, 225, 0.08);
        border-radius: 30px;
        margin: 2rem auto;
        border: 1px solid rgba(66, 153, 225, 0.15);
        text-align: center;
    }

    .simple-course-cta {
        max-width: 600px;
        margin: 0 auto;
        padding: 2rem;
    }

    .simple-course-cta p {
        text-align: center;
        margin-bottom: 2rem;
    }

    .course-btn {
        background: linear-gradient(135deg, #2b6cb0, #4299e1);
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 30px;
        font-weight: 600;
        font-size: 1.1rem;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .course-btn:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 20px rgba(66, 153, 225, 0.4);
    }

    /* ===== FOOTER ===== */
    .footer-section {
        background: linear-gradient(135deg, #2d3748 0%, #4a5568 100%);
        padding: 3rem 2rem;
        margin-top: 4rem;
        border-radius: 60px 60px 0 0;
    }

    .footer-content {
        max-width: 1200px;
        margin: 0 auto;
        text-align: center;
        color: #e2e8f0;
        font-weight: 500;
        font-size: 1rem;
    }

    /* ===== RESPONSIVE ===== */
    @media (max-width: 768px) {
        .header {
            flex-direction: column;
            height: auto;
            gap: 1rem;
            padding: 1rem;
        }

        .headerLinks {
            justify-content: center;
            flex-wrap: wrap;
        }

        .hero-section {
            padding: 3rem 1rem;
        }

        .main-heading {
            font-size: 2rem;
        }

        .title-row {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
        }

        .products-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
        }

        .content-section {
            padding: 3rem 1rem;
        }

        .concept-section,
        .about-section {
            border-radius: 20px;
            margin: 1rem auto;
        }
    }

    @media (max-width: 480px) {
        .headerLinks {
            gap: 0.5rem;
        }

        .headerLinks a {
            padding: 0.4rem 0.8rem;
            font-size: 0.8rem;
        }

        .main-heading {
            font-size: 1.5rem;
        }

        .hero-description {
            font-size: 1rem;
        }
    }
</style>
<script>
    // ===== PRODUCTS DATA =====
    /*const sampleProducts = [
        {
            id: 1,
            name: "Prayer",
            price: 24.99,
            image: "images.jpg", // Empty to avoid 404 errors
            rating: 4.9,
            category: "prayer",
            description: "Beautiful colorful prayer"
        },
        {
            id: 2,
            name: "Quran",
            price: 12.99,
            image: "quran.jpg", // Empty to avoid 404 errors
            rating: 4.7,
            category: "books",
            description: "The Holy book"
        },
        {
            id: 3,
            name: "Men kamis",
            price: 29.99,
            image: "kamis.jpg", // Empty to avoid 404 errors
            rating: 4.8,
            category: "clothing",
            description: "Complete prayer outfit set for women"
        },
        {
            id: 4,
            name: "Hidjab",
            price: 29.99,
            image: "hidjab.jpg", // Empty to avoid 404 errors
            rating: 2,
            category: "clothing",
            description: "Complete prayer outfit set for women"
        }
    ];*/

    // ===== LOAD PRODUCTS =====
    /*function loadBestRatedItems() {
        const container = document.getElementById('products-container');

        if (!container) {
            console.error('Products container not found');
            return;
        }

        const bestRated = sampleProducts.filter(product => product.rating >= 4.7);

        if (bestRated.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: #4299e1; padding: 2rem;">No products available.</p>';
            return;
        }

        container.innerHTML = bestRated.map(product => `
            <a href="../LifeStart/LifeStart-ShopBranch/s.htm" target="_blank" class="product-card" style="text-decoration: none; display: block;">
                <div class="product-info">
                    <img src="${product.image}" />
                    <div class="product-category">${product.category}</div>
                    <div class="product-name">${product.name}</div>
                    <div class="product-rating">⭐ ${product.rating}/5</div>
                    <div class="product-price">${product.price} DA</div>
                </div>
            </a>
        `).join('');
    }*/
    // ===== INITIALIZATION =====
    /*function initializeHomePage() {
        // Load products immediately
        //loadBestRatedItems();

        // Setup smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    This block i used it before in the frontend part for dynamically showing the products*/
    function initializeHomePage() {
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });
    }

    document.addEventListener('DOMContentLoaded', initializeHomePage);
    // ===== EXPOSE FOR NAVIGATION SYSTEM =====
    window.homePageInit = initializeHomePage;
    //window.loadBestRatedItems = loadBestRatedItems; it is for the previous frontend with the dynamically products

    // ===== INITIALIZATION METHODS =====
    document.addEventListener('DOMContentLoaded', initializeHomePage);

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(initializeHomePage, 100);
    }
</script>