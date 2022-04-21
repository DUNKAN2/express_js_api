var express = require ('express')
var bodyParser = require ('body-parser')
var { MongoClient } = require ('mongodb')

var app = express()
var collection;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const urlMongoDB = 'mongodb://localhost:27017';
const PORT = process.env.PORT ?? 3000

var users = [
    {
        id: 1,
        name: 'test1'
    },
    {
        id: 2,
        name: 'test2'
    },
    {
        id: 3,
        name: 'test3'
    },
]

app.get('/', (req, res) => {
    res.send ('root')
})

app.get('/users', (req, res) => {
    res.send (users)
})

app.get('/users/:id', (req, res) => {
    var user = users.find((user) => {
        return user.id === Number(req.params.id)
    });
    res.send(user)
})

app.post('/users', (req, res) => {
    var user = {
        id: Date.now(),
        name: req.body.name
    };
    users.push(user);
    res.send(user);
})

app.put('/users/:id', (req,res) => {
    var user = users.find((user) => {
        return user.id === Number(req.params.id)
    });
    user.name = req.body.name;
    res.sendStatus(200);
})
app.delete('/users/:id', (req, res) => {
    users = users.filter((user) => {
        return user.id !== Number(req.params.id);
    })
    res.sendStatus(200)
})

MongoClient.connect(urlMongoDB, { useUnifiendTopology: true }, (err, client) => {
    if (err) {
        return console.log (err);
    }
    var db = client.db(dbName);
    collection = db.collection(collectionName)
    app.listen(PORT, () => {
        console.log(`API started on port ${PORT} ...`)
    })
})