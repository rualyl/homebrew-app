import express, { ErrorRequestHandler } from 'express';
import { connect as MongooseConnect } from 'mongoose';

import * as Homebrew from './get-temperature';
import { Recipe } from '../schema/BrewingTypes';
import { IRecipe } from 'homebrew-types/BrewingTypes'

const router = express.Router();

router.get("/get-hlt-temp", (req, res) => {
	res.setHeader("Content-Type", "text/plain");
	let temp = Homebrew.GetTemperatureFrom("0114380a50aa");
	res.send(`${temp} F`)
});

router.get("/create-recipe", (req, res) => {
	let recipe = new Recipe({
		name: "Test"
	} as IRecipe);
	recipe.save((error, recipe) => {
		if (error) {
			res.header("Content-Type", "application/json");
			res.status(200).send({success : false});
		} else {
			res.header("Content-Type", "application/json");
			res.status(200).send({success : true});
		}
	});
});

router.get("/get-recipes", (req, res) => {
	Recipe.find((error, recipes) => {
		if (error) {
			res.header("Content-Type", "application/json");
			res.status(200).send({success : false});
		} else {
			res.header("Content-Type", "application/json");
			res.status(200).send({success : true, recipes: recipes});
		}
	});
});

const app = express();
app.use("/api", router);
app.use((req, res, next) => {
	res.header("Content-Type", "text/plain");
	res.status(404).send("Not a valid endpoint");
});

MongooseConnect("mongodb://localhost:27017/homebrew", {useNewUrlParser: true})

app.listen(3001, () => {console.log(`Server running on port ${3001}`);});
