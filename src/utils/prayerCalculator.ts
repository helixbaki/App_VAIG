import { PrayerTimeItem } from '../types';
import swissMosqueCalendarData from '../data/swissMosqueCalendar.json';

export interface SwissMosqueDayData {
  Date: string; // e.g. "08.10.2026"
  Day: string;  // e.g. "Do"
  Fajr: string; // "05:48"
  Sabah: string; // "06:38"
  Sunrise: string; // "07:23"
  DhuhrTime: string; // "13:15"
  Dhuhr: string; // "13:30" (Iqamah)
  AsrTime: string; // "16:18"
  Asr: string; // "16:18"
  MaghribTime: string; // "18:56"
  Maghrib: string; // "18:56"
  IshaTime: string; // "20:19"
  Isha: string; // "20:19"
}

export interface PrayerScheduleResult {
  prayers: PrayerTimeItem[];
  nextPrayer: PrayerTimeItem;
  remainingSeconds: number;
  countdownText: string;
  sourceUrl: string;
  mosqueId: string;
  todayDateFormatted: string;
  jummahTime: string;
  iqamahInfo?: {
    dhuhrIqamah: string;
    sabahTime: string;
  };
}

const calendar = swissMosqueCalendarData as Record<string, SwissMosqueDayData>;

function formatDateKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}${m}${day}`;
}

export function getPrayerSchedule(currentDate: Date = new Date(), lang: 'de' | 'sq' | 'tr' = 'de'): PrayerScheduleResult {
  const keyToday = formatDateKey(currentDate);
  const tomorrow = new Date(currentDate);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const keyTomorrow = formatDateKey(tomorrow);

  const dayData: SwissMosqueDayData = calendar[keyToday] || {
    Date: '08.10.2026',
    Day: 'Do',
    Fajr: '05:48',
    Sabah: '06:38',
    Sunrise: '07:23',
    DhuhrTime: '13:15',
    Dhuhr: '13:30',
    AsrTime: '16:18',
    Asr: '16:18',
    MaghribTime: '18:56',
    Maghrib: '18:56',
    IshaTime: '20:19',
    Isha: '20:19',
  };

  const tomorrowData: SwissMosqueDayData = calendar[keyTomorrow] || dayData;

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();

  const parseTime = (timeStr: string, isNextDay = false): Date => {
    const [h, m] = timeStr.split(':').map(Number);
    const dayOffset = isNextDay ? 1 : 0;
    return new Date(currentYear, currentMonth, currentDay + dayOffset, h, m, 0);
  };

  // Exactly the 5 requested prayers:
  // Fajr (Sabahu), Dhuhr (Dreka), Asr (Ikindia), Maghrib (Akshami), Isha (Jacia)
  const prayerDefinitions = [
    {
      id: 'fajr',
      name: 'Fajr (Sabahu)',
      arabicName: 'الفجر',
      time: dayData.Fajr, // 05:48
      timestamp: parseTime(dayData.Fajr),
    },
    {
      id: 'dhuhr',
      name: 'Dhuhr (Dreka)',
      arabicName: 'الظهر',
      time: dayData.DhuhrTime || dayData.Dhuhr, // 13:15
      timestamp: parseTime(dayData.DhuhrTime || dayData.Dhuhr),
    },
    {
      id: 'asr',
      name: 'Asr (Ikindia)',
      arabicName: 'العصر',
      time: dayData.AsrTime || dayData.Asr, // 16:18
      timestamp: parseTime(dayData.AsrTime || dayData.Asr),
    },
    {
      id: 'maghrib',
      name: 'Maghrib (Akshami)',
      arabicName: 'المغرب',
      time: dayData.MaghribTime || dayData.Maghrib, // 18:56
      timestamp: parseTime(dayData.MaghribTime || dayData.Maghrib),
    },
    {
      id: 'isha',
      name: 'Isha (Jacia)',
      arabicName: 'العشاء',
      time: dayData.IshaTime || dayData.Isha, // 20:19
      timestamp: parseTime(dayData.IshaTime || dayData.Isha),
    },
  ];

  const nowMs = currentDate.getTime();
  let nextPrayerIndex = -1;

  for (let i = 0; i < prayerDefinitions.length; i++) {
    if (prayerDefinitions[i].timestamp.getTime() > nowMs) {
      nextPrayerIndex = i;
      break;
    }
  }

  const prayerItems: PrayerTimeItem[] = prayerDefinitions.map((p, idx) => ({
    id: p.id,
    name: p.name,
    arabicName: p.arabicName,
    time: p.time,
    timestamp: p.timestamp,
    isNext: idx === nextPrayerIndex,
  }));

  let nextPrayer: PrayerTimeItem;
  let remainingMs = 0;

  if (nextPrayerIndex !== -1) {
    nextPrayer = prayerItems[nextPrayerIndex];
    remainingMs = nextPrayer.timestamp.getTime() - nowMs;
  } else {
    // Tomorrow's Fajr
    const tomorrowFajrTime = tomorrowData.Fajr;
    const tomorrowFajrDate = parseTime(tomorrowFajrTime, true);
    nextPrayer = {
      id: 'fajr',
      name: 'Fajr (Sabahu)',
      arabicName: 'الفجر',
      time: tomorrowFajrTime,
      timestamp: tomorrowFajrDate,
      isNext: true,
    };
    prayerItems[0].isNext = true;
    remainingMs = tomorrowFajrDate.getTime() - nowMs;
  }

  const remainingSeconds = Math.max(0, Math.floor(remainingMs / 1000));
  const hours = Math.floor(remainingSeconds / 3600);
  const minutes = Math.floor((remainingSeconds % 3600) / 60);
  const seconds = remainingSeconds % 60;

  let countdownText = '';
  if (hours > 0) {
    countdownText = `${hours}h ${minutes}m ${seconds}s`;
  } else if (minutes > 0) {
    countdownText = `${minutes}m ${seconds}s`;
  } else {
    countdownText = `${seconds}s`;
  }

  const nextLabel = lang === 'sq' ? 'Lutja e ardhshme' : lang === 'tr' ? 'Sıradaki vakit' : 'Nächstes';

  return {
    prayers: prayerItems,
    nextPrayer,
    remainingSeconds,
    countdownText: `${nextLabel}: ${nextPrayer.name.split(' ')[0]} in ${countdownText}`,
    sourceUrl: 'https://tv.swissmosque.ch/?mosqueId=1019&place=Home&tvDeviceId=kkkHxqxDME2D8IZQqi4k',
    mosqueId: '1019',
    todayDateFormatted: `${dayData.Day}, ${dayData.Date}`,
    jummahTime: '13:15',
    iqamahInfo: {
      dhuhrIqamah: dayData.Dhuhr,
      sabahTime: dayData.Sabah,
    },
  };
}
