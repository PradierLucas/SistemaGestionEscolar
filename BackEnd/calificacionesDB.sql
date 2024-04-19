-- CREATE DATABASE CALIFICACIONES;
-- USE CALIFICACIONES;
-- CREATE TABLE ROL
-- (
--   id_rol INT NOT NULL auto_increment,
--   nombre VARCHAR(80) NOT NULL,
--   PRIMARY KEY (id_rol)
-- );

-- CREATE TABLE CURSO
-- (
--   id_curso INT NOT NULL auto_increment,
--   nombre VARCHAR(80) NOT NULL,
  
--   PRIMARY KEY (id_curso)
-- );


-- CREATE TABLE USUARIO
-- (

--   id_usuario INT NOT NULL auto_increment,
--   email VARCHAR(80) NOT NULL UNIQUE,
--   nombre VARCHAR(80) NOT NULL,
--   apellido VARCHAR(80) NOT NULL,
--   dni VARCHAR(80) NOT NULL,
--   password VARCHAR(255) NOT NULL,
--   id_rol INT NOT NULL,
--   id_curso INT,
--   PRIMARY KEY (id_usuario),
--   FOREIGN KEY (id_rol) REFERENCES ROL(id_rol),
--   FOREIGN KEY (id_curso) REFERENCES CURSO(id_curso)
-- );

-- CREATE TABLE MATERIA
-- (
--   id_materia INT NOT NULL auto_increment,
--   nombre VARCHAR(80) NOT NULL,
--   id_usuario INT NOT NULL,
--   id_curso INT NOT NULL,
--    PRIMARY KEY (id_materia),
--   FOREIGN KEY (id_curso) REFERENCES CURSO(id_curso),
--   FOREIGN KEY (id_usuario) REFERENCES USUARIO(id_usuario)
 
-- );
 
-- CREATE TABLE NOTAS
-- (
--   periodo_1 FLOAT,
--   periodo_2 FLOAT,
--   periodo_3 FLOAT,
--   id_materia INT NOT NULL,
--   id_usuario INT NOT NULL,
--   PRIMARY KEY (id_materia, id_usuario),
--   FOREIGN KEY (id_materia) REFERENCES MATERIA(id_materia),
--   FOREIGN KEY (id_usuario) REFERENCES USUARIO(id_usuario)
-- );

-- INSERT INTO ROL (nombre) VALUES ("admin");
-- INSERT INTO ROL (nombre) VALUES ("estudiante");
-- INSERT INTO ROL (nombre) VALUES ("profesor");


CREATE DATABASE CALIFICACION;
USE CALIFICACION;
--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;

CREATE TABLE `rol` (
  `id_rol` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(80) NOT NULL,
  PRIMARY KEY (`id_rol`)
) 


--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;

INSERT INTO `rol` VALUES (1,'admin'),(2,'estudiante'),(3,'profesor');

UNLOCK TABLES;


DROP TABLE IF EXISTS `curso`;

CREATE TABLE `curso` (
  `id_curso` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(80) NOT NULL,
  PRIMARY KEY (`id_curso`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


--
-- Dumping data for table `curso`
--

LOCK TABLES `curso` WRITE;

INSERT INTO `curso` VALUES (1,'Historias'),(2,'Música'),(3,'Ciencia'),(8,'-');

UNLOCK TABLES;




--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;

CREATE TABLE `usuario` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `email` varchar(80) NOT NULL,
  `nombre` varchar(80) NOT NULL,
  `apellido` varchar(80) NOT NULL,
  `dni` varchar(80) NOT NULL,
  `password` varchar(255) NOT NULL,
  `id_rol` int NOT NULL,
  `id_curso` int DEFAULT NULL,
  `imagen` longtext,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `email` (`email`),
  KEY `id_rol` (`id_rol`),
  KEY `id_curso` (`id_curso`),
  CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_rol`),
  CONSTRAINT `usuario_ibfk_2` FOREIGN KEY (`id_curso`) REFERENCES `curso` (`id_curso`)
) 


--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;

INSERT INTO `usuario` VALUES 
(11,'emily@gmail.com','Emily','Ramírez','43479469','$2a$10$69/XO3sqzjUNQedZQjiozuC/YGGe/P8A83Ps8Enw8o4cpDgQYgtQe',2,3,NULL)
,(12,'liam@gmail.com','Liam','Juárez','40915629','$2b$10$S1lfWXPPkl2l4PYhso0dNu/Oia.M/J/7SGLXF1KZGO3OoYIkTyWbW',2,3,NULL),
(13,'abi@gmail.com','Abigail','Fernández','40517267','$2a$10$Se2PXFewmFFl6Ub4kFb5xu311/j7yibgUqN8LPFhWQffcDQSQl1ju',2,3,NULL),
(14,'lucas@gmail.com','Lucas','Acosta','42228602','$2b$10$4iQtz9r39xUk1kNRdsOeFexkSA6LLm/3EpGUWidVqiec3PBAGYL.y',2,3,NULL),
(15,'mia@gmail.com','MIA','MIA','40304829','$2b$10$u/DIkLgDUSV0dIzKy0C8hOcMVSQY6pBTUIaeXIevERhNGF./M9gYi',2,3,NULL),
(16,'madi@gmail.com','Madison','Benítez','32117215','$2a$10$t/hm0pIkChd4cqL06hAU1OaV177woyCO3bjbZ9yU3ghipIAFGYWWG',3,NULL,NULL),
(17,'benja@gmail.com','Benjamín','Muñoz','34256503','$2a$10$89.QK0etJqCo9AiWF0fU0eDbj/HGyeaE/.SpOyxmwEwYmcJMIP2a2',3,NULL,NULL),
(18,'eli@gmail.com','Elizabeth','Paz','30383816','$2a$10$m62bzQRw7IWE7L6Fhy.ad.cVw2WDg0XBR4LSInRGFHaDNICMfxlma',3,NULL,NULL),
(19,'dani@gmail.com','Daniel','Vera','31783731','$2a$10$A60DPp1FkGOOpjWbHof0wOvLT1487cbFYLL9WISri0/t0NWFSeGd6',3,NULL,NULL),
(21,'ale@gmail.com','Alejandro','Silva','31091785','$2b$10$UE6Q.W516bSm8yR9wDUNFewSa/Dl2CzN2mxQke/NMjvlZ54L60n.C',3,NULL,NULL);

UNLOCK TABLES;



--
-- Table structure for table `materia`
--

DROP TABLE IF EXISTS `materia`;

CREATE TABLE `materia` (
  `id_materia` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(80) NOT NULL,
  `id_usuario` int NOT NULL,
  `id_curso` int NOT NULL,
  PRIMARY KEY (`id_materia`),
  KEY `id_curso` (`id_curso`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `materia_ibfk_1` FOREIGN KEY (`id_curso`) REFERENCES `curso` (`id_curso`),
  CONSTRAINT `materia_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`)
)


--
-- Dumping data for table `materia`
--

LOCK TABLES `materia` WRITE;

INSERT INTO `materia` VALUES (1,'Historia Antigua',17,1),(5,'Metodo Científico',21,1),(6,'Laboratorio',21,3),(11,'ingles',18,1);

UNLOCK TABLES;


--
-- Table structure for table `notas`
--

DROP TABLE IF EXISTS `notas`;

CREATE TABLE `notas` (
  `idnota` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int NOT NULL,
  `id_materia` int NOT NULL,
  `descripcion` varchar(45) NOT NULL,
  `valor` float NOT NULL,
  PRIMARY KEY (`idnota`),
  KEY `alumno_idx` (`id_usuario`),
  KEY `materia_idx` (`id_materia`),
  CONSTRAINT `alumno` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`),
  CONSTRAINT `materia` FOREIGN KEY (`id_materia`) REFERENCES `materia` (`id_materia`)
) 

--
-- Dumping data for table `notas`
--

LOCK TABLES `notas` WRITE;

INSERT INTO `notas` VALUES (7,14,5,'final',7),(8,11,5,'final',8),(11,39,5,'final',5.5);

UNLOCK TABLES;
