const express = require('express');
const router = express.Router();
const countriesData = require('../utils/countries');

// সব দেশ ও ভাষার লিস্ট পাওয়ার এপিআই
router.get('/', (req, res) => {
  try {
    res.status(200).json({
      success: true,
      count: countriesData.length,
      data: countriesData
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports = router;