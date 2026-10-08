import { BoardMember, Announcement, CommunityPost, NotificationItem, PaymentRecord, UserProfile } from '../types';

export const MOSQUE_INFO = {
  fullName: 'Verein der Albanisch-Islamischen Gemeinschaft (VAIG)',
  shortName: 'Moschee Salmsach',
  subtitle: 'Islamische Gemeinschaft',
  street: 'Schulstrasse 19',
  zipCity: '8599 Salmsach',
  fullAddress: 'Schulstrasse 19 | 8599 Salmsach',
  phone: '+41 71 463 22 11',
  email: 'info@vaig-salmsach.ch',
  website: 'www.vaig-salmsach.ch',
};

export const INITIAL_USER: UserProfile = {
  id: 'user-01',
  name: 'Seran Islami',
  initials: 'SI',
  avatarUrl: '/IMG_0295-EDIT.jpg', // IMG_0295-EDIT.jpg
  email: 'SeranIslami@gmail.com',
  phone: '+41 79 123 45 67',
  status: 'Aktives Mitglied',
  memberId: '#10492',
  memberSince: '2021',
  isOnline: true,
};

export const BOARD_MEMBERS: BoardMember[] = [
  {
    id: 'board-01',
    name: 'Arafat Ibraimi',
    role: 'Präsident',
    phone: '+41 79 432 10 98',
    initials: 'AI',
    avatarUrl: '/arafat_profile.png', // arafat_profile.png
    email: 'arafat.ibraimi@vaig-salmsach.ch',
  },
  {
    id: 'board-02',
    name: 'Kadir Saduli',
    role: 'Vize-Präsident',
    phone: '+41 78 865 43 21',
    initials: 'KS',
    avatarUrl: '/kadir_profile.png', // kadir_profile.png
    email: 'kadir.saduli@vaig-salmsach.ch',
  },
  {
    id: 'board-03',
    name: 'Mixhit Osmani',
    role: 'Imam',
    phone: '+41 71 463 22 11',
    initials: 'MO',
    avatarUrl: '/imam.png', // imam.png
    email: 'mixhit.osmani@vaig-salmsach.ch',
  },
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-01',
    title: 'Gemeinschaftliches Iftar & Tarawih-Gebet',
    summary: 'Wir laden alle Gemeindemitglieder und Familien herzlich zum gemeinsamen Fastenbrechen und Tarawih in die Schulstrasse 19 ein.',
    content: 'Liebe Geschwister im Islam, am kommenden Wochenende findet das große Gemeinschafts-Iftar in den Räumlichkeiten des Vereins der Albanisch-Islamischen Gemeinschaft (VAIG) an der Schulstrasse 19 in Salmsach statt. Bitte meldet euch kurz im Vorfeld an, damit wir die Verpflegung bestmöglich koordinieren können. Möge Allah eure guten Taten annehmen.',
    date: 'Heute, 14:00',
    authorName: 'Arafat Ibraimi',
    authorRole: 'Präsident',
    imageUrl: '/arafat_profile.png',
    category: 'Wichtig',
  },
  {
    id: 'ann-02',
    title: 'Erweiterung der Bibliothek & Leseecke',
    summary: 'Neue islamische Fachliteratur und Jugendbücher auf Deutsch und Albanisch sind eingetroffen.',
    content: 'Mit großer Freude dürfen wir mitteilen, dass unsere Vereinsbibliothek an der Schulstrasse 19 um über 80 Bücher erweitert wurde. Die Bücher stehen allen Gemeindemitgliedern zur kostenlosen Ausleihe zur Verfügung.',
    date: 'Gestern',
    authorName: 'Mixhit Osmani',
    authorRole: 'Imam',
    imageUrl: '/imam.png',
    category: 'Gemeinschaft',
  },
  {
    id: 'ann-03',
    title: 'Wochenend-Unterricht für Kinder & Jugendliche',
    summary: 'Anmeldung für das neue Semester ab sofort möglich. Beginn jeden Samstag um 10:00 Uhr.',
    content: 'Der Koran- und Moralunterricht für Schüler startet wieder in den Unterrichtsräumen der Moschee Salmsach. Wir freuen uns auf zahlreiche Anmeldungen für unsere engagierten Lerngruppen.',
    date: 'Vor 3 Tagen',
    authorName: 'Kadir Saduli',
    authorRole: 'Vize-Präsident',
    imageUrl: '/kadir_profile.png',
    category: 'Veranstaltung',
  },
];

export const INITIAL_POSTS: CommunityPost[] = [
  {
    id: 'post-01',
    authorName: 'Besnik Krasniqi',
    authorInitials: 'BK',
    timestamp: 'Heute, 09:15',
    content: 'Assalamu Alaikum zusammen! Ein großes Dankeschön an alle Helfer, die am Samstag bei der Instandhaltung an der Schulstrasse 19 geholfen haben. Es sieht wunderbar aus!',
    likes: 14,
    isLiked: false,
    commentsCount: 3,
    comments: [
      {
        id: 'c-01',
        authorName: 'Arafat Ibraimi',
        authorInitials: 'AI',
        text: 'BarakAllahu Feekum für euren unermüdlichen Einsatz für unsere Gemeinschaft!',
        timestamp: 'Heute, 09:40',
      },
      {
        id: 'c-02',
        authorName: 'Seran Islami',
        authorInitials: 'SI',
        text: 'Sehr gerne gemacht! Gemeinschaft steht bei der VAIG an erster Stelle.',
        timestamp: 'Heute, 10:05',
      },
    ],
  },
  {
    id: 'post-02',
    authorName: 'Dr. Ilir Berisha',
    authorInitials: 'IB',
    timestamp: 'Gestern, 18:30',
    content: 'Erinnerung: Diesen Donnerstag nach dem Maghrib-Gebet hält Imam Mixhit Osmani einen kurzen Vortrag zum Thema "Spiritualität & Zusammenhalt im Alltag". Alle sind herzlich eingeladen.',
    likes: 22,
    isLiked: true,
    commentsCount: 5,
    comments: [
      {
        id: 'c-03',
        authorName: 'Kadir Saduli',
        authorInitials: 'KS',
        text: 'Im Anschluss wird auch Tee und Kaffee in der Lounge serviert.',
        timestamp: 'Gestern, 19:10',
      },
    ],
  },
  {
    id: 'post-03',
    authorName: 'Valon Morina',
    authorInitials: 'VM',
    timestamp: 'Vor 2 Tagen',
    content: 'Jummah Mubarak an die gesamte Gemeinde des VAIG Salmsach! Möge dieser gesegnete Freitag viel Frieden, Gesundheit und Barmherzigkeit in eure Häuser bringen.',
    likes: 38,
    isLiked: false,
    commentsCount: 8,
    comments: [],
  },
];

export const INITIAL_PAYMENTS: PaymentRecord[] = [
  {
    id: 'pay-2026',
    year: 2026,
    period: 'Jahr 2026',
    amount: 240.0,
    currency: 'CHF',
    status: 'Bezahlt',
    date: '15.01.2026',
    receiptNumber: 'BELEG-2026-084',
  },
  {
    id: 'pay-2025',
    year: 2025,
    period: 'Jahr 2025',
    amount: 240.0,
    currency: 'CHF',
    status: 'Bezahlt',
    date: '10.01.2025',
    receiptNumber: 'BELEG-2025-072',
  },
  {
    id: 'pay-2024',
    year: 2024,
    period: 'Jahr 2024',
    amount: 240.0,
    currency: 'CHF',
    status: 'Bezahlt',
    date: '14.02.2024',
    receiptNumber: 'BELEG-2024-061',
  },
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-01',
    type: 'announcement',
    title: 'Neue Mitteilung von Präsident Arafat Ibraimi',
    description: 'Wichtige Information zum Gemeinschafts-Iftar in der VAIG Moschee Salmsach an der Schulstrasse 19.',
    timestamp: 'Vor 30 Min.',
    isRead: false,
  },
  {
    id: 'notif-02',
    type: 'payment',
    title: 'Zahlung bestätigt: VAIG Mitgliedsbeitrag',
    description: 'Dein Jahresbeitrag 2026 über CHF 240.00 an den Verein der Albanisch-Islamischen Gemeinschaft wurde verbucht. Vielen Dank!',
    timestamp: 'Gestern',
    isRead: false,
  },
  {
    id: 'notif-03',
    type: 'prayer',
    title: 'Erinnerung: Freitagsgebet mit Imam Mixhit Osmani',
    description: 'Die Hutbah beginnt am Freitag um 13:15 Uhr in der Schulstrasse 19, 8599 Salmsach.',
    timestamp: 'Vor 2 Tagen',
    isRead: true,
  },
];

export const TWINT_DETAILS = {
  mosqueName: 'Verein der Albanisch-Islamischen Gemeinschaft (VAIG)',
  recipient: 'VAIG Moschee Salmsach',
  address: 'Schulstrasse 19, 8599 Salmsach',
  iban: 'CH82 0900 0000 1234 5678 9',
  clearing: '09000 (Thurgauer Kantonalbank)',
  twintPhone: '+41 79 432 10 98',
  purpose: 'Spende / Sadaqa VAIG Salmsach',
  suggestedAmounts: [10, 20, 50, 100],
};
