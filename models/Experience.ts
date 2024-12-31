import mongoose, { Schema } from "mongoose";
import { IExperience } from "@/types";

export interface IExperienceDocument extends IExperience, Document {}

const experienceSchema = new Schema<IExperienceDocument>({
  role: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  startDate: {
    type: String,
    required: true
  },
  endDate: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: null
  }
});

const Experience =
  mongoose.models.Experience || mongoose.model("Experience", experienceSchema);

export default Experience;
