"use client";

import { useState } from "react";
import { TUITION_RATES, GRAD_TUITION_RATES, calculateSummerTuition } from "../config/tuition";
import { FEES, SUMMER_FEES } from "../config/fees";

type Residency = keyof typeof TUITION_RATES;
type DegreeLevel = "Undergraduate" | "Graduate" | "";
const HOUSING_OPTIONS = { "On-Campus": 12000, "Off-Campus": 8000, "With Family": 0 };
const TERMS = ["Fall", "Winter", "Spring", "Summer"];

const getFeeKey = (degree: DegreeLevel) => (degree === "Undergraduate" ? "UNDERGRAD" : "GRAD");

export default function TuitionCalculator() {
  const [residency, setResidency] = useState<Residency | "">("");
  const [degree, setDegree] = useState<DegreeLevel>("");
  const [term, setTerm] = useState("");
  const [housing, setHousing] = useState<keyof typeof HOUSING_OPTIONS | "">("");
  const [isYearly, setIsYearly] = useState(true);
  const [summerUnits, setSummerUnits] = useState<number>(0);
  const [showFees, setShowFees] = useState(false);

  const formatCurrency = (value: number) =>
    value.toLocaleString("en-US", { style: "currency", currency: "USD" });

  // Base tuition
  const tuitionBase =
    degree === "Graduate"
      ? residency
        ? GRAD_TUITION_RATES[residency]
        : 0
      : residency
      ? TUITION_RATES[residency]
      : 0;

  // Tuition for selected term
  const tuitionForSelectedTerm =
    term === "Summer"
      ? degree
        ? calculateSummerTuition(degree, summerUnits)
        : 0
      : isYearly
      ? tuitionBase
      : tuitionBase / 3;

  // Fees calculation
  let feesForSelectedTerm = 0;
  if (term !== "Summer" && degree) {
    const degreeKey = getFeeKey(degree);
    feesForSelectedTerm = isYearly
      ? FEES[degreeKey].reduce((sum, fee) => sum + fee.amount, 0)
      : FEES[degreeKey].reduce((sum, fee) => sum + fee.amount, 0) / 3;
  } else if (term === "Summer" && degree) {
    const summerFeeSet = degree === "Graduate" ? SUMMER_FEES.GRAD : SUMMER_FEES.UNDERGRAD;
    const unitsToCharge = Math.min(summerUnits, 8); // cap at 8 units
    feesForSelectedTerm = summerFeeSet.reduce((sum, fee) => {
      if (fee.perUnit) return sum + fee.amount * unitsToCharge;
      return sum + fee.amount;
    }, 0);
  }

  // Housing calculation
  const housingForSelectedTerm =
    housing && term
      ? isYearly
        ? HOUSING_OPTIONS[housing]
        : HOUSING_OPTIONS[housing] / 3
      : 0;

  const totalForSelectedTerm = tuitionForSelectedTerm + feesForSelectedTerm + housingForSelectedTerm;

  return (
    <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 text-center">
        Tuition Calculator
      </h2>

      {/* Step 1: Residency */}
      <div>
        <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">Residency</label>
        <select
          value={residency}
          onChange={(e) => setResidency(e.target.value as Residency)}
          className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-gray-100 border-gray-300 dark:border-gray-600"
        >
          <option value="">-- Choose --</option>
          <option value="IN_STATE">California Resident</option>
          <option value="OUT_OF_STATE">Non-California USA Resident</option>
          <option value="INTERNATIONAL">International</option>
        </select>
      </div>

      {/* Step 2: Degree Level */}
      {residency && (
        <div>
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">Degree Level</label>
          <select
            value={degree}
            onChange={(e) => setDegree(e.target.value as DegreeLevel)}
            className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-gray-100 border-gray-300 dark:border-gray-600"
          >
            <option value="">-- Choose --</option>
            <option value="Undergraduate">Undergraduate</option>
            <option value="Graduate">Graduate</option>
          </select>
        </div>
      )}

      {/* Step 3: Term */}
      {degree && (
        <div>
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">Select Term</label>
          <select
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-gray-100 border-gray-300 dark:border-gray-600"
          >
            <option value="">-- Choose --</option>
            {TERMS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Step 4: Summer Units */}
      {term === "Summer" && (
        <div>
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
            Summer Units (max 8 counted)
          </label>
          <input
            type="number"
            min={0}
            max={20}
            value={summerUnits}
            onChange={(e) => setSummerUnits(parseInt(e.target.value))}
            className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-gray-100 border-gray-300 dark:border-gray-600"
          />
        </div>
      )}

      {/* Step 5: Period toggle (non-Summer) */}
      {term && term !== "Summer" && (
        <div>
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">Period</label>
          <div className="flex items-center space-x-4">
            <button
              className={`px-4 py-2 rounded-lg ${
                isYearly ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700 dark:text-gray-100"
              }`}
              onClick={() => setIsYearly(true)}
            >
              Yearly
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${
                !isYearly ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700 dark:text-gray-100"
              }`}
              onClick={() => setIsYearly(false)}
            >
              Per Quarter
            </button>
          </div>
        </div>
      )}

      {/* Step 6: Housing */}
      {term && (
        <div>
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">Housing</label>
          <select
            value={housing}
            onChange={(e) => setHousing(e.target.value as keyof typeof HOUSING_OPTIONS)}
            className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-gray-100 border-gray-300 dark:border-gray-600"
          >
            <option value="">-- Choose --</option>
            {Object.keys(HOUSING_OPTIONS).map((option) => (
              <option key={option} value={option}>
                {option} ({formatCurrency(HOUSING_OPTIONS[option as keyof typeof HOUSING_OPTIONS])})
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Step 7: Totals */}
      {residency && degree && term && housing && (
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 space-y-2">
          <p className="flex justify-between">
            <span>Tuition ({term === "Summer" ? "Summer Term" : isYearly ? "Yearly" : "Per Quarter"})</span>
            <span>{formatCurrency(tuitionForSelectedTerm)}</span>
          </p>
          <p className="flex justify-between items-center">
            <span>
              Fees{" "}
              <button
                className="ml-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition"
                onClick={() => setShowFees(!showFees)}
              >
                ?
              </button>
            </span>
            <span>{formatCurrency(feesForSelectedTerm)}</span>
          </p>
          <p className="flex justify-between">
            <span>Housing ({term === "Summer" ? "Summer Term" : isYearly ? "Yearly" : "Per Quarter"})</span>
            <span>{formatCurrency(housingForSelectedTerm)}</span>
          </p>
          <p className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>{formatCurrency(totalForSelectedTerm)}</span>
          </p>

          {/* Fee breakdown */}
          {showFees && (
            <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-600 rounded-lg border border-gray-200 dark:border-gray-500 transition-all">
              <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Fee Breakdown</h4>
              <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                {term !== "Summer"
                  ? FEES[getFeeKey(degree)].map((fee) => (
                      <li key={fee.name}>
                        {fee.name}: {formatCurrency(isYearly ? fee.amount : fee.amount / 3)}
                      </li>
                    ))
                  : (degree === "Graduate" ? SUMMER_FEES.GRAD : SUMMER_FEES.UNDERGRAD).map((fee) => {
                      const unitsToCharge = Math.min(summerUnits, 8);
                      if (fee.perUnit) {
                        return (
                          <li key={fee.name}>
                            {fee.name}: {formatCurrency(fee.amount * unitsToCharge)}
                          </li>
                        );
                      }
                      return <li key={fee.name}>{fee.name}: {formatCurrency(fee.amount)}</li>;
                    })}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
