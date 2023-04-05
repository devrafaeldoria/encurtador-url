import { Schema, Model, model, Document } from 'mongoose';

export interface UrlInterface extends Document {
  idUser: string;
  id: string;
  url: string;
  name: string;
  uses: number;
  date: Date;
}

const UrlSchema = new Schema<UrlInterface>({
  idUser: String,
  id: String,
  url: String,
  name: String,
  uses: { type: Number, default: 1 },
  date: Date
});

const modelName = 'Url';

const Url: Model<UrlInterface> = model<UrlInterface>(modelName, UrlSchema);

export default Url;
