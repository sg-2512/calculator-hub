"use client";

import { useState } from "react";

export default function PaintCalculator() {
  const [length, setLength] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [coats, setCoats] = useState(2);
  const [coverage, setCoverage] = useState(120); // sq ft per litre

  const [doors, setDoors] = useState(0);
  const [windows, setWindows] = useState(0);

  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    if (length > 0 && width > 0 && height > 0) {
      const wallArea = 2 * (length + width) * height;
      const ceilingArea = length * width;

      const doorArea = doors * 20; // avg door area
      const windowArea = windows * 15; // avg window area

      const totalArea = wallArea + ceilingArea - doorArea - windowArea;

      const litres = (totalArea * coats) / coverage;

      setResult(litres);
    }
  };

  return (
    <div className="min-h-screen px-4 py-10 bg-gray-100">
      <div className="max-w-5xl mx-auto px-4 bg-white p-6 rounded-xl shadow-md border border-gray-200">

        <h1 className="text-2xl font-bold text-gray-900 text-center">
          Paint Calculator
        </h1>

        <p className="text-gray-700 text-center mt-2">
          Calculate how much paint you need for your room
        </p>

        <div className="mt-6 space-y-4">

          <input type="number" placeholder="Room Length (ft)"
            className="w-full border border-gray-300 p-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
            onChange={(e) => setLength(Number(e.target.value))}
          />

          <input type="number" placeholder="Room Width (ft)"
            className="w-full border border-gray-300 p-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
            onChange={(e) => setWidth(Number(e.target.value))}
          />

          <input type="number" placeholder="Room Height (ft)"
            className="w-full border border-gray-300 p-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
            onChange={(e) => setHeight(Number(e.target.value))}
          />

          <input type="number" placeholder="Number of Coats"
            className="w-full border border-gray-300 p-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
            defaultValue={2}
            onChange={(e) => setCoats(Number(e.target.value))}
          />

          <input type="number" placeholder="Coverage (sq ft per litre)"
            className="w-full border border-gray-300 p-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
            defaultValue={120}
            onChange={(e) => setCoverage(Number(e.target.value))}
          />

          <input type="number" placeholder="Number of Doors"
            className="w-full border border-gray-300 p-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
            onChange={(e) => setDoors(Number(e.target.value))}
          />

          <input type="number" placeholder="Number of Windows"
            className="w-full border border-gray-300 p-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
            onChange={(e) => setWindows(Number(e.target.value))}
          />

          <button
            onClick={calculate}
            className="w-full bg-gray-900 text-white hover:bg-black py-3 rounded"
          >
            Calculate Paint
          </button>

          {result !== null && (
            <div className="bg-gray-200 text-gray-900 p-4 rounded text-center">
              <p className="text-lg font-semibold">
                Paint Required: {result.toFixed(2)} litres
              </p>
            </div>
          )}
            <div className="max-w-5xl mx-auto px-6 mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-800 leading-relaxed">

  {/* LEFT COLUMN */}
  <div className="space-y-8">

    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h2 className="text-2xl font-bold">
        Paint Calculator – Estimate How Much Paint You Need
      </h2>

      <p className="mt-3">
        This <strong>paint calculator</strong> helps you accurately estimate the amount of paint required for your room.
        Whether you're painting walls, ceilings, or a complete home interior, this tool uses room dimensions,
        number of coats, and paint coverage to give realistic results.
      </p>

      <p className="mt-3">
        If you're searching for <strong>“how much paint do I need”</strong>,
        <strong> “wall paint calculator”</strong>, or
        <strong> “paint coverage per litre”</strong>, this tool provides practical and reliable estimates
        instead of rough guesses.
      </p>
    </div>

    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h3 className="text-xl font-semibold">
        🧮 How Paint Calculation Works
      </h3>

      <p className="mt-3">
        The paint requirement is calculated using total wall and ceiling area. Openings like doors and windows are subtracted
        to avoid overestimation.
      </p>

      <div className="bg-gray-100 p-4 rounded-md text-sm font-mono mt-4">
        Paint Required (litres) = (Total Area × Coats) ÷ Coverage
      </div>

      <ul className="list-disc ml-6 mt-4 space-y-2">
        <li><strong>Room Size:</strong> Length, width, and height determine total surface area</li>
        <li><strong>Number of Coats:</strong> More coats increase paint consumption</li>
        <li><strong>Paint Coverage:</strong> Typically 100–140 sq ft per litre</li>
        <li><strong>Openings:</strong> Doors and windows are deducted for accuracy</li>
      </ul>
    </div>

    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h3 className="text-xl font-semibold">
        📊 Example Calculation
      </h3>

      <p className="mt-3">
        For a room of 10×10×10 ft with 2 coats and 120 sq ft/litre coverage:
      </p>

      <p className="mt-2">
        Estimated paint required ≈ <strong>6–8 litres</strong> depending on wall condition and paint quality.
      </p>
    </div>

  </div>

  {/* RIGHT COLUMN */}
  <div className="space-y-8">

    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h3 className="text-xl font-semibold">
        🎯 Tips to Reduce Paint Usage
      </h3>

      <ul className="list-disc ml-6 mt-4 space-y-2">
        <li>Apply primer before painting to improve coverage</li>
        <li>Use high-quality paint for better spread</li>
        <li>Avoid applying unnecessarily thick coats</li>
        <li>Ensure walls are smooth and clean before painting</li>
      </ul>
    </div>

    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h3 className="text-xl font-semibold">
        ❓ Frequently Asked Questions
      </h3>

      <div className="mt-4 space-y-4">

        <div>
          <p className="font-medium">How much area does 1 litre of paint cover?</p>
          <p className="text-gray-600 text-sm">
            Typically between 100–140 sq ft depending on surface type and paint quality.
          </p>
        </div>

        <div>
          <p className="font-medium">How many coats are required?</p>
          <p className="text-gray-600 text-sm">
            Most walls require 2 coats for proper finish and durability.
          </p>
        </div>

        <div>
          <p className="font-medium">Why is my paint usage higher?</p>
          <p className="text-gray-600 text-sm">
            Rough walls, no primer, or low-quality paint increase consumption.
          </p>
        </div>

      </div>
    </div>

  </div>

</div>
</div>
</div>
</div>
        
  );
}