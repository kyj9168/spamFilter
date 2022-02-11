const approot = require('app-root-path');
const express = require('express');
const router = express.Router();
const apiController = require(approot + '/routes/controller/api.controller');

router.all('/spamCheck', apiController.spamCheck);

router.get('/*', function (req, res) {
    res.redirect('/spamCheck');
});

module.exports = router;
