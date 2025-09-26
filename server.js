// const express = require("express") not the latest way of writing. uses commom.js
import express from "express";  // this will run in module.js. Works asynchronously.
import 'dotenv/config';   // to excess env variables
import cors from 'cors';

const app = express();

// Handling cors error --> whitelisting the host webpage along with port number.
app.use(cors({
//   origin: 'http://localhost:5173', // ✅ Replace with your actual frontend URL  
  origin: 'https://frontend-nine-ebon-34.vercel.app', // ✅ Replace with your actual vercel frontend URL  

  methods: ['GET', 'POST'], // Add others as needed
  credentials: true // If you're using cookies or auth headers
}));

// setting up proxy for dynamic localhost domain name in vite.config.js
// And now it makes server to believe that vite app is also running on same server and request for api calls coming from 3000 (Just like home entry). Means we don't have to handle cors error for the same localhost port number.
// Or we can handle cors error from backend. Making the vite app localhost whitelist.


// app.use(); middleware
// app.use(express.static('dist')) // It's kind a bad practice as dist folder needs to replace manually in backend everytime when we make changes in frontend

//basic server with get request
app.get('/', (req, res) => {
    res.send('server is ready to host jokes. To see jokes change url to /api/jokes');
});

app.get('/api/jokes', (req, res) => {
    const jokes = [
        {
            id: 1,
            title: "A Joke",
            content: "This is a Joke"
        },
        {
            id: 2,
            title: "Another Joke",
            content: "This is another Joke"
        },
        {
            id: 3,
            title: "A Third Joke",
            content: "This is a third Joke"
        },
    ]
    res.send(jokes);
})

// In production we need port from env
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`);
});

/*
Bad practice: bundling the whole react code in dist folder and copy pasting it in backend. 
Why bad practice? If you change the Frontend, there is a need to bundle the code everytime & then replace the old dist folder(bundle code folder).
For using import & require as per your choice, addup the type attribute in there either module or commonjs as per ref. respectively.
*/