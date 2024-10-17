const express = require('express');
const router = express.Router();
const Scholar = require('../models/Scholar');

router.get('/', async (req, res) => {
  try {
    const scholars = await Scholar.find();
    res.json(scholars);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/', async (req, res) => {
  const newScholar = new Scholar(req.body);
  try {
    const savedScholar = await newScholar.save();
    res.status(201).json(savedScholar);
  } catch (error) {
    res.status(400).json({ message: 'Invalid Scholar Data' });
  }
});

router.put('/:orcid', async (req, res) => {
  const { orcid } = req.params;
  const updates = req.body;
  const options = { new: true };
  
  try {
    const updatedScholar = await Scholar.findOneAndUpdate({ orcid }, updates, options);

    if (!updatedScholar) {
      return res.status(404).json({ message: 'Scholar Not Found' });
    }

    res.json(updatedScholar);
  } catch (error) {
    res.status(400).json({ message: 'Invalid Update Data', error: error.message });
  }
});

router.delete('/:orcid', async (req, res) => {
  const { orcid } = req.params;

  try {
    const scholar = await Scholar.findOneAndDelete({ orcid });

    if (!scholar) {
      return res.status(404).json({ message: 'Scholar not found' });
    }

    res.status(200).json({ message: 'Scholar deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting scholar' });
  }
});


module.exports = router;