// src/services/auth.service.js

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

// ✅ renamed
export const registerUser = async ({ email, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    'INSERT INTO users(email, password_hash) VALUES($1, $2) RETURNING id, email',
    [email, hashedPassword]
  );

  return result.rows[0];
};

// ✅ renamed
export const loginUser = async ({ email, password }) => {
  const result = await pool.query(
    'SELECT * FROM users WHERE email=$1',
    [email]
  );

  const user = result.rows[0];
  if (!user) throw new Error('User not found');

  // ✅ FIXED COLUMN NAME
  const isMatch = await bcrypt.compare(password, user.password_hash);

  if (!isMatch) throw new Error('Invalid credentials');

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  return token;
};