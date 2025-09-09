const express = require("express");
const app = express();
const path = require("path");
const {v4 : uuidv4} = require("uuid");
const methodOverride = require("method-override");

const port = 8080;

app.set("view engine", "ejs");
app.use(express.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

app.set("views", path.join(__dirname, "views"));

let posts = [
  {
    id: uuidv4(),
    username: "travel_junkie",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60",
    likes: 1280,
    comments: 56,
    caption: "Lost in the waves 🌊 #oceanvibes #wanderlust"
  },
  {
    id: uuidv4(),
    username: "foodielife",
    image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=800&q=60",
    likes: 890,
    comments: 42,
    caption: "Good food = good mood 🍔✨"
  },
  {
    id: uuidv4(),
    username: "techie_raj",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=60",
    likes: 2100,
    comments: 78,
    caption: "Coding my way into the future 💻🚀"
  },
  {
    id: uuidv4(),
    username: "city_lens",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=800&q=60",
    likes: 1540,
    comments: 63,
    caption: "New York nights never disappoint 🌃 #citylife"
  },
  {
    id: uuidv4(),
    username: "nature_soul",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=60",
    likes: 1850,
    comments: 92,
    caption: "Breathing fresh air where Wi-Fi is weak 🌲🏞️"
  },
  {
    id: uuidv4(),
    username: "sunset_chaser",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=60",
    likes: 1320,
    comments: 48,
    caption: "Golden hour magic 🌅 #sunsetlover"
  },
  {
    id: uuidv4(),
    username: "food_stagram",
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=60",
    likes: 1450,
    comments: 67,
    caption: "Brunch goals 🥑🍳 #foodie"
  },
  {
    id: uuidv4(),
    username: "mountain_mindset",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=60",
    likes: 870,
    comments: 29,
    caption: "Peak moments 🏔️ #naturelover"
  },
  {
    id: uuidv4(),
    username: "tech_nomad",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=60",
    likes: 1200,
    comments: 54,
    caption: "Remote work vibes 💻🌍"
  },
  {
    id: uuidv4(),
    username: "coffee_diaries",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=60",
    likes: 760,
    comments: 21,
    caption: "Morning essentials ☕ #coffeelover"
  },
  {
    id: uuidv4(),
    username: "minimalist_moments",
    image: "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?crop=entropy&cs=tinysrgb&fit=max&w=800&q=60",
    likes: 860,
    comments: 33,
    caption: "Simplicity speaks volumes 🌿 #minimalist"
  },
  {
    id: uuidv4(),
    username: "cityscape_photographer",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?crop=entropy&cs=tinysrgb&fit=max&w=800&q=60",
    likes: 980,
    comments: 48,
    caption: "City lights and urban vibes 🌃 #nightphotography"
  }
];


app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
});

app.get("/posts", (req,res)=>{
    res.render("index.ejs", {posts});
});

app.get("/posts/new", (req,res)=>{
    res.render("new.ejs");
});

app.post("/posts",(req,res)=>{
    let{username, image, likes, comments, caption} = req.body;
    let id = uuidv4();
    posts.push({id, username, image, likes, comments, caption});
    res.redirect("/posts");
});



// app.patch("/posts/:id", (req, res)=>{
//     let {id} = req.params;
//     let post = posts.find((p) => id === p.id);
//     let newContent = req.body.content;
//     post.content = newContent;
//     res.redirect("/posts");
// });

app.patch("/posts/:id", (req,res)=>{
    let {id} = req.params;
    let newCaption = req.body.caption;
    let post = posts.find((p) => id === p.id);
    post.caption = newCaption;
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res)=>{
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);

    res.render("edit.ejs", {post});
});

app.delete("/posts/:id", (req, res)=>{
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
})

app.get("/posts/:id", (req, res)=>{
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("view.ejs", {post});
});
