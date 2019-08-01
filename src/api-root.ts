import express, { ErrorRequestHandler } from 'express';
import * as Homebrew from './get-temperature';

const router = express.Router();
router.get("/get-hlt-temp", (req, res) => {
	res.setHeader("Content-Type", "text/plain");
	let temp = Homebrew.GetTemperatureFrom("0114380a50aa");
	res.send(`${temp} F`)}
);
router.get("/m2", (req, res) => {res.send("m2")});

const app = express();
app.use("/api", router);
app.use((req, res, next) => {
	res.header("Content-Type", "text/plain");
	res.status(404).send("Not a valid endpoint");
});
app.listen(3001, () => {console.log(`Server running on port ${3001}`);});
