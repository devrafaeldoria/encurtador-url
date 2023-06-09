import { Schema, Model, model, Document } from 'mongoose';

export interface UserInterface extends Document {
  name: string;
  id: string;
  email: string;
  password: string;
  urls: [string];
}

const UserSchema = new Schema<UserInterface>({
  name: String,
  id: String,
  email: String,
  password: String,
  urls: [String]
});

const modelName = 'User';

const User: Model<UserInterface> = model<UserInterface>(modelName, UserSchema);

export default User;
