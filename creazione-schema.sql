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
DROP TABLE IF EXISTS `piattaforma_vaccini`.`persona` ;

CREATE TABLE IF NOT EXISTS `piattaforma_vaccini`.`persona` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(90) NOT NULL,
  `cognome` VARCHAR(90) NOT NULL,
  `codice_fiscale` VARCHAR(20) NOT NULL,
  `data_nascita` DATE NULL,
  `foto_tessera_sanitaria` VARCHAR(255) NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `is_deleted` VARCHAR(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `codice_fiscale_UNIQUE` (`codice_fiscale` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `piattaforma_vaccini`.`somministrazione`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `piattaforma_vaccini`.`somministrazione` ;

CREATE TABLE IF NOT EXISTS `piattaforma_vaccini`.`somministrazione` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `persona_id` INT UNSIGNED NOT NULL,
  `dose` VARCHAR(45) NOT NULL,
  `vaccino` VARCHAR(45) NOT NULL,
  `data_ora` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_somministrazione_persona1_idx` (`persona_id` ASC) VISIBLE,
  CONSTRAINT `fk_somministrazione_persona1`
    FOREIGN KEY (`persona_id`)
    REFERENCES `piattaforma_vaccini`.`persona` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `piattaforma_vaccini`.`postazione`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `piattaforma_vaccini`.`postazione` ;

CREATE TABLE IF NOT EXISTS `piattaforma_vaccini`.`postazione` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `luogo` VARCHAR(45) NOT NULL,
  `data_ora` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `piattaforma_vaccini`.`prenotazione`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `piattaforma_vaccini`.`prenotazione` ;

CREATE TABLE IF NOT EXISTS `piattaforma_vaccini`.`prenotazione` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `persona_id` INT UNSIGNED NOT NULL,
  `somministrazione_id` INT UNSIGNED NULL,
  `postazione_id` INT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `annullato_il` TIMESTAMP NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_prenotazione_persona_idx` (`persona_id` ASC) VISIBLE,
  INDEX `fk_prenotazione_somministrazione1_idx` (`somministrazione_id` ASC) VISIBLE,
  INDEX `fk_prenotazione_postazione_idx` (`postazione_id` ASC) VISIBLE,
  CONSTRAINT `fk_prenotazione_persona`
    FOREIGN KEY (`persona_id`)
    REFERENCES `piattaforma_vaccini`.`persona` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_prenotazione_somministrazione1`
    FOREIGN KEY (`somministrazione_id`)
    REFERENCES `piattaforma_vaccini`.`somministrazione` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_prenotazione_postazione`
    FOREIGN KEY (`postazione_id`)
    REFERENCES `piattaforma_vaccini`.`postazione` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `piattaforma_vaccini`.`utente`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `piattaforma_vaccini`.`utente` ;

CREATE TABLE IF NOT EXISTS `piattaforma_vaccini`.`utente` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(90) NOT NULL,
  `password` VARCHAR(90) NOT NULL,
  `nome` VARCHAR(90) NULL,
  `cognome` VARCHAR(90) NULL,
  `data_nascita` DATE NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `piattaforma_vaccini`.`token`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `piattaforma_vaccini`.`token` ;

CREATE TABLE IF NOT EXISTS `piattaforma_vaccini`.`token` (
  `token` VARCHAR(200) NOT NULL,
  `utente_id` INT UNSIGNED NOT NULL,
  `exp` INT NOT NULL,
  PRIMARY KEY (`token`),
  INDEX `fk_token_utente1_idx` (`utente_id` ASC) VISIBLE,
  CONSTRAINT `fk_token_utente1`
    FOREIGN KEY (`utente_id`)
    REFERENCES `piattaforma_vaccini`.`utente` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
