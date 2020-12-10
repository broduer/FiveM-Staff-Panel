import mongoose, { Schema, Document } from 'mongoose';
import Logger from '../services/Logger';

export interface IApplication extends Document {
    newPlayers: Number
    regularPlayers: Number
    totalWarnings: Number
    totalKicks: Number
    totalBans: Number
    date: String
}

const schema: Schema = new Schema({
    newPlayers: Number,
    regularPlayers: Number,
    totalWarnings: Number,
    totalKicks: Number,
    totalBans: Number,
    date: String
});

const model = mongoose.model<IApplication>('serverStat', schema);

class ApplicationHandler {
    async get(findBy: object) {
        const start:number = new Date().getTime();
        const data = await model.findOne(findBy).lean();
        const end:number = new Date().getTime();
        Logger(`Database fetch for serverStats took ${end - start}ms`);
        return data
    };

    async getAll() {
        const start:number = new Date().getTime();
        const data = await model.find({}).lean();
        const end:number = new Date().getTime();
        Logger(`Database fetch for serverStats took ${end - start}ms`);
        return data;
    };

    async delete(findBy: object) {
        const start:number = new Date().getTime();
        const data = await model.findOneAndDelete(findBy).lean();
        const end:number = new Date().getTime();
        Logger(`Database delete for serverStats took ${end - start}ms`);
        return data;
    };

    async set(newData: object) {
        const start:number = new Date().getTime();
        const newModel = new model(newData);
        const data = await newModel.save().catch(err => {throw(err)});
        const end:number = new Date().getTime();
        Logger(`Database insert for serverStats took ${end - start}ms`);
        return data;
    };

    async update(findBy: object, newData: object) {
        const start:number = new Date().getTime();
        const data = await model.findOneAndUpdate(findBy, newData).lean();
        const end:number = new Date().getTime();
        Logger(`Database update for sererStats took ${end - start}ms`);
        return data;
    };
};

const manager = new ApplicationHandler;

export default {
    model: model,
    get: manager.get,
    getAll: manager.getAll,
    delete: manager.delete,
    set: manager.set,
    update: manager.update
}