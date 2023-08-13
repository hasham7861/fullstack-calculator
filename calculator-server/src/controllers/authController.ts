import { Request, Response } from 'express';
import { prisma } from '../utils/prisma';
import { hashPassword, compareHash } from '../utils/bcrypt';

declare module 'express-session' {
  interface SessionData {
    username: string;
  }
}

export const signup = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });
    if (!req.session.username) {
      req.session.username = user.username;
    }
    res.status(201).json({ message: 'User created successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred.' });
  }
}


export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const passwordMatch = await compareHash(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Incorrect password.' });
    }

    if (!req.session.username) {
      req.session.username = user.username;
    }

    res.json({ message: 'Login successful.' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred.' });
  }
}

export const sessionActivity = async (req: Request, res: Response) => {
  if (req.session.username) {
    res.json({ authenticated: true, username: req.session.username });
  }
  else {
    res.json({ authenticated: false });
  }
}

export const logout = async (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'An error occurred.' });
    }
    res.clearCookie('connect.sid');
    res.json({ message: 'Logout successful.' });
  });
}