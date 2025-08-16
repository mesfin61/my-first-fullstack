const pool = require("../config/db");

const getVideos = async (req, res) => {
  try {
    const [dbVideos] = await pool.query(
      `SELECT file_name AS public_id, file_url AS secure_url 
       FROM videosInfo 
       ORDER BY video_id DESC `
    );

    return res.status(200).json({ videos: dbVideos });
  } catch (err) {
    console.error("Failed to fetch videos:", err);
    return res.status(500).json({ error: "Failed to fetch videos" });
  }
};

module.exports = getVideos;
