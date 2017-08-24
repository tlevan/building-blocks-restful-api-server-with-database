const bodyParser = require("body-parser");
const dotenv     = require("dotenv");
const express    = require("express");
const mongodb    = require("mongodb");
const path       = require("path");

dotenv.config();

const apiPort      = process.env.PORT        || 65535;
const apiRoot      = process.env.API_ROOT    || "/api";
const dbUri        = process.env.MONGODB_URI || "mongodb://localhost";
const dbCollection = process.env.COLLECTION  || "buildingblocks";

const logPrefix    = "request  |  "

const app = express();
app.use(bodyParser.json());

var db;

mongodb.MongoClient.connect(dbUri, function (error, database) {

    if (error) {
        console.log(error);
        process.exit(1);
    }

    db = database;
    console.log("connected to database");

    var server = app.listen(apiPort, function () {
        console.log("server listening on port " + server.address().port);
    });

});

const httpStatusCodeOK                  = 200;
const httpStatusCodeCreated             = 201;
const httpStatusCodeInternalServerError = 500;

//  CRUD:  Create
app.post(apiRoot, function(req, res) {
    var createValues = req.body;

    db.collection(dbCollection).insertOne(createValues, function(err, doc) {
        if (err) {
            handleError(res, err.message, "error during create");
        } else {
            console.log(logPrefix + "CREATE      |  POST   " + apiRoot);
            res.status(httpStatusCodeCreated).json(doc.ops[0]);
        }
    });
});

//  CRUD:  Read (all)
app.get(apiRoot + "/all", function(req, res) {
    db.collection(dbCollection).find({}).toArray(function(err, docs) {
        if (err) {
            handleError(res, err.message, "error during read (all)");
        } else {
            console.log(logPrefix + "READ (all)  |  GET    " + apiRoot + "/all");
            res.status(httpStatusCodeOK).json(docs);
        }
    });
});

//  CRUD:  Read (one)
app.get(apiRoot + "/:id", function(req, res) {
    db.collection(dbCollection).findOne({_id: mongodb.ObjectID(req.params.id)}, function(err, doc) {
        if (err) {
            handleError(res, err.message, "error during read (one)");
        } else {
            console.log(logPrefix + "READ (one)  |  GET    " + apiRoot + "/" + req.params.id);
            res.status(httpStatusCodeOK).json(doc);
        }
    });
});

//  CRUD:  Update
app.put(apiRoot + "/:id", function(req, res) {
    var updateValues = req.body;
    delete updateValues._id;

    db.collection(dbCollection).updateOne({_id: mongodb.ObjectID(req.params.id)}, updateValues, function(err, doc) {
        if (err) {
            handleError(res, err.message, "error during update");
        } else {
            console.log(logPrefix + "UPDATE      |  PUT    " + apiRoot + "/" + req.params.id);
            updateValues._id = req.params.id;
            res.status(httpStatusCodeOK).json(updateValues);
        }
    });
});

//  CRUD:  Delete
app.delete(apiRoot + "/:id", function(req, res) {
    db.collection(dbCollection).deleteOne({_id: mongodb.ObjectID(req.params.id)}, function(err, result) {
        if (err) {
            handleError(res, err.message, "error during delete");
        } else {
            console.log(logPrefix + "DELETE      |  DELETE " + apiRoot + "/" + req.params.id);
            res.status(httpStatusCodeOK).json(result);
        }
    });
});

function handleError(res, reason, message, code) {
    console.log("error  |  " + reason);
    res.status(code || httpStatusCodeInternalServerError).json({"error": message});
}

