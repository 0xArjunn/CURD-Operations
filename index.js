const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const methodOverride = require('method-override'); // for overriding

// uuid => universally unique identifier
const { v4: uuidv4 } = require("uuid"); // for import uuid, it create a unique id

app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: "true"}));

app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

app.get("/",(req,res)=>{
    res.send("<h2>Hello this is Quora first page</h2>");
})

app.listen(port,()=>{
    console.log(`Request Accepted, port : ${port}`);
});

    // create a Array to replace data-base
let posts = [
    {
        id: uuidv4(),
        username: "arjun",
        content: "Hi this is Arjun"
    },
    {
        id: uuidv4(),
        username: "lavish",
        content: "Hi this is Lavish"
    },
    {
        id: uuidv4(),
        username: "sachin",
        content: "Hi this is Sachin"
    }
];

    // Implement : GET /posts

app.get("/posts",(req,res)=>{
    res.render("posts.ejs",{ posts });
})

// create a new page - serve a form

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})

// get data and use it

app.post("/posts",(req,res)=>{
    let { username,content } = req.body;
    let id = uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
})

// get req to see any post in details

app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    console.log(id);
    res.render("show.ejs",{post});
})

// patch request for edit any post

app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p)=> id === p.id);
    post.content = newContent;
    res.redirect("/posts");

})

app.get("/posts/:id/edit",(req,res)=>{
    let { id } = req.params; // req.params is an object, not a string so we have to add it in object
    let post = posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post});
})

// Destroy Route

app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p)=>id !== p.id); // filter method is used to filter the data as per condition and store it in array or anywhere as we need
    console.log(posts);
    res.redirect("/posts");
})
