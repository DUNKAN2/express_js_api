import { MongoClient, ObjectId } from 'mongodb';

const urlMongoDB = 'mongodb://localhost:27017/';
const dbName = 'myExpressApi';
const collectionName = 'users';
var collection;

MongoClient.connect(urlMongoDB, { useUnifiedTopology: true }, (err, client) => {
    if (err) {
        return console.log(err);
    }
    var db = client.db(dbName);
    collection = db.collection(collectionName);
});

function getRoot(req, res) {
    res.send ('root')
};
function getUsers(req, res){
    collection.find({}).toArray((err, results) => {
        if(err)  {
            console.log(err);
            return res.sendStatus(500)
        }
        res.send (results)
    })
};
function getUserById(req,res) {
    collection.findOne({ _id: ObjectId(req.params.id)}, (err, result) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(result);
    })
};
function postUser (req, res) {
    var user = {
        name: req.body.name
    };
    collection.insertOne(user, (err, result) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(user);
    })
};
function updateUser(req,res) {
    collection.updateOne(
        { _id: ObjectId(req.params.id) },
        {$set: { name: req.body.name }},
        (err, result) => {
            if(err) {
                console.log(err);
                return res.sendStatus(500);
            }
            res.sendStatus(200);
        }
    )
};
function deleteUser(req,res) {
    collection.deleteMany(
        { _id: ObjectId(req.params.id) },
        (err, result) => {
            if(err) {
                console.log(err);
                return res.sendStatus(500);
            }
            res.sendStatus(200);
        }
    )
};

export {getRoot, getUsers, getUserById, postUser, updateUser, deleteUser};