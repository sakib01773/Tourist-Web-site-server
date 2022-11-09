const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000;




//midleWare
app.use(cors())
app.use(express.json())



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.aebmoeb.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// async function run() {
//     try {
//         const userCollection = client.db("tourist-app").collection("services")

//         app.get("/services", async (req, res) => {
//             const quary = {}
//             const cursor = userCollection.find(quary);
//             const services = await cursor.toArray();
//             res.send(services);
//         })
        
//     }
//     finally {
        
//     }
// }
// run().catch(err => console.log(err))


async function run() {
    try {
        const serviceCollection = client.db("tourist-app").collection("services");
        app.get("/homeservices", async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query).limit(3);
            const services = await cursor.toArray();
            res.send(services);
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