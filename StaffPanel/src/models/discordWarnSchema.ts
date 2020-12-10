import * as mongoose from 'mongoose';
const fuzzySearch = require("mongoose-fuzzy-searching-v2")

const discordWarnSchema = new mongoose.Schema({
    discordID: String,
    staffID: String,
    reason: String,
    time: String
});

discordWarnSchema.plugin(fuzzySearch, { fields: ["discordID"] });
export default mongoose.model('discordWarning', discordWarnSchema);
