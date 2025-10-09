import mongoose from "mongoose";

const RegistrationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 2 },
    phone: {
      type: String,
      required: true,
      match: /^[0-9]{10}$/,
    },
    parentPhone: {
      type: String,
      required: true,
      match: /^[0-9]{10}$/,
      validate: {
        validator: function (v) {
          return v !== this.phone;
        },
        message: "Parent's phone must be different from student's phone",
      },
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    schoolName: { type: String, required: true, trim: true, minlength: 2 },
    standard: { type: String, required: true, enum: ["11th", "12th"] },
    residentialAddress: { type: String, required: true, minlength: 10 },
    pincode: { type: String, required: true, match: /^[0-9]{6}$/ },
  },
  { timestamps: true }
);

// Unique indexes for deduplication
RegistrationSchema.index({ email: 1 }, { unique: true });
RegistrationSchema.index({ phone: 1 }, { unique: true });

export default mongoose.models.Registration ||
  mongoose.model("Registration", RegistrationSchema);
