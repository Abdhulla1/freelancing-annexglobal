import axios from "axios";
import { serialize } from "cookie";
import https from "https";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { email, password } = req.body;

  try {
    const httpsAgent = new https.Agent({ rejectUnauthorized: false });

    const response = await axios.post(
      `${apiUrl}/api/v1/auth/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
        httpsAgent,
      }
    );
    const token = response.data.detail.token;
    const userContext = {
      isRoleUser: response.data.detail.isRoleUser ?? false,
      conferenceId: response.data.detail.conferenceId ?? null,
      conferenceName: response.data.detail.conferenceName ?? null,
    };

    // Set token cookie
    const tokenCookie = serialize("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 8, // 8 hours
    });

    // Set user context cookie (JSON string)
    const contextCookie = serialize(
      "userContext",
      JSON.stringify(userContext),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 8, // 8 hours
      }
    );

    res.setHeader("Set-Cookie", [tokenCookie, contextCookie]);
    return res
      .status(200)
      .json({
        success: true,
        token: response.data.detail.token,
        id: response.data.detail._id,
      });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials. Please check your email and password.",
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "An unexpected error occurred during login.",
      });
    }
  }
}
