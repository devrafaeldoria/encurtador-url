import { Schema, Model, model, Document } from 'mongoose';

export interface UrlInterface extends Document {
  idUser: string;
  url: string;
  uses: number;
  date: Date;
}

const UrlSchema = new Schema<UrlInterface>({
  idUser: String,
  url: String,
  uses: Number,
  date: Date
});

const modelName = 'Url';

const Url: Model<UrlInterface> = model<UrlInterface>(modelName, UrlSchema);

export default Url;
