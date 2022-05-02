import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class Product extends Document {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  description: string;
  @Prop({ type: Number, required: true })
  price: number;
  @Prop({ type: Number, required: true })
  stock: number;
  @Prop({ required: true })
  images: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
