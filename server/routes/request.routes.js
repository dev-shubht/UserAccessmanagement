const express = require('express');
const requestRouter = express.Router();
const { createRequest, updateRequestStatus } = require('../controllers/request.controller');

requestRouter.post('/', createRequest);
requestRouter.patch('/:id', updateRequestStatus);


module.exports = requestRouter;
