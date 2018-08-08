CREATE TABLE `enum_cycles` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `literal` varchar(45) NOT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

CREATE TABLE `enum_trimestres` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `literal` varchar(45) NOT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

CREATE TABLE `enum_resultats` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `literal` varchar(10) NOT NULL,
 `value` int(11) NOT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

CREATE TABLE `classes` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `name` varchar(45) NOT NULL,
 `cycle_id` int(11) NOT NULL,
 PRIMARY KEY (`id`),
 KEY `cycle_id` (`cycle_id`),
 CONSTRAINT `cycle_id` FOREIGN KEY (`cycle_id`) REFERENCES `enum_cycles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

CREATE TABLE `eleves` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `first_name` varchar(45) NOT NULL,
 `last_name` varchar(45) NOT NULL,
 `classe_id` int(11) NOT NULL,
 PRIMARY KEY (`id`),
 KEY `classe_id` (`classe_id`),
 CONSTRAINT `classe_id` FOREIGN KEY (`classe_id`) REFERENCES `classes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `domaines` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `ref` varchar(10) NOT NULL,
 `description` longtext NOT NULL,
 `cycle_id` int(11) NOT NULL,
 `sous_domaine_id` int(11) DEFAULT NULL,
 PRIMARY KEY (`id`),
 KEY `domaine_cycle_id_b166fb85` (`cycle_id`),
 KEY `domaine_sous_domaine_id_b603e361_fk_domaine_id` (`sous_domaine_id`),
 CONSTRAINT `domaine_cycle_id_b166fb85_fk_enumcycle_id` FOREIGN KEY (`cycle_id`) REFERENCES `enum_cycles` (`id`),
 CONSTRAINT `domaine_sous_domaine_id_b603e361_fk_domaine_id` FOREIGN KEY (`sous_domaine_id`) REFERENCES `domaines` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8;

CREATE TABLE `competences` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `ref` varchar(10) NOT NULL,
 `description` longtext NOT NULL,
 `cycle_id` int(11) NOT NULL,
 `domaine_id` int(11) NOT NULL,
 PRIMARY KEY (`id`),
 KEY `competence_cycle_id_be40125f` (`cycle_id`),
 KEY `competence_domaine_id_d76e9c1b_fk_domaine_id` (`domaine_id`),
 CONSTRAINT `competence_cycle_id_be40125f_fk_enumcycle_id` FOREIGN KEY (`cycle_id`) REFERENCES `enum_cycles` (`id`),
 CONSTRAINT `competence_domaine_id_d76e9c1b_fk_domaine_id` FOREIGN KEY (`domaine_id`) REFERENCES `domaines` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8;

CREATE TABLE `evaluations` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `description` varchar(200) NOT NULL,
 `created_at` date NOT NULL,
 `classe_id` int(11) NOT NULL,
 `cycle_id` int(11) NOT NULL,
 `trimestre_id` int(11) NOT NULL,
 PRIMARY KEY (`id`),
 KEY `evaluation_classe_id_d0053039_fk_classe_id` (`classe_id`),
 KEY `evaluation_cycle_id_42d8660a_fk_enumcycle_id` (`cycle_id`),
 KEY `evaluation_trimestre_id_b9653832_fk_e` (`trimestre_id`),
 CONSTRAINT `evaluation_classe_id_d0053039_fk_classe_id` FOREIGN KEY (`classe_id`) REFERENCES `classes` (`id`),
 CONSTRAINT `evaluation_cycle_id_42d8660a_fk_enumcycle_id` FOREIGN KEY (`cycle_id`) REFERENCES `enum_cycles` (`id`),
 CONSTRAINT `evaluation_trimestre_id_b9653832_fk_e` FOREIGN KEY (`trimestre_id`) REFERENCES `enum_trimestres` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

CREATE TABLE `evaluations_competences` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `evaluation_id` int(11) NOT NULL,
 `competence_id` int(11) NOT NULL,
 PRIMARY KEY (`id`),
 UNIQUE KEY `evaluation_compe_evaluation_id_competence_e6545721_uniq` (`evaluation_id`,`competence_id`),
 KEY `evaluation_c_competence_id_6e9b8090_fk_c` (`competence_id`),
 CONSTRAINT `evaluation_c_competence_id_6e9b8090_fk_c` FOREIGN KEY (`competence_id`) REFERENCES `competences` (`id`),
 CONSTRAINT `evaluation_c_evaluation_id_c96667a2_fk_e` FOREIGN KEY (`evaluation_id`) REFERENCES `evaluations` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

CREATE TABLE `resultats` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `created_at` date NOT NULL,
 `updated_at` date NOT NULL,
 `competence_id` int(11) NOT NULL,
 `eleve_id` int(11) NOT NULL,
 `evaluation_id` int(11) NOT NULL,
 `resultat_id` int(11) NOT NULL,
 PRIMARY KEY (`id`),
 KEY `resultat_competence_id_3d8dd61b_fk_gestion_c` (`competence_id`),
 KEY `resultat_eleve_id_1b042bc1_fk_gestion_eleve_id` (`eleve_id`),
 KEY `resultat_resultat_id_c399e6e7_fk_resultat_` (`resultat_id`),
 KEY `resultat_evaluation_id_105df1be_fk_gestion_e` (`evaluation_id`),
 CONSTRAINT `resultat_competence_id_3d8dd61b_fk_gestion_c` FOREIGN KEY (`competence_id`) REFERENCES `competences` (`id`),
 CONSTRAINT `resultat_eleve_id_1b042bc1_fk_gestion_eleve_id` FOREIGN KEY (`eleve_id`) REFERENCES `eleves` (`id`),
 CONSTRAINT `resultat_evaluation_id_105df1be_fk_gestion_e` FOREIGN KEY (`evaluation_id`) REFERENCES `evaluations` (`id`),
 CONSTRAINT `resultat_resultat_id_c399e6e7_fk_resultat_` FOREIGN KEY (`resultat_id`) REFERENCES `enum_resultats` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

CREATE TABLE `auth_users` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `nom` varchar(45) NOT NULL,
 `prenom` varchar(85) NOT NULL,
 `email` varchar(45) NOT NULL,
 `password` varchar(150) NOT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;