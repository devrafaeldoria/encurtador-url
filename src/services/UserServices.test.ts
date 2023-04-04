import * as UserServices from './UserServices';
import { UserInterface } from '@/models/User';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

describe('testing user services', () => {
  const email = 'test';
  const name = 'api';
  const password = '123';

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL_TEST as string);
  });
  beforeAll(async () => {
    await UserServices.create('test', 'test@gmail', '123456');
  });
  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  it('should be able to find a user by email', async () => {
    const user = (await UserServices.findByEmail('test@gmail')) as UserInterface;
    expect(user).not.toBeInstanceOf(Error);
    expect(user.email).toBe('test@gmail');
    expect(user).toHaveProperty('_id');
  });

  it('should be able not to find a user by incorrect email', async () => {
    const user = (await UserServices.findByEmail('1')) as UserInterface;
    expect(user).toBeInstanceOf(Error);
  });

  it('should be able to find a user by name', async () => {
    const user = (await UserServices.findByName('test')) as UserInterface;
    expect(user).not.toBeInstanceOf(Error);
    expect(user.name).toBe('test');
    expect(user).toHaveProperty('_id');
  });

  it('should be able not to find a user by incorrect name', async () => {
    const user = (await UserServices.findByName('1')) as UserInterface;
    expect(user).toBeInstanceOf(Error);
  });

  it('should be able to find a user by id', async () => {
    const userId = (await UserServices.findByEmail('test@gmail')) as UserInterface;
    const user = await UserServices.findById(userId._id);
    expect(user).not.toBeInstanceOf(Error);
    expect(user).toHaveProperty('_id');
  });

  it('should be able not to find a user by incorrect id', async () => {
    const user = await UserServices.findByEmail('1');
    expect(user).toBeInstanceOf(Error);
  });

  it('should be able to create a new user', async () => {
    const user = (await UserServices.create(name, email, password)) as UserInterface;
    expect(user).not.toBeInstanceOf(Error);
    expect(user.email).toBe(email);
    expect(user).toHaveProperty('_id');
  });

  it('should be able not to create a new user with same email', async () => {
    const user = (await UserServices.create('1', email, password)) as UserInterface;
    expect(user).toBeInstanceOf(Error);
  });

  it('should be able not to create a new user with same name', async () => {
    const user = (await UserServices.create(name, '1', password)) as UserInterface;
    expect(user).toBeInstanceOf(Error);
  });

  it('should be able to match a password', async () => {
    const user = (await UserServices.login(email, password)) as UserInterface;
    expect(user).not.toBeInstanceOf(Error);
    expect(user.email).toBe('test');
    expect(user).toHaveProperty('_id');
  });

  it('should be able not to match with incorrect password', async () => {
    const user = (await UserServices.login(email, '1')) as UserInterface;
    expect(user).toBeInstanceOf(Error);
  });

  it('should be able to login a user with incorrect email', async () => {
    const user = (await UserServices.login('1', password)) as UserInterface;
    expect(user).toBeInstanceOf(Error);
  });

  it('should be able not update a user with not params', async () => {
    const user = (await UserServices.findByEmail(email)) as UserInterface;
    const updateUser = (await UserServices.update(user._id, false, false, false)) as UserInterface;
    expect(updateUser).toBeInstanceOf(Error);
  });

  it('should be able not update a user with id invalid', async () => {
    const updateUser = await UserServices.update('invalid', '1', '1', '1');
    expect(updateUser).toBeInstanceOf(Error);
  });

  it('should be able not update a user with same email and name', async () => {
    const user = (await UserServices.findByEmail(email)) as UserInterface;
    const updateUser = (await UserServices.update(user._id, name, email, password)) as UserInterface;
    expect(updateUser).toBeInstanceOf(Error);
  });

  it('should be able to update a user', async () => {
    const user = (await UserServices.findByEmail(email)) as UserInterface;
    const updateUser = (await UserServices.update(user._id, 'test', 'test', 'test')) as UserInterface;
    expect(updateUser).not.toBeInstanceOf(Error);
  });
});
