import { Request, Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
import * as UrlServices from '../services/UrlServices';
import * as UserServices from '../services/UserServices';

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

export const deleteUrl = async (req: AuthRequest, res: Response) => {
  const user = req.userId;
  const idUrl = req.params.id;

  const hasUrlInUser = await UserServices.verifyUserHasUrl(user as string, idUrl);

  if (hasUrlInUser instanceof Error) {
    return res.status(404).json({ error: hasUrlInUser.message });
  }

  await UrlServices.deleteUrl(idUrl);
  await UserServices.deleteUrlUser(user as string, idUrl);

  return res.json({ delete: true });
};

export const showUrl = async (req: Request, res: Response) => {
  const idUrl = req.params.id;
  const url = await UrlServices.findById(idUrl);

  if (url instanceof Error) {
    return res.status(404).json({ error: 'Url not found' });
  }

  return res.json({ url });
};

export const useUrl = async (req: Request, res: Response) => {
  const { name } = req.params;

  const hasName = await UrlServices.findByName(name);

  if (hasName instanceof Error) {
    return res.status(404).json({ error: hasName.message });
  }

  const url = hasName.url;
  const baseUrl = 'https://';

  hasName.uses += 1;
  await hasName.save();

  console.log(hasName.uses);

  res.redirect(`${baseUrl}${url}`);
};

export const changeNameUrl = async (req: AuthRequest, res: Response) => {
  const { id, newName } = req.params;
  const userId = req.userId;

  if (!id && !newName) {
    return res.status(401).json({ error: 'nothing to update ' });
  }

  const hasName = await UrlServices.findByName(newName);

  if (hasName instanceof Error) {
    const canUpdate = await UserServices.verifyUserHasUrl(userId as string, id);

    if (canUpdate instanceof Error) {
      return res.status(403).json({ error: canUpdate.message });
    }

    await UrlServices.updateName(userId as string, id, newName);

    return res.json({ update: true });
  } else {
    return res.status(401).json({ error: 'name already exists' });
  }
};
