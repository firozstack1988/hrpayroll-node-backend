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
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email_address` varchar(255) DEFAULT NULL,
  `emp_designation` varchar(255) DEFAULT NULL,
  `emp_id` varchar(255) DEFAULT NULL,
  `emp_role` varchar(255) DEFAULT NULL,
  `joining_date` datetime(6) DEFAULT NULL,
  `mobile_no` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `dept_name` varchar(255) DEFAULT NULL,
  `branch_code` varchar(255) DEFAULT NULL,
  `basic_amt` double NOT NULL,
  `isActive` int DEFAULT NULL,
  `supervisor` varchar(255) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `created_on` datetime(6) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  `updated_on` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (1,'xyz@gmail.com','Manager','1001','','2024-03-28 00:00:00.000000','01723343445','Jahangir','Management','2020',10000,1,'Area Manager','',NULL,NULL,'2024-03-30 13:00:02.000000'),(2,'abc@gmail.com','Field worker','1002','','2024-03-28 00:00:00.000000','01723343445','Karim','Accounts','2020',8000,1,'Manager','',NULL,'firoz','2024-03-28 10:53:44.000000'),(3,'xyz@gmail.com','Field worker','1003','','2024-03-28 00:00:00.000000','01723343445','Jamal','Accounts','2020',8000,1,'Manager','',NULL,'firoz','2024-03-28 10:59:19.000000'),(4,'xyz@gmail.com','Field worker','1004','','2024-03-28 00:00:00.000000','01723343445','Rahim','Accounts','2020',8000,1,'Manager','',NULL,'firoz','2024-03-28 11:07:36.000000'),(5,'xyz@gmail.com','Field worker','1005','','2024-03-28 00:00:00.000000','01723343445','Javed ','Accounts','2020',8000,1,'Manager','',NULL,'firoz','2024-03-28 11:10:07.000000'),(6,'xyz@gmail.com','Field worker','1006','','2024-03-28 00:00:00.000000','01723343445','Zahid','Accounts','2020',8000,1,'Manager','',NULL,'firoz','2024-03-28 11:13:07.000000'),(7,'abc@gmail.com','Manager','1007','','2024-03-28 00:00:00.000000','01723343445','Faruk','Management','2014',10000,1,'Area Manager','',NULL,'firoz','2024-03-28 11:16:49.000000'),(10,'xyz@gmail.com','Manager','1008','','2024-03-28 00:00:00.000000','01723343445','Tanbin','Management','2014',10000,1,'Area Manager','',NULL,'firoz','2024-03-28 13:59:46.000000'),(13,'xyz@gmail.com','Manager','1009','','2024-03-28 00:00:00.000000','01723343445','Tarika','Management','2014',10000,1,'Area Manager','',NULL,'firoz','2024-03-28 16:11:40.000000'),(14,'xyz@gmail.com','Branch Admin','1010','','2024-03-28 00:00:00.000000','01723343445','Alamgir','Management','2014',8000,1,'Manager','',NULL,'firoz','2024-03-28 16:15:25.000000'),(15,'xyz@gmail.com','Manager','1011','','2024-03-28 00:00:00.000000','01723343445','Nahin','Management','2014',10000,1,'Area Manager','',NULL,NULL,'2024-03-28 16:20:15.000000'),(16,'xyz@gmail.com','Manager','1014','','2024-03-28 00:00:00.000000','01723343445','Mamun','Management','2014',10000,1,'Area Manager','',NULL,'firoz','2024-03-28 20:56:10.000000'),(17,'xyz@gmail.com','Manager','1015','','2024-03-28 00:00:00.000000','01723343445','Jabid','Management','2014',10000,1,'Area Manager','',NULL,'firoz','2024-03-28 20:58:12.000000'),(20,'xyz@gmail.com','Field worker','1016','','2024-03-28 00:00:00.000000','01723343445','Ahemad Ali','Accounts','2020',8000,1,'Manager','',NULL,'firoz','2024-03-28 21:03:46.000000'),(21,'xyz@gmail.com','FIELD WORKER','1017','','2024-03-31 00:00:00.000000','01723343445','Abdullah','Management','2020',10000,1,'BRANCH ADMIN','',NULL,'1001','2024-03-31 15:16:26.000000'),(26,'abb@gmail.com','BRANCH ADMIN','1018','','2024-04-01 00:00:00.000000','0441231414','Kabir Hossain','Management','2020',10000,1,'AREA ADMIN','',NULL,NULL,'2024-04-01 16:36:36.000000');
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
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
