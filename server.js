// const express = require("express") not the latest way of writing. uses commom.js
import express from "express";  // this will run in module.js. Works asynchronously.
import 'dotenv/config';   // to excess env variables
import cors from 'cors';

const app = express();

const githubuser = {  // This needs to be handle using a database but for now taking this obj in variable.
    "login": "Prashant5ingh",
    "id": 59197276,
    "node_id": "MDQ6VXNlcjU5MTk3Mjc2",
    "avatar_url": "https://avatars.githubusercontent.com/u/59197276?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/Prashant5ingh",
    "html_url": "https://github.com/Prashant5ingh",
    "followers_url": "https://api.github.com/users/Prashant5ingh/followers",
    "following_url": "https://api.github.com/users/Prashant5ingh/following{/other_user}",
    "gists_url": "https://api.github.com/users/Prashant5ingh/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/Prashant5ingh/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/Prashant5ingh/subscriptions",
    "organizations_url": "https://api.github.com/users/Prashant5ingh/orgs",
    "repos_url": "https://api.github.com/users/Prashant5ingh/repos",
    "events_url": "https://api.github.com/users/Prashant5ingh/events{/privacy}",
    "received_events_url": "https://api.github.com/users/Prashant5ingh/received_events",
    "type": "User",
    "user_view_type": "public",
    "site_admin": false,
    "name": "Prashant Singh",
    "company": null,
    "blog": "",
    "location": "Chennai",
    "email": null,
    "hireable": true,
    "bio": null,
    "twitter_username": null,
    "public_repos": 23,
    "public_gists": 0,
    "followers": 0,
    "following": 4,
    "created_at": "2019-12-24T09:36:56Z",
    "updated_at": "2025-09-20T17:04:24Z"
}

// Handling cors error --> whitelisting the host webpage along with port number.
app.use(cors({
    //   origin: 'http://localhost:5173', // ✅ Replace with your actual frontend URL  
    origin: 'https://frontend-nine-ebon-34.vercel.app', // ✅ Replace with your actual vercel frontend URL  

    methods: ['GET', 'POST'], // Add others as needed
    credentials: true // If you're using cookies or auth headers
})); // In Local development all this cors process can be avoided by using proxy object of vite.config.js.

// setting up proxy for dynamic localhost domain name in vite.config.js
// And now it makes server to believe that vite app is also running on same server and request for api calls coming from 3000 (Just like home entry). Means we don't have to handle cors error for the same localhost port number.
// Or we can handle cors error from backend. Making the vite app localhost whitelist.


// app.use(); middleware
// app.use(express.static('dist')) // It's kind a bad practice as dist folder needs to replace manually in backend everytime when we make changes in frontend

//basic server with get request
app.get('/', (req, res) => {
    res.send('server is ready to host jokes and github user details. To see jokes change url to /api/jokes and github user goto /api/github');
});

app.get('/api', (req, res) => {
    res.send('<h1>Still searching for joke !!! Go to /api/jokes</h1> <h2>Still searching for Github user !!! Go to /api/github</h2>'); // we can send a html code as well here.
});

app.get('/api/github', (req, res) => {
    res.json(githubuser);  // sending a json as obj data
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