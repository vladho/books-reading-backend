const { Schema, SchemaTypes } = require('mongoose');

const trainingSchema = new Schema(
  {
    startDate: {
      type: String,
      required: [true, 'Set start date for training'],
    },
    finishDate: {
      type: String,
      required: [true, 'Set end date for training'],
    },
    duration: {
      type: Number,
    },
    // Уточнить о необходимости использования
    inProgress: {
      type: Boolean,
      default: true,
    },
    stats: {
      time: {
        type: String,
      },
      pages: {
        type: Number,
      },
    },
    books: [
      {
        type: SchemaTypes.ObjectId,
        ref: 'book',
      },
    ],
    user: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
    result: [
      {
        date: {
          type: String,
        },
        plannedPages: {
          type: String,
        },
        factPages: {
          type: String,
        },
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

module.exports = trainingSchema;
