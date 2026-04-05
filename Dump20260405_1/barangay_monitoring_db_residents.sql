-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: barangay_monitoring_db
-- ------------------------------------------------------
-- Server version	8.0.42

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
-- Dumping data for table `residents`
--

LOCK TABLES `residents` WRITE;
/*!40000 ALTER TABLE `residents` DISABLE KEYS */;
INSERT INTO `residents` VALUES (7,5,'Jomar','Namoco','1998-08-09','Male','Widowed','09334',1),(8,6,'Elgen','Espinoza','2004-09-16','Female','Widowed','98575',1),(9,7,'John Philip','Dasig','1989-09-07','Male','Separated','98747',0),(10,8,'Regine','Velasco','1947-08-08','Female','Married','87566',1),(11,9,'Ashley Mae','Morales','2006-08-14','Female','Married','12345',0),(12,10,'Joanna','Daming','2006-01-04','Female','Widowed','87536',1),(13,11,'Johnrex','Antolin','1956-06-08','Male','Separated','98847',0),(15,13,'Nelvin','Acquino','1899-05-07','Male','Widowed','76543',0),(16,14,'Robert','Asoque','1989-12-17','Male','Widowed','98706',0),(17,15,'Ronil','Rubin','1898-09-05','Male','Married','91234',1),(18,16,'Stephen Alix','Baguinaon','1858-08-31','Male','Widowed','12322',1),(19,17,'Kreshel','Reluya','1898-05-12','Female','Separated','16547',1),(20,18,'Precious Hyacent Cressa','Floria','1980-09-04','Female','Widowed','023532',1),(21,19,'Jaily','Moleta','1689-06-12','Female','Married','87456',1),(22,10,'Anamei','Dayon','1789-05-29','Female','Single','156467',0),(23,21,'Rhea Mae','Cumba','2006-08-16','Female','Married','45277',1),(24,22,'Jeakkah','Alarcon','1789-12-11','Female','Separated','45908',1),(25,23,'Jake','Sim','1898-08-08','Male','Single','45676',0),(26,24,'Heeseung','Lee','1889-10-23','Male','Married','123876',0),(27,25,'Sunghoon','Park','1898-05-19','Male','Married','169647',0),(28,26,'Ri-ki','Nishimura','1989-02-05','Male','Married','09876567894',0),(29,27,'Jungwon','Yang','1898-03-03','Male','Married','98345',0),(30,28,'Jay','Park','1789-04-27','Male','Married','23451',0),(32,30,'Taehyung','Kim','1777-09-14','Male','Widowed','09787',1),(33,31,'Yuqi','Song','1767-11-26','Female','Single','89009',0),(34,32,'Jennie','Kim','1678-09-19','Female','Married','65123',1),(35,33,'Ryan','Guanzon','1766-12-20','Male','Separated','15674',1),(36,34,'Mariel','Canillo','1878-10-29','Female','Single','69009',1),(37,35,'Khinjay','Rubin','1778-06-30','Male','Separated','56121',1),(38,36,'James','Bryan','1677-04-17','Female','Widowed','56789',1),(39,37,'Marjorie','Corbo','1788-09-16','Female','Separated','90090',1),(40,38,'Mikeven','Arado','1789-06-05','Male','Married','89090',1),(41,39,'Ryan ','James','1678-09-06','Male','Married','23456',1),(43,41,'Annie','Moon','1787-08-05','Female','Married','09123',1),(44,42,'Evan','Lee','1678-03-07','Male','Single','78789',0),(45,43,'Anne ','Hathaway','1679-09-05','Female','Single','90989',1),(46,44,'Nelkie','Milk','1778-06-04','Female','Married','85645',1),(47,45,'Jakehoon','Park','1678-07-06','Male','Married','78978',0),(48,46,'Heejake','Lee','1787-01-19','Male','Married','12654',0),(49,47,'Yunki','Nishimura','1676-03-17','Female','Married','65345',0),(50,48,'Jayke','Park','1798-12-10','Male','Married','09768',0),(52,50,'Jayunie','Shim','1789-05-07','Male','Single','56745',0),(53,51,'Regina','Lay','1790-09-06','Female','Widowed','90763',1),(54,46,'Jakah','Shim','1877-10-23','Male','Single','23432',1),(55,52,'Anna Marie','Berry','1778-09-09','Female','Married','46666',1),(56,53,'Jane','Jay','0877-05-31','Female','Separated','87654',1),(57,54,'Lenie','Zayn','1777-05-08','Female','Single','99789',1),(58,55,'Hyacent','Cressa','1674-07-07','Female','Single','43455',0),(59,56,'Happy','Yup','1687-08-06','Female','Separated','34322',0),(60,57,'Jashi','Ashly','1690-06-08','Male','Widowed','33333',1),(61,58,'Maque','Eb','1877-12-21','Male','Married','77777',0),(62,59,'Celia','Dayon','1678-06-06','Female','Widowed','89898',0),(63,60,'Ray','Yan','1770-01-31','Male','Separated','34543',1);
/*!40000 ALTER TABLE `residents` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-05 17:00:08
