import pool from "../config/db.js";
import { askAI } from "../services/ai.service.js";

export async function queryRepo(req, res) {
  const { repoId, question } = req.body;

  // ✅ VALIDATION INSIDE FUNCTION
  if (!repoId || !question) {
    return res.status(400).json({
      error: "repoId and question are required"
    });
  }

  try {
    const result = await pool.query(
      "SELECT chunk_text FROM code_chunks WHERE repo_id=$1 LIMIT 5",
      [repoId]
    );

    const context = result.rows.map(r => r.chunk_text).join("\n");

    const answer = await askAI(context, question);

    res.json({ answer });

  } catch (err) {
    console.error("AI ERROR:", err);
    res.status(500).json({ error: err.message });
  }
}