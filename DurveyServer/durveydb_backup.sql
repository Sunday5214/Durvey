-- MariaDB dump 10.17  Distrib 10.4.13-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: durveydb
-- ------------------------------------------------------
-- Server version	10.4.13-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `choices`
--

DROP TABLE IF EXISTS `choices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `choices` (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL,
  `questionIdx` int(11) NOT NULL,
  `number` int(11) DEFAULT 0,
  `selectCount` int(11) NOT NULL,
  PRIMARY KEY (`idx`),
  KEY `choices_ibfk_1` (`questionIdx`),
  CONSTRAINT `choices_ibfk_1` FOREIGN KEY (`questionIdx`) REFERENCES `questions` (`idx`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `choices`
--

LOCK TABLES `choices` WRITE;
/*!40000 ALTER TABLE `choices` DISABLE KEYS */;
INSERT INTO `choices` VALUES (1,'숟가락',1,1,0),(2,'젓가락',1,2,0),(3,'이두박근',1,3,0),(4,'밥그릇',1,4,0),(5,'국그릇',1,5,0);
/*!40000 ALTER TABLE `choices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `complete_survey`
--

DROP TABLE IF EXISTS `complete_survey`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `complete_survey` (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `completeSurveyIdx` int(11) NOT NULL,
  `userIdx` int(11) NOT NULL,
  `finishedDateTime` datetime DEFAULT NULL,
  PRIMARY KEY (`idx`),
  KEY `completeSurveyIdx` (`completeSurveyIdx`),
  KEY `userIdx` (`userIdx`),
  CONSTRAINT `complete_survey_ibfk_1` FOREIGN KEY (`completeSurveyIdx`) REFERENCES `surveys` (`idx`),
  CONSTRAINT `complete_survey_ibfk_2` FOREIGN KEY (`userIdx`) REFERENCES `users` (`idx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `complete_survey`
--

LOCK TABLES `complete_survey` WRITE;
/*!40000 ALTER TABLE `complete_survey` DISABLE KEYS */;
/*!40000 ALTER TABLE `complete_survey` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `questions` (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `questionContent` text NOT NULL,
  `surveyIdx` int(11) NOT NULL,
  `questionType` int(11) DEFAULT 1,
  `isNecessary` int(11) NOT NULL,
  PRIMARY KEY (`idx`),
  KEY `questions_ibfk_1` (`surveyIdx`),
  CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`surveyIdx`) REFERENCES `surveys` (`idx`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` VALUES (1,'다음중 밥먹을때 필요한것은',1,2,0);
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rtvotes`
--

DROP TABLE IF EXISTS `rtvotes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rtvotes` (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `title` text NOT NULL,
  `firstContent` text NOT NULL,
  `secondContent` text NOT NULL,
  `startDatetime` datetime DEFAULT NULL,
  `endDatetime` datetime DEFAULT NULL,
  `createDatetime` datetime DEFAULT NULL,
  `firstSelectedCount` int(11) DEFAULT 0,
  `secondSelectedCount` int(11) DEFAULT 0,
  PRIMARY KEY (`idx`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rtvotes`
--

LOCK TABLES `rtvotes` WRITE;
/*!40000 ALTER TABLE `rtvotes` DISABLE KEYS */;
INSERT INTO `rtvotes` VALUES (1,'안녕하세요 테스트입니다','잠이온다','잠이 안온다','2020-10-12 12:00:00','2020-10-14 12:00:00','2020-10-12 12:00:00',0,0);
/*!40000 ALTER TABLE `rtvotes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `survey_result`
--

DROP TABLE IF EXISTS `survey_result`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `survey_result` (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `surveyIdx` int(11) NOT NULL,
  `questionIdx` int(11) NOT NULL,
  `answerUserIdx` int(11) NOT NULL,
  `answerText` text DEFAULT NULL,
  `answerNumber` int(11) DEFAULT NULL,
  `questionType` int(11) DEFAULT NULL,
  PRIMARY KEY (`idx`),
  KEY `surveyIdx` (`surveyIdx`),
  KEY `questionIdx` (`questionIdx`),
  KEY `answerUserIdx` (`answerUserIdx`),
  CONSTRAINT `survey_result_ibfk_1` FOREIGN KEY (`surveyIdx`) REFERENCES `surveys` (`idx`),
  CONSTRAINT `survey_result_ibfk_2` FOREIGN KEY (`questionIdx`) REFERENCES `questions` (`idx`),
  CONSTRAINT `survey_result_ibfk_3` FOREIGN KEY (`answerUserIdx`) REFERENCES `users` (`idx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `survey_result`
--

LOCK TABLES `survey_result` WRITE;
/*!40000 ALTER TABLE `survey_result` DISABLE KEYS */;
/*!40000 ALTER TABLE `survey_result` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `surveys`
--

DROP TABLE IF EXISTS `surveys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `surveys` (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `title` text NOT NULL,
  `creatorIdx` int(11) NOT NULL,
  `description` text DEFAULT NULL,
  `createDatetime` datetime NOT NULL,
  `startDatetime` datetime NOT NULL,
  `endDatetime` datetime NOT NULL,
  `IsAnonymous` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`idx`),
  KEY `surveys_ibfk_1` (`creatorIdx`),
  CONSTRAINT `surveys_ibfk_1` FOREIGN KEY (`creatorIdx`) REFERENCES `users` (`idx`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `surveys`
--

LOCK TABLES `surveys` WRITE;
/*!40000 ALTER TABLE `surveys` DISABLE KEYS */;
INSERT INTO `surveys` VALUES (1,'학교 급식 설문조사',1,'학교급식설문을 위한 설문','2020-09-04 00:00:00','2020-09-04 00:00:00','2020-09-05 00:00:00',0),(2,'hello world',1,'테스트용 설문','2020-09-23 12:00:00','2020-09-24 12:00:00','2020-09-26 12:00:00',1);
/*!40000 ALTER TABLE `surveys` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `email` text NOT NULL,
  PRIMARY KEY (`idx`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'김태오','kteo@naver.com'),(2,'이서연','123@naver.com'),(3,'이서연','123@naver.com');
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

-- Dump completed on 2020-10-13 19:56:44
