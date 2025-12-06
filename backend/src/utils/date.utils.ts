export const toKolkataISO = (date: Date): string => {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const parts = formatter.formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value;

  const yyyy = get("year");
  const mm = get("month");
  const dd = get("day");
  const hh = get("hour");
  const min = get("minute");
  const sec = get("second");

  return `${yyyy}-${mm}-${dd}T${hh}:${min}:${sec}.000+05:30`;
};

export const parseNaturalDate = (input: string): string | null => {
  if (!input) return null;

  const text = input.toLowerCase();
  const now = new Date();
  const date = new Date(now);

  if (text.includes("day after tomorrow")) {
    date.setDate(date.getDate() + 2);
    return toKolkataISO(date);
  }

  if (text.includes("tomorrow")) {
    date.setDate(date.getDate() + 1);
    return toKolkataISO(date);
  }

  if (text.includes("today")) {
    return toKolkataISO(date);
  }

  const inDays = text.match(/in\s+(\d+)\s+days?/);
  if (inDays) {
    const n = parseInt(inDays[1]);
    date.setDate(date.getDate() + n);
    return toKolkataISO(date);
  }

  if (text.includes("weekend")) {
    const today = date.getDay();

    let daysToSaturday = (6 - today + 7) % 7;

    if (text.includes("next weekend")) {
      daysToSaturday += 7;
    }

    if ((text.includes("this weekend") || text.includes("the weekend")) &&
        (today === 6 || today === 0)) {
      daysToSaturday = today === 6 ? 0 : 6;
    }

    date.setDate(date.getDate() + daysToSaturday);
    return toKolkataISO(date);
  }

  const weekdays = [
    "sunday", "monday", "tuesday",
    "wednesday", "thursday", "friday", "saturday"
  ];

  for (let i = 0; i < weekdays.length; i++) {
    const wd = weekdays[i];

    if (text.includes(wd)) {
      const today = date.getDay();
      let diff = i - today;
      if (diff <= 0) diff += 7;

      if (text.includes("next " + wd)) {
        diff += 7;
      }

      date.setDate(date.getDate() + diff);
      return toKolkataISO(date);
    }
  }

  const abs = text.match(/(\d{1,2})(st|nd|rd|th)?\s+(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*/);
  const abs2 = text.match(/(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\s+(\d{1,2})(st|nd|rd|th)?/);

  const monthMap: Record<string, number> = {
    jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
    jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11
  };

  let day: number | null = null;
  let month: number | null = null;

  if (abs) {
    day = parseInt(abs[1]);
    month = monthMap[abs[3].slice(0, 3)];
  } else if (abs2) {
    day = parseInt(abs2[2]);
    month = monthMap[abs2[1].slice(0, 3)];
  }

  if (day !== null && month !== null) {
    const year = date.getFullYear();

    const d2 = new Date(year, month, day, now.getHours(), now.getMinutes(), now.getSeconds());

    if (d2 < now) d2.setFullYear(year + 1);

    return toKolkataISO(d2);
  }

  return null;
};
