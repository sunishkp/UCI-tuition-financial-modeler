// Rates here represent tuition per year
export const TUITION_RATES = {
  IN_STATE: 13602.00,
  OUT_OF_STATE: 49679.14,
  INTERNATIONAL: 49679.14
} as const

export const GRAD_TUITION_RATES = {
  IN_STATE: 13140.00,
  OUT_OF_STATE: 34316.84,
  INTERNATIONAL: 34316.84
} as const

// Summer Tuition calculates by unit and is capped at 8 units
export const SUMMER_TUITION_PER_UNIT = {
  UNDERGRAD: 291.00, 
  GRAD: 400.00,
};

// Helper function to calculate the total summer tuition cost
export const calculateSummerTuition = (
  degreeLevel: "Undergraduate" | "Graduate",
  units: number
) => {
  const perUnitFee =
    degreeLevel === "Graduate"
      ? SUMMER_TUITION_PER_UNIT.GRAD
      : SUMMER_TUITION_PER_UNIT.UNDERGRAD;

  const unitsToCharge = Math.min(units, 8); // capped at 8 units regardless of degree status
  return perUnitFee * unitsToCharge;
};