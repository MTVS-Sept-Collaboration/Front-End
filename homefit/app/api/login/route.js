import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request) {
  try {
    const body = await request.json();
    const backendUrl =
      process.env.NEXT_PUBLIC_API_URL || "https://localhost:8081";
    console.log("Sending request to:", `${backendUrl}/api/login`);
    const response = await axios.post(`${backendUrl}/api/login`, body, {
      headers: {
        "Content-Type": "application/json",
      },
      httpsAgent: new (require("https").Agent)({
        rejectUnauthorized: false,
      }),
    });
    console.log("Response received:", response.data);
    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    console.error(
      "Login error:",
      error.response ? error.response.data : error.message,
    );
    return NextResponse.json(
      { message: "An error occurred during login" },
      { status: error.response ? error.response.status : 500 },
    );
  }
}
