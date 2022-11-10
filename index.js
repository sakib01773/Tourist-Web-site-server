const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000;




//midleWare
app.use(cors())
app.use(express.json())



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.aebmoeb.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        const serviceCollection = client.db("tourist-app").collection("services");
        app.get("/homeservices", async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query).limit(3);
            const services = await cursor.toArray();
            res.send(services);
        })

        app.get("/services", async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        })


        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { service_id : id };
            const service = await serviceCollection.findOne(query);
            res.send(service);

        })


        const reviewCollection = client.db("tourist-app").collection("reviews");
        app.get('/reviews/:id', async (req, res) => {
            const id = req.params.id;
            const query = {service_id: id};
            const cursor = reviewCollection.find(query);
            const result = await cursor.toArray()
            res.send(result)

        })

        app.get('/review', async (req, res) => {
            console.log(req.query)
            let query = {};
            if (req.query.email) {
                query = {
                    email: req.query.email
                }
            }
            const cursor = reviewCollection.find(query);
            const review = await cursor.toArray();
            res.send(review);
        })

        //review post 
        app.post('/review', async (req, res) => {
            // const id = req.params.id
            const review = req.body;
            const result = await reviewCollection.insertOne(review);
            res.send(result);
        })
        // delet api
        app.delete('/review/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await reviewCollection.deleteOne(query);
            res.send(result)
        })
                    
    }
    finally {
                    
    }
}
run().catch(err => console.log(err))
app.get('/', (req, res) => {
    res.send('Hello From Tourist WebSite>>>')
  })

app.listen(port, () => {
    console.log(`Tourist WebSite app listening on port ${port}`)
  })