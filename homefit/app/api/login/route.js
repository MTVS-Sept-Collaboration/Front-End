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
      { message: "로그인 중 알 수 없는 오류가 발생했습니다." },
      { status: error.response ? error.response.status : 500 },
    );
  }
}
