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
-- Table structure for table `ciudadanos`
--

DROP TABLE IF EXISTS `ciudadanos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `ciudadanos` (
  `id_ciudadano` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `apellidos` varchar(45) DEFAULT NULL,
  `apodo` varchar(45) DEFAULT NULL,
  `fecha_nacimiento` date NOT NULL,
  `planeta_origen` varchar(45) NOT NULL,
  `planeta_residencia` varchar(45) NOT NULL,
  `foto` text DEFAULT NULL,
  `codigo` varchar(100) NOT NULL,
  `estado` enum('muerto','vivo','congelado') DEFAULT NULL,
  PRIMARY KEY (`id_ciudadano`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ciudadanos`
--

LOCK TABLES `ciudadanos` WRITE;
/*!40000 ALTER TABLE `ciudadanos` DISABLE KEYS */;
INSERT INTO `ciudadanos` VALUES
(1,'juan','actualizadooooo','juancho','2020-12-24','saturno','marte','/ruta','aaae','muerto'),
(2,'juan','pascal','juancho','2020-12-24','saturno','marte','/ruta','aaae','vivo'),
(3,'chancho','nose','juancho','2020-12-24','venus','marte','/ruta','/qrcodes/ciudadano-1750353338325-1079.png','vivo'),
(4,'papua','aaaaa','el pepe','2020-12-24','venus','marte','/qrcodes/ciudadano-1750353637547-38829.png','/qrcodes/ciudadano-1750353637547-38829.png','congelado'),
(5,'fernando','rifado','el pepe','2020-12-24','venus','marte','/qrcodes/ciudadano-1750354099182-90911.png','/qrcodes/ciudadano-1750354099182-90911.png','congelado'),
(6,'nuevo','nuevo','nuevo','2025-06-17','papa','papa','/qrcodes/ciudadano-1750366589386-6900.png','/qrcodes/ciudadano-1750366589386-6900.png','vivo'),
(7,'angel','stevan','el pepe','2025-06-26','marte','venus','/qrcodes/ciudadano-1750366756646-41190.png','/qrcodes/ciudadano-1750366756646-41190.png','congelado');
/*!40000 ALTER TABLE `ciudadanos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-19 17:22:49
