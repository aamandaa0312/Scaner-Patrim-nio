-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           10.4.32-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para patrimônio
DROP DATABASE IF EXISTS `patrimônio`;
CREATE DATABASE IF NOT EXISTS `patrimônio` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `patrimônio`;

-- Copiando estrutura para tabela patrimônio.patrimonios
DROP TABLE IF EXISTS `patrimonios`;
CREATE TABLE IF NOT EXISTS `patrimonios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `codigo_qr` varchar(255) NOT NULL,
  `descricao` text NOT NULL,
  `setor_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `codigo_qr` (`codigo_qr`),
  KEY `setor_id` (`setor_id`),
  CONSTRAINT `patrimonios_ibfk_1` FOREIGN KEY (`setor_id`) REFERENCES `setores` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela patrimônio.patrimonios: ~1 rows (aproximadamente)
INSERT INTO `patrimonios` (`id`, `codigo_qr`, `descricao`, `setor_id`) VALUES
	(1, '', 'oi', 20520017);

-- Copiando estrutura para tabela patrimônio.setores
DROP TABLE IF EXISTS `setores`;
CREATE TABLE IF NOT EXISTS `setores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `responsavel` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20520097 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela patrimônio.setores: ~52 rows (aproximadamente)
INSERT INTO `setores` (`id`, `nome`, `responsavel`) VALUES
	(20520001, 'Zeladoria', NULL),
	(20520002, 'Inservíveis', NULL),
	(20520003, 'OPP', NULL),
	(20520004, 'OPPII', NULL),
	(20520005, 'Arquivo', NULL),
	(20520006, 'Auditório', NULL),
	(20520007, 'BanheiroF', NULL),
	(20520008, 'Pav Social', NULL),
	(20520009, 'Quadra', NULL),
	(20520010, 'Secretaria', NULL),
	(20520011, 'Hall', NULL),
	(20520012, 'Docentes', NULL),
	(20520013, 'Servidor', NULL),
	(20520014, 'Diretoria', NULL),
	(20520015, 'Treinamento', NULL),
	(20520016, 'Copa', NULL),
	(20520017, 'A classificar', NULL),
	(20520020, 'Ajustagem', NULL),
	(20520021, 'Mezanino', NULL),
	(20520022, 'Lab Máquinas (Comandos)', NULL),
	(20520024, 'Treinamento OC', NULL),
	(20520026, 'Montagem Painéis', NULL),
	(20520027, 'Eletrônica I', NULL),
	(20520028, 'Lab 1', NULL),
	(20520030, 'Dracena', NULL),
	(20520031, 'Torno CNC', NULL),
	(20520032, 'CLP', NULL),
	(20520033, 'Eletrônica II', NULL),
	(20520034, 'Automoção', NULL),
	(20520035, 'Orientador Educacional', NULL),
	(20520036, 'Consultores', NULL),
	(20520038, 'Metrologia', NULL),
	(20520040, 'Oficina Mecânica Diesel', NULL),
	(20520054, 'Lab 2Lab 2', NULL),
	(20520055, 'Lab 3', NULL),
	(20520056, 'Biblioteca', NULL),
	(20520057, 'Sala 1', NULL),
	(20520059, 'Almoxarifado', NULL),
	(20520060, 'Oficina de solda', NULL),
	(20520061, 'Sala V', NULL),
	(20520062, 'Sala VII', NULL),
	(20520063, 'Sala VI', NULL),
	(20520064, 'Elétrica', NULL),
	(20520065, 'Tornearia', NULL),
	(20520066, 'Tornearia II', NULL),
	(20520068, 'Lab 4', NULL),
	(20520069, 'Química', NULL),
	(20520072, 'Oficina Auto elet', NULL),
	(20520073, 'Mecânica de Auto', NULL),
	(20520085, 'Elétrica II', NULL),
	(20520090, 'Sala IV', NULL),
	(20520093, 'Alimentos', NULL);

-- Copiando estrutura para tabela patrimônio.usuarios
DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `senha` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela patrimônio.usuarios: ~2 rows (aproximadamente)
INSERT INTO `usuarios` (`id`, `email`, `senha`) VALUES
	(1, 'amanda@gmail.com', '111'),
	(11, 'amanda5@gmail.com', '0d09b8fa608a6af312390f0d6bf3e17f713f830777df780aa604344b32b41955');

-- Copiando estrutura para tabela patrimônio.usuário
DROP TABLE IF EXISTS `usuário`;
CREATE TABLE IF NOT EXISTS `usuário` (
  `id_setor` int(11) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  KEY `id_setor` (`id_setor`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `setores` FOREIGN KEY (`id_setor`) REFERENCES `setores` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela patrimônio.usuário: ~0 rows (aproximadamente)

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
