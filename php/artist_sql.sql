-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 28, 2018 at 11:04 PM
-- Server version: 10.1.29-MariaDB
-- PHP Version: 7.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `artist`
--

-- --------------------------------------------------------

--
-- Table structure for table `gallery_categories`
--

CREATE TABLE `gallery_categories` (
  `id` int(11) NOT NULL,
  `title` varchar(122) NOT NULL,
  `slag` varchar(122) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `gallery_categories`
--

INSERT INTO `gallery_categories` (`id`, `title`, `slag`) VALUES
(1, 'gallery 1', 'gallery_1'),
(2, 'gallery 2', 'gallery_2'),
(3, 'gallery 3', 'gallery_3'),
(4, 'gallery 4', 'gallery_4'),
(5, 'Elia Art', 'elia_art');

-- --------------------------------------------------------

--
-- Table structure for table `gallery_comments`
--

CREATE TABLE `gallery_comments` (
  `id` int(11) NOT NULL,
  `nickname` varchar(122) NOT NULL,
  `message` text NOT NULL,
  `item_id` int(11) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `gallery_comments`
--

INSERT INTO `gallery_comments` (`id`, `nickname`, `message`, `item_id`, `created_at`, `updated_at`) VALUES
(1, 'Arc Tangent', ' Why am I just finding out this song exists in 2017?!? This is what I call heaven on Earth!!? ', 1, '2018-03-15 00:42:12', '2018-03-15 00:42:12'),
(2, 'arc', 'hello_world', 1, '2018-03-18 02:15:09', '2018-03-18 02:15:09'),
(3, 'arc', 'magari naxatiaa', 1, '2018-03-18 02:26:02', '2018-03-18 02:26:02'),
(4, 'arc', 'magari naxatiaa', 1, '2018-03-18 02:27:01', '2018-03-18 02:27:01'),
(5, 'ninia', 'whynot? ;P', 1, '2018-03-18 02:28:57', '2018-03-18 02:28:57'),
(6, '??', 'xoooo we are perfect ;)\n', 5, '2018-03-18 02:30:43', '2018-03-18 02:30:43'),
(7, 'Me And you', 'we are perfect', 5, '2018-03-18 02:31:51', '2018-03-18 02:31:51'),
(8, 'we', 'they see us ', 5, '2018-03-18 02:33:13', '2018-03-18 02:33:13'),
(9, 'somebody', 'like you', 5, '2018-03-18 02:35:06', '2018-03-18 02:35:06'),
(10, 'Zura', 'I love That ^_^ ', 3, '2018-03-18 02:36:14', '2018-03-18 02:36:14'),
(11, 'Ninia', 'Thanks I love you <3', 3, '2018-03-18 02:37:36', '2018-03-18 02:37:36'),
(12, 'Ninia', '<3 kaixo jandabas davliot vitom? ', 4, '2018-03-18 02:39:16', '2018-03-18 02:39:16'),
(13, 'ninia', 'xoom mec momwons <3', 4, '2018-03-18 02:48:16', '2018-03-18 02:48:16'),
(14, 'Gua', 'well so what is first pipelined register? do you? ', 1, '2018-03-19 10:27:57', '2018-03-19 10:27:57'),
(15, 'arc', 'okay', 5, '2018-03-19 13:31:11', '2018-03-19 13:31:11'),
(16, 'asfafaf', 'comments', 1, '2018-03-19 14:07:15', '2018-03-19 14:07:15'),
(17, 'ninia', 'yas i know', 5, '2018-03-24 18:56:13', '2018-03-24 18:56:13'),
(18, 'ninia', 'komentari ar aris', 6, '2018-03-24 18:57:32', '2018-03-24 18:57:32');

-- --------------------------------------------------------

--
-- Table structure for table `gallery_items`
--

CREATE TABLE `gallery_items` (
  `id` int(11) NOT NULL,
  `title` text,
  `image` text,
  `short_description` text,
  `full_description` text,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `gallery_items`
--

INSERT INTO `gallery_items` (`id`, `title`, `image`, `short_description`, `full_description`, `created_at`, `updated_at`) VALUES
(1, 'bloody water', 'https://scontent.fgyd4-2.fna.fbcdn.net/v/t1.0-9/17458257_664773430389095_168564662369551390_n.jpg?oh=be65a5a9ae67517d0d7612003ffb534e&oe=5B0859A6', '<p> What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. </p>\r\n', '<p> What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. </p>\r\n\r\n<p> What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. </p>\r\n\r\n<p> What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. </p>\r\n', '2018-03-12 23:20:41', '2018-03-12 23:20:41'),
(2, 'lucifer morning star', 'https://scontent.fgyd4-2.fna.fbcdn.net/v/t1.0-9/14264848_544455552420884_3761875987444835746_n.jpg?oh=cc4df1d1bba7c5b2f173dfec2a8a14d6&oe=5B07AFA1', '<p>i have seen that <b>guy </b> somewhere</p>\r\n<p>aaa</p>', NULL, '2018-03-12 23:21:35', '2018-03-12 23:21:35'),
(3, NULL, 'https://scontent.fgyd4-2.fna.fbcdn.net/v/t1.0-9/20228424_738053663061071_1799669616941487275_n.jpg?oh=23ce3e9fe8812268faacb5a0916f5c18&oe=5B46B4E0', NULL, NULL, '2018-03-12 23:21:50', '2018-03-12 23:21:50'),
(4, 'cute angel', 'http://36.media.tumblr.com/9ba73fee5894533f1afe576427f5601d/tumblr_ni7m3mCnyv1u0zslgo1_500.jpg', NULL, NULL, '2018-03-12 23:22:02', '2018-03-12 23:22:02'),
(5, 'how they see us', 'https://scontent.fgyd4-2.fna.fbcdn.net/v/t1.0-9/26168152_1980218162229375_5678666473896226750_n.jpg?oh=552a451949ee4305e680afd5d7591e1e&oe=5B006877', '<p> What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. </p>', NULL, '2018-03-13 22:59:59', '2018-03-13 22:59:59'),
(6, 'Vertical Mode', 'https://scontent.fgyd4-1.fna.fbcdn.net/v/t1.0-9/29261802_868831936649909_6847744772677828608_o.jpg?_nc_cat=0&oh=b7371d612c4ad163008a26fe54f5ef4c&oe=5B4AAB6E', NULL, NULL, '2018-03-21 00:37:24', '2018-03-21 00:37:24');

-- --------------------------------------------------------

--
-- Table structure for table `gallery_items_images`
--

CREATE TABLE `gallery_items_images` (
  `id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `image` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `gallery_items_images`
--

INSERT INTO `gallery_items_images` (`id`, `item_id`, `image`) VALUES
(1, 1, 'https://wallpaper.wiki/wp-content/uploads/2017/04/wallpaper.wiki-Art-Desktop-Wallpapers-HD-Free-Download-PIC-WPC0011424.jpg'),
(2, 1, 'https://topbackgroundwallpaper.com/wp-content/uploads/2018/02/best-art-wallpaper-in-the-clouds-art-hd-wallpaper.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `gallery_items_to_categories`
--

CREATE TABLE `gallery_items_to_categories` (
  `id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `gallery_items_to_categories`
--

INSERT INTO `gallery_items_to_categories` (`id`, `category_id`, `item_id`) VALUES
(1, 3, 4),
(2, 2, 1),
(3, 4, 1),
(4, 1, 1),
(5, 2, 4);

-- --------------------------------------------------------

--
-- Table structure for table `gallery_likes`
--

CREATE TABLE `gallery_likes` (
  `id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `ip` varchar(122) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `gallery_likes`
--

INSERT INTO `gallery_likes` (`id`, `item_id`, `ip`) VALUES
(32, 1, '127.0.0.1'),
(33, 3, '127.0.0.1'),
(34, 5, '127.0.0.1'),
(35, 2, '::1'),
(36, 6, '::1'),
(37, 1, '::1');

-- --------------------------------------------------------

--
-- Table structure for table `gallery_seens`
--

CREATE TABLE `gallery_seens` (
  `id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `ip` varchar(122) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `gallery_seens`
--

INSERT INTO `gallery_seens` (`id`, `item_id`, `ip`) VALUES
(1018, 1, '127.0.0.1'),
(1019, 1, '::1'),
(1020, 4, '::1'),
(1021, 5, '127.0.0.1'),
(1022, 4, '127.0.0.1'),
(1023, 2, '127.0.0.1'),
(1024, 6, '127.0.0.1'),
(1025, 2, '::1'),
(1026, 5, '::1'),
(1027, 6, '::1');

-- --------------------------------------------------------

--
-- Table structure for table `keywords`
--

CREATE TABLE `keywords` (
  `id` int(11) NOT NULL,
  `ka` text,
  `de` text,
  `en` text,
  `ru` text,
  `fr` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `languages`
--

CREATE TABLE `languages` (
  `id` int(11) NOT NULL,
  `title` varchar(122) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `navigation_list`
--

CREATE TABLE `navigation_list` (
  `id` int(11) NOT NULL,
  `title` varchar(122) NOT NULL,
  `slag` varchar(122) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `navigation_list`
--

INSERT INTO `navigation_list` (`id`, `title`, `slag`) VALUES
(1, 'home page', 'home_page'),
(3, 'gallery', 'gallery_page'),
(4, 'about', 'about_page');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `gallery_categories`
--
ALTER TABLE `gallery_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `gallery_comments`
--
ALTER TABLE `gallery_comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `item_id` (`item_id`);

--
-- Indexes for table `gallery_items`
--
ALTER TABLE `gallery_items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `gallery_items_images`
--
ALTER TABLE `gallery_items_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `item_id` (`item_id`);

--
-- Indexes for table `gallery_items_to_categories`
--
ALTER TABLE `gallery_items_to_categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `item_id` (`item_id`);

--
-- Indexes for table `gallery_likes`
--
ALTER TABLE `gallery_likes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `item_id` (`item_id`);

--
-- Indexes for table `gallery_seens`
--
ALTER TABLE `gallery_seens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `item_id` (`item_id`);

--
-- Indexes for table `keywords`
--
ALTER TABLE `keywords`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `languages`
--
ALTER TABLE `languages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `navigation_list`
--
ALTER TABLE `navigation_list`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `gallery_categories`
--
ALTER TABLE `gallery_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `gallery_comments`
--
ALTER TABLE `gallery_comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `gallery_items`
--
ALTER TABLE `gallery_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `gallery_items_images`
--
ALTER TABLE `gallery_items_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `gallery_items_to_categories`
--
ALTER TABLE `gallery_items_to_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `gallery_likes`
--
ALTER TABLE `gallery_likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `gallery_seens`
--
ALTER TABLE `gallery_seens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1028;

--
-- AUTO_INCREMENT for table `keywords`
--
ALTER TABLE `keywords`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `languages`
--
ALTER TABLE `languages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `navigation_list`
--
ALTER TABLE `navigation_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `gallery_comments`
--
ALTER TABLE `gallery_comments`
  ADD CONSTRAINT `gallery_comments_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `gallery_items` (`id`);

--
-- Constraints for table `gallery_items_images`
--
ALTER TABLE `gallery_items_images`
  ADD CONSTRAINT `gallery_items_images_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `gallery_items` (`id`);

--
-- Constraints for table `gallery_items_to_categories`
--
ALTER TABLE `gallery_items_to_categories`
  ADD CONSTRAINT `gallery_items_to_categories_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `gallery_categories` (`id`),
  ADD CONSTRAINT `gallery_items_to_categories_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `gallery_items` (`id`);

--
-- Constraints for table `gallery_likes`
--
ALTER TABLE `gallery_likes`
  ADD CONSTRAINT `gallery_likes_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `gallery_items` (`id`);

--
-- Constraints for table `gallery_seens`
--
ALTER TABLE `gallery_seens`
  ADD CONSTRAINT `gallery_seens_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `gallery_items` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
