-- MySQL Workbench Synchronization
-- Generated: 2022-04-22 11:16
-- Model: New Model
-- Version: 1.0
-- Project: Name of the project
-- Author: tdlem

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

CREATE SCHEMA IF NOT EXISTS `piattaforma_vaccini_v2` DEFAULT CHARACTER SET utf8 ;

CREATE TABLE IF NOT EXISTS `piattaforma_vaccini_v2`.`sede` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `citta` VARCHAR(255) NOT NULL,
  `indirizzo` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `piattaforma_vaccini_v2`.`prenotazione` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `data` DATETIME NOT NULL,
  `sede_id` INT(10) UNSIGNED NOT NULL,
  `somministrazione_id` INT(10) UNSIGNED NULL DEFAULT NULL,
  `note` VARCHAR(45) NULL DEFAULT NULL,
  `persona_id` INT(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_prenotazione_sede_idx` (`sede_id` ASC),
  INDEX `fk_prenotazione_somministrazione1_idx` (`somministrazione_id` ASC),
  INDEX `fk_prenotazione_persona1_idx` (`persona_id` ASC),
  CONSTRAINT `fk_prenotazione_sede`
    FOREIGN KEY (`sede_id`)
    REFERENCES `piattaforma_vaccini_v2`.`sede` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_prenotazione_somministrazione1`
    FOREIGN KEY (`somministrazione_id`)
    REFERENCES `piattaforma_vaccini_v2`.`somministrazione` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_prenotazione_persona1`
    FOREIGN KEY (`persona_id`)
    REFERENCES `piattaforma_vaccini_v2`.`persona` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `piattaforma_vaccini_v2`.`persona` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `cognome` VARCHAR(45) NOT NULL,
  `codice_fiscale` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `piattaforma_vaccini_v2`.`somministrazione` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `vaccino` VARCHAR(45) NOT NULL,
  `dose` VARCHAR(45) NOT NULL,
  `data_somministrazione` DATE NOT NULL,
  `note` TEXT NOT NULL,
  `opertore_id` INT(10) UNSIGNED NOT NULL,
  `persona_id` INT(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_somministrazione_opertore1_idx` (`opertore_id` ASC),
  INDEX `fk_somministrazione_persona1_idx` (`persona_id` ASC),
  CONSTRAINT `fk_somministrazione_opertore1`
    FOREIGN KEY (`opertore_id`)
    REFERENCES `piattaforma_vaccini_v2`.`opertore` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_somministrazione_persona1`
    FOREIGN KEY (`persona_id`)
    REFERENCES `piattaforma_vaccini_v2`.`persona` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `piattaforma_vaccini_v2`.`opertore` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `ruolo` VARCHAR(90) NOT NULL,
  `nome` VARCHAR(90) NOT NULL,
  `cognome` VARCHAR(90) NOT NULL,
  `username` VARCHAR(90) NOT NULL,
  `password` VARCHAR(90) NOT NULL,
  `sede_id` INT(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_opertore_sede1_idx` (`sede_id` ASC),
  CONSTRAINT `fk_opertore_sede1`
    FOREIGN KEY (`sede_id`)
    REFERENCES `piattaforma_vaccini_v2`.`sede` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `piattaforma_vaccini_v2`.`token` (
  `token` VARCHAR(45) NOT NULL,
  `opertore_id` INT(10) UNSIGNED NOT NULL,
  `exp` BIGINT(19) UNSIGNED NOT NULL,
  `remind_me` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`token`),
  INDEX `fk_token_opertore1_idx` (`opertore_id` ASC),
  CONSTRAINT `fk_token_opertore1`
    FOREIGN KEY (`opertore_id`)
    REFERENCES `piattaforma_vaccini_v2`.`opertore` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
