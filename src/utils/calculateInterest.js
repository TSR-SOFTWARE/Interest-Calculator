import simpleInterest from "./simpleInterest";
import compoundInterest from "./compoundInterest";

function calculateInterest(
  principal,
  rate,
  rateType,
  years,
  months,
  days,
  interestType,
  compoundFrequency
) {
  if (interestType === "simple") {
    return simpleInterest(
      principal,
      rate,
      rateType,
      years,
      months,
      days
    );
  }

  return compoundInterest(
    principal,
    rate,
    rateType,
    years,
    months,
    days,
    compoundFrequency
  );
}

export default calculateInterest;