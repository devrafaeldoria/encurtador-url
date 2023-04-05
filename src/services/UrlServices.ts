import Url from '../models/Url';
import * as UserServices from './UserServices';
import validator from 'validator';
import { v4 } from 'uuid';

export const findByName = async (name: string) => {
  const url = await Url.findOne({ name });
  if (url) {
    return url;
  } else {
    return new Error('Name not found');
  }
};

export const findById = async (id: string) => {
  const url = await Url.findOne({ id });
  if (url) {
    return url;
  } else {
    return new Error('Id not found');
  }
};

export const create = async (idUser: string, url: string, name: string) => {
  const user = await UserServices.findById(idUser);
  if (user instanceof Error) {
    return new Error('Id does not exist');
  } else {
    if (validator.isURL(url)) {
      if ((await findByName(name)) instanceof Error) {
        const id = v4();
        return await Url.create({
          name,
          url,
          idUser,
          id
        });
      } else {
        return new Error('Same name');
      }
    } else {
      return new Error('URL invalid');
    }
  }
};

export const useUrl = async (name: string) => {
  const url = await findByName(name);
  if (url instanceof Error) {
    return new Error('Name not found');
  } else {
    const count = url.uses;
    url.uses = count + 1;
    await url.save();
    return url.url;
  }
};

export const deleteUrl = async (name: string) => {
  const url = await findByName(name);
  if (url instanceof Error) {
    return new Error('Name not found');
  } else {
    await Url.deleteOne({ name });
    return true;
  }
};

export const updateName = async (idUser: string, idUrl: string, name: string) => {
  const authorized = await UserServices.verifyUserHasUrl(idUser, idUrl);
  if (authorized instanceof Error) {
    return new Error('Not authorized');
  } else {
    if ((await findByName(name)) instanceof Error) {
      return await Url.updateOne({ id: idUrl }, { name });
    } else {
      return new Error('Name already exists');
    }
  }
};

export const updateUrl = async (idUser: string, idUrl: string, url: string) => {
  const authorized = await UserServices.verifyUserHasUrl(idUser, idUrl);
  if (authorized instanceof Error) {
    return new Error('Not authorized');
  } else {
    if (validator.isURL(url)) {
      return await Url.updateOne({ id: idUrl }, { url });
    } else {
      return new Error('URL invalid');
    }
  }
};
