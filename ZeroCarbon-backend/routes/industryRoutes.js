const express = require('express');
const industries = require('../data/industries');

const router = express.Router();

router.post('/add', (req, res) => {
  const { id, name, emissionCap } = req.body;

  if (id === undefined || id === null || id === '') {
    return res.status(400).json({
      success: false,
      message: 'id is required',
    });
  }

  if (!name || typeof name !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'name is required and must be a string',
    });
  }

  if (typeof emissionCap !== 'number' || Number.isNaN(emissionCap)) {
    return res.status(400).json({
      success: false,
      message: 'emissionCap is required and must be a number',
    });
  }

  const existingIndustry = industries.find((industry) => industry.id === id);

  if (existingIndustry) {
    return res.status(409).json({
      success: false,
      message: 'Industry with this id already exists',
    });
  }

  const newIndustry = { id, name, emissionCap };
  industries.push(newIndustry);

  return res.status(201).json({
    success: true,
    message: 'Industry added successfully',
    data: newIndustry,
  });
});

router.get('/', (req, res) => {
  return res.status(200).json({
    success: true,
    count: industries.length,
    data: industries,
  });
});

module.exports = router;
