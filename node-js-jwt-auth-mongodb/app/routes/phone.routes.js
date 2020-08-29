const { authJwt } = require("../middlewares");
const phones = require("../controllers/phone.controller.js");


module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  
    // Create a new phone
    app.post("/api/phones", [authJwt.verifyToken, authJwt.isModerator], phones.create);
  
    // Retrieve all phones
    app.get("/api/phones",[authJwt.verifyToken], phones.findAll);
  
    // Retrieve all active phones
    app.get("/api/phones/active", phones.findAllActive);
  
    // Retrieve a single phone with id
    app.get("/api/phones/:id",[authJwt.verifyToken], phones.findOne);
  
    // Update a phone with id
    app.put("/api/phones/:id",[authJwt.verifyToken, authJwt.isModerator], phones.update);
  
    // Delete a phone with id
    app.delete("/api/phones/:id",[authJwt.verifyToken, authJwt.isModerator], phones.delete);
  
    // Create a new phone
    app.delete("/api/phones/",[authJwt.verifyToken, authJwt.isAdmin], phones.deleteAll);
  
};
