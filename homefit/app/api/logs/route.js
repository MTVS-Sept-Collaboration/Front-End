import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 50;
  const sortOrder = searchParams.get("sortOrder") || "desc";
  const logLevel = searchParams.get("logLevel") || "";
  const token = request.headers.get("Authorization")?.split(" ")[1] || "";

  try {
    const backendUrl =
      process.env.NEXT_PUBLIC_API_URL || "https://localhost:8081";
    const response = await axios.get(
      `${backendUrl}/api/logs?page=${page}&limit=${limit}&sortOrder=${sortOrder}&logLevel=${logLevel}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        httpsAgent: new (require("https").Agent)({
          rejectUnauthorized: false,
        }),
      },
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching logs:", error);
    return NextResponse.json(
      { message: "로그를 가져오는 데 실패했습니다." },
      { status: error.response?.status || 500 },
    );
  }
}
