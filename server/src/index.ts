import { PrismaClient } from "@prisma/client";
import express from "express";
import bcrypt from "bcrypt";
import { env } from "process";
import { access } from "fs";
const jwt = require("jsonwebtoken");
require("dotenv").config();

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
// USER ROUTES //

// Get list of users
app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// Create new user
app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body.user;

    // Perform input validation here (e.g., check for required fields, length, etc.)

    const hashedPass = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        username: username,
        password: hashedPass,
      },
    });

    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Registration failed" });
  }
});

// Validate user
app.post("/login", async (req, res) => {
  const { username, password } = req.body.user;
  const user = await prisma.user.findFirst({
    where: { username: username },
  });
  if (!user) {
    return res.status(400).send("Cannot find user");
  }
  console.log({ username, password });
  console.log(user);
  if (await bcrypt.compare(user.password, password)) {
    res.status(403).send("Invalid Credentials");
  } else {
    const acessToken = jwt.sign(user, process.env.JWT_KEY);
    res.status(201);
  }
});

// TODO: Sign out user

// Authenticate Token
// function authenticateToken(req, res, next) {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];
//   if (token == null) return res.status(401)

// }

app.listen(8080, () => {
  console.log("Server ready at http://localhost:8080");
});
