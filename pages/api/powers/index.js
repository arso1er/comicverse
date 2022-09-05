import { DEFAULT_LIMIT, MAX_LIMIT } from "../../../server/constants/search";
import { errorHandler } from "../../../server/helpers/error-handler";
import dbConnect from "../../../server/lib/dbConnect";
import Power from "../../../server/models/Power";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      /* GET /api/powers => Get powers from database */
      try {
        const { name, sort } = req.query;
        let { page, limit } = req.query;

        // Ensure limit does not exceed MAX_LIMIT
        if (limit > MAX_LIMIT) {
          limit = MAX_LIMIT;
        }

        const query = Power.find({});

        // Filter query
        if (name) {
          query.find({
            name: { $regex: name, $options: "gi" },
          });
        }

        // Sort query
        if (sort) {
          query.sort(sort);
        }

        // Count all matching documents
        const totalResults = await query.clone().count();

        // Paginate results
        page = page * 1 || 1;
        limit = limit * 1 || DEFAULT_LIMIT;
        const skip = (page - 1) * limit;
        query.skip(skip).limit(limit);

        // Execute query and send back the response
        const powers = await query;
        res.status(200).json({
          success: true,
          totalResults,
          results: powers.length,
          data: powers,
        });
      } catch (error) {
        errorHandler(error, req, res);
      }
      break;
    case "POST":
      /* POST /api/powers => Add a power to database */
      try {
        const power = await Power.create(req.body);
        res.status(201).json({ success: true, data: power });
      } catch (error) {
        errorHandler(error, req, res);
      }
      break;
    default:
      /* Method not found */
      res.status(404).json({
        success: false,
        message: `Method not found for route: ${req.url}.`,
      });
      break;
  }
}
