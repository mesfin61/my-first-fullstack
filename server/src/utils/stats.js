const pool = require("../config/db");

const status = async (req, res) => {
  try {
    const [usersResult] = await pool.query(
      `SELECT COUNT(*) AS total_users FROM userInfo`
    );
    const total_users = usersResult[0].total_users;

    const [videosResult] = await pool.query(
      `SELECT COUNT(*) AS total_videos FROM videosInfo `
    );
    const total_videos = videosResult[0].total_videos;

    const total_courses = "03";

    return res.status(200).json({
      total_users: total_users,
      total_courses: total_courses,
      total_videos: total_videos,
    });
  } catch (err) {
    console.error("Status fetch error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = status;
