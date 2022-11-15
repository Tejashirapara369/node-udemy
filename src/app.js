const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./geocode");
const forecast = require("./forecast");

const publicDir = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");


const port = process.env.PORT || 3000;
const app = express();

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

app.use(express.static(publicDir));

app.get("", (req, res) => {
  res.render("index", {
    name: "Tejas Hirpara",
    title: "Weather App",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    name: "Tejas Hirpara",
    title: "About Page",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    name: "Tejas Hirpara",
    title: "Help Page",
    message: "Hint",
    messageTxt:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide address!",
    });
  }
  geocode(req.query.address, (err, resp) => {
    if (resp) {
      forecast(resp.latitude, resp.longitude, (err, resp) => {
        if (err) {
          return res.send({
            error: err,
          });
        }

        res.send(resp);
      });
    } else if (err) {
      return res.send({
        error: err,
      });
    }
  });
});

app.get("/help/*", (req, res) => {
  res.render("notFound", {
    name: "Tejas Hirpara",
    title: "Not Found",
    errMsg: "Help article not found!",
  });
});

app.get("*", (req, res) => {
  res.render("notFound", {
    name: "Tejas Hirpara",
    title: "Not Found",
    errMsg: "404 Page not found!",
  });
});

// app.get('/about', (req, res) => {
//     res.send("About page")
// })
// app.get('/weather', (req, res) => {
//     res.send("your weather page")
// })

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
