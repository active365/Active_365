"use client";
import { useEffect, useState } from "react";
import fetchGyms from "../api/GymsAPI";

const DashboardAdmin: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600">Manage users, gyms, and products</p>
        </header>

        {/* Overview Section */}
        <OverviewSection />

        {/* Sections */}
        <GymsSection />
        <ProductsSection />
        <UsersSection />
      </div>
    </div>
  );
};

const OverviewSection: React.FC = () => {
  return (
    <section className="mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Users", count: 350 },
          { title: "Active Products", count: 120 },
          { title: "Active Gyms", count: 15 },
          { title: "Other Data", count: 45 },
        ].map((item, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700">{item.title}</h2>
            <p className="text-3xl font-bold text-gray-900">{item.count}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const GymsSection: React.FC = () => {
  const [gyms, setGyms] = useState<{ id: number; name: string; status: string }[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadGyms = async () => {
      setLoading(true);
      const data = await fetchGyms();
      if (data) {
        setGyms(data);
      } else {
        setError("Failed to load gyms.");
      }
      setLoading(false);
    };
    loadGyms();
  }, []);

  const displayedGyms = showAll ? gyms : gyms.slice(0, 3);
  if (loading) return <p>Loading gyms...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <SectionTable
      title="Gyms"
      data={displayedGyms}
      columns={["ID", "Name", "Status", "Actions"]}
      showAll={showAll}
      toggleShow={() => setShowAll(!showAll)}
      fullDataLength={gyms.length}
    />
  );
};

const ProductsSection: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const products = [
    { id: 1, name: "Product X", status: "Active" },
    { id: 2, name: "Product Y", status: "Inactive" },
    { id: 3, name: "Product Z", status: "Active" },
    { id: 4, name: "Product A", status: "Active" },
  ];
  const displayedProducts = showAll ? products : products.slice(0, 3);

  return (
    <SectionTable
      title="Products"
      data={displayedProducts}
      columns={["ID", "Name", "Status", "Actions"]}
      showAll={showAll}
      toggleShow={() => setShowAll(!showAll)}
      fullDataLength={products.length}
    />
  );
};

const UsersSection: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const users = [
    { id: 1, email: "admin@example.com", role: "Admin" },
    { id: 2, email: "user1@example.com", role: "User" },
    { id: 3, email: "user2@example.com", role: "User" },
    { id: 4, email: "user3@example.com", role: "User" },
  ];
  const displayedUsers = showAll ? users : users.slice(0, 3);

  return (
    <SectionTable
      title="Users"
      data={displayedUsers}
      columns={["ID", "Email", "Role", "Actions"]}
      showAll={showAll}
      toggleShow={() => setShowAll(!showAll)}
      fullDataLength={users.length}
    />
  );
};

interface SectionTableProps {
  title: string;
  data: any[];
  columns: string[];
  showAll: boolean;
  toggleShow: () => void;
  fullDataLength: number;
}

const SectionTable: React.FC<SectionTableProps> = ({
  title,
  data,
  columns,
  showAll,
  toggleShow,
  fullDataLength,
}) => {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">{title}</h2>
      <div className="bg-white shadow-md rounded-lg p-4">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
              {columns.map((col, index) => (
                <th key={index} className="px-4 py-2">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="bg-white border-b text-gray-700">
                {columns.map((col, idx) => {
                  const key = col.toLowerCase();
                  return <td key={idx} className="px-4 py-2">{item[key] ?? "-"}</td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
        {fullDataLength > 3 && (
          <button
            onClick={toggleShow}
            className="mt-4 text-blue-500 hover:underline"
          >
            {showAll ? "Show less" : "View all"}
          </button>
        )}
      </div>
    </section>
  );
};

export default DashboardAdmin;
