const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.get('/api', (req,res) => {
    res.send("GOT IT");
})

app.post('/api/posts', verifyToken, (req,res) => {
    jwt.verify(req.token, 'privateKey', (err, authData) => {
        if(err) {
            res.sendStatus(403)
        } else {
            res.json({
                message: "Post Done",
                authData
            })
        }
      });
})

app.post('/api/login', (req,res) => {
    // Mock User
    const user = {
        id: 1,
        username : 'crazy coder',
        email : 'crazycoder@gmail.com'
    }

    jwt.sign({user}, 'privateKey', (err, token) => {
        res.send(token);
      });
})

function verifyToken(req,res,next) {
    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;

        next();
    } else {
        res.sendStatus(403);
    }
}

app.listen(5000, ()=> {
    console.log("server is running at port 5000");
})
