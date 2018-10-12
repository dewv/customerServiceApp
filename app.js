"use strict";

const router = require("express").Router();

let app = require("./mmvece/mmvece")(router);

module.exports = app;
