const Application = require("../models/Application");

async function createApplication(req, res) {
  try {
    const { company, position, status } = req.body;

    const application = await Application.create({
      company,
      position,
      status,
    });

    res.status(201).json({
      success: true,
      application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create application",
      
    });
  }
}

async function getApplications(req, res) {
  try {
    const applications = await Application.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch applications",
      
    });
  }
}

async function updateApplication(req, res) {
  try {
    const { id } = req.params;

    const { company, position, status } = req.body;

    const application = await Application.findByIdAndUpdate(
      id,
      {
        company,
        position,
        status,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    res.status(200).json({
      success: true,
      application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update application",
      
    });
  }
}

const deleteApplication = async (req, res) => {
  try {
    const deletedApplication = await Application.findByIdAndDelete(
      req.params.id
    );

    if (!deletedApplication) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    res.json({
      success: true,
      message: "Application deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete application",
    });
  }
};

module.exports = {
  createApplication,
  getApplications,
  updateApplication,
  deleteApplication,
};
