CREATE DATABASE  IF NOT EXISTS `hrpayroll` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `hrpayroll`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: hrpayroll
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_on` datetime(6) DEFAULT NULL,
  `login_user` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  `updated_on` datetime(6) DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `user_role` varchar(255) DEFAULT NULL,
  `user_type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'',NULL,'firoz','$2a$10$t1aegGjYcdxYKw2v7mjCzehHTcjbiN9TNYqpDyj3vIfscp8wXanf2','',NULL,'Firoz Kabir','ADMIN','ADMIN'),(2,'',NULL,'Tanbin','$2a$10$1fSeBUD3dGB4ui5f9a9gtOHvimfp/F1qttF3pR2bSI.TAVwLuk39K','',NULL,'Imtiaz Kabir','USER','Employee'),(3,'',NULL,'Jahangir','$2a$10$WgjYn7/60BhjLts8wf0que3sJcuNFWvJuZ40SQn6HvbHIlw5HMAiW','',NULL,'Jahangir Kabir','SUPER ADMIN','Admin'),(4,'',NULL,'1002','$2a$10$pZYs2L9sBhgkJxjivP4FjO7MH0nPWLipQ4NxD7uVlWclIt7hanZ8C','',NULL,'Karim','BRANCH ADMIN','Admin'),(5,'',NULL,'1003','$2a$10$1wCIQz/IDBmwvC9ebe3HAuXO65jtYn4d6IBpSEe/bGhU4Z9eUrwoa','',NULL,'Jamal','AREA ADMIN','Admin'),(6,'',NULL,'1004','$2a$10$1/kpxCKkuflMzAGZWjoOu.qnlSBeF2CEu4oEcI3LGykgBcd/UJgvu','',NULL,'Rahim','WORKER','Employee'),(7,'',NULL,'1007','$2a$10$6BlNXu5GmkhiJiBi3XJf8.4H.EZXPRIsCi1UVyE55LRmsqIb//J5m','',NULL,'Faruk','AREA ADMIN','Admin'),(8,'loginUserId','2024-03-30 12:57:11.000000','1010','$2a$10$FvjIHjz2HCjweQx3d31F8.mDnKQrhFubQgRL1JGjQ5G7xc4W3VZFK','',NULL,'Alamgir','BRANCH ADMIN','Admin'),(9,'loginUserId','2024-03-30 12:58:20.000000','1014','$2a$10$FAIrgDsq11OgY7E5CX6aVOvN2ih3Os5ZgdjBKK9AfQn7oT/7m2aBK','',NULL,'Mamun','WORKER','Employee'),(10,'loginUserId','2024-03-30 13:00:38.000000','1001','$2a$10$b59RSQaMLkNnxNsT4NSiB.IzkS3I/GwuRVDTWCLxh4DFE7NVC5IM2','',NULL,'Jahangir Kabir','SUPER ADMIN','Admin'),(11,'loginUserId','2024-03-31 15:21:18.000000','1017','$2a$10$kr8HJWeKOH.soafq6NaeCePDIohkBNL17RgfkhWNMO2W6qU1S1eIS','',NULL,'Abdullah','WORKER','Employee');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-01 22:08:40
