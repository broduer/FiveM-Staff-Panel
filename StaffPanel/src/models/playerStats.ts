import mongoose, { Schema, Document } from 'mongoose';

export interface IApplication extends Document {
    time: String,
    currentPlayers: Boolean
}

const schema: Schema = new Schema({
    time: String,
    currentPlayers: Boolean
});

const model = mongoose.model<IApplication>('playerStat', schema);

class ApplicationHandler {
    async get(findBy: object) {
        return await model.findOne(findBy);
    };

    async getAll() {
        return await model.find({});
    };

    async delete(findBy: object) {
        return await model.findOneAndDelete(findBy);
    };

    async new(data: object) {
        const newModel = new model(data);
        return await newModel.save().catch(err => {throw(err)});
    };

    async update(findBy: string, stringToUpdate: string, data: object) {
        return data;
    };
};

const manager = new ApplicationHandler;

export default {
    model: model,
    get: manager.get,
    getAll: manager.getAll,
    delete: manager.delete,
    new: manager.new,
    update: manager.update
}