import User from '../models/User';
import bcrypt from 'bcrypt';
import { v4 } from 'uuid';

export const findByEmail = async (email: string) => {
  const user = await User.findOne({ email });
  if (user) {
    return user;
  } else {
    return new Error('User not found');
  }
};

export const findByName = async (name: string) => {
  const user = await User.findOne({ name });
  if (user) {
    return user;
  } else {
    return new Error('User not found');
  }
};

export const findById = async (id: string) => {
  const user = await User.findOne({ id });
  if (user) {
    return user;
  } else {
    return new Error('User not found');
  }
};

export const create = async (name: string, email: string, password: string) => {
  if ((await findByEmail(email)) instanceof Error && (await findByName(name)) instanceof Error) {
    const hash = await bcrypt.hash(password, 10);
    const uuid = v4();
    return await User.create({ name, email, password: hash, id: uuid });
  } else {
    return new Error('User already exists');
  }
};

export const login = async (email: string, password: string) => {
  const user = await findByEmail(email);
  if (user instanceof Error) {
    return new Error('User not found');
  } else {
    const match = await bcrypt.compare(password, user.password);
    console.log(match);
    if (match) {
      return user;
    } else {
      return new Error('Wrong password');
    }
  }
};

export const update = async (id: string, name: string | false, email: string | false, password: string | false) => {
  if (email === false && name === false && password === false) {
    return new Error('Nothing to update');
  } else if ((await findByEmail(email as string)) || (await findByName(name as string))) {
    return new Error('Email or name already exists');
  } else {
    const user = await findById(id);
    if (user instanceof Error) {
      return new Error('User not found');
    } else {
      if (email != false) {
        await User.updateOne({ _id: user._id }, { email: email });
      }
      if (name != false) {
        await User.updateOne({ _id: user._id }, { name: name });
      }
      if (password != false) {
        const hash = await bcrypt.hash(password, 10);
        await User.updateOne({ _id: user._id }, { password: hash });
      }
      return await findByEmail(email as string);
    }
  }
};

export const verifyUserHasUrl = async (idUser: string, idUrl: string) => {
  const user = await User.findOne({
    _id: idUser,
    urls: idUrl
  });
  if (user) {
    return true;
  } else {
    return new Error('Not authorized');
  }
};
