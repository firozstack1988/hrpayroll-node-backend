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
-- Table structure for table `leave_entry`
--

DROP TABLE IF EXISTS `leave_entry`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leave_entry` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `employee_id` varchar(255) DEFAULT NULL,
  `from_date` date DEFAULT NULL,
  `leave_reason` varchar(255) DEFAULT NULL,
  `leave_type` varchar(255) DEFAULT NULL,
  `number_of_days` int DEFAULT '0',
  `to_date` date DEFAULT NULL,
  `leave_status` varchar(255) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `created_on` datetime(6) DEFAULT NULL,
  `branch_code` varchar(25) DEFAULT NULL,
  `aproved_by` varchar(25) DEFAULT NULL,
  `aproved_on` datetime(6) DEFAULT NULL,
  `month` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leave_entry`
--

LOCK TABLES `leave_entry` WRITE;
/*!40000 ALTER TABLE `leave_entry` DISABLE KEYS */;
INSERT INTO `leave_entry` VALUES (1,'1014','2024-04-02','Family urgent','Sick Leave',3,'2024-04-04','APPROVED','1014','2024-03-31 21:21:04.000000','2020','1010','2024-04-01 14:53:48.000000',NULL),(2,'1014','2024-04-07','Family urgent','Sick-Leave',2,'2024-04-08','APPROVED','1014','2024-04-01 12:24:55.000000','2020','1010','2024-04-01 14:44:17.000000',NULL),(3,'1014','2024-04-02','Family urgent','Sick-Leave',3,'2024-04-04','APPROVED','1014','2024-04-01 14:51:18.000000','2014','1010','2024-04-01 14:53:48.000000',NULL),(4,'1014','2024-04-07','Family urgent','Sick-Leave',3,'2024-04-09','APPROVED','1014','2024-04-01 22:02:51.000000','2014','1010','2024-04-01 22:03:59.000000','April');
/*!40000 ALTER TABLE `leave_entry` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-01 22:08:41
