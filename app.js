const express = require('express');
const app = express();
const cors = require('cors');
const { RTDatabase, set, get, update, remove, ref, child, query, orderByChild, equalTo } = require('./config');
const admin = require('firebase-admin')
const serviceAccount = require('./serviceKeyFile.json');

app.use(express.json());
app.use(cors());

// Get user key based on email ID
app.get("/getUserKeyByEmail", async (req, res) => {
  try {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        apiKey: "AIzaSyDh99l2ncE5NTuGUckskfkK-9s-WpmGzq0",
        authDomain: "rv-robin.firebaseapp.com",
        databaseURL:
          "https://rv-robin-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "rv-robin",
        storageBucket: "rv-robin.appspot.com",
        messagingSenderId: "911030592361",
        appId: "1:911030592361:web:fc66e57966ae12792713f8",
        measurementId: "G-J3PK5ED135",
      });
    }

    var db = admin.database();
    db.ref("User").orderByChild("email").equalTo(req.body.email).once("child_added").then((ele) => {
        res.send(ele);
    });
  } catch (err) {
    console.error("Error fetching user key: ", err);
    res.status(500).send({ status: "error", message: err.message });
  }
});

// post data by user key to RTDB
app.post('/postDataToRTDB', async (req, res) => {
  try{
    if(!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        apiKey: "AIzaSyDh99l2ncE5NTuGUckskfkK-9s-WpmGzq0",
        authDomain: "rv-robin.firebaseapp.com",
        databaseURL:
          "https://rv-robin-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "rv-robin",
        storageBucket: "rv-robin.appspot.com",
        messagingSenderId: "911030592361",
        appId: "1:911030592361:web:fc66e57966ae12792713f8",
        measurementId: "G-J3PK5ED135",
      })
    }

    var db = admin.database();
    await db.ref('UserDetails').push({
      "name" : req.body.name,
      "email" : req.body.email,
      "address" : req.body.address
    }).then(ele => {
      res.send("POST Success")
    })    
  } catch {
    res.status(400).send("Unble to complete post request");
  }
})

// update data to specific user to RTDB
app.put('/updateOneRowRTDB', (req, res) => {
  try {
    if(!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        apiKey: "AIzaSyDh99l2ncE5NTuGUckskfkK-9s-WpmGzq0",
        authDomain: "rv-robin.firebaseapp.com",
        databaseURL:
          "https://rv-robin-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "rv-robin",
        storageBucket: "rv-robin.appspot.com",
        messagingSenderId: "911030592361",
        appId: "1:911030592361:web:fc66e57966ae12792713f8",
        measurementId: "G-J3PK5ED135",
      })
    }
    
    var db = admin.database();
    var userKey;
    db.ref('User').orderByChild('email').equalTo(req.body.email).once('child_added').then(ele => {
      userKey = ele.key;
    }).then(ele2 => {
      db.ref('User/'+`${userKey}`).update({
        "name" : req.body.name
      }).then(ele3 => {
        res.send("Update Success")
      })
    })
  } catch {
    res.status(400).send("unable process the request");
  }
})

// delete data by specific suer key on RTDB
app.delete('/deleteOneUserFromRTDB', (req, res) => {
  try {
    if(!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        apiKey: "AIzaSyDh99l2ncE5NTuGUckskfkK-9s-WpmGzq0",
        authDomain: "rv-robin.firebaseapp.com",
        databaseURL:
          "https://rv-robin-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "rv-robin",
        storageBucket: "rv-robin.appspot.com",
        messagingSenderId: "911030592361",
        appId: "1:911030592361:web:fc66e57966ae12792713f8",
        measurementId: "G-J3PK5ED135",
      })
    }

    var db = admin.database();
    var userKey;
    db.ref('User').orderByChild('email').equalTo(req.body.email).once('child_added').then(ele => {
      userKey = ele.key;
    }).then(ele2 => {
      db.ref('User/'+`${userKey}`).remove()
      res.send("User Delete success");
    })
  } catch {
    res.status(400).send("Unable to delete user");
  }
})

// server listening port
app.listen(4000, () => {
    console.log("Server is running on 4000 PORT");
})