const db = require("../models");
const Phone = db.phones;

// Create and Save a new Phone
exports.create = (req, res) => {
 // Validate request
 if (!req.body.brand) {
    res.status(400).send({ message: "Brand can not be empty!" });
    return;
  }

  if (!req.body.model) {
    res.status(400).send({ message: "model can not be empty!" });
    return;
  }

  if (!req.body.storage) {
    res.status(400).send({ message: "storage can not be empty!" });
    return;
  }

  if (!Number.isInteger(req.body.storage)) {
    res.status(400).send({ message: "Storage must be an integer!" });
    return;
  }


  if (!req.body.color) {
    res.status(400).send({ message: "color can not be empty!" });
    return;
  }

  if (!req.body.operating_system) {
    res.status(400).send({ message: "operating_system can not be empty!" });
    return;
  }

  if (!req.body.price) {
    res.status(400).send({ message: "price can not be empty!" });
    return;
  }

  if (!Number.isInteger(req.body.price)) {
    res.status(400).send({ message: "price must be an integer!" });
    return;
  }


  // Create a Phone
  const phone = new Phone({
    brand: req.body.brand,
    model: req.body.model,
    storage: req.body.storage,
    color: req.body.color,
    operating_system: req.body.operating_system,
    price: req.body.price,
    active: true
  });

  // Save Phone in the database
  phone
    .save(phone)
    .then(data => {
      res.send({ message: "Phone was created successfully!", data })

    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Phone."
      });
    }); 
};

// Retrieve all Phones from the database.
exports.findAll = (req, res) => {
  const brand = req.query.brand;
  var condition = brand ? { brand: { $regex: new RegExp(brand), $options: "i" } } : {};

  Phone.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving phones."
      });
    });
};

// Find a single Phone with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Phone.findById(id)
    .then(data => {    
      if (!data)
        res.status(404).send({ message: "Not found Phone with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Phone with id=" + id });
    });
};

// Update a Phone by the id in the request
exports.update = (req, res) => {
  if(Object.keys(req.body).length === 0) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Phone.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Phone with id=${id}. Maybe Phone was not found!`
        });
      } else res.send({ message: "Phone was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Phone with id=" + id
      });
    });
};

// Delete a Phone with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Phone.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Phone with id=${id}. Maybe Phone was not found!`
        });
      } else {
        res.send({
          message: "Phone was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Phone with id=" + id
      });
    });
};
// Delete all Phones from the database.
exports.deleteAll = (req, res) => {
  Phone.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Phones were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Phones."
      });
    });
};

// Find all actve  Phones
exports.findAllActive = (req, res) => {
  Phone.find({ active: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Phones."
      });
    });
};