const fs = require('fs');
const path = require('path');
const Tour = require('../models/tourModel');

/** const tours = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, '../', 'dev-data', 'data', 'tours-simple.json'),
    'utf-8'
  )
); */

exports.getAllTours = async (req, res) => {
  try {
    let copyQuery = { ...req.query };

    const excludedParams = ['page', 'sort', 'limit', 'fields'];
    excludedParams.forEach(el => delete copyQuery[el]);

    copyQuery = JSON
      .stringify(copyQuery)
      .replace(/\b(gte)|(gt)|(lte)|(lt)\b/g, match => `$${match}`);

    const query = Tour.find(JSON.parse(copyQuery));

    const tours = await query;

    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours
      }
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: { tour: newTour }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error
    });
  }
};
