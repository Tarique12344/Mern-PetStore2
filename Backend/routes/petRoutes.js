const express = require('express');
const router = express.Router();
const Pet = require('../models/pets');

// GET all pets
router.get('/', async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new pet
router.post('/', async (req, res) => {
  const pet = new Pet({
    name: req.body.name,
    type: req.body.type,
    breed: req.body.breed,
    age: req.body.age,
    description: req.body.description,
    image: req.body.image,
    likes: req.body.likes
  });

  try {
    const newPet = await pet.save();
    res.status(201).json(newPet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
