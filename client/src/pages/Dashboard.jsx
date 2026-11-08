import { useEffect, useState } from "react";
import { API_BASE_URL } from "../api";
import ApplicationCard from "../components/ApplicationCard";

function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        setFetchError("");

        const response = await fetch(API_BASE_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch applications");
        }

        const data = await response.json();

        if (data.success) {
          setApplications(data.applications);
        } else {
          throw new Error(data.message || "Failed to fetch applications");
        }
      } catch (error) {
        console.error("Error fetching applications:", error);
        setFetchError(
          "Unable to load dashboard data. Please check your connection and try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const stats = [
    {
      title: "Total Applications",
      value: applications.length,
    },
    {
      title: "Applied",
      value: applications.filter(
        (application) => application.status === "Applied"
      ).length,
    },
    {
      title: "Interviews",
      value: applications.filter(
        (application) => application.status === "Interview"
      ).length,
    },
    {
      title: "Offers",
      value: applications.filter(
        (application) => application.status === "Offer"
      ).length,
    },
    {
      title: "Rejected",
      value: applications.filter(
        (application) => application.status === "Rejected"
      ).length,
    },
  ];

  const recentApplications = applications.slice(0, 3);

  return (
    <main className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome to your job tracker.</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat) => (
          <div className="stat-card" key={stat.title}>
            <p>{stat.title}</p>
            <h2>{stat.value}</h2>
          </div>
        ))}
      </div>

      <section className="recent-applications">
        <h2>Recent Applications</h2>

        <div className="applications-list">
          {loading ? (
            <p>Loading applications...</p>
          ) : fetchError ? (
            <p className="error-message">{fetchError}</p>
          ) : recentApplications.length > 0 ? (
            recentApplications.map((application) => (
              <ApplicationCard
                key={application._id}
                application={application}
                onDeleteApplication={() => {}}
                onEditApplication={() => {}}
              />
            ))
          ) : (
            <p>No applications yet.</p>
          )}
        </div>
      </section>
    </main>
  );
}

export default Dashboard;
