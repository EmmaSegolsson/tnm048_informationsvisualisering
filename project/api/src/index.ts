import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import minimist from "minimist";

import { getCountries, getCountry } from "./handlers/countries";
import { getCategories, getCategoriesPerCountry } from "./handlers/categories";
import { getWines, getWinesByCountry } from "./handlers/wines";
import { getGrapes } from "./handlers/grapes";

const args = minimist(process.argv.slice(2));
const port = args.p || "3000";

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// *** HANDLERS ***
app.get("/countries", getCountries);
app.get("/countries/:countryName", getCountry);

app.get("/categories", getCategories);
app.get("/categories/:countryName", getCategoriesPerCountry);

app.get("/grapes", getGrapes);

app.get("/wines", getWines);
app.get("/wines/:countryName", getWinesByCountry);

app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});
