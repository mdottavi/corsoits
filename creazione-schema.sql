-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema piattaforma_vaccini
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema piattaforma_vaccini
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `piattaforma_vaccini` DEFAULT CHARACTER SET utf8 ;
USE `piattaforma_vaccini` ;

-- -----------------------------------------------------
-- Table `piattaforma_vaccini`.`persona`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `piattaforma_vaccini`.`persona` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(90) NOT NULL,
  `cognome` VARCHAR(90) NOT NULL,
  `codice_fiscale` VARCHAR(20) NOT NULL,
  `data_nascita` DATE NULL,
  `foto_tessera_sanitaria` VARCHAR(255) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `codice_fiscale_UNIQUE` (`codice_fiscale` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `piattaforma_vaccini`.`somministrazione`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `piattaforma_vaccini`.`somministrazione` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `persona_id` INT UNSIGNED NOT NULL,
  `dose` VARCHAR(45) NOT NULL,
  `vaccino` VARCHAR(45) NOT NULL,
  `data_ora` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_somministrazione_persona1_idx` (`persona_id` ASC),
  CONSTRAINT `fk_somministrazione_persona1`
    FOREIGN KEY (`persona_id`)
    REFERENCES `piattaforma_vaccini`.`persona` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `piattaforma_vaccini`.`prenotazione`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `piattaforma_vaccini`.`prenotazione` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `persona_id` INT UNSIGNED NOT NULL,
  `somministrazione_id` INT UNSIGNED NULL,
  `data_ora` DATETIME NOT NULL,
  `luogo` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_prenotazione_persona_idx` (`persona_id` ASC),
  INDEX `fk_prenotazione_somministrazione1_idx` (`somministrazione_id` ASC),
  CONSTRAINT `fk_prenotazione_persona`
    FOREIGN KEY (`persona_id`)
    REFERENCES `piattaforma_vaccini`.`persona` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_prenotazione_somministrazione1`
    FOREIGN KEY (`somministrazione_id`)
    REFERENCES `piattaforma_vaccini`.`somministrazione` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
