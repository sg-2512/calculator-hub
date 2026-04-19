export default function Home() {
  const calculators = [
    {
      title: "Battery Backup Calculator",
      link: "/calculators/battery-backup",
      desc: "Calculate inverter battery backup time accurately"
    },
    {
      title: "Paint Calculator",
      link: "/calculators/paint",
      desc: "Estimate how much paint is needed for walls"
    },
    {
      title: "Electricity Bill Calculator",
      link: "/calculators/electricity",
      desc: "Calculate your monthly electricity cost"
    },
    {
      title: "Room Lighting Calculator",
      link: "/calculators/lighting",
      desc: "Find ideal lighting requirements for your room"
    }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 px-4 py-12">
        {/* SIDEBAR */}
      <aside className="w-64 hidden md:block border-r pr-4">
        <h2 className="font-semibold mb-4">Calculators</h2>

        <ul className="space-y-2 text-sm">
          {calculators.map((calc, index) => (
            <li key={index}>
              <a
                href={calc.link}
                className="text-gray-700 hover:text-black hover:underline"
              >
                {calc.title}
              </a>
            </li>
          ))}
        </ul>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1">

    
      {/* HERO */}
      <header className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold leading-tight">
          Free Online Home Utility Calculators
        </h1>

        <p className="text-gray-600 mt-4 text-lg">
          Use our simple and accurate calculators to estimate battery backup time,
          electricity bills, paint requirements, and more for your home.
        </p>
      </header>

      {/* GRID */}
      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-12 max-w-6xl mx-auto">

        {calculators.map((calc, index) => (
          <a
            key={index}
            href={calc.link}
            className="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:-translate-y-1 transition"
          >
            <h2 className="text-xl font-semibold">{calc.title}</h2>
            <p className="text-gray-600 mt-2 text-sm">{calc.desc}</p>
          </a>
        ))}

      </main>

      {/* SEO CONTENT */}
      <section className="max-w-4xl mx-auto mt-16 space-y-8 leading-relaxed">

        <h2 className="text-2xl font-bold">
          Smart Online Calculators for Everyday Home Needs
        </h2>

        <p>
          Our platform provides a collection of <strong>free online calculators</strong> designed to solve common
          household problems quickly and accurately. Whether you want to calculate inverter battery backup time,
          estimate your electricity bill, or determine how much paint you need for your home, these tools are built
          to give reliable results.
        </p>

        <p>
          Many people search for terms like <strong>“battery backup calculator”</strong>,
          <strong> “electricity bill calculator”</strong>, or
          <strong> “paint coverage calculator”</strong> but end up using tools that provide inaccurate or oversimplified outputs.
          Our calculators are designed with realistic formulas to ensure practical results you can actually rely on.
        </p>

        <h3 className="text-xl font-semibold">
          Why Use Our Home Calculators?
        </h3>

        <ul className="list-disc ml-6 space-y-2">
          <li>Accurate calculations based on real-world formulas</li>
          <li>Simple and easy-to-use interface</li>
          <li>Completely free with no signup required</li>
          <li>Designed for students, homeowners, and professionals</li>
        </ul>

        <h3 className="text-xl font-semibold">
          Popular Calculators Available
        </h3>

        <p>
          Our most used tools include:
        </p>

        <ul className="list-disc ml-6 space-y-2">
          <li>
            <strong>Battery Backup Calculator:</strong> Estimate how long your inverter battery will last based on load and capacity.
          </li>
          <li>
            <strong>Electricity Bill Calculator:</strong> Calculate monthly power consumption and cost.
          </li>
          <li>
            <strong>Paint Calculator:</strong> Find out how much paint is required for walls and rooms.
          </li>
          <li>
            <strong>Room Lighting Calculator:</strong> Determine the right lighting level for different spaces.
          </li>
        </ul>

        <h3 className="text-xl font-semibold">
          Who Are These Calculators For?
        </h3>

        <p>
          These tools are useful for homeowners planning renovations, students working on projects,
          electricians estimating loads, and anyone looking to make informed decisions about energy usage and home improvement.
        </p>

        <h3 className="text-xl font-semibold">
          How These Calculators Help You
        </h3>

        <p>
          Instead of guessing or using rough estimates, these calculators provide structured outputs based on input values.
          This helps in better planning, cost estimation, and efficient resource usage.
        </p>

      </section>

    </div>

  </div>
  );
}