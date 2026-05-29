import { Service, Sector, Project, KeyStatistic, CompanyInfo, Testimonial } from './types';

export const initialServices: Service[] = [
  {
    id: 'conseil',
    name: 'Conseil Technique Médical',
    shortDescription: 'Accompagnement stratégique pour concevoir et dimensionner vos infrastructures de santé.',
    fullDescription: 'Nous guidons les promoteurs de santé, directeurs d\'hôpitaux et ministères dans l\'audit de leurs plateaux techniques, l\'étude d\'implantation de nouvelles technologies et l\'élaboration de cahiers des charges sur mesure, assurant l\'optimisation drastique des investissements financiers.',
    advantages: [
      'Audit approfondi des infrastructures existantes et recommandations de mise aux normes.',
      'Aide au choix technologique selon l\'activité clinique et les contraintes budgétaires.',
      'Étude d\'intégration et de pré-installation (architecturale, électrique et fluidique).'
    ],
    equipmentList: [
      'Plans d\'implantation 2D/3D',
      'Cahiers des charges d\'appels d\'offres',
      'Rapports d\'évaluation des risques et conformité'
    ],
    icon: 'FileText'
  },
  {
    id: 'vente',
    name: 'Vente de Matériel Médical',
    shortDescription: 'Distribution d\'appareils biomédicaux haut de gamme issus de constructeurs mondiaux.',
    fullDescription: 'En partenariat étroit avec des manufacturiers d\'équipements de premier plan mondial, nous proposons au meilleur rapport qualité-prix des dispositifs originaux certifiés CE / ISO, adaptés aux réalités locales d\'exploitation.',
    advantages: [
      'Garantie constructeur officielle de 12 à 24 mois.',
      'Sourcing direct chez des fabricants réputés.',
      'Disponibilité d\'une large gamme d\'équipements de pointe répondant à plusieurs spécialités.'
    ],
    equipmentList: [
      'Scanners CT, Systèmes IRM & Échographes',
      'Stations d\'anesthésie et respirateurs',
      'Matériel de chirurgie ophtalmologique'
    ],
    icon: 'ShoppingBag'
  },
  {
    id: 'installation',
    name: 'Installation & Mise en Service',
    shortDescription: 'Montage méticuleux et étalonnage précis de vos équipements de pointe.',
    fullDescription: 'L\'installation d\'un système médical lourd exige une rigueur absolue. Nos ingénieurs évaluent le réseau, procèdent à l\'assemblage mécanique, établissent les liaisons logicielles et réalisent les calibrations d\'étalonnage pour garantir une fiabilité diagnostique maximale dès le premier jour.',
    advantages: [
      'Respect strict des directives techniques et protocoles de sécurité du fabricant.',
      'Calibration métrologique et tests de sécurité électrique approfondis.',
      'Formation sur site des utilisateurs médicaux pour une prise en main sereine.'
    ],
    equipmentList: [
      'Mise en service d\'IRM et de Scanners',
      'Assemblage de colonnes de cœlioscopie',
      'Positionnement de tables d\'opération micrométriques'
    ],
    icon: 'Wrench'
  },
  {
    id: 'maintenance',
    name: 'Maintenance & SAV Réactif',
    shortDescription: 'Assistance technique 24/7 et plans de maintenance préventive rigoureux.',
    fullDescription: 'La panne d\'un équipement médical peut paralyser un hôpital. Nous offrons des contrats de maintenance préventive (visites périodiques, étalonnage) et un Service Après-Vente (SAV) d\'urgence capable d\'intervenir sur site sous de très brefs délais avec des pièces de rechange d\'origine.',
    advantages: [
      'Contrats de maintenance préventive personnalisés pour maximiser la longévité.',
      'Disponibilité immédiate de l\'équipe technique 24h/7 pour les urgences critiques.',
      'Stock localisé de pièces détachées et outils de diagnostic agréés.'
    ],
    equipmentList: [
      'Contrats de maintenance de niveau 1, 2 et 3',
      'Remplacement de tubes à rayons X et modules de détection',
      'Reconditionnement de sondes échographiques'
    ],
    icon: 'Activity'
  },
  {
    id: 'consommables',
    name: 'Fourniture de Consommables',
    shortDescription: 'Approvisionnement régulier de consommables et accessoires indispensables.',
    fullDescription: 'Nous assurons la logistique d\'approvisionnement en accessoires jetables et consommables de haute qualité clinique. Des gels échographiques aux électrodes en passant par les papiers d\'enregistrement, nous évitons les ruptures de stock critiques dans vos cabinets et blocs.',
    advantages: [
      'Certifications sanitaires validées pour un usage patient sécurisé.',
      'Conditions de stockage thermique et d\'hygiène strictement contrôlées.',
      'Abonnement d\'approvisionnement automatique pour fluidifier votre logistique.'
    ],
    equipmentList: [
      'Papiers thermiques d\'ECG et d\'examens',
      'Gels d\'échographie de conductivité supérieure',
      'Électrodes, canules et kits stériles pour ophtalmologie'
    ],
    icon: 'Layers'
  }
];

export const initialSectors: Sector[] = [
  {
    id: 'ophtalmologie',
    name: 'Ophtalmologie',
    description: 'Une expertise complète pour la fourniture et la maintenance d\'équipements de chirurgie et de diagnostic ophtalmologique.',
    details: [
      'Vente et réglage de microscopes opératoires ophtalmologiques à haute fidélité optique.',
      'Mise en service de lasers de traitement rétinien (YAG, Argon).',
      'Calibration de réfractomètres automatiques et tonomètres à jet d\'air.'
    ],
    equipments: [
      'Lampe à fente numérique',
      'Microscope opératoire stéréoscopique',
      'Réfracto-kératomètre automatique',
      'Laser chirurgical oculaire'
    ],
    iconName: 'Eye'
  },
  {
    id: 'optique',
    name: 'Optique Médicale',
    description: 'Conception d\'ateliers de montage de verres optiques et d\'analyse de la vision moderne.',
    details: [
      'Aménagement de salles d\'examen de vue avec colonnes de réfraction intégrées.',
      'Fourniture de meuleuses automatiques 3D de haute précision pour ateliers d\'opticiens.',
      'Installation d\'outils de centrage de verres par imagerie numérique.'
    ],
    equipments: [
      'Meuleuse industrielle automatique de verres',
      'Frontofocomètre automatique de haute résolution',
      'Projecteur d\'optotypes numérique'
    ],
    iconName: 'Sparkles'
  },
  {
    id: 'imagerie',
    name: 'Imagerie Médicale (IRM, Scanner, Échographie)',
    description: 'Le cœur névralgique de notre ingénierie biomédicale : solutions de radiodiagnostic avancées.',
    details: [
      'IRM (Imagerie par Résonance Magnétique) 1.5 Tesla et 3 Tesla avec cages de Faraday et refroidisseurs hélium.',
      'Scanners CT multicoupes à faible dose d\'irradiation avec injecteurs de contraste synchro.',
      'Échographes Doppler couleur 3D/4D de haute résolution pour cardiologie, obstétrique et généraliste.'
    ],
    equipments: [
      'Appareil IRM 1.5T Superconducteur',
      'Scanner CT 64 Coupes ultra-rapide',
      'Échographe Doppler Cardio-Vasculaire 4D',
      'Système de Radiographie Numérique (DR) suspendu'
    ],
    iconName: 'Video'
  },
  {
    id: 'reseau',
    name: 'Réseau Technique Médical & Informatique',
    description: 'Interconnexion informatique pour la transmission sécurisée et l\'archivage des examens.',
    details: [
      'Mise en place de serveurs PACS (Picture Archiving and Communication System) locaux et cloud.',
      'Intégration du protocole DICOM / HL7 au sein du Système d\'Information Hospitalier (SIH).',
      'Sécurisation des serveurs de stockage d\'imagerie contre les intrusions et pertes de données.'
    ],
    equipments: [
      'Serveur PACS de stockage centralisé',
      'Moniteurs de diagnostic médical calibrés (Grayscale)',
      'Passerelle d\'intégration DICOM'
    ],
    iconName: 'Network'
  },
  {
    id: 'biomedicaux',
    name: 'Bloc & Équipements Biomédicaux Généraux',
    description: 'Solutions ergonomiques et vitales pour le bloc opératoire, l\'anesthésie, la réanimation et la stérilisation.',
    details: [
      'Équipement complet de salles d\'opération (tables articulées, scialytiques LED autonomes, respirateurs d\'anesthésie).',
      'Systèmes de monitorage multiparamétrique avec alarmes intelligentes pour réanimation pédiatrique et adulte.',
      'Autoclaves de stérilisation à vapeur d\'eau de grande capacité certifiés EN 285.'
    ],
    equipments: [
      'Scialytique LED chirurgical à focus automatique',
      'Moniteur de surveillance multiparamétrique 12\'\'',
      'Autoclave à vapeur de 150 Litres',
      'Table d\'opération hydraulique polyvalente'
    ],
    iconName: 'Heart'
  }
];

export const initialProjects: Project[] = [
  {
    id: 'proj1',
    title: 'Installation d\'un Scanner CT-Scan 64 coupes',
    category: 'Imagerie Médicale',
    description: 'Installation complète, calibrage de faisceau, raccordement électrique blindé et paramétrage du serveur de transfert d\'images DICOM.',
    client: 'Hôpital Général de Douala',
    country: 'Cameroun',
    year: '2025',
    status: 'Complété',
    imagePlaceholderColor: 'from-emerald-900 to-teal-850'
  },
  {
    id: 'proj2',
    title: 'Mise en place d\'une IRM 1.5 Tesla Superconductrice',
    category: 'Imagerie Médicale',
    description: 'Montage d\'une cage de Faraday sur mesure, système d\'extraction des gaz de refroidissement (quench pipe) et mise en service clinique.',
    client: 'Clinique Internationale de N\'Djamena',
    country: 'Tchad',
    year: '2025',
    status: 'Complété',
    imagePlaceholderColor: 'from-blue-900 to-emerald-950'
  },
  {
    id: 'proj3',
    title: 'Modernisation des blocs de Microchirurgie Ophtalmologique',
    category: 'Ophtalmologie',
    description: 'Fourniture et fixation de microscopes opératoires stéréoscopiques, de tonomètres et de lasers YAG haute vélocité.',
    client: 'Centre Hospitalier Peltier',
    country: 'Djibouti',
    year: '2026',
    status: 'Complété',
    imagePlaceholderColor: 'from-emerald-950 to-slate-900'
  },
  {
    id: 'proj4',
    title: 'Déploiement d\'un réseau PACS et de serveurs biomédicaux',
    category: 'Réseau Technique',
    description: 'Numérisation globale du flux radiologique. Interconnexion de 4 échographes, 2 tables radiographiques et serveurs sécurisés.',
    client: 'Hôpital de Référence de Garoua',
    country: 'Cameroun',
    year: '2025',
    status: 'Complété',
    imagePlaceholderColor: 'from-teal-900 to-blue-950'
  },
  {
    id: 'proj5',
    title: 'Refonte de la centrale de stérilisation et blocs d\'urgence',
    category: 'Bloc Opératoire & Stérilisation',
    description: 'Mise en service d\'autoclaves de classe B, d\'un respirateur de réanimation de secours et de scialytiques chirurgicaux LED.',
    client: 'Hôpital Régional d\'Abéché',
    country: 'Tchad',
    year: '2026',
    status: 'En cours',
    imagePlaceholderColor: 'from-slate-800 to-teal-900'
  }
];

export const initialStatistics: KeyStatistic[] = [
  { id: 'stat1', value: '5+', label: "Pays d'intervention directe", iconName: 'Globe' },
  { id: 'stat2', value: '180+', label: 'Systèmes lourds installés', iconName: 'Cpu' },
  { id: 'stat3', value: '24h/7', label: 'Assistance technique critique', iconName: 'ShieldAlert' },
  { id: 'stat4', value: '15 ans', label: "D'expérience biomédicale", iconName: 'Award' }
];

export const initialCompanyInfo: CompanyInfo = {
  name: 'TEG - Tenfi Engineering Group SARL',
  slogan: 'L\'ingénierie biomédicale de pointe au service de votre santé',
  summary: 'Établie à Douala au Cameroun, TEG SARL est le leader technologique régional dédié au conseil technique, à la commercialisation, à l\'installation et à la maintenance métrologique d\'équipements de pointe en Afrique Centrale. Notre rigueur biomédicale préserve la continuité de vos soins de santé.',
  email: 'isaacfoula1991@gmail.com',
  phone: '+237 696 24 87 86',
  phone2: '+237 675 98 89 72',
  address: 'Douala, Cameroun - Avenue de la République',
  whatsapp: 'https://wa.me/237696248786',
  locations: ['Cameroun', 'Tchad', 'Djibouti', 'Afrique Centrale'],
  vision: 'Faire monter en gamme technologique l\'ensemble du plateau technique d\'Afrique Centrale en évitant le problème endémique des installations délaissées faute de maintenance adéquate.',
  mission: 'Accompagner les institutions médicales avec un service à 360° : de l\'ingénierie de conseil amont à la réactivité extrême du service après-vente pour que chaque machine sauve des vies de manière continue.'
};

export const initialTestimonials: Testimonial[] = [
  {
    id: 't1',
    author: 'Dr. Samuel Ebollo',
    role: 'Médecin Chef de Service Radiographie',
    institution: 'Hôpital Général',
    text: 'Grâce à la maintenance préventive rigoureuse de TEG, notre taux d\'utilisation opérationnel du scanner CT est monté à 99.4% sur l\'année. C\'est un record absolu pour notre structure.',
    country: 'Cameroun'
  },
  {
    id: 't2',
    author: 'M. Ibrahim Oro',
    role: 'Promoteur & Directeur Administratif',
    institution: 'Clinique de la Paix de N\'Djamena',
    text: 'TEG a géré l\'ensemble de l\'étude d\'implantation ainsi que l\'installation physique de l\'IRM. Un accompagnement exceptionnel sans aucune surprise de surcoût.',
    country: 'Tchad'
  },
  {
    id: 't3',
    author: 'Dr. Amina Hassan',
    role: 'Chef de Clinique Ophtalmologique',
    institution: 'Centre de Réfraction Spécialisé',
    text: 'La réactivité de leur hotline technique est fantastique. Ils comprennent notre jargon clinique et interviennent avec des outils d\'étalonnage professionnels certifiés.',
    country: 'Djibouti'
  }
];
