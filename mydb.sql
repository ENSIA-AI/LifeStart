-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 07, 2026 at 09:30 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mydb`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `userId` int(11) NOT NULL,
  `userName` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `Password_hash` varchar(255) NOT NULL,
  `Is_Verified` tinyint(1) DEFAULT 0,
  `email_verify_token` varchar(255) DEFAULT NULL,
  `email_verified_at` datetime DEFAULT NULL,
  `password_reset_token` varchar(255) DEFAULT NULL,
  `password_reset_expires` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `last_login` datetime DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `user_type` enum('student','instructor','admin') DEFAULT 'student',
  `dateOfBirth` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `user_session` varchar(255) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) DEFAULT 1,
  `added_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `chapter`
--

CREATE TABLE `chapter` (
  `ChapterId` int(11) NOT NULL,
  `Chap_num` varchar(20) NOT NULL,
  `title` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chapter`
--

INSERT INTO `chapter` (`ChapterId`, `Chap_num`, `title`) VALUES
(1, '1', 'Fondemantels & definitions'),
(2, '2', 'Quoran and its importance'),
(3, '3', 'Sunnah & hadiths');

-- --------------------------------------------------------

--
-- Table structure for table `enrollment`
--

CREATE TABLE `enrollment` (
  `enrollmentId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `ChapterId` int(11) NOT NULL,
  `isUnlocked` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `families`
--

CREATE TABLE `families` (
  `familyId` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `link` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `families`
--

INSERT INTO `families` (`familyId`, `name`, `link`, `createdAt`) VALUES
(1, 'hh', 'https://elbaraka.org/', '2026-01-31 08:09:42'),
(2, 'Ahmed', 'https://chuffed.org/project/130815-help-ahmed-and-his-family-afford-basic-needs-in-gaza?fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnVoGcXcMLiIKS9HbRIsVboDmgCh8HTLNZVzGEBjTspa1GviNHbuH6S2vhuug_aem_NINR35uDIvvWmOGiFuvEPQ', '2026-02-01 05:37:34'),
(3, 'Mohamed', 'https://chuffed.org/project/144918-help-mohammed-and-his-family?fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGn4-wd-JU3dYvMf2JTyhfa478IAgr6thV4WNBrMoGLjEZxs6iDTp5L-FRKGKU_aem_Fc0etfPbehlPnWfsgF9gLA', '2026-02-01 05:39:21'),
(4, 'Ahmed', 'https://chuffed.org/project/130815-help-ahmed-and-his-family-afford-basic-needs-in-gaza?fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnVoGcXcMLiIKS9HbRIsVboDmgCh8HTLNZVzGEBjTspa1GviNHbuH6S2vhuug_aem_NINR35uDIvvWmOGiFuvEPQ', '2026-02-05 13:48:24');

-- --------------------------------------------------------

--
-- Table structure for table `lesson`
--

CREATE TABLE `lesson` (
  `lessonID` int(11) NOT NULL,
  `ChapterId` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `lessonNum` int(11) NOT NULL,
  `state` varchar(10) NOT NULL CHECK (`state` in ('locked','unlocked'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `lesson`
--

INSERT INTO `lesson` (`lessonID`, `ChapterId`, `title`, `description`, `lessonNum`, `state`) VALUES
(1, 1, 'what is el aquidah', '', 1, 'locked'),
(2, 1, 'what is el-tawhid', '', 2, 'locked'),
(3, 1, 'Quoran , why important', '', 3, 'locked'),
(4, 1, 'Sunnah , why important', '', 4, 'locked'),
(6, 2, 'Sciense & quoran', '', 6, 'locked'),
(7, 2, 'Quoran VS depression', '', 7, 'locked'),
(8, 2, 'Understanding Quoran', '', 8, 'locked'),
(9, 2, 'Quoran VS bible', '', 9, 'locked'),
(10, 2, 'Memorizing Quoran', '', 10, 'locked'),
(11, 3, 'The story of the Prophet', '', 11, 'locked'),
(12, 3, 'Sunnah VS quoran', '', 12, 'locked'),
(13, 3, 'the four madahibs', '', 13, 'locked'),
(14, 3, 'Weak ahadiths', '', 13, 'locked'),
(15, 1, 'And more...', '', 15, 'locked');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_identifier` varchar(100) DEFAULT NULL,
  `order_number` varchar(50) DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `payment_status` enum('pending','paid','failed') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_identifier`, `order_number`, `total_amount`, `payment_status`, `created_at`) VALUES
(77, 'USER_6e2eccde77d9c48f584ec14f718f76fc', 'ORD20260204141954614', 4000.00, 'paid', '2026-02-04 10:19:54');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `subtotal` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `product_name`, `quantity`, `price`, `subtotal`) VALUES
(103, 77, 1, 'Oversized Elegance Jacket', 1, 4000.00, 4000.00);

-- --------------------------------------------------------

--
-- Table structure for table `order_payment_info`
--

CREATE TABLE `order_payment_info` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `user_identifier` varchar(100) DEFAULT NULL,
  `card_last4` varchar(4) NOT NULL,
  `card_holder` varchar(255) NOT NULL,
  `exp_month` varchar(2) NOT NULL,
  `exp_year` varchar(2) NOT NULL,
  `cvc_code` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_payment_info`
--

INSERT INTO `order_payment_info` (`id`, `order_id`, `user_identifier`, `card_last4`, `card_holder`, `exp_month`, `exp_year`, `cvc_code`, `created_at`) VALUES
(69, 77, 'USER_6e2eccde77d9c48f584ec14f718f76fc', '5555', 'yasmine', '11', '29', '$2y$10$SWS7fRN9KVvDBqhgc/X6QuHqSBxKSvuJHCcySTOvSphxw1PHw9OLG', '2026-02-04 10:19:54');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `description` text DEFAULT NULL,
  `category` enum('men','women') NOT NULL,
  `rating` float DEFAULT 0,
  `image` varchar(255) DEFAULT NULL,
  `quantity` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `name`, `price`, `description`, `category`, `rating`, `image`, `quantity`) VALUES
(1, 'Oversized Elegance Jacket', 4000.00, 'Trendy oversized jacket for layering. Perfect for fall and colder days.', 'women', 0, 'photo/w4.jpeg', 9),
(62, 'Button Elegance Abaya', 5000.00, '<strong>Description:</strong> Premium fabric with elegant button styling.<br><strong>Comfort:</strong> Soft, breathable and wrinkle-resistant.<br><strong>Rating:</strong> ⭐⭐⭐⭐☆', 'women', 4, 'photo/W1.jpeg', 10),
(63, 'Chic Abaya', 4800.00, '<strong>Description:</strong> Lightweight elegant abaya perfect for summer.<br><strong>Design:</strong> Flowing cut with soft touch.<br><strong>Rating:</strong> ⭐⭐⭐⭐☆', 'women', 4, 'photo/W2.jpeg', 10),
(64, 'Comfort Luxe Abaya', 5200.00, '<strong>Description:</strong> Ultra-comfortable and breathable fabric.<br><strong>Best Seller:</strong> Most loved comfort abaya.<br><strong>Rating:</strong> ⭐⭐⭐⭐☆', 'women', 4, 'photo/W3.jpeg', 10),
(65, 'Pashmina Scarf', 1100.00, '<strong>Description:</strong> Soft pashmina texture, elegant and lightweight.<br><strong>Use:</strong> Suitable for daily and modest wear.<br><strong>Rating:</strong> ⭐⭐⭐⭐⭐', 'women', 5, 'photo/s1.jpeg', 10),
(66, 'Isdal', 7500.00, '<strong>Description:</strong> Traditional lightweight Isdal.<br><strong>Design:</strong> Soft material with modest coverage.<br><strong>Rating:</strong> ⭐⭐⭐☆', 'women', 3, 'photo/s2.jpeg', 10),
(67, 'Isdal Model II', 850.00, '<strong>Description:</strong> Modern upgraded Isdal model.<br><strong>Comfort:</strong> Smooth, soft and breathable.<br><strong>Rating:</strong> ⭐⭐⭐⭐☆', 'women', 4, 'photo/s3.jpeg', 10),
(68, 'Beige Serenity Scarf', 500.00, '<strong>Description:</strong> Light beige minimalist scarf.<br><strong>Use:</strong> Perfect neutral accessory.<br><strong>Rating:</strong> ⭐⭐⭐☆', 'women', 3, 'photo/s4.jpeg', 10),
(69, 'Grey Harmony Qamiss', 5600.00, '<strong>Description:</strong> Elegant grey qamiss with fine stitching.<br><strong>Use:</strong> Ideal for events and daily wear.<br><strong>Rating:</strong> ⭐⭐⭐⭐☆', 'men', 4, 'photo/q1.jpeg', 10),
(70, 'Pure White Qamiss', 7800.00, '<strong>Description:</strong> Premium white qamiss with clean style.<br><strong>Fabric:</strong> Wrinkle-resistant high-quality material.<br><strong>Rating:</strong> ⭐⭐⭐⭐☆', 'men', 4, 'photo/q2.jpeg', 10),
(71, 'Midnight Black Qamiss', 6000.00, '<strong>Description:</strong> Deep black qamiss with classy finish.<br><strong>Use:</strong> Perfect for occasions.<br><strong>Rating:</strong> ⭐⭐⭐⭐☆', 'men', 4, 'photo/q3.jpeg', 10),
(72, 'Emerald Green Qamiss', 7000.00, '<strong>Description:</strong> Unique emerald green qamiss.<br><strong>Style:</strong> Luxury finish with premium feel.<br><strong>Rating:</strong> ⭐⭐⭐☆', 'men', 3, 'photo/q4.jpeg', 10),
(73, 'Steel Valor Collection', 13000.00, '<strong>Description:</strong> Strong masculine perfume with long-lasting scent.<br><strong>Packaging:</strong> Premium design.<br><strong>Rating:</strong> ⭐⭐⭐⭐☆', 'men', 4, 'photo/c1.jpeg', 10),
(74, 'Ibadah Collection', 4000.00, '<strong>Description:</strong> Fresh spiritual fragrance suitable for daily use.<br><strong>Popularity:</strong> Customer favorite.<br><strong>Rating:</strong> ⭐⭐⭐⭐☆', 'men', 4, 'photo/c2.jpeg', 10),
(75, 'Fakhr Latafa Parfum', 1700.00, '<strong>Description:</strong> Affordable, strong warm fragrance.<br><strong>Quality:</strong> Long-lasting for its price.<br><strong>Rating:</strong>⭐⭐⭐☆', 'men', 3, 'photo/c3.jpeg', 10),
(76, 'Gift Collection', 7500.00, '<strong>Description:</strong> Luxury gift set perfect for occasions.<br><strong>Includes:</strong> Multiple premium accessories.<br><strong>Rating:</strong> ⭐⭐⭐⭐☆', 'men', 4, 'photo/c4.jpeg', 10);

-- --------------------------------------------------------

--
-- Table structure for table `product_question`
--

CREATE TABLE `product_question` (
  `id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `question` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_report`
--

CREATE TABLE `product_report` (
  `id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `report_text` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `quiz`
--

CREATE TABLE `quiz` (
  `quizId` int(11) NOT NULL,
  `ChapterId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `quiz`
--

INSERT INTO `quiz` (`quizId`, `ChapterId`) VALUES
(1, 1),
(2, 2),
(3, 3);

-- --------------------------------------------------------

--
-- Table structure for table `quiz_questions`
--

CREATE TABLE `quiz_questions` (
  `questionId` int(11) NOT NULL,
  `question` varchar(500) NOT NULL,
  `quizId` int(11) NOT NULL,
  `option1` varchar(255) NOT NULL,
  `option2` varchar(255) NOT NULL,
  `option3` varchar(255) NOT NULL,
  `correctOption` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `quiz_questions`
--

INSERT INTO `quiz_questions` (`questionId`, `question`, `quizId`, `option1`, `option2`, `option3`, `correctOption`) VALUES
(1, 'Why is Aqueedah important in Islam?', 1, 'It refers to the sets of beliefs a muslim should carry in heart , without it the actions lack correct understanding despite their impotance too', 'it refers to the belief someone should carry , which is enough to be a complete muslim', 'it\'s not important , and as long as someone is practising praying he is a good muslim', 1),
(2, 'What is the core concept of el-tawhid', 1, 'believing Allah is the strongest GOD existing', 'believing ALLAH is the Strongest heir in the universe', 'believing ALLAH is the only one GOD to ever exist , the one leading universe after creating it , that has niether father nor child', 3),
(3, 'What is el-quoran?', 1, 'a holy book filled by the literal words of GOD through his prophet Mohammed of which there is one and only verse of it since the first day of existing', 'holy book written by prophet Mohammed based on his wisdom and knowledge', 'a holy book written by muslims with strong and gifted belief , came from their supernatural power to manifest strong words', 1),
(4, 'What does sunnah represent in Islam?', 1, 'It refers to the sets of actions , terms , and conffirmations by the prophet mohammed , enherited by elsahabah to all muslims around the world', 'it\'s set of what the prophet had told muslims to do , apart of what\'s mentioned in the quoran', 'it\'s set of actions , terms , and affirmations of the best muslims in the world', 1),
(5, 'In order to extract a religious judgement we use:', 1, 'the opinion taken by the majority of the muslim community', 'the opinion of the muslims with the strongest belief and knowledge only', 'the quoran , if not mentioned the sunnah , if not mentioned we move the opinion of el-machyikh and quiyas', 3),
(6, 'What is the relationship between quoran and scientific facts?', 2, 'so far , many facts that were scientifically proven were mentioned a long time ago in the quoran', 'Quoran contains religious facts only , has nothing to do with science', 'Every thing in science is mentioned in the quoran', 1),
(7, 'How are mental breakdowns healed in slamic way?', 2, 'Reading the quoran consistenly , praying on time , duaa always and seek help from the greatest Allah', 'practise supernatural rituals using energy experts', 'in islam , mental breakdowns do not exist , and any sign of such thing is lack of belief and no sign of good muslim', 1),
(8, 'How can someone memorize the quoran fast?', 2, 'by repeating what he hears everyday', 'understanding alone is quite enough', 'there\'s no such fast memorization , quoran lives with u , it takes time and efforts , deep understanging for each verse and patience', 3),
(9, 'muslims do not believe in jesus', 2, 'true , they consider him as only christians figure', 'False , they do believe he\'s the Only GOD on earth', 'false they do believe in him as a prophet sent by ALLAH , like mohammed', 3),
(10, 'What do real muslims follow?', 3, 'ONLY QUORAN', 'BOTH QUORAN AND SUNNAH', 'ONLY HADITH', 2),
(11, 'HOW many islam versions exist in the world?', 3, '4 VERSIONS', 'ONE VERSION , however 4 madahibs exist', '2 VERSIONS , one called quoranic and second is sunnah', 2),
(12, 'why is it important to know the weak ahadiths along with the strong ones?', 3, 'because people can lie using the name of the prophet to set false judgements under the name of islam', 'to apply them too , so if no win no loss', 'it\'s not , we shouldn\'t care', 1),
(13, 'In order to extract a religious judgement we use:', 3, 'the opinion taken by the majority of the muslim community', 'the opinion of the muslims with the strongest belief and knowledge only', 'the quoran , if not mentioned the sunnah , if not mentioned we move the opinion of el-machyikh and quiyas', 3);

-- --------------------------------------------------------

--
-- Table structure for table `stories`
--

CREATE TABLE `stories` (
  `storyId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `story` text NOT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stories`
--

INSERT INTO `stories` (`storyId`, `userId`, `story`, `image_path`, `created_at`, `updatedAt`) VALUES
(3, 1, 'hello its wanderful hello', 'uploads/1769932631_a.webp', '2026-02-01 04:57:11', '2026-02-01 09:30:28');

-- --------------------------------------------------------

--
-- Table structure for table `story_likes`
--

CREATE TABLE `story_likes` (
  `storyId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `story_reports`
--

CREATE TABLE `story_reports` (
  `id` int(11) NOT NULL,
  `storyId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `content` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_lesson_progress`
--

CREATE TABLE `user_lesson_progress` (
  `userId` int(11) NOT NULL,
  `lessonID` int(11) NOT NULL,
  `watchedPercentage` int(20) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_lesson_unlock`
--

CREATE TABLE `user_lesson_unlock` (
  `userId` int(11) NOT NULL,
  `lessonID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_quiz_result`
--

CREATE TABLE `user_quiz_result` (
  `userId` int(11) NOT NULL,
  `quizId` int(11) NOT NULL,
  `score` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`userId`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `chapter`
--
ALTER TABLE `chapter`
  ADD PRIMARY KEY (`ChapterId`);

--
-- Indexes for table `enrollment`
--
ALTER TABLE `enrollment`
  ADD PRIMARY KEY (`enrollmentId`),
  ADD KEY `fk_enrollment_user` (`userId`),
  ADD KEY `fk_enrollment_chapter` (`ChapterId`);

--
-- Indexes for table `families`
--
ALTER TABLE `families`
  ADD PRIMARY KEY (`familyId`);

--
-- Indexes for table `lesson`
--
ALTER TABLE `lesson`
  ADD PRIMARY KEY (`lessonID`),
  ADD KEY `fk_lesson_Chapter` (`ChapterId`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `order_number` (`order_number`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `order_payment_info`
--
ALTER TABLE `order_payment_info`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_question`
--
ALTER TABLE `product_question`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `product_report`
--
ALTER TABLE `product_report`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `quiz`
--
ALTER TABLE `quiz`
  ADD PRIMARY KEY (`quizId`),
  ADD KEY `fk_quiz_chapter` (`ChapterId`);

--
-- Indexes for table `quiz_questions`
--
ALTER TABLE `quiz_questions`
  ADD PRIMARY KEY (`questionId`),
  ADD KEY `quizId` (`quizId`);

--
-- Indexes for table `stories`
--
ALTER TABLE `stories`
  ADD PRIMARY KEY (`storyId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `story_likes`
--
ALTER TABLE `story_likes`
  ADD KEY `storyId` (`storyId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `story_reports`
--
ALTER TABLE `story_reports`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `storyId` (`storyId`,`userId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `user_lesson_progress`
--
ALTER TABLE `user_lesson_progress`
  ADD PRIMARY KEY (`userId`,`lessonID`),
  ADD UNIQUE KEY `userId` (`userId`),
  ADD KEY `lessonID` (`lessonID`);

--
-- Indexes for table `user_lesson_unlock`
--
ALTER TABLE `user_lesson_unlock`
  ADD PRIMARY KEY (`userId`,`lessonID`),
  ADD KEY `userId` (`userId`),
  ADD KEY `lessonID` (`lessonID`);

--
-- Indexes for table `user_quiz_result`
--
ALTER TABLE `user_quiz_result`
  ADD PRIMARY KEY (`userId`,`quizId`),
  ADD KEY `userId` (`userId`),
  ADD KEY `quizId` (`quizId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=127;

--
-- AUTO_INCREMENT for table `families`
--
ALTER TABLE `families`
  MODIFY `familyId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=104;

--
-- AUTO_INCREMENT for table `order_payment_info`
--
ALTER TABLE `order_payment_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT for table `product_question`
--
ALTER TABLE `product_question`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `product_report`
--
ALTER TABLE `product_report`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `stories`
--
ALTER TABLE `stories`
  MODIFY `storyId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `story_reports`
--
ALTER TABLE `story_reports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `order_payment_info`
--
ALTER TABLE `order_payment_info`
  ADD CONSTRAINT `order_payment_info_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `product_question`
--
ALTER TABLE `product_question`
  ADD CONSTRAINT `product_question_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `product_report`
--
ALTER TABLE `product_report`
  ADD CONSTRAINT `product_report_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `quiz`
--
ALTER TABLE `quiz`
  ADD CONSTRAINT `fk_quiz_chapter` FOREIGN KEY (`ChapterId`) REFERENCES `chapter` (`ChapterId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
