const express = require("express");
const Joi = require("joi");
const bcrypt = require("bcryptjs");

const db = require("../db/connection");
const users = db.get("users");
users.createIndex("username", { unique: true });

const router = express.Router();

const schema = Joi.object({
	username: Joi.string().alphanum().min(2).max(30).required(),

	password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

	repeat_password: Joi.ref("password"),
});

router.get("/", (req, res) => {
	res.json({
		message: "Success",
	}).status(200);
});

router.post("/signup", (req, res, next) => {
	const result = schema.validate(req.body);
	if (!result.hasOwnProperty("error")) {
		users
			.findOne({
				username: req.body.username,
			})
			.then((user) => {
				if (user) {
					const error = new Error(
						"That user name is already taken. Please choose another one."
					);
					next(error);
				} else {
					bcrypt
						.hash(req.body.password, 12)
						.then((hashedPassword) => {
							const newUser = {
								username: req.body.username,
								password: hashedPassword,
							};

							users.insert(newUser).then((insertedUser) => {
								delete insertedUser.password;
								res.json({ insertedUser });
							});
						});
				}
			});
	} else {
		next(result.error);
	}
});

module.exports = router;
