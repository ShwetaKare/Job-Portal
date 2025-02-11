import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0, // Ensures the price is a positive number
    },
    duration: {
      type: Number,
      required: true,
      min: 1, // Ensures that the duration is at least 1 (for meaningful course duration)
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (v) {
          return v > this.startDate; // Ensures that endDate is after startDate
        },
        message: "End date must be after start date",
      },
    },
    created_By: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    applications: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Application',
    }],
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },
  },
  { timestamps: true }
);

// You may want to add an index for more efficient querying, especially for frequently queried fields
// courseSchema.index({ title: 1, company: 1 });

export const Courses = mongoose.model("Courses", courseSchema);
