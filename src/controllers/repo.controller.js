import { processRepository } from "../services/repo.service.js";
import pool from "../config/db.js";

export async function connectRepo(req, res) {
  const { github_url } = req.body;
  const userId = req.user.userId;

  try {
    const result = await pool.query(
      "INSERT INTO repositories (user_id, github_url, status) VALUES ($1,$2,$3) RETURNING *",
      [userId, github_url, "processing"]
    );

    const repo = result.rows[0];

    // 🔥 IMPORTANT FIX (convert to string)
    const repoId = String(repo.id);

    const files = await processRepository(github_url, repoId);

    for (const file of files) {
      await pool.query(
        "INSERT INTO code_chunks (repo_id, file_path, chunk_text) VALUES ($1,$2,$3)",
        [repoId, file.filePath, file.content]
      );
    }

    await pool.query(
      "UPDATE repositories SET status='ready' WHERE id=$1",
      [repoId]
    );

    res.json({ message: "Repo processed", repoId });

  } catch (err) {
    console.error("REPO ERROR:", err);
    res.status(500).json({ error: err.message });
  }
}