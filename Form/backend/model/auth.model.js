import pool from "../config/db.js";

const AuthUser = {
  createUser: async (username, email, password) => {
    try {
      const result = await pool.query(
        "INSERT INTO users(username, email, password) VALUES($1, $2, $3) RETURNING *",
        [username, email, password]
      );
      return result.rows[0];
    } catch (error) {
      console.log("Error in createUserModel", error);
      throw error;
    }
  },

  findUserByEmail: async (email) => {
    try {
      const result = await pool.query("SELECT * FROM users WHERE email=$1", [
        email,
      ]);
      return result.rows[0];
    } catch (error) {
      console.log("Error in getUserByEmailModel", error);
      throw error;
    }
  },

  findUserById: async (id) => {
    try {
      const result = await pool.query("SELECT * FROM users WHERE id=$1", [
        id,
      ]);
      return result.rows[0];
    } catch (error) {
      console.log("Error in getUserByIdModel", error);
      throw error;
    }
  },

  findUserByUsername: async (username) => {
    try {
      const result = await pool.query("SELECT * FROM users WHERE username=$1", [
        username,
      ]);
      return result.rows[0];
    } catch (error) {
      console.log("Error in getUserByUsernameModel", error);
      throw error;
    }
  },

  CheckAuthUser: async (id) => {
    try {
      const result = await pool.query("SELECT * FROM users WHERE id = $1", [
        id,
      ]);
      return result.rows[0];
    } catch (error) {
      console.log("Error in CheckAuthUser", error);
      throw error;
    }
  },
};

export default AuthUser;
