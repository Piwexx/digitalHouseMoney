export function isWithinPeriod(dateStr: string, period: string): boolean {
  const date = new Date(dateStr);
  const now = new Date();

  switch (period) {
    case 'Hoy':
      return date.toDateString() === now.toDateString();
    case 'Ayer':
      const yesterday = new Date();
      yesterday.setDate(now.getDate() - 1);
      return date.toDateString() === yesterday.toDateString();
    case 'Última semana':
      const lastWeek = new Date();
      lastWeek.setDate(now.getDate() - 7);
      return date >= lastWeek;
    case 'Últimos 15 días':
      const last15 = new Date();
      last15.setDate(now.getDate() - 15);
      return date >= last15;
    case 'Último mes':
      const lastMonth = new Date();
      lastMonth.setMonth(now.getMonth() - 1);
      return date >= lastMonth;
    case 'Último año':
    default:
      const lastYear = new Date();
      lastYear.setFullYear(now.getFullYear() - 1);
      return date >= lastYear;
  }
}
