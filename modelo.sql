SET NAMES 'UTF8MB4';
DROP DATABASE IF EXISTS Examen;
CREATE DATABASE IF NOT EXISTS Examen DEFAULT CHARACTER SET UTF8MB4;
USE Examen;

CREATE TABLE gerentes(
id_grt         INTEGER NOT NULL AUTO_INCREMENT,
nombre      VARCHAR (40) NOT NULL,
ap_paterno  VARCHAR (15) NOT NULL,
ap_materno  VARCHAR (15) NOT NULL,
telefono   VARCHAR (10)  NOT NULL,
imagen     VARCHAR(20) NOT NULL,
PRIMARY KEY (id_grt)
)DEFAULT CHARACTER SET UTF8MB4;

CREATE TABLE hoteles(
id_htl     INTEGER NOT NULL AUTO_INCREMENT,
nombre 	   VARCHAR (40) NOT NULL,
direccion  VARCHAR (100) NOT NULL,
telefono   VARCHAR (10)  NOT NULL,
correo     VARCHAR (30) NOT NULL,
imagen     VARCHAR(20) NOT NULL,
id_grt     INTEGER,
PRIMARY KEY (id_htl),
FOREIGN KEY (id_grt) REFERENCES gerentes(id_grt)
)DEFAULT CHARACTER SET UTF8MB4;

CREATE TABLE habitaciones(
id_hbt    INTEGER NOT NULL AUTO_INCREMENT,
piso      VARCHAR(10) NOT NULL,
nombre    VARCHAR (30) NOT NULL,
refrigerador BOOLEAN   NOT NULL,
id_htl	     INTEGER,
PRIMARY KEY (id_hbt),
FOREIGN KEY (id_htl) REFERENCES hoteles(id_htl)
)DEFAULT CHARACTER SET UTF8MB4;