const mongoose = require('mongoose')

const EntrySchema = new mongoose.Schema({
    post: {
        type: String,
        required: true
    },
    mood: {
        type: Number,
        min: 1,
        max: 10,
        required: true
    }

})

const DaySchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    entries: [EntrySchema],
    flags: [String]

}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: (_doc, ret) => {
            ret.aggregate_mood = null
            if (ret.entries.length > 0) {
                const sumMood = ret.entries.reduce((acc,entry) => acc + entry.mood, 0)
                ret.aggregate_mood = Math.round(sumMood / ret.entries.length)
            }
            return ret
        }
    },
    id: false
})

const Day = mongoose.model('Day', DaySchema)

module.exports = Day