function Result({
  Interest,
  TotalAmount,
  interestType,
  compoundFrequency,
  isCalculated
}) {
    if (!isCalculated) {
      return null;
    }
  return (
    
      <div className="result">
        <h2>RESULT</h2>

        <div className="result-type">
          {interestType === "simple"
            ? "Simple Interest"
            : `Compound Interest - ${
              compoundFrequency === "yearly"
                ? "Yearly"
                : compoundFrequency === "half-yearly"
                ? "Half-Yearly"
                : "Quarterly"
            }`}
        </div>

        <div className="result-item">
          <span>Interest</span>
          <span>₹{Number(Interest).toFixed(2)}</span>
        </div>

        <div className="result-item">
          <span>Total Amount</span>
          <span>₹{Number(TotalAmount).toFixed(2)}</span>
        </div>
      </div>
    
  );
}

export default Result;