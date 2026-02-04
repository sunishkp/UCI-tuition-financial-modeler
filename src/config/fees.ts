// Lists all of UCI's additional fees
export const FEES = {
  UNDERGRAD: [
    { name: "Student Services Fee", amount: 1332.00 },
    { name: "Associated Students Fee - ASUCI Fee", amount: 54.00 },
    { name: "Associated Students Fee - ASUCI Student Resources Initiative& Services", amount: 103.06 },
    { name: "UCI Student Center Fee", amount: 267.00 },
    { name: "UCI Student Center Fee - Continuation Fee", amount: 190.05 },
    { name: "Bren Events Center Fee", amount: 69.00 },
    { name: "Campus Spirit Fee", amount: 99.00 },
    { name: "TGIF Fee", amount: 10.50 },
    { name: "Anteater Express Fee", amount: 160.03 },
    { name: "Club Sports Fee", amount: 21.00 },
    { name: "SOAR Fee", amount: 26.63 },
    { name: "Food Pantry Fee", amount: 12.28 },
    { name: "Document Fee", amount: 165.00 },
    { name: "UG Student Health Insurance Plan Fee", amount: 2845.71 },
    { name: "Writing Placement Fee", amount: 55.00 },
  ],

  GRAD: [
    { name: "Student Services Fee", amount: 1290.00 },
    { name: "Associated Graduate Student Fee - AGS", amount: 27.00 },
    { name: "UCI Student Center Fee", amount: 267.00 },
    { name: "UCI Student Center Fee - Continuation", amount: 190.05 },
    { name: "Bren Events Center Fee", amount: 69.00 },
    { name: "Recreation Center Fee", amount: 264.00 },
    { name: "Basic Needs Center Fee", amount: 21.00 },
    { name: "Document Fee", amount: 80.00 },
    { name: "Grad. Student Health Insurance Plan Fee", amount: 6847.26 },
  ],
};

export const SUMMER_FEES = {
  UNDERGRAD: [
    { name: "Mandatory Campus Fee", amount: 196 },
    { name: "eTech Fee", amount: 5.5, perUnit: true },
  ],
  GRAD: [
    { name: "Mandatory Campus Fee", amount: 176 },
    { name: "eTech Fee", amount: 5.5, perUnit: true },
  ],
};