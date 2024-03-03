
import { DateTime } from "../../../../domain/entities/DateTime.js";
import { connect } from "./client.js";
import { Model } from "./loader.js";

export class MongoAdapter<T>{
  private model: Model<T>;
  constructor(model: Model<T>) {
    this.model = model;
  }

  create = async (entity: T[] & DateTime) => {
    await connect();
    entity.updatedAt = new Date()
    entity.createdAt = new Date()
    return await this.model.insertMany(entity) as T;
  }

  upsert = async (entity: T & DateTime, filter: Partial<T>) => {
    await connect();
    entity.updatedAt = new Date()
    entity.createdAt = new Date()
    const options = { upsert: true, new: true };
    return await this.model.findOneAndUpdate(filter, entity, options) as T;
  }

  get = async (filter: Partial<T>) => {
    await connect();
    return await this.model.findOne(filter) as T;
  }

  getMany = async (filter: any = {}) => {
    await connect();
    return await this.model.find(filter) as T[];
  }

  delete = async (filter: Partial<T>) => {
    await connect();
    return await this.model.deleteOne(filter);
  }

}