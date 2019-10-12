-- MySQL Workbench Synchronization
-- Generated: 2019-10-12 15:25
-- Model: New Model
-- Version: 1.0
-- Project: Name of the project
-- Author: Daneker

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

CREATE TABLE IF NOT EXISTS `mydb`.`Station` (
  `idStation` INT(11) NOT NULL,
  `station_name` VARCHAR(45) NOT NULL,
  `address` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idStation`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `mydb`.`Route` (
  `idRoute` INT(11) NOT NULL,
  `start_time` DATETIME NOT NULL,
  `end_time` DATETIME NOT NULL,
  `start_station_id` INT(11) NOT NULL,
  `end_station_id` INT(11) NOT NULL,
  `Schedule_idRoutes` INT(11) NOT NULL,
  `Train_idTrain` INT(11) NOT NULL,
  `passenger_number` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idRoute`),
  INDEX `fk_Route_Station_idx` (`start_station_id` ASC) VISIBLE,
  INDEX `fk_Route_Station1_idx` (`end_station_id` ASC) VISIBLE,
  INDEX `fk_Route_Schedule1_idx` (`Schedule_idRoutes` ASC) VISIBLE,
  INDEX `fk_Route_Train1_idx` (`Train_idTrain` ASC) VISIBLE,
  CONSTRAINT `fk_Route_Station`
    FOREIGN KEY (`start_station_id`)
    REFERENCES `mydb`.`Station` (`idStation`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Route_Station1`
    FOREIGN KEY (`end_station_id`)
    REFERENCES `mydb`.`Station` (`idStation`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Route_Schedule1`
    FOREIGN KEY (`Schedule_idRoutes`)
    REFERENCES `mydb`.`Schedule` (`idRoutes`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Route_Train1`
    FOREIGN KEY (`Train_idTrain`)
    REFERENCES `mydb`.`Train` (`idTrain`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `mydb`.`Schedule` (
  `idRoutes` INT(11) NOT NULL,
  `start_station_id` VARCHAR(45) NOT NULL,
  `end_station_id` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idRoutes`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

DROP TABLE IF EXISTS `mydb`.`TEAM` ;

DROP TABLE IF EXISTS `mydb`.`PERSON` ;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
