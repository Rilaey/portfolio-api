import mongoose, { Schema } from "mongoose";
import { IProjects } from "@/types";

export interface IProjectsDocument extends IProjects, Document {}

const projectSchema = new Schema<IProjectsDocument>({
  title: {
    type: String,
    required: true
  },
  logo: {
    type: String,
    required: true
  },
  github: {
    type: String,
    required: true
  },
  application: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tools: {
    type: [String],
    required: true
  },
  lastModifiedDate: {
    type: String,
    required: true
  },
  createdDate: {
    type: String,
    required: true
  }
});

const Project =
  mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;
