-- --------------------------------------------------------
-- 호스트:                          127.0.0.1
-- 서버 버전:                        8.0.39 - MySQL Community Server - GPL
-- 서버 OS:                        Win64
-- HeidiSQL 버전:                  12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- reactsns 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `reactsns` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `reactsns`;

-- 테이블 reactsns.tbl_comments 구조 내보내기
CREATE TABLE IF NOT EXISTS `tbl_comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `post_id` int NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `content` text NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `post_id` (`post_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `tbl_comments_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `tbl_post` (`post_id`) ON DELETE CASCADE,
  CONSTRAINT `tbl_comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `tbl_user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 reactsns.tbl_comments:~2 rows (대략적) 내보내기
INSERT INTO `tbl_comments` (`id`, `post_id`, `user_id`, `content`, `created_at`, `updated_at`) VALUES
	(12, 16, 'asdf', 'zzz', '2024-10-29 17:41:51', '2024-10-29 17:41:51'),
	(13, 15, 'asdf', 'good', '2024-10-29 17:41:59', '2024-10-29 17:41:59'),
	(17, 19, 'qwer', 'jsp', '2024-10-30 18:02:44', '2024-10-30 18:02:44');

-- 테이블 reactsns.tbl_post 구조 내보내기
CREATE TABLE IF NOT EXISTS `tbl_post` (
  `post_id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(36) NOT NULL,
  `title` varchar(50) NOT NULL,
  `content` text NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`post_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `tbl_post_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tbl_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 reactsns.tbl_post:~4 rows (대략적) 내보내기
INSERT INTO `tbl_post` (`post_id`, `user_id`, `title`, `content`, `image_url`, `created_at`, `updated_at`) VALUES
	(15, 'qwer', 'ddd', 'dddd', 'uploads/1730190363663-insideout2.jpg', '2024-10-29 17:26:03', '2024-10-29 17:26:03'),
	(16, 'qwer', 'rrr', 'rrrr', 'uploads/1730190652875-extreme_job.jpg', '2024-10-29 17:30:52', '2024-10-29 17:30:52'),
	(19, 'zxcv', 'test', 'sample', 'uploads/1730270248039-soul.jpg', '2024-10-30 15:37:28', '2024-10-30 15:37:28'),
	(20, 'qwer', '안녕', '안녕 안녕', 'uploads/1730278954872-home.png', '2024-10-30 18:02:34', '2024-10-30 18:02:34');

-- 테이블 reactsns.tbl_user 구조 내보내기
CREATE TABLE IF NOT EXISTS `tbl_user` (
  `id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'AUTO_INCREMENT',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 reactsns.tbl_user:~1 rows (대략적) 내보내기
INSERT INTO `tbl_user` (`id`, `name`, `email`, `password_hash`, `profile_picture`, `created_at`, `updated_at`) VALUES
	('asdf', '장', '49fdje@naver.com', '$2b$10$rLmDHyRhSCNREikONNkHeOW1T16tcrqjCm6UjeJt2OX84w0r7Zhd2', NULL, '2024-10-28 01:27:29', '2024-10-28 01:27:29'),
	('qwer', '송', 'gdl35da@gmail.com', '$2b$10$BWWQR2d/.0qYixaD.r66kuI7faw/Siqzx5n8dQfs1MzOpokDa1V8u', NULL, '2024-10-25 09:59:10', '2024-10-25 09:59:10'),
	('zxcv', '서', 'rjujf452@gmail.com', '$2b$10$o7Iilmna1O5kM68Niki5UOuY6WQDqU/SQppKfePuhWGyFbnBlSiNe', NULL, '2024-10-29 08:43:52', '2024-10-29 08:43:52');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
