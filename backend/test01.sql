-- MariaDB dump 10.17  Distrib 10.5.4-MariaDB, for Win64 (AMD64)
--
-- Host: 127.0.0.1    Database: test01
-- ------------------------------------------------------
-- Server version	10.5.4-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `commands`
--

DROP TABLE IF EXISTS `commands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `commands` (
  `no` int(11) NOT NULL AUTO_INCREMENT,
  `deviceNo` int(11) DEFAULT NULL,
  `command` varchar(45) DEFAULT NULL,
  `reserved` varchar(45) DEFAULT NULL,
  `result` varchar(45) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  PRIMARY KEY (`no`),
  KEY `FK_commands_deviceNo_devices_no` (`deviceNo`),
  CONSTRAINT `FK_commands_deviceNo_devices_no` FOREIGN KEY (`deviceNo`) REFERENCES `devices` (`no`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commands`
--

LOCK TABLES `commands` WRITE;
/*!40000 ALTER TABLE `commands` DISABLE KEYS */;
INSERT INTO `commands` VALUES (5,2,'ls',NULL,NULL,'2020-07-27 17:52:27'),(6,2,'pwd',NULL,NULL,'2020-07-27 17:52:30'),(7,2,'mkdir a',NULL,NULL,'2020-07-27 17:52:40'),(9,2,'passwd','1234',NULL,'2020-07-31 10:04:27');
/*!40000 ALTER TABLE `commands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `corp`
--

DROP TABLE IF EXISTS `corp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `corp` (
  `no` int(11) NOT NULL AUTO_INCREMENT,
  `corpId` varchar(45) NOT NULL,
  `corpName` varchar(45) DEFAULT NULL,
  `corpContactNumber` varchar(45) DEFAULT NULL,
  `createdDate` datetime NOT NULL,
  `modifiedDate` datetime DEFAULT NULL,
  PRIMARY KEY (`no`),
  KEY `corpIdIndex` (`corpId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `corp`
--

LOCK TABLES `corp` WRITE;
/*!40000 ALTER TABLE `corp` DISABLE KEYS */;
INSERT INTO `corp` VALUES (1,'A001','infofla','01012341234','2020-07-14 13:26:14',NULL),(2,'A002','test','01032322333','2020-07-14 14:37:35',NULL);
/*!40000 ALTER TABLE `corp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `devices`
--

DROP TABLE IF EXISTS `devices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `devices` (
  `hostname` varchar(45) DEFAULT NULL,
  `ip` varchar(45) DEFAULT NULL,
  `id` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `no` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL COMMENT 'cli/web',
  PRIMARY KEY (`no`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `devices`
--

LOCK TABLES `devices` WRITE;
/*!40000 ALTER TABLE `devices` DISABLE KEYS */;
INSERT INTO `devices` VALUES ('test','127.0.0.1','test01','5678',2,'2020-07-27 16:51:22','CLI');
/*!40000 ALTER TABLE `devices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `no` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(45) NOT NULL,
  `userName` varchar(45) DEFAULT NULL,
  `corpId` varchar(45) NOT NULL,
  `createdDate` datetime NOT NULL,
  `modifiedDate` datetime DEFAULT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`no`),
  KEY `FK_Usercorps_corpId_Corp_corpId` (`corpId`),
  CONSTRAINT `FK_Usercorps_corpId_Corp_corpId` FOREIGN KEY (`corpId`) REFERENCES `corp` (`corpId`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'001','hyojin','A001','2020-07-14 13:27:37',NULL,'81dc9bdb52d04dc20036dbd8313ed055'),(2,'00002','HYOJIN123','A002','2020-07-14 14:39:00','2020-07-21 13:43:32','674f3c2c1a8a6f90461e8a66fb5550ba'),(3,'0002','testuser2','A002','2020-07-14 14:39:11',NULL,'asdf'),(8,'0008','hyojin3','A002','2020-07-20 13:36:39','2020-07-20 14:33:05','81dc9bdb52d04dc20036dbd8313ed055'),(26,'000432','HYOJIN123','A001','2020-07-22 14:52:50',NULL,'81dc9bdb52d04dc20036dbd8313ed055'),(27,'12344444','GHY','A001','2020-07-22 14:53:30',NULL,'81dc9bdb52d04dc20036dbd8313ed055'),(28,'123412341','htyy','A001','2020-07-22 14:59:58',NULL,'81dc9bdb52d04dc20036dbd8313ed055'),(29,'hyojin','anhyojin','A002','2020-09-02 13:08:45',NULL,'81dc9bdb52d04dc20036dbd8313ed055');
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

-- Dump completed on 2020-09-02 15:54:53
