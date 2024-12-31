import dbConnect from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import Experience from "@/models/Experience";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { _id, role, company, startDate, endDate, description } = req.body;

  await dbConnect();

  try {
    // GET ALL PROJECTS
    if (req.method == "GET" && !_id) {
      try {
        const experiences = await Experience.find({});

        if (!experiences) {
          return res
            .status(500)
            .json({ success: false, error: "Unable to get all experiences." });
        }

        return res.status(200).json({ success: true, data: experiences });
      } catch (err) {
        return res.status(500).json({ success: false, error: err });
      }
    }

    // GET ONE PROJECT
    if (req.method == "GET" && _id) {
      try {
        const experience = await Experience.findById(_id);

        if (!experience) {
          return res.status(500).json({
            success: false,
            error: "Unable to locate experience by id."
          });
        }

        return res.status(200).json({ success: true, data: experience });
      } catch (err) {
        return res.status(500).json({ success: false, error: err });
      }
    }

    // CREATE EXPERIENCE
    if (req.method == "POST") {
      try {
        if (!role || !company || !startDate || !endDate) {
          return res.status(400).json({
            success: false,
            error: "Role, company, start date, and end date are required."
          });
        }

        const experience = await Experience.create({
          role,
          company,
          startDate,
          endDate,
          description
        });

        return res.status(200).json({ success: true, data: experience });
      } catch (err) {
        return res.status(500).json({ success: false, error: err });
      }
    }

    // DELETE EXPERIENCE
    if (req.method == "DELETE") {
      try {
        if (!_id) {
          return res
            .status(400)
            .json({ success: false, error: "ID is required." });
        }

        const experience = await Experience.findByIdAndDelete(_id);

        if (!experience) {
          return res
            .status(400)
            .json({ success: false, error: "Unable to delete experience." });
        }

        return res
          .status(200)
          .json({ success: true, data: `Deleted experience ${_id}` });
      } catch (err) {
        return res.status(500).json({ success: false, error: err });
      }
    }

    // UPDATE EXPERIENCE
    if (req.method == "PUT") {
      try {
        if (!_id) {
          return res
            .status(500)
            .json({ success: false, error: "ID is required." });
        }

        const experience = await Experience.findByIdAndUpdate(_id, {
          ...(role && { role }),
          ...(company && { company }),
          ...(startDate && { startDate }),
          ...(endDate && { endDate })
        });

        if (!experience) {
          return res
            .status(400)
            .json({ success: false, error: "Unable to update experience." });
        }

        return res.status(200).json({ success: true, data: experience });
      } catch (err) {
        return res.status(500).json({ success: false, error: err });
      }
    }
  } catch (err) {
    return res.status(500).json({ success: false, error: err });
  }
}
