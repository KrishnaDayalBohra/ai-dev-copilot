// src/controllers/auth.controller.js

import { registerUser, loginUser } from '../services/auth.service.js';

export async function register(req, res) {
  try {
    const user = await registerUser(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function login(req, res) {
  try {
    const token = await loginUser(req.body);
    res.json({ token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
}