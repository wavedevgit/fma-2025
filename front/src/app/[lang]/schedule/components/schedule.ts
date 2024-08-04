const getBgColor = (key?: string) => {
  switch(key) {
    case 'maths':
      return 'bg-red-400';
    case 'programming':
      return 'bg-orange-400';
    case 'project':
      return 'bg-purple-400';
    case 'workshop':
      return 'bg-blue-400';
    case 'fun':
      return 'bg-green-400';
    case 'eating':
      return 'bg-purple-200';
    case 'other':
      return 'bg-gray-100';
    default:
      return 'bg-gray-400';
  }
}

type Activity = {
  rowspan: number,
  label: string,
  bgColor?: string,
}

export type DaySchedule = Activity[];

export const dayLabels = [
  'Samedi 20 juillet',
  'Dimanche 21 juillet',
  'Lundi 22 juillet',
  'Mardi 23 juillet',
  'Mercredi 24 juillet',
  'Jeudi 25 juillet',
  'Vendredi 26 juillet',
  'Samedi 27 juillet',
  'Dimanche 28 juillet',
]

export const schedule: DaySchedule[] = [
  [
    { rowspan: 14, label: '', bgColor: getBgColor() },
    { rowspan: 8, label: 'Check-in des élèves', bgColor: getBgColor('other') },
    { rowspan: 4, label: `Session d'ouverture`, bgColor: getBgColor('other') },
    { rowspan: 2, label: 'Diner', bgColor: getBgColor('eating') },
    { rowspan: 3, label: 'Get2Know', bgColor: getBgColor('fun') },
    { rowspan: 1, label: 'Go to bed', bgColor: getBgColor('other') },
  ],
  [
    { rowspan: 1, label: 'Wake up', bgColor: getBgColor('other') },
    { rowspan: 2, label: 'Petit-déjeuner', bgColor: getBgColor('eating') },
    { rowspan: 3, label: 'Logique et raisonnement', bgColor: getBgColor('maths') },
    { rowspan: 3, label: 'Introduction', bgColor: getBgColor('programming') },
    { rowspan: 3, label: 'Jeux Mathématiques', bgColor: getBgColor('maths') },
    { rowspan: 2, label: 'Déjeuner', bgColor: getBgColor('eating') },
    { rowspan: 6, label: 'Projet Robotique', bgColor: getBgColor('project') },
    { rowspan: 1, label: 'Temps Libre', bgColor: getBgColor('other') },
    { rowspan: 5, label: 'Sport', bgColor: getBgColor('fun') },
    { rowspan: 1, label: 'Temps Libre', bgColor: getBgColor('other') },
    { rowspan: 2, label: 'Diner', bgColor: getBgColor('eating') },
    { rowspan: 2, label: 'Fun', bgColor: getBgColor('fun') },
    { rowspan: 1, label: 'Go to bed', bgColor: getBgColor('other') },
  ],
  [
    { rowspan: 1, label: 'Wake up', bgColor: getBgColor('other') },
    { rowspan: 2, label: 'Petit-déjeuner', bgColor: getBgColor('eating') },
    { rowspan: 3, label: 'Ensembles et applications', bgColor: getBgColor('maths') },
    { rowspan: 3, label: 'Operations', bgColor: getBgColor('programming') },
    { rowspan: 3, label: 'Arithmétique 1', bgColor: getBgColor('maths') },
    { rowspan: 2, label: 'Déjeuner', bgColor: getBgColor('eating') },
    { rowspan: 3, label: 'Arithmétique Exos', bgColor: getBgColor('maths') },
    { rowspan: 1, label: 'Temps Libre', bgColor: getBgColor('other') },
    { rowspan: 8, label: 'Projet Robotique', bgColor: getBgColor('project') },
    { rowspan: 1, label: 'Temps Libre', bgColor: getBgColor('other') },
    { rowspan: 2, label: 'Diner', bgColor: getBgColor('eating') },
    { rowspan: 2, label: 'Karaoke', bgColor: getBgColor('fun') },
    { rowspan: 1, label: 'Go to bed', bgColor: getBgColor('other') },
  ],
  [
    { rowspan: 1, label: 'Wake up', bgColor: getBgColor('other') },
    { rowspan: 2, label: 'Petit-déjeuner', bgColor: getBgColor('eating') },
    { rowspan: 3, label: 'Fonctions', bgColor: getBgColor('maths') },
    { rowspan: 3, label: 'Loops & conditions', bgColor: getBgColor('programming') },
    { rowspan: 3, label: 'Combinatoire', bgColor: getBgColor('maths') },
    { rowspan: 2, label: 'Déjeuner', bgColor: getBgColor('eating') },
    { rowspan: 12, label: 'Workshop Leadership & Soft Skills', bgColor: getBgColor('workshop') },
    { rowspan: 1, label: 'Temps Libre', bgColor: getBgColor('other') },
    { rowspan: 2, label: 'Diner', bgColor: getBgColor('eating') },
    { rowspan: 2, label: 'Film', bgColor: getBgColor('fun') },
    { rowspan: 1, label: 'Go to bed', bgColor: getBgColor('other') },
  ],
  [
    { rowspan: 1, label: 'Wake up', bgColor: getBgColor('other') },
    { rowspan: 2, label: 'Petit-déjeuner', bgColor: getBgColor('eating') },
    { rowspan: 3, label: 'Géométrie', bgColor: getBgColor('maths') },
    { rowspan: 3, label: 'Functions & recursivity', bgColor: getBgColor('programming') },
    { rowspan: 3, label: 'Combinatoire Exos', bgColor: getBgColor('maths') },
    { rowspan: 2, label: 'Déjeuner', bgColor: getBgColor('eating') },
    { rowspan: 3, label: 'Conférence: A quoi servent les maths?', bgColor: getBgColor('workshop') },
    { rowspan: 3, label: 'Arithmétique 2', bgColor: getBgColor('maths') },
    { rowspan: 1, label: 'Temps Libre', bgColor: getBgColor('other') },
    { rowspan: 5, label: 'Musée des mathématiques', bgColor: getBgColor('fun') },
    { rowspan: 2, label: 'Diner', bgColor: getBgColor('eating') },
    { rowspan: 3, label: 'Inclusion in school', bgColor: getBgColor('workshop') },
    { rowspan: 1, label: 'Go to bed', bgColor: getBgColor('other') },
  ],
  [
    { rowspan: 1, label: 'Wake up', bgColor: getBgColor('other') },
    { rowspan: 2, label: 'Petit-déjeuner', bgColor: getBgColor('eating') },
    { rowspan: 3, label: 'Introduction aux infinis', bgColor: getBgColor('maths') },
    { rowspan: 3, label: 'Applications', bgColor: getBgColor('programming') },
    { rowspan: 3, label: 'Séance Olympiade 1', bgColor: getBgColor('maths') },
    { rowspan: 2, label: 'Déjeuner', bgColor: getBgColor('eating') },
    { rowspan: 3, label: 'Binary Search', bgColor: getBgColor('programming') },
    { rowspan: 1, label: 'Temps Libre', bgColor: getBgColor('other') },
    { rowspan: 8, label: 'Projet Robotique', bgColor: getBgColor('project') },
    { rowspan: 1, label: 'Temps Libre', bgColor: getBgColor('other') },
    { rowspan: 2, label: 'Diner', bgColor: getBgColor('eating') },
    { rowspan: 2, label: 'Just Dance', bgColor: getBgColor('fun') },
    { rowspan: 1, label: 'Go to bed', bgColor: getBgColor('other') },
  ],
  [
    { rowspan: 1, label: 'Wake up', bgColor: getBgColor('other') },
    { rowspan: 2, label: 'Petit-déjeuner', bgColor: getBgColor('eating') },
    { rowspan: 9, label: 'Visite du Port Tanger Med', bgColor: getBgColor('fun') },
    { rowspan: 3, label: 'Déjeuner + Jumua', bgColor: getBgColor('eating') },
    { rowspan: 9, label: 'Sortie', bgColor: getBgColor('fun') },
    { rowspan: 3, label: 'Temps Libre', bgColor: getBgColor('other') },
    { rowspan: 2, label: 'Diner', bgColor: getBgColor('eating') },
    { rowspan: 2, label: 'Fun', bgColor: getBgColor('fun') },
    { rowspan: 1, label: 'Go to bed', bgColor: getBgColor('other') },
  ],
  [
    { rowspan: 1, label: 'Wake up', bgColor: getBgColor('other') },
    { rowspan: 2, label: 'Petit-déjeuner', bgColor: getBgColor('eating') },
    { rowspan: 3, label: 'Algèbre', bgColor: getBgColor('maths') },
    { rowspan: 3, label: 'Competitive programming', bgColor: getBgColor('programming') },
    { rowspan: 3, label: 'Séance Olympiade 2', bgColor: getBgColor('maths') },
    { rowspan: 2, label: 'Déjeuner', bgColor: getBgColor('eating') },
    { rowspan: 4, label: 'Tables rondes Orientation', bgColor: getBgColor('workshop') },
    { rowspan: 4, label: 'Atelier Premiers Secours', bgColor: getBgColor('workshop') },
    { rowspan: 2, label: 'Escape room', bgColor: getBgColor('fun') },
    { rowspan: 2, label: 'Board games', bgColor: getBgColor('fun') },
    { rowspan: 1, label: 'Temps Libre', bgColor: getBgColor('other') },
    { rowspan: 2, label: 'Diner', bgColor: getBgColor('eating') },
    { rowspan: 2, label: 'Fun', bgColor: getBgColor('fun') },
    { rowspan: 1, label: 'Go to bed', bgColor: getBgColor('other') },
  ],
  [
    { rowspan: 1, label: 'Wake up', bgColor: getBgColor('other') },
    { rowspan: 2, label: 'Petit-déjeuner', bgColor: getBgColor('eating') },
    { rowspan: 4, label: 'Séance de clotûre', bgColor: getBgColor('other') },
    { rowspan: 3, label: 'Check-out', bgColor: getBgColor('other') },
    { rowspan: 22, label: '', bgColor: getBgColor() },
  ],
]