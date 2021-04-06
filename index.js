
const express = require("express");
const fetch = require("node-fetch");
const bodyparser = require("body-parser");
const cors = require("cors");
 
const app = express();
app.use(bodyparser.json());
app.use(cors());

app.get("/getuserdata", (async (req, res, next) => {
    
    const {
        results, 
        page,
        seed,
        exc
    } = req.query;

    let userData = null;
    await fetch(
        `https://randomuser.me/api/?results=${results}&page=${page}&seed=${seed}&exc=${exc}`,
        {
            method:"GET",
            headers: {
                "Content-Type":"application/json"
            }
        }
    )
    .then(res => res.json())
    .then(data => {
        userData = data;
    })
    .catch(err => {
        return res.status(400).json(err);
    })

    return res.send(userData);

}));



app.listen(process.env.PORT || 3001, console.log(`Port is running on ${process.env.PORT} or 3001`));