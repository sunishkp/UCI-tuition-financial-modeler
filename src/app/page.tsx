import { TUITION_RATES } from "../config/tuition";
import { FEES } from "../config/fees";
import TuitionCalculator from "../components/TuitionCalculator";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Welcome to the UCI Tuition Calculator - Student-Created
      </h1>
      <TuitionCalculator />
    </main>
  );
}

