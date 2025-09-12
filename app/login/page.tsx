"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import {
  Theme,
  Card,
  Flex,
  Text,
  TextField,
  Button,
  Callout,
  Box,
  Container,
} from "@radix-ui/themes";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (res?.error) {
      setError(res.error);
    } else {
      router.push("/");
    }
  };

  return (
    <Theme
      appearance="light"
      accentColor="blue"
      grayColor="slate"
      radius="large"
      scaling="100%"
    >
      <Box className="min-h-screen" style={{ background: "var(--gray-2)" }}>
        <Container
          size="1"
          className="min-h-screen flex items-center justify-center p-4"
        >
          <Card size="3" className="w-full max-w-md">
            <Flex direction="column" gap="6">
              {/* Header */}
              <Flex direction="column" align="center" gap="2">
                <Text size="6" weight="bold" color="blue">
                  Welcome Back
                </Text>
                <Text size="2" color="gray">
                  Sign in to your account
                </Text>
              </Flex>

              {/* Error Message */}
              {error && (
                <Callout.Root color="red" variant="soft">
                  <Callout.Text>{error}</Callout.Text>
                </Callout.Root>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit}>
                <Flex direction="column" gap="4">
                  <Flex direction="column" gap="2">
                    <Text size="2" weight="medium" color="gray">
                      Email
                    </Text>
                    <TextField.Root
                      size="3"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Flex>

                  <Flex direction="column" gap="2">
                    <Text size="2" weight="medium" color="gray">
                      Password
                    </Text>
                    <TextField.Root
                      size="3"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Flex>

                  <Flex justify="end">
                    <Link
                      href="/forgot-password"
                      style={{ textDecoration: "none" }}
                    >
                      <Text size="2" color="blue" className="hover:underline">
                        Forgot Password?
                      </Text>
                    </Link>
                  </Flex>

                  <Button size="3" type="submit" className="w-full">
                    Login
                  </Button>
                </Flex>
              </form>

              {/* Footer */}
              <Flex justify="center" gap="1" align="center">
                <Text size="2" color="gray">
                  Don&apos;t have an account?
                </Text>
                <Link href="/register" style={{ textDecoration: "none" }}>
                  <Text
                    size="2"
                    weight="medium"
                    color="blue"
                    className="hover:underline"
                  >
                    Register
                  </Text>
                </Link>
              </Flex>
            </Flex>
          </Card>
        </Container>
      </Box>
    </Theme>
  );
}
