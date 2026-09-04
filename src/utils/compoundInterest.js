function compoundInterest(
  principal,
  rate,
  rateType,
  years,
  months,
  days,
  compoundFrequency
) {
  const p = Number(principal);
  const enteredRate = Number(rate);

  
  // CONVERT RATE TO MONTHLY RATE
  

  let monthlyRate;

  if (rateType === "percentage") {
    
    monthlyRate = enteredRate / 12;

  } else {
  
    monthlyRate = enteredRate;
  }

  
  // COMPOUNDING PERIOD
  

  let periodMonths;

  if (compoundFrequency === "yearly") {
    periodMonths = 12;
  } else if (compoundFrequency === "half-yearly") {
    periodMonths = 6;
  } else if (compoundFrequency === "quarterly") {
    periodMonths = 3;
  }


  // TOTAL COMPLETE MONTHS
  

  const totalMonths =
    Number(years) * 12 + Number(months);

  
  // COMPLETED COMPOUND PERIODS
  

  const completedPeriods =
    Math.floor(totalMonths / periodMonths);

  
  // REMAINING MONTHS
  

  const remainingMonths =
    totalMonths % periodMonths;

  
  // NO COMPLETED COMPOUND PERIOD
  

  if (completedPeriods === 0) {
    const interest =
      p *
      (monthlyRate / 100) *
      (
        Number(months) +
        Number(days) / 30
      );

    const amount =
      p + interest;

    return {
      interest: Number(interest.toFixed(2)),
      totalAmount: Number(amount.toFixed(2))
    };
  }

  
  // COMPOUND COMPLETED PERIODS
  

  const periodRate =
    monthlyRate * periodMonths;

  let amount =
    p *
    Math.pow(
      1 + periodRate / 100,
      completedPeriods
    );


  // REMAINING MONTHS
  

  if (remainingMonths > 0) {
    const remainingMonthInterest =
      amount *
      (monthlyRate / 100) *
      remainingMonths;

    amount += remainingMonthInterest;
  }

  
  // REMAINING DAYS
  

  if (Number(days) > 0) {
    const remainingDayInterest =
      amount *
      (monthlyRate / 100) *
      (Number(days) / 30);

    amount += remainingDayInterest;
  }

  
  // FINAL RESULT
  

  const interest =
    amount - p;

  return {
    interest: Number(interest.toFixed(2)),
    totalAmount: Number(amount.toFixed(2))
  };
}

export default compoundInterest;