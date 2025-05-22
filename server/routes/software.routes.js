const express = require("express");
const { createSoftwareController, fetchSoftwareController } = require("../controllers/software.controller");
const softwareRouter = express.Router();

softwareRouter.post('/', createSoftwareController)
softwareRouter.get('/', fetchSoftwareController)

module.exports = softwareRouter;