"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "../contexts/AuthContext";

export default function ClientProviders({ children }) {
  return (
    <AuthProvider>
      <ChakraProvider>{children}</ChakraProvider>
    </AuthProvider>
  );
}
