/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19  Distrib 10.11.11-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: interpolice
-- ------------------------------------------------------
-- Server version	10.11.11-MariaDB

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
-- Table structure for table `Planeta`
--

DROP TABLE IF EXISTS `Planeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Planeta` (
  `id_planeta` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT 'Desconocido',
  `poblacion` int(11) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id_planeta`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Planeta`
--

LOCK TABLES `Planeta` WRITE;
/*!40000 ALTER TABLE `Planeta` DISABLE KEYS */;
/*!40000 ALTER TABLE `Planeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ciudadanos`
--

DROP TABLE IF EXISTS `ciudadanos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `ciudadanos` (
  `id_ciudadano` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `apellidos` varchar(255) NOT NULL,
  `apodo` varchar(45) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `codigo` varchar(45) DEFAULT NULL,
  `estado` varchar(45) NOT NULL DEFAULT 'activo',
  `planeta_origen` int(11) DEFAULT NULL,
  `planeta_residencia` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id_ciudadano`),
  KEY `planeta_origen` (`planeta_origen`),
  KEY `planeta_residencia` (`planeta_residencia`),
  CONSTRAINT `ciudadanos_ibfk_1` FOREIGN KEY (`planeta_origen`) REFERENCES `Planeta` (`id_planeta`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `ciudadanos_ibfk_2` FOREIGN KEY (`planeta_residencia`) REFERENCES `Planeta` (`id_planeta`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ciudadanos`
--

LOCK TABLES `ciudadanos` WRITE;
/*!40000 ALTER TABLE `ciudadanos` DISABLE KEYS */;
INSERT INTO `ciudadanos` VALUES
(1,'si funcionoooo','apellido actualizado','el piccaso','2024-05-10','/qrcode/ciudadano-1755032354589-50198.png','congelado',NULL,NULL,'0000-00-00 00:00:00','2025-08-12 21:09:24'),
(2,'juan','pascal','juancho','2020-12-24','aaae','vivo',NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),
(3,'chancho','nose','juancho','2020-12-24','/qrcodes/ciudadano-1750353338325-1079.png','vivo',NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),
(4,'papua','aaaaa','el pepe','2020-12-24','/qrcodes/ciudadano-1750353637547-38829.png','congelado',NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),
(5,'fernando','rifado','el pepe','2020-12-24','/qrcodes/ciudadano-1750354099182-90911.png','congelado',NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),
(6,'nuevo','nuevo','nuevo','2025-06-17','/qrcodes/ciudadano-1750366589386-6900.png','vivo',NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),
(7,'angel','stevan','el pepe','2025-06-26','/qrcodes/ciudadano-1750366756646-41190.png','congelado',NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),
(8,'nuevooo','nuevoooo','el piccaso','2024-05-10','/qrcode/ciudadano-1755031364145-2495.png','vivo',NULL,NULL,'2025-08-12 20:42:44','2025-08-12 20:42:44');
/*!40000 ALTER TABLE `ciudadanos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `planetas`
--

DROP TABLE IF EXISTS `planetas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `planetas` (
  `id_planeta` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `poblacion` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_planeta`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `planetas`
--

LOCK TABLES `planetas` WRITE;
/*!40000 ALTER TABLE `planetas` DISABLE KEYS */;
/*!40000 ALTER TABLE `planetas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-08-12 17:13:06
