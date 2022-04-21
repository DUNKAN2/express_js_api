import { Router } from 'express'
import { MongoClient, ObjectId } from 'mongodb'

const router = Router();

const urlMongoDB = 'mongodb://localhost:27017';
const dbName = 'myExpressApi';
const collectionName = 'users'
var collection;

MongoClient.connect(urlMongoDB, (err, client) => {
    if (err) {
        return console.log (err);
    }
    var db = client.db(dbName);
    collection = db.collection(collectionName)
})

router.get('/', (req, res) => {
    res.send ('root')
})

router.get('/users', (req, res) => {
    collection.find({}).toArray((err, results) => {
        if(err)  {
            console.log(err);
            return res.sendStatus(500)
        }
        res.send (results)
    })
})

router.get('/users/:id', (req, res) => {
    collection.findOne({ _id: ObjectId(req.params.id)}, (err, result) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(result);
    })
})

router.post('/users', (req, res) => {
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
})

router.put('/users/:id', (req,res) => {
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
})
router.delete('/users/:id', (req, res) => {
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
})

export default router