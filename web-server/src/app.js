// Require npm libraries
const path = require("path");
const express = require("express");
const hbs = require("hbs");

// Require exports
const locationService = require("./utils/geocode");
const forecastService = require("./utils/forecast");

// Initialise express application in variable 'app'
const app = express();
const port = process.env.PORT || 3000;

// Define paths for express configuration
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Set up handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Set up static directory to serve
app.use(express.static(publicDirectoryPath));

// Set up routes and respective handlers
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Vishal Acharya"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Vishal Acharya"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    body: "Troubleshooting steps.",
    name: "Vishal Acharya"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      errorMessage: "You must provide an address."
    });
  }

  locationService.geocode(
    req.query.address,
    (geocodeError, body) => {
      if (geocodeError) {
        return res.send({
          errorMessage: geocodeError
        });
      }

      forecastService.forecast(
        body.latitude,
        body.longitude,
        (forecastError, forecastData) => {
          if (forecastError) {
            return res.send({
              errorMessage: forecastError
            });
          }

          res.send({
            forecast: forecastData,
            location: body.location,
            address: req.query.address,
          });
        }
      );
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    error: "Help article not found.",
    name: "Vishal Acharya"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    error: "Page not found.",
    name: "Vishal Acharya"
  });
});

// Start up server
app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
