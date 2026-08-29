function simpleInterest(
  principal,
  rate,
  rateType,
  years,
  months,
  days
) {
  const p = Number(principal);
  const enteredRate = Number(rate);

  // Convert the entered rate to monthly percentage
  let monthlyRate;

  if (rateType === "percentage") {
    // User entered annual percentage
    monthlyRate = enteredRate / 12;
  } else {
    // User entered ₹ per ₹100 per month
    monthlyRate = enteredRate;
  }

  // Interest for complete years
  const yearlyInterest =
    p * (monthlyRate / 100) * 12 * years;

  // Interest for complete months
  const monthlyInterest =
    p * (monthlyRate / 100) * months;

  // Interest for remaining days
  const dailyInterest =
    p *
    (monthlyRate / 100) *
    (days / 30);

  const interest =
    yearlyInterest +
    monthlyInterest +
    dailyInterest;

  const amount =
    p + interest;

  return {
    interest: Number(interest.toFixed(2)),
    totalAmount: Number(amount.toFixed(2))
  };
}

export default simpleInterest;