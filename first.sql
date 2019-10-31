-- MySQL Workbench Synchronization
-- Generated: 2019-10-31 19:48
-- Model: New Model
-- Version: 1.0
-- Project: Name of the project
-- Author: Daneker

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

CREATE TABLE IF NOT EXISTS `mydb`.`Ticket` (
  `idTicket` INT(11) NOT NULL AUTO_INCREMENT,
  `Passenger_idPassenger` INT(11) NOT NULL,
  `start_date` DATETIME NOT NULL,
  `end_date` DATETIME NOT NULL,
  `origin_id` INT(11) NOT NULL,
  `destination_id` INT(11) NOT NULL,
  `status` ENUM("UNAPPROVED", "APPROVED", "DECLINED", "CANCELLED", "PASSED") NOT NULL,
  `owner_document_type` VARCHAR(45) NOT NULL,
  `owner_firstname` VARCHAR(45) NOT NULL,
  `owner_lastname` VARCHAR(45) NOT NULL,
  `owner_document_id` VARCHAR(45) NOT NULL,
  `price` FLOAT(11) NULL DEFAULT NULL,
  `agent_id` INT(11) NOT NULL,
  `schedule_id` INT(11) NOT NULL,
  PRIMARY KEY (`idTicket`, `Passenger_idPassenger`),
  INDEX `fk_Ticket_Passenger1_idx` (`Passenger_idPassenger` ASC) VISIBLE,
  INDEX `fk_Ticket_Agent1_idx` (`agent_id` ASC) VISIBLE,
  INDEX `fk_Ticket_Schedule1_idx` (`schedule_id` ASC) VISIBLE,
  CONSTRAINT `fk_Ticket_Passenger1`
    FOREIGN KEY (`Passenger_idPassenger`)
    REFERENCES `mydb`.`Passenger` (`idPassenger`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Ticket_Agent1`
    FOREIGN KEY (`agent_id`)
    REFERENCES `mydb`.`Agent` (`idAgent`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Ticket_Schedule1`
    FOREIGN KEY (`schedule_id`)
    REFERENCES `mydb`.`Schedule` (`schedule_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `mydb`.`Passenger` (
  `idPassenger` INT(11) NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(45) NOT NULL,
  `lastname` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `phone_number` VARCHAR(45) NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idPassenger`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `mydb`.`Agent` (
  `idAgent` INT(11) NOT NULL AUTO_INCREMENT,
  `salary` FLOAT(11) NOT NULL,
  `working_hours` INT(11) NOT NULL,
  `firstname` VARCHAR(45) NOT NULL,
  `lastname` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `phone_number` VARCHAR(45) NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `station_id` INT(11) NOT NULL,
  PRIMARY KEY (`idAgent`),
  INDEX `fk_Agent_Station1_idx` (`station_id` ASC) VISIBLE,
  CONSTRAINT `fk_Agent_Station1`
    FOREIGN KEY (`station_id`)
    REFERENCES `mydb`.`Station` (`idStation`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `mydb`.`Train` (
  `idTrain` INT(11) NOT NULL AUTO_INCREMENT,
  `status` TINYINT(4) NOT NULL,
  `capacity` INT(11) NOT NULL,
  `Station_idStation` INT(11) NOT NULL,
  PRIMARY KEY (`idTrain`),
  INDEX `fk_Train_Station1_idx` (`Station_idStation` ASC) VISIBLE,
  CONSTRAINT `fk_Train_Station1`
    FOREIGN KEY (`Station_idStation`)
    REFERENCES `mydb`.`Station` (`idStation`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `mydb`.`Station` (
  `idStation` INT(11) NOT NULL AUTO_INCREMENT,
  `station_name` VARCHAR(45) NOT NULL,
  `address` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idStation`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `mydb`.`Route` (
  `idRoute` INT(11) NOT NULL AUTO_INCREMENT,
  `start_time` DATETIME NOT NULL,
  `send_time` DATETIME NOT NULL,
  `passenger_number` INT(11) NOT NULL,
  `start_station_id` INT(11) NOT NULL,
  `end_station_id` INT(11) NOT NULL,
  `schedule_id` INT(11) NOT NULL,
  `Train_idTrain` INT(11) NOT NULL,
  `price` FLOAT(11) NOT NULL,
  PRIMARY KEY (`idRoute`),
  INDEX `fk_Route_Station_idx` (`start_station_id` ASC) VISIBLE,
  INDEX `fk_Route_Station1_idx` (`end_station_id` ASC) VISIBLE,
  INDEX `fk_Route_Schedule1_idx` (`schedule_id` ASC) VISIBLE,
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
    FOREIGN KEY (`schedule_id`)
    REFERENCES `mydb`.`Schedule` (`schedule_id`)
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
  `schedule_id` INT(11) NOT NULL AUTO_INCREMENT,
  `start_station_id` INT(11) NOT NULL,
  `end_station_id` INT(11) NOT NULL,
  PRIMARY KEY (`schedule_id`),
  INDEX `fk_Schedule_Station1_idx` (`start_station_id` ASC) VISIBLE,
  INDEX `fk_Schedule_Station2_idx` (`end_station_id` ASC) VISIBLE,
  CONSTRAINT `fk_Schedule_Station1`
    FOREIGN KEY (`start_station_id`)
    REFERENCES `mydb`.`Station` (`idStation`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Schedule_Station2`
    FOREIGN KEY (`end_station_id`)
    REFERENCES `mydb`.`Station` (`idStation`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `mydb`.`Manager` (
  `idManager` INT(11) NOT NULL AUTO_INCREMENT,
  `salary` FLOAT(11) NOT NULL,
  `working_hours` INT(11) NOT NULL,
  `firstname` VARCHAR(45) NOT NULL,
  `lastname` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `phone_number` VARCHAR(45) NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `station_id` INT(11) NOT NULL,
  PRIMARY KEY (`idManager`),
  INDEX `fk_Manager_Station1_idx` (`station_id` ASC) VISIBLE,
  CONSTRAINT `fk_Manager_Station1`
    FOREIGN KEY (`station_id`)
    REFERENCES `mydb`.`Station` (`idStation`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `mydb`.`Station_Woker` (
  `idStation_Woker` INT(11) NOT NULL AUTO_INCREMENT,
  `station_id` INT(11) NOT NULL,
  PRIMARY KEY (`idStation_Woker`),
  INDEX `fk_Station_Woker_Station1_idx` (`station_id` ASC) VISIBLE,
  CONSTRAINT `fk_Station_Woker_Station1`
    FOREIGN KEY (`station_id`)
    REFERENCES `mydb`.`Station` (`idStation`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

