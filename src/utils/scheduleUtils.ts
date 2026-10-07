import { siteConfig, DaySchedule } from "../config";

export interface LiveStatusResult {
  isOpen: boolean;
  statusLabelFr: string;
  statusLabelAr: string;
  detailFr: string;
  detailAr: string;
  todaySchedule: DaySchedule;
}

function parseTimeToMinutes(timeStr: string): number {
  const [hh, mm] = timeStr.split(":").map(Number);
  return (hh || 0) * 60 + (mm || 0);
}

function formatMinutesToTime(totalMinutes: number): string {
  const hh = Math.floor(totalMinutes / 60);
  const mm = totalMinutes % 60;
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
}

export function getScheduleForDayIndex(dayIndex: number): DaySchedule {
  const found = siteConfig.openingHours.find((d) => d.dayIndex === dayIndex);
  if (found) return found;
  return {
    dayIndex,
    dayNameFr: "Dimanche",
    dayNameAr: "الأحد",
    closed: true,
    open: "00:00",
    close: "00:00",
  };
}

/**
 * Computes whether the salon is currently Open or Closed based on real current time and siteConfig.openingHours
 */
export function getLiveSalonStatus(now: Date = new Date()): LiveStatusResult {
  const dayIndex = now.getDay();
  const todaySchedule = getScheduleForDayIndex(dayIndex);
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  if (todaySchedule.closed) {
    return {
      isOpen: false,
      statusLabelFr: "Fermé actuellement",
      statusLabelAr: "مغلق حالياً",
      detailFr: "Fermé le dimanche — Réouverture lundi dès 09:30",
      detailAr: "مغلق يوم الأحد — نفتح يوم الإثنين على 09:30",
      todaySchedule,
    };
  }

  const openMinutes = parseTimeToMinutes(todaySchedule.open);
  const closeMinutes = parseTimeToMinutes(todaySchedule.close);

  if (currentMinutes >= openMinutes && currentMinutes < closeMinutes) {
    return {
      isOpen: true,
      statusLabelFr: "Ouvert maintenant",
      statusLabelAr: "مفتوح الآن",
      detailFr: `Aujourd'hui jusqu'à ${todaySchedule.close}`,
      detailAr: `اليوم إلى غاية ${todaySchedule.close}`,
      todaySchedule,
    };
  }

  if (currentMinutes < openMinutes) {
    return {
      isOpen: false,
      statusLabelFr: "Fermé actuellement",
      statusLabelAr: "مغلق حالياً",
      detailFr: `Ouverture aujourd'hui à ${todaySchedule.open}`,
      detailAr: `يفتح اليوم على الساعة ${todaySchedule.open}`,
      todaySchedule,
    };
  }

  // After closing time today
  return {
    isOpen: false,
    statusLabelFr: "Fermé actuellement",
    statusLabelAr: "مغلق حالياً",
    detailFr: `Fermé pour aujourd'hui (fermeture à ${todaySchedule.close})`,
    detailAr: `مغلق لليوم (الإغلاق على ${todaySchedule.close})`,
    todaySchedule,
  };
}

/**
 * Computes the Hero animated badge:
 * "Prochain créneau disponible : aujourd'hui à HH:MM" (or demain / prochain jour ouvré)
 */
export function getNextAvailableSlotBadge(now: Date = new Date()): {
  fr: string;
  ar: string;
  timeStr: string;
  isToday: boolean;
} {
  const dayIndex = now.getDay();
  const todaySchedule = getScheduleForDayIndex(dayIndex);
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  if (!todaySchedule.closed) {
    const openMinutes = parseTimeToMinutes(todaySchedule.open);
    const closeMinutes = parseTimeToMinutes(todaySchedule.close);

    // Round current time + 45 mins buffer up to the next 30-min slot
    const candidate = Math.max(openMinutes, Math.ceil((currentMinutes + 45) / 30) * 30);
    if (candidate <= closeMinutes - 45) {
      const slotStr = formatMinutesToTime(candidate);
      return {
        fr: `Prochain créneau disponible : aujourd'hui à ${slotStr}`,
        ar: `أقرب موعد متاح: اليوم على الساعة ${slotStr}`,
        timeStr: slotStr,
        isToday: true,
      };
    }
  }

  // Otherwise check the next open day (starting tomorrow)
  for (let offset = 1; offset <= 7; offset++) {
    const nextDayIndex = (dayIndex + offset) % 7;
    const sched = getScheduleForDayIndex(nextDayIndex);
    if (!sched.closed) {
      const dayLabelFr = offset === 1 ? "demain" : sched.dayNameFr.toLowerCase();
      const dayLabelAr = offset === 1 ? "غداً" : `يوم ${sched.dayNameAr}`;
      return {
        fr: `Prochain créneau disponible : ${dayLabelFr} à ${sched.open}`,
        ar: `أقرب موعد متاح: ${dayLabelAr} على الساعة ${sched.open}`,
        timeStr: sched.open,
        isToday: false,
      };
    }
  }

  return {
    fr: "Prochain créneau disponible : aujourd'hui à 10:00",
    ar: "أقرب موعد متاح: اليوم على الساعة 10:00",
    timeStr: "10:00",
    isToday: true,
  };
}

export interface BookingDateOption {
  isoDate: string; // "2026-10-07"
  dayIndex: number;
  dayShortFr: string;
  dayShortAr: string;
  dayNumber: string;
  monthShortFr: string;
  fullLabelFr: string;
  fullLabelAr: string;
  closed: boolean;
}

const MONTHS_FR = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"];

export function getNext14Days(baseDate: Date = new Date()): BookingDateOption[] {
  const result: BookingDateOption[] = [];
  for (let i = 0; i < 14; i++) {
    const d = new Date(baseDate);
    d.setDate(baseDate.getDate() + i);
    const dayIndex = d.getDay();
    const sched = getScheduleForDayIndex(dayIndex);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const isoDate = `${yyyy}-${mm}-${dd}`;
    const monthShortFr = MONTHS_FR[d.getMonth()] || "";

    result.push({
      isoDate,
      dayIndex,
      dayShortFr: sched.dayNameFr.slice(0, 3),
      dayShortAr: sched.dayNameAr,
      dayNumber: dd,
      monthShortFr,
      fullLabelFr: `${sched.dayNameFr} ${dd} ${monthShortFr}`,
      fullLabelAr: `${sched.dayNameAr} ${dd}/${mm}`,
      closed: sched.closed,
    });
  }
  return result;
}

/**
 * Generates selectable time slots for a chosen date and service duration (in minutes)
 * based on siteConfig.openingHours
 */
export function getTimeSlotsForDate(isoDate: string, serviceDurationMin: number): string[] {
  const parts = isoDate.split("-").map(Number);
  if (parts.length !== 3) return [];
  const d = new Date(parts[0], parts[1] - 1, parts[2]);
  const sched = getScheduleForDayIndex(d.getDay());
  if (sched.closed) return [];

  const openMinutes = parseTimeToMinutes(sched.open);
  const closeMinutes = parseTimeToMinutes(sched.close);
  // Step interval: if duration >= 60, offer every 45 or 60 mins; otherwise every 30 mins
  const step = serviceDurationMin >= 75 ? 60 : 45;
  const slots: string[] = [];

  for (let t = openMinutes; t + serviceDurationMin <= closeMinutes; t += step) {
    slots.push(formatMinutesToTime(t));
  }

  return slots;
}
