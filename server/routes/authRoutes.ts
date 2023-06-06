import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const router = express.Router();
const prisma = new PrismaClient();
router.use(express.json());

// Getting the list of users
router.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// Adding a user
router.post("/users", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    prisma.user.create({
      data: {
        username: req.body.name,
        password: hashedPassword,
      },
    });
    res.status(201).send("hello");
  } catch {
    res.status(500).send();
  }
});

// Logging in a user
router.post("/users/login", async (req, res) => {
  // const user = users.find((user) => user.name === req.body.name);
  const user = await prisma.user.findFirst({
    where: { username: req.body.name },
  });
  if (user == null) {
    return res.status(400).send("Cannot find user");
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send("Success");
    } else {
      res.send("Not allowed");
    }
  } catch {
    res.status(500).send();
  }
});

// TODO: Sign out a user

module.exports = router;
