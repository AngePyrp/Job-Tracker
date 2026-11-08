function ApplicationCard({
  application,
  onDeleteApplication,
  onEditApplication,
}) {
  return (
    <div className="application-card">
      <div className="application-info">
        <h3>{application.company}</h3>
        <p>{application.position}</p>
      </div>

      <div className="application-actions">
        <span className={`status status-${application.status.toLowerCase()}`}>
          {application.status}
        </span>

        <div className="card-buttons">
          <button
            className="edit-button"
            onClick={() => onEditApplication(application)}
          >
            Edit
          </button>

          <button
            className="delete-button"
            onClick={() => onDeleteApplication(application._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ApplicationCard;
