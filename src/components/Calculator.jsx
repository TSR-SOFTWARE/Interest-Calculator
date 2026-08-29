import { useState } from "react";
import InputField from "./InputField";
import Result from "./Result";
import calculateTime from "../utils/calculateTime";
import calculateInterest from "../utils/calculateInterest";
import validateInput from "../utils/validation";

function Calculator(){
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [interestType, setInterestType] = useState("simple");
  const [interest, setInterest] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [years, setYears] = useState(0);
  const [months, setMonths] = useState(0);
  const [days, setDays] = useState(0);
  const [compoundFrequency, setCompoundFrequency] = useState("yearly");
  const [rateType, setRateType] = useState("percentage");
  const [error, setError] = useState([]);
  const [timeType, setTimeType] = useState("date");
  const [isCalculated, setIsCalculated] = useState(false);
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  
  function handleCalculate() {
    const validationErrors = validateInput(
      principal,
      rate,
      startDate,
      endDate,
      timeType,
      years,
      months,
      days
    );

    if (validationErrors.length > 0) {
        setInterest(0);
        setTotalAmount(0);
          if (timeType === "date") {
            setYears(0);
            setMonths(0);
            setDays(0);
          }
        setIsCalculated(false);
        setError(validationErrors);
        return;
    }

    setError([]);

    let calculatedYears;
    let calculatedMonths;
    let calculatedDays;

    if (timeType === "date") {
      const timeResult = calculateTime(
        startDate,
        endDate
      );

      calculatedYears = timeResult.years;
      calculatedMonths = timeResult.months;
      calculatedDays = timeResult.days;

      setYears(calculatedYears);
      setMonths(calculatedMonths);
      setDays(calculatedDays);
    } else {
        const enteredYears =
          years === "" ? 0 : Number(years);
        const enteredMonths = 
          months === "" ? 0 : Number(months);
        const enteredDays = 
          days === "" ? 0 : Number(days);

        // Convert days into months
        const extraMonths = Math.floor(
          enteredDays / 30
        );

        const remainingDays =
          enteredDays % 30;

        // Add converted months
        const totalMonths =
          enteredMonths + extraMonths;

        // Convert every 12 months into a year
        const extraYears = Math.floor(
          totalMonths / 12
        );

        calculatedYears =
          enteredYears + extraYears;

        calculatedMonths =
          totalMonths % 12;

        calculatedDays =
          remainingDays;

        // Update displayed time
        setYears(calculatedYears);
        setMonths(calculatedMonths);
        setDays(calculatedDays);
      }

    const interestResult = calculateInterest(
      principal,
      rate,
      rateType,
      calculatedYears,
      calculatedMonths,
      calculatedDays,
      interestType,
      compoundFrequency
    );

    setInterest(interestResult.interest);
    setTotalAmount(interestResult.totalAmount);
    setIsCalculated(true);
  }
  
  function resetCalculator() {
    setPrincipal("");
    setRate("");

    setRateType("percentage");
    setInterestType("simple");
    setCompoundFrequency("yearly");

    setStartDate("");
    setEndDate("");

    setYears(0);
    setMonths(0);
    setDays(0);

    setInterest(0);
    setTotalAmount(0);

    setError([]);
    setIsCalculated(false);
  }
  

  return(
    <div className={`Calculator ${theme}-theme`}>
      <div>
        <h1>Vaddi Calculator</h1>
      </div>
      <div className="theme-option">
        <label htmlFor="theme">Theme</label>

          <select
            id="theme"
            value={theme}
            onChange={(event) => {
              const selectedTheme = event.target.value;
              setTheme(selectedTheme);
              localStorage.setItem("theme", selectedTheme);
            }}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
      </div>
      <div className="interest-type">
          <label>Interest Type</label>
        <div className="interest-options">
          <label>
            <input 
              type="radio" 
              name="interestType" 
              value="simple"
              checked={interestType === "simple"}
              onChange={(event) => setInterestType(event.target.value)}
            />
            Simple Interest
          </label>

          <label>
            <input 
              type="radio" 
              name="interestType" 
              value="compound"
              checked={interestType === "compound"}
              onChange={(event) => setInterestType(event.target.value)}
            />
             Compound Interest
          </label>
        </div>
      </div>
        <div className="compound-frequency-wrapper">
          {interestType === "compound" && (
            <div className="compound-frequency">
              <label htmlFor="compoundFrequency">
              Compound Frequency
              </label>

                <select
                  id="compoundFrequency"
                  value={compoundFrequency}
                  onChange={(e) => setCompoundFrequency(e.target.value)}
                >
                  <option value="yearly">Yearly</option>
                  <option value="half-yearly">Half-Yearly</option>
                  <option value="quarterly">Quarterly</option>
                </select>
            </div>
          )}
        </div>
      <div>
        <div>
          <InputField 
            label="Principal Amount" 
            type="number"
            value={principal}
            placeholder="Enter Principal Amount"
            onChange={(event) => setPrincipal(event.target.value)}
          />
          <div className="rate-type">
            <label>Rate Type</label>
            <div className="rate-options">
            <label>
              <input
                type="radio"
                name="rateType"
                value="percentage"
                checked={rateType === "percentage"}
                onChange={(event) => setRateType(event.target.value)}
              />
              (% per year)
            </label>

            <label>
              <input
                type="radio"
                name="rateType"
                value="rupees"
                checked={rateType === "rupees"}
                onChange={(event) => setRateType(event.target.value)}
              />
              Rupees per ₹100
            </label>
            </div>
          </div>
          <InputField
            label={
              rateType === "percentage"
              ? "Rate (% per year)"
              : "Rate (₹  per ₹100)"
            }
            type="number"
            value={rate}
            placeholder= "Enter rate"
            onChange={(event) => setRate(event.target.value)}
          />
          <div className="time-type">

            <label>Time Type</label>

            <div className="time-options">
            <label>
              <input
                type="radio"
                name="timeType"
                value="date"
                checked={timeType === "date"}
                onChange={() => {
                  setTimeType("date");
                  setYears(0);
                  setMonths(0);
                  setDays(0);
                }}
              />
              Calendar Time Period
            </label>

            <label>
              <input
                type="radio"
                name="timeType"
                value="direct"
                checked={timeType === "direct"}
                onChange={() => {
                  setTimeType("direct");
                    setYears("");
                    setMonths("");
                    setDays("");
                }}
              />
              Enter Time Period
            </label>
            </div>
          </div>
          {timeType === "date" ? (
            <>
              <InputField 
                label="Start Date" 
                type="date"
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
              />
              <InputField 
                label="End Date" 
                type="date"
                value={endDate}
                onChange={(event) => setEndDate(event.target.value)}
              />
            </>
          ) : (
            <div className="direct-time">

              <InputField
                label="Years"
                type="number"
                value={years}
                onChange={(event) => setYears(event.target.value)}
              />

              <InputField
                label="Months"
                type="number"
                value={months}
                onChange={(event) => setMonths(event.target.value)}
              />

              <InputField
                label="Days"
                type="number"
                value={days}
                onChange={(event) => setDays(event.target.value)}
              />

            </div>
          )}
        </div>
      </div>
        <div>
          {isCalculated && (
            <div className="time-result">
              <span>Time</span>

              <span>
                {years} Years&nbsp;&nbsp;
                {months} Months&nbsp;&nbsp;
                {days} Days
              </span>
            </div>
          )}

          <div className="button-container">
          <button 
            type="button" 
            className="calculate-button" 
            onClick={handleCalculate}
          >
            Calculate
          </button>

          <button 
            type="button" 
            className="reset-button" 
            onClick={resetCalculator}
          >
              Reset
          </button>
          </div>
          
        </div>
        <div>
          <Result 
            Interest={interest} 
            TotalAmount={totalAmount}
            interestType={interestType}
            compoundFrequency={compoundFrequency}
            isCalculated={isCalculated}
          />
        </div>
      {error.length > 0 && (
        <div className="error-overlay">
          <div className="error-popup">

            <h2>⚠ Please Check</h2>

              <div className="error-list">
                 {error.map((message, index) => (
                    <p key={index}>
                      {message}
                    </p>
                  ))}
              </div>

                <button
                  type="button"
                  className="error-ok-button"
                  onClick={() => setError([])}
                  >
                  OK
                </button>

            </div>
        </div>
      )}
    </div>


  );


}
export default Calculator;