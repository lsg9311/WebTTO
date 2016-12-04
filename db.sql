CREATE TABLE `kweb`.`user` ( 
   `user_id` INT NOT NULL AUTO_INCREMENT , 
   `name` VARCHAR(100) NOT NULL , 
   PRIMARY KEY (`user_id`, `name`), 
   UNIQUE (`name`)) ENGINE = InnoDB CHARACTER SET utf8 COLLATE utf8_general_ci;