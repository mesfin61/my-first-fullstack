const cloudinary = require("../config/cloudinary");
const { mssql, poolPromise } = require("../config/db");

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

    const pool = await poolPromise;

    const insertedVideos = [];

    for (const video of videosUrl) {
      const checkVideos = await pool
        .request()
        .input("file_url", mssql.VarChar, video.secure_url)
        .query(`SELECT * FROM videosInfo WHERE file_url = @file_url`);

      if (checkVideos.recordset.length > 0) {
        continue;
      }

      await pool
        .request()
        .input("file_url", mssql.VarChar, video.secure_url)
        .input("file_name", mssql.VarChar, video.public_id)
        .query(
          `INSERT INTO videosInfo (file_url, file_name) VALUES (@file_url, @file_name)`
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
