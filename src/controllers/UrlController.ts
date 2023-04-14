import { Response } from 'express';
import { AuthRequest } from '@/middlewares/auth';
import * as UrlServices from '../services/UrlServices';

export const create = async (req: AuthRequest, res: Response) => {
  const user = req.userId;
  const { url, name } = req.body;

  if (!url && !name) {
    return res.status(400).json({ error: 'Missing body params' });
  }

  const hasName = await UrlServices.findByName(name);

  if (hasName instanceof Error) {
    const newUrl = await UrlServices.create(user as string, url, name);
    if (newUrl instanceof Error) {
      return res.status(400).json({ error: newUrl.message });
    }
    return res.status(201).json(newUrl);
  } else {
    return res.status(400).json({ error: 'Name already exists' });
  }
};
