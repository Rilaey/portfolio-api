import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/db";
import { Project } from "@/models";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { _id, title, logo, github, application, description, tools } =
    req.body;

  await dbConnect();

  try {
    // GET ALL PROJECTS
    if (req.method == "GET" && !_id) {
      try {
        const projects = await Project.find({});

        if (!projects) {
          return res
            .status(500)
            .json({ success: false, error: "Unable to get all projects." });
        }

        if (projects.length == 0) {
          return res.status(400).json({
            success: true,
            message: "Portfolio as no projects saved."
          });
        }

        return res.status(200).json({ success: true, data: projects });
      } catch (err) {
        return res.status(500).json({ success: false, error: err });
      }
    }

    // GET ONE PROJECT
    if (req.method == "GET" && _id) {
      try {
        const project = await Project.findById({ _id });

        if (!project) {
          return res
            .status(500)
            .json({ success: false, error: "Unable to get project." });
        }

        return res.status(200).json({ success: true, data: project });
      } catch (err) {
        return res.status(500).json({ success: false, error: err });
      }
    }

    // POST
    if (req.method == "POST") {
      console.log(req.body);
      try {
        if (
          !title ||
          !logo ||
          !github ||
          !application ||
          !description ||
          !tools
        ) {
          return res.status(400).json({
            success: false,
            error:
              "title, logo, github, application, description, and tools are required"
          });
        }

        const project = await Project.create({
          title,
          logo,
          github,
          application,
          description,
          tools,
          lastModifiedDate: new Date().toUTCString(),
          createdDate: new Date().toUTCString()
        });

        return res.status(200).json({ success: true, data: project });
      } catch (err) {
        return res.status(500).json({ success: false, error: err });
      }
    }

    // DELETE
    if (req.method == "DELETE") {
      try {
        if (!_id) {
          return res.status(400).json({
            success: false,
            error: "_id is required for deleting projects."
          });
        }

        const project = await Project.findOneAndDelete({ _id });

        if (!project) {
          return res
            .status(500)
            .json({ success: false, error: "Unable to locate project." });
        }

        return res.status(200).json({ success: true });
      } catch (err) {
        return res.status(500).json({ success: false, error: err });
      }
    }

    // UPDATE
    if (req.method == "PUT") {
      try {
        if (!_id) {
          return res.status(400).json({
            success: false,
            error: "_id is required for updating projects."
          });
        }

        const project = await Project.findByIdAndUpdate(
          { _id },
          {
            ...(title && { title }),
            ...(logo && { logo }),
            ...(github && { github }),
            ...(application && { application }),
            ...(description && { description }),
            ...(tools && { tools }),
            lastModifiedDate: new Date().toUTCString()
          },
          {
            new: true
          }
        );

        return res.status(200).json({ success: true, data: project });
      } catch (err) {
        return res.status(500).json({ success: false, error: err });
      }
    }
  } catch (err) {
    return res.status(500).json({ success: false, error: err });
  }
}
