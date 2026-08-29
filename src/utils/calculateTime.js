function calculateTime(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  if (days < 0) {
    months--;

    const previousMonth = new Date(
      end.getFullYear(),
      end.getMonth(),
      0
    );

    days += previousMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  const millisecondsPerDay =
    1000 * 60 * 60 * 24;

  const totalDays = Math.round(
    (end - start) / millisecondsPerDay
  );

  return {
    years,
    months,
    days,
    totalDays
  };
}

export default calculateTime;