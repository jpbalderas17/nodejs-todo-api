# nodejs-todo-api
Sample todo api using node js

# Create a task table in your database with the sql statement below.
CREATE TABLE `tasks` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `completed_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

# Create a .env file and enter the values to be used
DB_NAME=<enter-database-name>
DB_USERNAME=<enter-database-user>
DB_PASSWORD=<enter-database-user-password>
DB_HOST=<enter-database-host>
DB_PORT=<enter-database-port>
