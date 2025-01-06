import React from "react";

const MyClasses: React.FC = () => {
  // Datos simulados
  const classes = [
    {
      id: "1",
      name: "Yoga Basics",
      gym: "Downtown Gym",
      date: "2025-01-15",
      time: "10:00 AM",
      capacity: 20,
    },
    {
      id: "2",
      name: "HIIT Training",
      gym: "Fitness Pro",
      date: "2025-01-18",
      time: "6:30 PM",
      capacity: 15,
    },
    {
      id: "3",
      name: "Pilates Advanced",
      gym: "Wellness Studio",
      date: "2025-01-20",
      time: "8:00 AM",
      capacity: 10,
    },
  ];

  return (
    <div className="p-6 bg-gray-50">
      <h2 className="text-2xl font-bold mb-6 text-center">My Classes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((cls) => (
          <div
            key={cls.id}
            className="bg-white shadow-md border border-gray-200 rounded-lg p-4 hover:scale-105 transition-transform"
          >
            <h3 className="text-lg font-semibold mb-2">{cls.name}</h3>
            <p className="text-sm">
              <span className="font-bold">Gym:</span> {cls.gym}
            </p>
            <p className="text-sm">
              <span className="font-bold">Date:</span>{" "}
              {new Date(cls.date).toLocaleDateString()}
            </p>
            <p className="text-sm">
              <span className="font-bold">Time:</span> {cls.time}
            </p>
            <p className="text-sm">
              <span className="font-bold">Capacity:</span> {cls.capacity}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyClasses;
