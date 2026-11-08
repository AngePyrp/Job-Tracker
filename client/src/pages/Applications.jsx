import { useEffect, useState } from "react";
import { API_BASE_URL } from "../api";
import ApplicationCard from "../components/ApplicationCard";
import ApplicationForm from "../components/ApplicationForm";

function Applications() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [editingApplication, setEditingApplication] = useState(null);
  const [applications, setApplications] = useState([]);

  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [actionError, setActionError] = useState("");

  function showSuccessMessage(message) {
    setSuccessMessage(message);

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  }

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
          "Unable to load applications. Please check your connection and try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  async function handleAddApplication(newApplication) {
    try {
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newApplication),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to add application");
      }

      if (data.success) {
        setApplications((currentApplications) => [
          ...currentApplications,
          data.application,
        ]);

        showSuccessMessage("Application added successfully!");
      }
    } catch (error) {
      console.error("Error adding application:", error);
      throw error;
    }
  }

  const handleDeleteApplication = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this application?"
    );

    if (!confirmed) return;

    setActionError("");

    try {
      const response = await fetch(
        `${API_BASE_URL}/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete application");
      }

      setApplications((currentApplications) =>
        currentApplications.filter((application) => application._id !== id)
      );

      showSuccessMessage("Application deleted successfully!");
    } catch (error) {
      console.error("Error deleting application:", error);
      setActionError("Unable to delete application. Please try again.");
    }
  };

  function handleEditApplication(application) {
    setEditingApplication(application);
  }

  async function handleUpdateApplication(updatedApplication) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/${updatedApplication._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedApplication),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to update application");
      }

      if (data.success) {
        setApplications((currentApplications) =>
          currentApplications.map((application) =>
            application._id === updatedApplication._id
              ? data.application
              : application
          )
        );

        setEditingApplication(null);
        showSuccessMessage("Application updated successfully!");
      }
    } catch (error) {
      console.error("Error updating application:", error);
      throw error;
    }
  }

  function handleCancelEdit() {
    setEditingApplication(null);
  }

  const filteredApplications = applications.filter((application) => {
    const matchesSearch =
      application.company.toLowerCase().includes(search.toLowerCase()) ||
      application.position.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || application.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <main className="applications-page">
      <div className="applications-header">
        <h1>Applications</h1>
        <p>Manage and track all your job applications.</p>
      </div>

      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      {actionError && (
        <div className="state-message error-state" role="alert">
          <p>{actionError}</p>
        </div>
      )}

      <ApplicationForm
        key={editingApplication ? editingApplication._id : "new"}
        onAddApplication={handleAddApplication}
        onUpdateApplication={handleUpdateApplication}
        editingApplication={editingApplication}
        onCancelEdit={handleCancelEdit}
      />

      <div className="filters">
        <input
          type="text"
          placeholder="Search company or position..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
        >
          <option value="All">All</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Rejected">Rejected</option>
          <option value="Offer">Offer</option>
        </select>
      </div>

      <div className="applications-list">
        {loading ? (
          <div className="state-message">
            <p>Loading applications...</p>
          </div>
        ) : fetchError ? (
          <div className="state-message error-state">
            <p>{fetchError}</p>
          </div>
        ) : filteredApplications.length > 0 ? (
          filteredApplications.map((application) => (
            <ApplicationCard
              key={application._id}
              application={application}
              onDeleteApplication={handleDeleteApplication}
              onEditApplication={handleEditApplication}
            />
          ))
        ) : (
          <div className="state-message">
            <p>No applications found.</p>
            <span>Try changing your search or filter.</span>
          </div>
        )}
      </div>
    </main>
  );
}

export default Applications;
