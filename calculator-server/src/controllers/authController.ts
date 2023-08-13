import { Request, Response } from 'express';
import { prisma } from '../utils/prisma';
import { hashPassword, compareHash } from '../utils/bcrypt';

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
    console.log('user', user);
    res.status(201).json({ message: 'User created successfully.' });
  } catch (error) {
    console.log('error', error);
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

    res.json({ message: 'Login successful.' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred.' });
  }
}