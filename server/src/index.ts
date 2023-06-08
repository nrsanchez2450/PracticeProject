import { PrismaClient } from "@prisma/client";
import express, { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
const jwt = require("jsonwebtoken");
require("dotenv").config();

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

interface AuthenticatedRequest extends Request {
  user: { username: string; password: string }; // Modify this based on your user model
}

// USER ROUTES //

// Get list of users
app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// Create new user
app.post("/register", async (req, res) => {
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
app.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await prisma.user.findFirst({
    where: { username: username },
  });
  if (!user) {
    return res.status(400).send("Cannot find user");
  }
  if (await bcrypt.compare(user.password, password)) {
    res.status(403);
  } else {
    const token = jwt.sign(user, process.env.JWT_KEY, { expiresIn: "1h" });
    console.log(token);
    res.status(201).json(token);
  }
});

// TODO: Verify Token
function authenticateToken(req: Request, res: Response, next: NextFunction) {
  // Get the JWT from the request headers, cookies, or query parameters
  const token = req.headers.authorization?.split(" ")[1] || "";

  // Verify the JWT
  jwt.verify(
    token,
    process.env.JWT_KEY,
    (err: Error, user: { username: string; password: string }) => {
      if (err) {
        // Invalid token or expired token
        return res.sendStatus(401);
      }

      // Valid token, store the authenticated user information in the request object
      (req as AuthenticatedRequest).user = user as {
        username: string;
        password: string;
      }; // Modify this based on your user model

      // Proceed to the next middleware or route handler
      next();
    }
  );
}

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
