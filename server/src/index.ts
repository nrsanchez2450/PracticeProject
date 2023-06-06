import { PrismaClient } from "@prisma/client";
import express from "express";
import bcrypt from "bcrypt";

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
app.post("/users", async (req, res) => {
  try {
    const username = req.body.username;
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    await prisma.user.create({
      data: {
        username: username,
        password: hashedPass,
      },
    });
    res.status(201).send();
  } catch {
    res.status(500).send();
  }
});

// Validate user
app.post("/users/login", async (req, res) => {
  const user = await prisma.user.findFirst({
    where: { username: req.body.username },
  });

  if (!user) {
    return res.status(400).send("Cannot find user");
  }

  if (await bcrypt.compare(req.body.password, user.password)) {
    res.send("Success");
  } else {
    res.send("Failure");
  }
});

// Sign out user

app.listen(3000, () => {
  console.log("Server ready at http://localhost:3000");
});
