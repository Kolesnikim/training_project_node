const fs = require('fs');
const path = require('path');
const Tour = require('../models/tourModel');

/** const tours = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, '../', 'dev-data', 'data', 'tours-simple.json'),
    'utf-8'
  )
); */


exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success'
    /** results: tours.length,
     data: {
       tours
     } */
  });
};

exports.getTour = (req, res) => {
  console.log(req.params);

  const id = req.params.id * 1;
  // const tour = tours.find(el => el.id === id);

  res.status(200).json({
    status: 'success'
    /** data: {
       tour
     } */
  });
};

exports.createTour = async (req, res) => {
  const newTour = await Tour.create(req.body)
  res.status(201).json({
    status: 'success',
    data: { tour: newTour }
  });
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: 'Updated tour here!'
    }
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null
  });
};