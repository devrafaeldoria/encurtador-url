import { Request, Response } from 'express';
import * as UserServices from '../services/UserServices';

export const create = async (req: Request, res: Response) => {
  const { name, email, password } = req.params;
  const user = await UserServices.create(name, email, password);
  console.log(user);
  return res.json(user);
};
