"use client";
import { useState } from "react";

export default function ElectricityCalculator() {
  const [watt, setWatt] = useState(0);
  const [hours, setHours] = useState(0);
  const [days, setDays] = useState(30);
  const [rate, setRate] = useState(8);
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    if (watt > 0 && hours > 0 && days > 0 && rate > 0) {
      const units = (watt * hours * days) / 1000;
      const cost = units * rate;
      setResult(cost);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">

      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md border border-gray-200">

        <h1 className="text-2xl font-bold text-center">
          Electricity Bill Calculator
        </h1>

        <p className="text-gray-600 text-center mt-2">
          Calculate your monthly electricity cost based on usage
        </p>

        <div className="mt-6 space-y-4">

          <input
            type="number"
            placeholder="Appliance Power (Watts)"
            className="w-full p-3 border rounded-lg bg-white text-black placeholder-gray-500"
            onChange={(e) => setWatt(Number(e.target.value))}
          />

          <input
            type="number"
            placeholder="Usage per Day (Hours)"
            className="w-full p-3 border rounded-lg bg-white text-black placeholder-gray-500"
            onChange={(e) => setHours(Number(e.target.value))}
          />

          <input
            type="number"
            placeholder="Number of Days"
            value={days}
            className="w-full p-3 border rounded-lg bg-white text-black placeholder-gray-500"
            onChange={(e) => setDays(Number(e.target.value))}
          />

          <input
            type="number"
            placeholder="Cost per Unit (₹)"
            value={rate}
            className="w-full p-3 border rounded-lg bg-white text-black placeholder-gray-500"
            onChange={(e) => setRate(Number(e.target.value))}
          />

          <button
            onClick={calculate}
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
          >
            Calculate Bill
          </button>

          {result !== null && (
            <div className="bg-gray-100 p-4 rounded-lg text-center font-semibold">
              Estimated Cost: ₹ {result.toFixed(2)}
            </div>
          )}

          <section className="max-w-5xl mx-auto mt-16 space-y-8 text-gray-800">

        <h2 className="text-2xl font-bold">
            Electricity Bill Calculator – Estimate Your Power Cost
        </h2>

        <p>
            Our <strong>electricity bill calculator</strong> helps you estimate how much electricity your appliances consume and how much it costs per month. Whether you want to calculate AC usage, fan consumption, or total home electricity usage, this tool gives accurate results based on real formulas.
        </p>

        <h3 className="text-xl font-semibold">
            ⚡ How Electricity Bill is Calculated
        </h3>

        <p>
            Electricity consumption is measured in units (kWh). The total cost depends on how many units you consume and your electricity tariff per unit.
        </p>

        <div className="bg-gray-100 p-4 rounded-md font-mono text-sm">
            Units (kWh) = (Watt × Hours × Days) ÷ 1000
            <br />
            Cost = Units × Rate per Unit
        </div>

        <h3 className="text-xl font-semibold">
            📊 Example
        </h3>

        <p>
            A 1000W appliance used for 5 hours daily for 30 days:
        </p>

        <ul className="list-disc ml-6">
            <li>Units = 150 kWh</li>
            <li>Cost = ₹1200 (at ₹8/unit)</li>
        </ul>

        <h3 className="text-xl font-semibold">
            🎯 Tips to Reduce Electricity Bill
        </h3>

        <ul className="list-disc ml-6 space-y-2">
            <li>Use energy-efficient appliances</li>
            <li>Reduce unnecessary usage</li>
            <li>Switch to LED lighting</li>
            <li>Turn off standby devices</li>
        </ul>

        </section>
        </div>
      </div>

    </div>
  );
}