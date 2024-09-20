"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";
import {
  Box,
  Button,
  Input,
  VStack,
  Text,
  Heading,
  useToast,
  ChakraProvider,
  Container,
} from "@chakra-ui/react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { login } = useAuth();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName: username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        login(data.jwtToken);
        router.push("/dashboard");
      } else {
        const errorData = await response.json();
        toast({
          title: "로그인 실패",
          description: errorData.message || "아이디와 비밀번호를 확인해주세요.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.error("Login error:", err);
      toast({
        title: "오류 발생",
        description: "로그인 중 오류가 발생했습니다.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <ChakraProvider>
      <Container centerContent>
        <Box
          p={8}
          maxWidth="400px"
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
          mt={20}
        >
          <VStack spacing={4} as="form" onSubmit={handleSubmit}>
            <Heading>로그인</Heading>
            <Input
              placeholder="아이디"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="password"
              placeholder="비밀번호"
              value={password}
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" colorScheme="blue" width="full">
              로그인
            </Button>
          </VStack>
        </Box>
      </Container>
    </ChakraProvider>
  );
}
