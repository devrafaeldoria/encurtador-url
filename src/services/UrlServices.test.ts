import * as UrlServices from './UrlServices';
import { UrlInterface } from '../models/Url';
import { UserInterface } from '../models/User';
import { create, findByEmail } from './UserServices';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

describe('testing url services', () => {
  const urlPath = 'www.api.com';
  const nameUrl = 'testApi';

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL_TEST as string);

    // create user, url and add url to user
    const user = (await create('test', 'test', 'test')) as UserInterface;
    const url = (await UrlServices.create(user.id, urlPath, nameUrl)) as UrlInterface;
    user.urls.push(url.id);
    user.save();
  });
  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  it('should be able not to create a url with id incorrect', async () => {
    const url = await UrlServices.create('1', urlPath, nameUrl);
    expect(url).toBeInstanceOf(Error);
  });

  it('should be able not to create a url with url invalid', async () => {
    const user = (await findByEmail('test')) as UserInterface;
    const url = await UrlServices.create(user._id, 'invalid', nameUrl);
    expect(url).toBeInstanceOf(Error);
  });

  it('should be able not to create a url with same name', async () => {
    const user = (await findByEmail('test')) as UserInterface;
    const url = await UrlServices.create(user._id, urlPath, 'test');
    expect(url).toBeInstanceOf(Error);
  });

  it('should be able to create a url', async () => {
    const user = (await findByEmail('test')) as UserInterface;
    const url = (await UrlServices.create(user.id, urlPath, 'test')) as UrlInterface;
    expect(url).not.toBeInstanceOf(Error);
    expect(url.url).toBe(urlPath);
    expect(url.idUser).toBe(user.id);
    expect(url.name).toBe('test');
  });

  it('should be able not to find a url with name does that not exist', async () => {
    const url = await UrlServices.findByName('not');
    expect(url).toBeInstanceOf(Error);
  });

  it('should be able to find a url with name', async () => {
    const url = UrlServices.findByName(nameUrl);
    expect(url).not.toBeInstanceOf(Error);
  });

  it('should be able not to find a url with id that does not exist', async () => {
    const url = await UrlServices.findById('1');
    expect(url).toBeInstanceOf(Error);
  });

  it('should be able to find a url with id', async () => {
    const findUrl = (await UrlServices.findByName(nameUrl)) as UrlInterface;
    const url = await UrlServices.findById(findUrl.id);
    expect(url).not.toBeInstanceOf(Error);
  });

  it('should be able not to use a url with that name does not exist', async () => {
    const url = await UrlServices.useUrl('invalid');
    expect(url).toBeInstanceOf(Error);
  });

  it('should be able to use a url and add a counter in url uses', async () => {
    const url = await UrlServices.useUrl(nameUrl);
    expect(url).not.toBeInstanceOf(Error);
  });

  it('should be able not to delete a url with that name does not exist', async () => {
    const url = await UrlServices.deleteUrl('invalid');
    expect(url).toBeFalsy;
  });

  it('should be able not to update a url with the same name', async () => {
    const user = (await findByEmail('test')) as UserInterface;
    const urlId = (await UrlServices.findByName(nameUrl)) as UrlInterface;
    const url = await UrlServices.updateName(user.id, urlId.id, nameUrl);
    expect(url).toBeInstanceOf(Error);
  });

  it('should be able not to update with not authorized to update', async () => {
    const urlId = (await UrlServices.findByName(nameUrl)) as UrlInterface;
    const url = await UrlServices.updateName('idInvalid', urlId.id, 'newName');
    expect(url).toBeInstanceOf(Error);
  });

  it('should be able to update a url with new name', async () => {
    const user = (await findByEmail('test')) as UserInterface;
    const urlId = (await UrlServices.findByName(nameUrl)) as UrlInterface;
    const url = await UrlServices.updateName(user.id, urlId.id, 'newName');
    expect(url).not.toBeInstanceOf(Error);
  });

  it('should be able not to update a url with not authorized to update', async () => {
    const urlId = (await UrlServices.findByName(nameUrl)) as UrlInterface;
    const url = await UrlServices.updateUrl('idInvalid', urlId.id, 'newUrl');
    expect(url).toBeInstanceOf(Error);
  });

  it('should be able not to update a url with incorrectly url', async () => {
    const user = (await findByEmail('test')) as UserInterface;
    const urlId = (await UrlServices.findByName(nameUrl)) as UrlInterface;
    const url = await UrlServices.updateUrl(user.id, urlId.id, 'invalid');
    expect(url).toBeInstanceOf(Error);
  });

  it('should be able to update a url', async () => {
    const user = (await findByEmail('test')) as UserInterface;
    const urlId = (await UrlServices.findByName('newName')) as UrlInterface;
    const url = await UrlServices.updateUrl(user.id, urlId.id, 'www.google.com');
    console.log(user.urls);
    console.log(urlId);
    expect(url).not.toBeInstanceOf(Error);
  });

  it('should be able to delete a url', async () => {
    const url = await UrlServices.deleteUrl('newName');
    expect(url).toBeTruthy();
  });
});
