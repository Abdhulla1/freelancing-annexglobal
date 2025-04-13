import axios from "axios";
import { serialize } from "cookie";
import https from "https";
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { email, password } = req.body;

  try {
    const httpsAgent = new https.Agent({ rejectUnauthorized: false });

    const response = await axios.post(
      "https://139.59.15.8:8003/api/v1/auth/login",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
        httpsAgent,
      }
    );

    const token = response.data.detail.token;
    // Set JWT in HttpOnly cookie
    res.setHeader(
      "Set-Cookie",
      serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60, // 1 hour
      })
    );
    return res.status(200).json({ success: true });
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials" });
  }
}
