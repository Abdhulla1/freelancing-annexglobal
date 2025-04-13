import { serialize } from "cookie";

export default function handler(req, res) {
  // Clear the cookie by setting maxAge = 0
  res.setHeader(
    "Set-Cookie",
    serialize("token", "", {
      httpOnly: true,
      path: "/",
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 0,
    })
  );

  return res.status(200).json({ message: "Logged out successfully" });
}
