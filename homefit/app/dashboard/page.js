"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import {
  Box,
  Button,
  Select,
  ChakraProvider,
  Container,
  Heading,
  Flex,
  Spacer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthContext";

const fetcher = async (url) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("jwtToken") : null;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("An error occurred while fetching the data.");
  return res.json();
};

export default function Dashboard() {
  const router = useRouter();
  const { isAuthenticated, logout } = useAuth();
  const [selectedLimit, setSelectedLimit] = useState("50");
  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("desc");
  const [logLevel, setLogLevel] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  const { data, error } = useSWR(
    isAuthenticated
      ? `/api/logs?page=${page}&limit=${selectedLimit}&sortOrder=${sortOrder}&logLevel=${logLevel}`
      : null,
    fetcher,
    { refreshInterval: 2000 },
  );

  const handlePageChange = (newPage) => {
    setPage(Math.max(1, newPage)); // 페이지가 1 미만이 되지 않도록 함
  };

  const handleLimitChange = (event) => {
    setSelectedLimit(event.target.value);
    setPage(1);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
    setPage(1);
  };

  const handleLogLevelChange = (event) => {
    setLogLevel(event.target.value);
    setPage(1);
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  if (!isAuthenticated) return null;
  if (error) return <div>로그를 불러오는 데 실패했습니다.</div>;
  if (!data) return <div>로딩 중...</div>;

  return (
    <ChakraProvider>
      <Container maxW="container.xl" py={5}>
        <Flex alignItems="center" mb={5}>
          <Heading size="lg">로그 모니터링 대시보드</Heading>
          <Spacer />
          <Button onClick={handleLogout} colorScheme="red">
            로그아웃
          </Button>
        </Flex>
        <Flex mb={5} gap={2}>
          <Select
            value={selectedLimit}
            onChange={handleLimitChange}
            maxW="200px"
          >
            <option value="20">20개씩 보기</option>
            <option value="50">50개씩 보기</option>
            <option value="100">100개씩 보기</option>
          </Select>
          <Select
            value={sortOrder}
            onChange={handleSortOrderChange}
            maxW="200px"
          >
            <option value="desc">최신순</option>
            <option value="asc">과거순</option>
          </Select>
          <Select value={logLevel} onChange={handleLogLevelChange} maxW="200px">
            <option value="">모든 레벨</option>
            <option value="DEBUG">DEBUG</option>
            <option value="INFO">INFO</option>
            <option value="WARN">WARN</option>
            <option value="ERROR">ERROR</option>
          </Select>
        </Flex>
        <Box overflowX="auto">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>타임스탬프</Th>
                <Th>레벨</Th>
                <Th>메시지</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.logs.map((log, index) => (
                <Tr key={index}>
                  <Td>{log.timestamp}</Td>
                  <Td>{log.level}</Td>
                  <Td>{log.message}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
        <Flex mt={5} justifyContent="center">
          <Button
            onClick={() => handlePageChange(page - 1)}
            disabled={page <= 1}
            mr={2}
          >
            이전
          </Button>
          <Button
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= data.totalPages}
          >
            다음
          </Button>
        </Flex>
      </Container>
    </ChakraProvider>
  );
}
