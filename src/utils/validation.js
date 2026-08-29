function validateInput(
  principal,
  rate,
  startDate,
  endDate,
  timeType,
  years,
  months,
  days
) {
  const errors = [];

  // =============================
  // PRINCIPAL
  // =============================

  if (principal === "") {
    errors.push("Please enter principal amount.");
  } else if (Number.isNaN(Number(principal))) {
    errors.push("Principal amount must be a number.");
  } else if (Number(principal) <= 0) {
    errors.push("Principal amount must be greater than 0.");
  }

  // =============================
  // RATE
  // =============================

  if (rate === "") {
    errors.push("Please enter rate.");
  } else if (Number.isNaN(Number(rate))) {
    errors.push("Rate must be a number.");
  } else if (Number(rate) <= 0) {
    errors.push("Rate must be greater than 0.");
  }

  // =============================
  // DATE MODE
  // =============================

  if (timeType === "date") {
    if (startDate === "") {
      errors.push("Please select start date.");
    }

    if (endDate === "") {
      errors.push("Please select end date.");
    }

    if (startDate !== "" && endDate !== "") {
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (end < start) {
        errors.push(
          "End date cannot be before start date."
        );
      }

      if (end.getTime() === start.getTime()) {
        errors.push(
          "Start date and end date cannot be the same."
        );
      }
    }
  }

  // =============================
  // DIRECT TIME MODE
  // =============================

  if (timeType === "direct") {
    const enteredYears =
      years === "" ? 0 : Number(years);

    const enteredMonths =
      months === "" ? 0 : Number(months);

    const enteredDays =
      days === "" ? 0 : Number(days);

    if (Number.isNaN(enteredYears)) {
      errors.push("Years must be a number.");
    } else if (enteredYears < 0) {
      errors.push("Years cannot be negative.");
    }

    if (Number.isNaN(enteredMonths)) {
      errors.push("Months must be a number.");
    } else if (enteredMonths < 0) {
      errors.push("Months cannot be negative.");
    }

    if (Number.isNaN(enteredDays)) {
      errors.push("Days must be a number.");
    } else if (enteredDays < 0) {
      errors.push("Days cannot be negative.");
    }

    if (
      enteredYears === 0 &&
      enteredMonths === 0 &&
      enteredDays === 0
    ) {
      errors.push("Time must be greater than 0.");
    }
  }

  // =============================
  // RETURN ERRORS
  // =============================

  return errors;
}

export default validateInput;