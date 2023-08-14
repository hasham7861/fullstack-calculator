import { Request, Response } from 'express';
import { hashPassword, compareHash } from '../utils/bcrypt';
import { User } from '../entities/user.entity';

declare module 'express-session' {
  interface SessionData {
    username?: string;
    userId?: string;
  }
}

export const signup = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await hashPassword(password);

    const user = new User({
      username,
      password: hashedPassword,
    })

    await user.save();
    
    if (!req.session.username) {
      req.session.username = user.username;
      req.session.userId = user._id;
    }
    res.status(201).json({ message: 'User created successfully.' });
  } catch (error) {
    res.status(500).json({ error: `An error occurred. ${error}` });
  }
}


export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {

    const user = await User.findOne({ username  });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const passwordMatch = await compareHash(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Incorrect password.' });
    }

    if (!req.session.username) {
      req.session.username = user.username;
      req.session.userId = user._id;
    }

    res.json({ message: 'Login successful.' });
  } catch (error) {
    console.log('error', error)
    res.status(500).json({ error: `An error occurred. ${error}` });
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