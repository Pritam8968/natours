const fs = require('fs');
const path = require('path');

let tours = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../dev-data/data/tours-simple.json'))
);

const searchTour = id => tours.find(t => t.id === id * 1);

const checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price)
    return res
      .status(400)
      .json({ status: 'fail', message: 'Missing name or price' });
  next();
};

// Route Handlers
const getAllTours = (req, res) => {
  res
    .status(200)
    .json({ status: 'success', result: tours.length, data: { tours } });
};

const getTour = (req, res) => {
  const foundTour = searchTour(req.params.id * 1); // *1 to make it an integer
  if (!foundTour)
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  res.status(200).json({ status: 'success', data: { tour: foundTour } });
};

const createTour = (req, res) => {
  const newId = tours.length > 0 ? tours[tours.length - 1].id + 1 : 1;
  const newTour = { id: newId, ...req.body };

  tours.push(newTour);

  fs.writeFile(
    path.join(__dirname, '../dev-data/data/tours-simple.json'),
    JSON.stringify(tours),
    err => {
      if (err) {
        return res
          .status(500)
          .json({ status: 'error', message: 'Failed to save data' });
      }
      res.status(201).json({ status: 'success', data: { newTour } });
    }
  );
};

const updateTour = (req, res) => {
  const foundTour = searchTour(req.params.id * 1);
  if (!foundTour)
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });

  const updatedTour = { ...foundTour, ...req.body };
  const id = req.params.id * 1;
  tours = tours.map(t => (t.id === id ? updatedTour : t));

  fs.writeFile(
    path.join(__dirname, '../dev-data/data/tours-simple.json'),
    JSON.stringify(tours),
    err => {
      if (err) {
        return res
          .status(500)
          .json({ status: 'error', message: 'Failed to update data' });
      }
      res.status(200).json({ status: 'success', data: { updatedTour } });
    }
  );
};

const deleteTour = (req, res) => {
  const foundTour = searchTour(req.params.id * 1);
  if (!foundTour)
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  const id = req.params.id * 1;
  tours = tours.filter(t => t.id !== id);

  fs.writeFile(
    path.join(__dirname, '../dev-data/data/tours-simple.json'),
    JSON.stringify(tours),
    err => {
      if (err) {
        return res
          .status(500)
          .json({ status: 'error', message: 'Failed to delete data' });
      }
      res.status(204).json({ status: 'success', data: null });
    }
  );
};

module.exports = {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  checkBody,
};
