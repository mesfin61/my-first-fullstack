const cloudinary = require("../config/cloudinary");
const pool = require("../config/db");

const getVideos = async (req, res) => {
  try {
    const result = await cloudinary.api.resources({
      resource_type: "video",
      type: "upload",
      max_results: 10,
    });

    const videosUrl = result.resources.map((video) => ({
      public_id: video.public_id,
      secure_url: video.secure_url.replace("/upload/", "/upload/f_mp4/"),
    }));

    const insertedVideos = [];
    for (const video of videosUrl) {
      const [rows] = await pool.query(
        `SELECT * FROM videosInfo WHERE file_url = ?`,
        [video.secure_url]
      );

      if (rows.length > 0) {
        continue;
      }

      await pool.query(
        `INSERT INTO videosInfo (file_url, file_name) VALUES (?, ?)`,
        [video.secure_url, video.public_id]
      );

      insertedVideos.push(video);
    }
    return res.status(200).json({ videos: videosUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch videos" });
  }
};

module.exports = getVideos;
