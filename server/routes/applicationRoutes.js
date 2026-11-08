const express = require("express");

const {
  createApplication,
  getApplications,
  updateApplication,
  deleteApplication,
} = require("../controllers/applicationController");

const router = express.Router();

router.post("/", createApplication);

router.get("/", getApplications);

router.put("/:id", updateApplication);

router.delete("/:id", deleteApplication);

module.exports = router;
