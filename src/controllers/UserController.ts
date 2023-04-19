import { Request, Response } from 'express';
import { UserInterface } from '@/models/User';
import { AuthRequest } from '@/middlewares/auth';
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';
import * as UserServices from '../services/UserServices';

dotenv.config();

export const create = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const hasName = await UserServices.findByName(name);
  const hasEmail = await UserServices.findByEmail(email);

  if (!name && !email && !password) {
    return res.status(400).json({ error: 'Missing body params' });
  }

  if (hasEmail instanceof Error && hasName instanceof Error) {
    const user = (await UserServices.create(name, email, password)) as UserInterface;
    const token = JWT.sign({ id: user.id }, process.env.JWT_SECRET_KEY as string, { expiresIn: '48h' });
    return res.status(401).json({ user, token });
  } else {
    return res.status(400).json({ error: 'User already exists' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email && !password) {
    return res.status(400).json({ error: 'Missing body params' });
  }

  const user = await UserServices.login(email, password);

  if (user instanceof Error) {
    return res.status(400).json({ error: user.message });
  } else {
    const token = JWT.sign({ id: user.id }, process.env.JWT_SECRET_KEY as string, { expiresIn: '48h' });
    return res.json({ user, token });
  }
};

export const showProfile = async (req: AuthRequest, res: Response) => {
  const user = await UserServices.findById(req.userId as string);
  return res.json(user);
};

export const showUrls = async (req: AuthRequest, res: Response) => {
  const userUrls = (await UserServices.findById(req.userId as string)) as UserInterface;
  res.json({ urls: userUrls.urls });
};
