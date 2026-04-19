"use client";
import { useState } from "react";

export default function BatteryCalculator() {
  const [ah, setAh] = useState(0);
  const [voltage, setVoltage] = useState(12);
  const [load, setLoad] = useState(0);
  const [efficiency, setEfficiency] = useState(0.85);
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    if (ah > 0 && voltage > 0 && load > 0) {
      const hours = (ah * voltage * efficiency) / load;
      setResult(hours);
    }
  };

  return (
  <div className="min-h-screen bg-linear-to-b from-black to-gray-900 text-white px-4 py-10">

    {/* MAIN CARD */}
    <div className="max-w-xl mx-auto bg-gray-950 border border-gray-800 rounded-2xl shadow-xl p-6">

      <h1 className="text-3xl font-bold text-center">
        Battery Backup Calculator
      </h1>

      <p className="text-gray-400 text-center mt-2">
        Calculate how long your inverter battery will last
      </p>

      {/* INPUTS */}
      <div className="mt-6 space-y-4">

        <div>
          <label htmlFor="ah" className="text-sm text-gray-400">Battery Capacity (Ah)</label>
          <input
            type="number"
            id="ah"
            placeholder="e.g. 150"
            className="w-full mt-1 p-3 rounded-lg bg-black border border-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
            onChange={(e) => setAh(Number(e.target.value))}
          />
        </div>

        <div>
          <label htmlFor="voltage" className="text-sm text-gray-400">Battery Voltage</label>
          <select
            id="voltage"
            className="w-full mt-1 p-3 rounded-lg bg-black border border-gray-700"
            onChange={(e) => setVoltage(Number(e.target.value))}
          >
            <option value={12}>12V</option>
            <option value={24}>24V</option>
          </select>
        </div>

        <div>
          <label htmlFor="load" className="text-sm text-gray-400">Load (Watts)</label>
          <input
            id="load"
            type="number"
            placeholder="e.g. 200"
            className="w-full mt-1 p-3 rounded-lg bg-black border border-gray-700"
            onChange={(e) => setLoad(Number(e.target.value))}
          />
        </div>

        <div>
          <label htmlFor="efficiency" className="text-sm text-gray-400">Efficiency</label>
          <input
            id="efficiency"
            type="number"
            defaultValue={0.85}
            className="w-full mt-1 p-3 rounded-lg bg-black border border-gray-700"
            onChange={(e) => setEfficiency(Number(e.target.value))}
          />
        </div>

        <button
          onClick={calculate}
          className="w-full bg-white text-black font-semibold py-3 rounded-lg hover:bg-gray-200 transition"
        >
          Calculate Backup
        </button>

      </div>

      {/* RESULT */}
      {result !== null && (
        <div className="mt-6 p-4 rounded-xl bg-green-900/30 border border-green-700 text-center">
          <p className="text-gray-300">Estimated Backup Time</p>
          <p className="text-2xl font-bold mt-1">
            {result.toFixed(2)} hours
          </p>
        </div>
      )}
    </div>

    {/* CONTENT SECTION */}
    <div className="max-w-3xl mx-auto mt-12 space-y-10 text-gray-300 leading-relaxed px-4">

  {/* INTRO */}
  <section>
    <h2 className="text-3xl font-bold text-white">
      Battery Backup Calculator – Accurate Inverter Backup Time Guide
    </h2>

    <p className="mt-4">
      A <strong>battery backup calculator</strong> helps you estimate how long your inverter battery can run household appliances during a power outage.
      Whether you are using a <strong>150Ah battery</strong>, <strong>200Ah battery</strong>, or a full inverter setup, knowing your backup time is critical for proper power management.
    </p>

    <p className="mt-2">
      This guide is designed for users searching for <strong>inverter battery backup time calculation</strong>,
      <strong> how to calculate battery backup</strong>, or
      <strong> how long a battery will last during power cuts</strong>.
      Unlike basic tools, this calculator uses realistic efficiency values to give accurate results.
    </p>
  </section>

  {/* FORMULA */}
  <section>
    <h3 className="text-xl font-semibold text-white">
      Battery Backup Time Formula (Realistic Calculation)
    </h3>

    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 font-mono text-sm mt-3">
      Backup Time (hours) = (Battery Ah × Voltage × Efficiency) / Load (Watts)
    </div>

    <p className="mt-3">
      This formula calculates actual backup time by accounting for inverter losses and real-world usage conditions.
      Many online calculators ignore efficiency, which leads to unrealistic results.
    </p>

    <ul className="list-disc ml-6 mt-3 space-y-1">
      <li><strong>Battery Capacity (Ah):</strong> Determines total stored energy</li>
      <li><strong>Voltage (V):</strong> Usually 12V or 24V systems</li>
      <li><strong>Efficiency (80%–90%):</strong> Accounts for inverter and heat losses</li>
      <li><strong>Load (Watts):</strong> Total power consumption of connected devices</li>
    </ul>
  </section>

  {/* EXAMPLE */}
  <section>
    <h3 className="text-xl font-semibold text-white">
      Example: 150Ah Inverter Battery Backup Time
    </h3>

    <p className="mt-2">
      Here’s a practical real-life calculation:
    </p>

    <ul className="list-disc ml-6 mt-2">
      <li>Battery: 150Ah</li>
      <li>Voltage: 12V</li>
      <li>Efficiency: 0.85</li>
      <li>Load: 200 watts</li>
    </ul>

    <p className="mt-3 font-semibold text-green-400">
      Estimated Backup Time ≈ 7.65 hours
    </p>

    <p className="mt-2">
      This estimate reflects real inverter performance and is far more accurate than simplified calculations.
    </p>
  </section>

  {/* LOAD */}
  <section>
    <h3 className="text-xl font-semibold text-white">
      Typical Household Power Consumption (Load Calculation)
    </h3>

    <p className="mt-2">
      To calculate battery backup correctly, you must first estimate total load. Below are common appliance power ratings:
    </p>

    <div className="overflow-x-auto mt-3">
      <table className="w-full border border-gray-700 text-left">
        <thead className="bg-gray-800">
          <tr>
            <th className="p-2 border border-gray-700">Appliance</th>
            <th className="p-2 border border-gray-700">Power (Watts)</th>
          </tr>
        </thead>
        <tbody>
          <tr><td className="p-2 border">LED Bulb</td><td className="p-2 border">9–12W</td></tr>
          <tr><td className="p-2 border">Fan</td><td className="p-2 border">60–80W</td></tr>
          <tr><td className="p-2 border">Laptop</td><td className="p-2 border">50–100W</td></tr>
          <tr><td className="p-2 border">TV</td><td className="p-2 border">80–150W</td></tr>
        </tbody>
      </table>
    </div>

    <p className="mt-2">
      Higher load directly reduces backup time. Even small increases in watt usage can significantly impact battery duration.
    </p>
  </section>

  {/* IMPROVE */}
  <section>
    <h3 className="text-xl font-semibold text-white">
      How to Increase Inverter Battery Backup Time
    </h3>

    <p className="mt-2">
      If your battery backup is lower than expected, these proven methods can help:
    </p>

    <ul className="list-disc ml-6 mt-3 space-y-1">
      <li>Reduce unnecessary electrical load during power cuts</li>
      <li>Upgrade to higher capacity batteries like 200Ah or above</li>
      <li>Use energy-efficient appliances (LED lights, inverter fans)</li>
      <li>Switch to a 24V inverter system for better efficiency</li>
    </ul>
  </section>

  {/* WHY LOW */}
  <section>
    <h3 className="text-xl font-semibold text-white">
      Why Your Battery Backup Time is Lower Than Expected
    </h3>

    <p className="mt-2">
      Many users notice their actual backup time is less than calculated. This happens due to:
    </p>

    <ul className="list-disc ml-6 mt-3 space-y-1">
      <li>Battery aging (capacity decreases over time)</li>
      <li>Overloading beyond inverter capacity</li>
      <li>Energy losses due to heat and wiring inefficiencies</li>
      <li>Low-quality inverter systems</li>
    </ul>

    <p className="mt-2">
      A battery that is 2–3 years old can lose up to 30% of its original capacity.
    </p>
  </section>

  {/* BATTERY TYPE */}
  <section>
    <h3 className="text-xl font-semibold text-white">
      Best Inverter Battery for Long Backup
    </h3>

    <p className="mt-2">
      Tubular batteries are considered the best choice for home inverter systems due to their durability and long backup performance.
    </p>

    <p className="mt-2">
      While higher Ah batteries provide longer backup, proper maintenance and controlled usage play an equally important role.
    </p>
  </section>

  {/* FAQ */}
  <section>
    <h3 className="text-xl font-semibold text-white">
      Frequently Asked Questions (FAQs)
    </h3>

    <div className="mt-3 space-y-3">
      <p><strong>How long will a 150Ah battery last?</strong><br />It depends on load, but typically 6–8 hours under moderate usage.</p>
      <p><strong>Does inverter efficiency affect backup time?</strong><br />Yes, ignoring efficiency leads to incorrect estimates.</p>
      <p><strong>Can I run a fridge on inverter battery?</strong><br />Yes, but it significantly reduces backup time due to high power consumption.</p>
    </div>
  </section>

  {/* INTERNAL LINKS */}
  <section>
    <h3 className="text-xl font-semibold text-white">
      Related Calculators
    </h3>

    <ul className="list-disc ml-6 mt-2">
      <li><a href="/calculators/electricity" className="text-blue-400 underline">Electricity Bill Calculator</a></li>
      <li><a href="/calculators/lighting" className="text-blue-400 underline">Room Lighting Calculator</a></li>
      <li><a href="/calculators/power" className="text-blue-400 underline">Power Consumption Calculator</a></li>
    </ul>
  </section>

</div>

  </div>
 );
}