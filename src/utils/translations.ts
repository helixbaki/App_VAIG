export type Language = 'de' | 'sq' | 'tr';

export interface Translations {
  // Tabs
  tabFeed: string;
  tabMosque: string;
  tabProfile: string;

  // Mosque Header & Info
  mosqueSub: string;
  prayerTimesTitle: string;
  prayerTimesSub: string;
  liveCountdown: string;
  boardTitle: string;
  boardSub: string;
  donationsTitle: string;
  donationsSub: string;
  twintQuick: string;
  twintDirect: string;
  twintDesc: string;
  openTwint: string;
  call: string;
  email: string;
  jummahNote: string;
  dhuhrIqamahNote: string;

  // Feed
  feedTitle: string;
  feedSub: string;
  announcementsTitle: string;
  announcementsSub: string;
  communityTitle: string;
  communitySub: string;
  newPost: string;
  like: string;
  reply: string;
  hide: string;
  sendReply: string;
  replyPlaceholder: string;
  noReplies: string;

  // Profile
  activeMember: string;
  memberSince: string;
  setPhoto: string;
  memberCard: string;
  memberCardSub: string;
  notifications: string;
  notificationsSub: string;
  settings: string;
  settingsSub: string;
  financesTitle: string;
  financesSub: string;
  paid: string;
  receivedOn: string;
  logout: string;
  logoutAlert: string;
  versionNotice: string;

  // Settings
  settingsTitle: string;
  settingsSubtitle: string;
  languageLabel: string;
  languageSub: string;
  darkMode: string;
  darkModeSub: string;
  pushNotifs: string;
  pushNotifsSub: string;
  editPersonalData: string;
  editPersonalDataSub: string;
  cancel: string;
  save: string;
  saved: string;
  fullName: string;
  emailAddress: string;
  phoneNumber: string;

  // Member Card
  cardTitle: string;
  cardSubtitle: string;
  memberIdLabel: string;
  validity: string;
  validUntil: string;
  location: string;
  copyId: string;
  copiedId: string;
  verifyCard: string;
  verifyAlert: string;

  // Change Avatar
  avatarTitle: string;
  avatarSubtitle: string;
  uploadFile: string;
  uploadFileSub: string;
  testPhoto: string;
  testPhotoSub: string;
  initialsOnly: string;
  initialsOnlySub: string;
  savePhoto: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  de: {
    // Tabs
    tabFeed: 'Feed',
    tabMosque: 'Moschee',
    tabProfile: 'Profil',

    // Mosque
    mosqueSub: 'Moschee Salmsach',
    prayerTimesTitle: 'Gebetszeiten',
    prayerTimesSub: 'Schulstrasse 19, Salmsach',
    liveCountdown: 'Live Countdown (SwissMosque)',
    boardTitle: 'Vorstand & Imam',
    boardSub: 'Verantwortliche & Seelsorge des VAIG Salmsach',
    donationsTitle: 'Spenden & Beiträge',
    donationsSub: 'Unterstütze den Erhalt und die Gemeinschaft',
    twintQuick: 'Schnell per TWINT',
    twintDirect: 'Direkt spenden & unterstützen',
    twintDesc: 'Jeder Beitrag hilft bei den laufenden Betriebskosten an der Schulstrasse 19, Jugendförderung und sozialen Hilfsprojekten des Vereins VAIG.',
    openTwint: 'TWINT App öffnen',
    call: 'Anrufen',
    email: 'E-Mail',
    jummahNote: 'Jummah (Freitag): 13:15',
    dhuhrIqamahNote: 'Dhuhr Iqamah: 13:30',

    // Feed
    feedTitle: 'Moschee Feed',
    feedSub: 'Aktuelles & Gemeinschaftsbeiträge',
    announcementsTitle: 'Wichtige Ankündigungen',
    announcementsSub: 'Offizielle Mitteilungen von Vorstand & Imam',
    communityTitle: 'Community Feed',
    communitySub: 'Austausch & Beiträge aus der Gemeinde',
    newPost: 'Neuer Beitrag',
    like: 'Gefällt mir',
    reply: 'Antworten',
    hide: 'Ausblenden',
    sendReply: 'Antworten',
    replyPlaceholder: 'Antwort verfassen...',
    noReplies: 'Noch keine Antworten. Schreibe die erste Nachricht!',

    // Profile
    activeMember: 'Aktives Mitglied',
    memberSince: 'Mitglied seit',
    setPhoto: 'Foto einstellen',
    memberCard: 'Meine Mitgliedskarte',
    memberCardSub: 'Digitaler Mitgliedsausweis mit QR-Code',
    notifications: 'Benachrichtigungen',
    notificationsSub: 'Mitteilungen, Termine & Zahlungsbelege',
    settings: 'Einstellungen',
    settingsSub: 'Sprache, Dunkelmodus, Push-Nachrichten & Profil',
    financesTitle: 'Finanzen & Mitgliedsbeiträge',
    financesSub: 'Jahresbeitrag (CHF 240.00 / Jahr)',
    paid: 'Bezahlt',
    receivedOn: 'Eingegangen am',
    logout: 'Abmelden',
    logoutAlert: 'Du hast dich erfolgreich abgemeldet.',
    versionNotice: 'VAIG Moschee Salmsach · Version 2.5.0',

    // Settings
    settingsTitle: 'Einstellungen',
    settingsSubtitle: 'Präferenzen, Sprache & Konto',
    languageLabel: 'Sprache der App',
    languageSub: 'Deutsch, Shqip (Albanisch) oder Türkçe',
    darkMode: 'Dunkelmodus',
    darkModeSub: 'Liquid Glass Optik für schwaches Licht',
    pushNotifs: 'Push-Benachrichtigungen',
    pushNotifsSub: 'Gebetszeiten, Ankündigungen & Termine',
    editPersonalData: 'Persönliche Daten ändern',
    editPersonalDataSub: 'Name, E-Mail und Rufnummer anpassen',
    cancel: 'Abbrechen',
    save: 'Änderungen speichern',
    saved: 'Gespeichert!',
    fullName: 'Vollständiger Name',
    emailAddress: 'E-Mail-Adresse',
    phoneNumber: 'Telefonnummer',

    // Member Card
    cardTitle: 'Digitale Mitgliedskarte',
    cardSubtitle: 'Offizieller Verifizierungs-Ausweis',
    memberIdLabel: 'Mitglieds-ID',
    validity: 'GÜLTIGKEIT',
    validUntil: 'Bis 31.12.2026',
    location: 'STANDORT',
    copyId: 'ID kopieren',
    copiedId: 'ID kopiert',
    verifyCard: 'Ausweis prüfen',
    verifyAlert: 'Mitgliedskarte ist verifiziert und gültig für die VAIG Moschee Salmsach.',

    // Change Avatar
    avatarTitle: 'Profilfoto einstellen',
    avatarSubtitle: 'Foto für dein Profil festlegen',
    uploadFile: 'Aus Mediathek / Datei wählen',
    uploadFileSub: 'PNG, JPG oder WebP von deinem Gerät',
    testPhoto: 'Testfoto (IMG_0295-EDIT.jpg)',
    testPhotoSub: 'Aktuelles Profilfoto von Seran Islami',
    initialsOnly: 'Nur Initialen anzeigen',
    initialsOnlySub: 'Minimalistischer Buchstabengrafik-Avatar',
    savePhoto: 'Foto speichern',
  },

  sq: {
    // Tabs
    tabFeed: 'Njoftimet',
    tabMosque: 'Xhamia',
    tabProfile: 'Profili',

    // Mosque
    mosqueSub: 'Xhamia Salmsach',
    prayerTimesTitle: 'Kohët e Namazit',
    prayerTimesSub: 'Schulstrasse 19, Salmsach',
    liveCountdown: 'Numërimi mbrapsht (SwissMosque)',
    boardTitle: 'Kryesia & Imami',
    boardSub: 'Përgjegjësit & Shërbimi Fetar i VAIG Salmsach',
    donationsTitle: 'Donacione & Anëtarësi',
    donationsSub: 'Ndihmoni mirëmbajtjen dhe komunitetin',
    twintQuick: 'Shpejt me TWINT',
    twintDirect: 'Dhuro & mbështet drejtpërdrejt',
    twintDesc: 'Çdo kontribut ndihmon në shpenzimet rrjedhëse në Schulstrasse 19, aktivitetet rinore dhe ndihmat sociale të shoqatës VAIG.',
    openTwint: 'Hap aplikacionin TWINT',
    call: 'Telefono',
    email: 'E-Mail',
    jummahNote: 'Xhumaja (E Premte): 13:15',
    dhuhrIqamahNote: 'Dreka Iqamah: 13:30',

    // Feed
    feedTitle: 'Njoftimet e Xhamisë',
    feedSub: 'Të rejat dhe postimet e komunitetit',
    announcementsTitle: 'Njoftime të Rëndësishme',
    announcementsSub: 'Mitteilungen zyrtare nga Kryesia & Imami',
    communityTitle: 'Komuniteti',
    communitySub: 'Shkëmbim & mendime nga xhemati',
    newPost: 'Postim i ri',
    like: 'Më pëlqen',
    reply: 'Përgjigju',
    hide: 'Fshih',
    sendReply: 'Dërgo',
    replyPlaceholder: 'Shkruaj një përgjigje...',
    noReplies: 'Ende nuk ka përgjigje. Shkruaj mesazhin e parë!',

    // Profile
    activeMember: 'Anëtar Aktiv',
    memberSince: 'Anëtar që nga',
    setPhoto: 'Vendos foton',
    memberCard: 'Karta ime e Anëtarësisë',
    memberCardSub: 'Kartë digjitale anëtarësie me QR-Code',
    notifications: 'Njoftimet',
    notificationsSub: 'Lajmërime, takime & konfirmime pagesash',
    settings: 'Cilësimet',
    settingsSub: 'Gjuha, pamja e errët, njoftimet & profili',
    financesTitle: 'Financat & Pagesat',
    financesSub: 'Kontributi Vjetor (CHF 240.00 / Vit)',
    paid: 'E Paguar',
    receivedOn: 'Marrë më',
    logout: 'Dil',
    logoutAlert: 'Jeni çkyçur me sukses.',
    versionNotice: 'VAIG Xhamia Salmsach · Versioni 2.5.0',

    // Settings
    settingsTitle: 'Cilësimet',
    settingsSubtitle: 'Preferencat, gjuha & llogaria',
    languageLabel: 'Gjuha e Aplikacionit',
    languageSub: 'Deutsch (Gjermanisht), Shqip ose Türkçe',
    darkMode: 'Modaliteti i errët',
    darkModeSub: 'Pamje Liquid Glass për dritë të dobët',
    pushNotifs: 'Njoftimet Push',
    pushNotifsSub: 'Kohët e namazit, njoftimet & terminet',
    editPersonalData: 'Ndrysho të dhënat personale',
    editPersonalDataSub: 'Përshtat emrin, e-mailin dhe telefonin',
    cancel: 'Anulo',
    save: 'Ruaj ndryshimet',
    saved: 'U ruajt!',
    fullName: 'Emri dhe Mbiemri',
    emailAddress: 'Adresa E-Mail',
    phoneNumber: 'Numri i Telefonit',

    // Member Card
    cardTitle: 'Karta Digjitale e Anëtarësisë',
    cardSubtitle: 'Kartë zyrtare verifikimi',
    memberIdLabel: 'ID e Anëtarit',
    validity: 'VLEFSHMËRIA',
    validUntil: 'Deri më 31.12.2026',
    location: 'VENDNDODHJA',
    copyId: 'Kopjo ID',
    copiedId: 'ID u kopjua',
    verifyCard: 'Verifiko kartën',
    verifyAlert: 'Karta e anëtarësisë është e verifikuar dhe e vlefshme për VAIG Xhamia Salmsach.',

    // Change Avatar
    avatarTitle: 'Vendos foton e profilit',
    avatarSubtitle: 'Përcakto foton për profilin tënd',
    uploadFile: 'Zgjidh nga galeria / skedarët',
    uploadFileSub: 'PNG, JPG ose WebP nga pajisja jote',
    testPhoto: 'Foto test (IMG_0295-EDIT.jpg)',
    testPhotoSub: 'Fotoja aktuale e Seran Islamit',
    initialsOnly: 'Shfaq vetëm inicialet',
    initialsOnlySub: 'Avatar minimalist me shkronja',
    savePhoto: 'Ruaj foton',
  },

  tr: {
    // Tabs
    tabFeed: 'Akış',
    tabMosque: 'Cami',
    tabProfile: 'Profil',

    // Mosque
    mosqueSub: 'Salmsach Camii',
    prayerTimesTitle: 'Namaz Vakitleri',
    prayerTimesSub: 'Schulstrasse 19, Salmsach',
    liveCountdown: 'Geri Sayım (SwissMosque)',
    boardTitle: 'Yönetim & İmam',
    boardSub: 'VAIG Salmsach Yöneticileri & Din Hizmetleri',
    donationsTitle: 'Bağışlar & Aidatlar',
    donationsSub: 'Camimizi ve topluluğumuzu destekleyin',
    twintQuick: 'TWINT ile Hızlı Bağış',
    twintDirect: 'Doğrudan bağış yapın & destekleyin',
    twintDesc: 'Her katkınız Schulstrasse 19 işletme giderlerine, gençlik faaliyetlerine ve derneğimizin sosyal yardım projelerine destek sağlar.',
    openTwint: 'TWINT Uygulamasını Aç',
    call: 'Ara',
    email: 'E-Posta',
    jummahNote: 'Cuma Namazı: 13:15',
    dhuhrIqamahNote: 'Öğle İkameti: 13:30',

    // Feed
    feedTitle: 'Cami Akışı',
    feedSub: 'Güncel duyurular & cemaat paylaşımları',
    announcementsTitle: 'Önemli Duyurular',
    announcementsSub: 'Yönetim ve İmamdan resmi duyurular',
    communityTitle: 'Topluluk Akışı',
    communitySub: 'Cemaatimizden paylaşımlar & sohbet',
    newPost: 'Yeni Gönderi',
    like: 'Beğen',
    reply: 'Cevapla',
    hide: 'Gizle',
    sendReply: 'Gönder',
    replyPlaceholder: 'Bir cevap yazın...',
    noReplies: 'Henüz cevap yok. İlk mesajı siz yazın!',

    // Profile
    activeMember: 'Aktif Üye',
    memberSince: 'Üyelik Tarihi',
    setPhoto: 'Fotoğrafı Ayarla',
    memberCard: 'Üye Kartım',
    memberCardSub: 'QR Kodlu Dijital Üyelik Kartı',
    notifications: 'Bildirimler',
    notificationsSub: 'Duyurular, tarihler & makbuzlar',
    settings: 'Ayarlar',
    settingsSub: 'Dil, karanlık mod, anlık bildirimler & profil',
    financesTitle: 'Finans & Üyelik Aidatları',
    financesSub: 'Yıllık Aidat (CHF 240.00 / Yıl)',
    paid: 'Ödendi',
    receivedOn: 'Tahsilat tarihi',
    logout: 'Çıkış Yap',
    logoutAlert: 'Başarıyla çıkış yapıldı.',
    versionNotice: 'VAIG Salmsach Camii · Sürüm 2.5.0',

    // Settings
    settingsTitle: 'Ayarlar',
    settingsSubtitle: 'Tercihler, dil & hesap',
    languageLabel: 'Uygulama Dili',
    languageSub: 'Almanca (Varsayılan), Arnavutça veya Türkçe',
    darkMode: 'Karanlık Mod',
    darkModeSub: 'Düşük ışık için Liquid Glass görünümü',
    pushNotifs: 'Anlık Bildirimler',
    pushNotifsSub: 'Namaz vakitleri, duyurular & etkinlikler',
    editPersonalData: 'Kişisel Bilgileri Düzenle',
    editPersonalDataSub: 'İsim, e-posta ve telefon numaranızı güncelleyin',
    cancel: 'İptal',
    save: 'Değişiklikleri Kaydet',
    saved: 'Kaydedildi!',
    fullName: 'Ad Soyad',
    emailAddress: 'E-Posta Adresi',
    phoneNumber: 'Telefon Numarası',

    // Member Card
    cardTitle: 'Dijital Üyelik Kartı',
    cardSubtitle: 'Resmi Doğrulama Kimliği',
    memberIdLabel: 'Üye No',
    validity: 'GEÇERLİLİK',
    validUntil: '31.12.2026 tarihine kadar',
    location: 'KONUM',
    copyId: 'No Kopyala',
    copiedId: 'Kopyalandı',
    verifyCard: 'Kartı Doğrula',
    verifyAlert: 'Üyelik kartı doğrulanmıştır ve VAIG Salmsach Camii için geçerlidir.',

    // Change Avatar
    avatarTitle: 'Profil Fotoğrafı Ayarla',
    avatarSubtitle: 'Profiliniz için fotoğraf belirleyin',
    uploadFile: 'Galeriden / Dosyadan Seç',
    uploadFileSub: 'Cihazınızdan PNG, JPG veya WebP',
    testPhoto: 'Örnek Fotoğraf (IMG_0295-EDIT.jpg)',
    testPhotoSub: 'Seran Islami için mevcut fotoğraf',
    initialsOnly: 'Sadece Baş Harfleri Göster',
    initialsOnlySub: 'Minimalist harfli avatar',
    savePhoto: 'Fotoğrafı Kaydet',
  },
};
