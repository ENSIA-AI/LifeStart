<?php
require_once __DIR__ . '/includes/session.php';

$allowedPages = ['home', 'board'];
$page = $_GET['page'] ?? 'home';
if (!in_array($page, $allowedPages, true)) {
  $page = 'home';
}

if (isset($_GET['partial']) && $_GET['partial'] == '1') {
  if ($page === 'home') {
    require __DIR__ . '/home.php';
  } elseif ($page === 'board') {
    require __DIR__ . '/board.php';
  }
  exit;
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LifeStart</title>
  <link rel="stylesheet" href="nav.css">
</head>

<body>
  <div class="cursor-dot"></div>
  <div class="cursor-ring"></div>

  <div class="transition">
    <div class="transition-text">Loading</div>
  </div>

  <!-- Sidebar Toggle Button -->
  <div class="sidebar-toggle">
    <div class="toggle-line"></div>
    <div class="toggle-line"></div>
    <div class="toggle-line"></div>
  </div>

  <!-- Overlay for closing sidebar -->
  <div class="sidebar-overlay"></div>

  <div class="dia">
    <a class="nav-item" data-page="home" href="index.php?page=home">Home</a>
    <a class="nav-item" data-page="board" href="index.php?page=board">Board</a>
  </div>

  <main>
    <div id="content-container" data-initial-page="<?= htmlspecialchars($page) ?>">
      <?php
      // Fallback render (works even if nav.js fails)
      if ($page === 'home') {
        require __DIR__ . '/home.php';
      } elseif ($page === 'board') {
        require __DIR__ . '/board.php';
      }
      ?>
    </div>
  </main>
  <script src="nav.js"> </script>
  <script>
    window.INIT_PAGE = <?= json_encode($page) ?>;
  </script>
</body>

</html>