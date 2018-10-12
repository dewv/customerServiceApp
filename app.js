"use strict";

const router = require("express").Router();
const CustomerIssue = require("./services/customerIssue/CustomerIssue");

router.use(CustomerIssue.controller.baseUrl, CustomerIssue.controller.router);

let app = require("./mmvece/mmvece")(router);

module.exports = app;
