const express = require('express');
const router = express.Router();
const v1ApiRautes = require('./v1/index');

 router.use('/v1',v1ApiRautes);

module.exports = router;

