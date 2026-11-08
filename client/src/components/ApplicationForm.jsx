import { useState } from "react";

function ApplicationForm({
  onAddApplication,
  onUpdateApplication,
  editingApplication,
  onCancelEdit,
}) {
  const [company, setCompany] = useState(
    editingApplication ? editingApplication.company : ""
  );

  const [position, setPosition] = useState(
    editingApplication ? editingApplication.position : ""
  );

  const [status, setStatus] = useState(
    editingApplication ? editingApplication.status : "Applied"
  );

  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!company.trim() || !position.trim()) {
      setError("Company and position are required.");
      return;
    }

    const applicationData = {
      company: company.trim(),
      position: position.trim(),
      status,
    };

    try {
      if (editingApplication) {
        await onUpdateApplication({
          ...editingApplication,
          ...applicationData,
        });
      } else {
        await onAddApplication(applicationData);
      }

      setCompany("");
      setPosition("");
      setStatus("Applied");
      setError("");
    } catch (error) {
      console.error("Error submitting application:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  function handleCancel() {
    setCompany("");
    setPosition("");
    setStatus("Applied");
    setError("");

    onCancelEdit();
  }

  return (
    <form className="application-form" onSubmit={handleSubmit}>
      {error && <p className="form-error">{error}</p>}

      <input
        type="text"
        placeholder="Company"
        value={company}
        onChange={(event) => {
          setCompany(event.target.value);
          setError("");
        }}
      />

      <input
        type="text"
        placeholder="Position"
        value={position}
        onChange={(event) => {
          setPosition(event.target.value);
          setError("");
        }}
      />

      <select
        value={status}
        onChange={(event) => setStatus(event.target.value)}
      >
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Rejected">Rejected</option>
        <option value="Offer">Offer</option>
      </select>

      <button type="submit">
        {editingApplication ? "Update Application" : "Add Application"}
      </button>

      {editingApplication && (
        <button type="button" className="cancel-button" onClick={handleCancel}>
          Cancel
        </button>
      )}
    </form>
  );
}

export default ApplicationForm;
