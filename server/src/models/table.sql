
-- create DB if NOT exists
CREATE DATABASE IF NOT EXISTS `dxlegends_maestro`;

CREATE TABLE
  `players` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `uuid` char(36) NOT NULL,
    `created_at` datetime DEFAULT current_timestamp(),
    `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    `name` varchar(255) NOT NULL,
    `player_name` varchar(255) NOT NULL,
    `password` varchar(255) NOT NULL,
    `rupees` int(11) DEFAULT 0,
    `wins` int(11) DEFAULT 0,
    `loses` int(11) DEFAULT 0,
    `banned_at` datetime DEFAULT NULL,
    `current_shape` varchar(30) DEFAULT NULL,
    `role` tinyint(3) DEFAULT 0,
    `shape_name` varchar(64) DEFAULT NULL,
    `shape_custom_current` blob DEFAULT NULL,
    `exp` int(10) unsigned NOT NULL DEFAULT 0,
    `email` varchar(255) DEFAULT NULL,
    `last_login` datetime NOT NULL DEFAULT current_timestamp(),
    `login_count` int(11) DEFAULT 0,
    `is_verified` tinyint(1) NOT NULL DEFAULT 0,
    `item_presets` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`item_presets`)),
    `banned_until` datetime DEFAULT NULL,
    `reported_counter` smallint(6) NOT NULL DEFAULT 0,
    `banned_reason` varchar(255) DEFAULT NULL,
    `games_counter` int(11) NOT NULL DEFAULT 0,
    `abandon_counter` int(11) DEFAULT 0,
    PRIMARY KEY (`id`),
    UNIQUE KEY `uuid` (`uuid`),
    UNIQUE KEY `unique_name` (`name`)
  ) ENGINE = InnoDB AUTO_INCREMENT = 128 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;
  
  
  CREATE TABLE
  `user_items` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `user_id` int(11) NOT NULL,
    `item_id` int(11) NOT NULL,
    `acquired_at` datetime DEFAULT current_timestamp(),
    `quantity` int(11) DEFAULT 1,
    PRIMARY KEY (`id`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci