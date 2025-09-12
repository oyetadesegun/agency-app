"use client";

import { useState } from "react";
import Link from "next/link";
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

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email) {
      setError("Please enter your email");
      return;
    }

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
      } else {
        setSuccess(
          "If an account exists for this email, you will receive a password reset link."
        );
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <Theme
      appearance="light"
      accentColor="violet"
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
                <Text size="6" weight="bold" color="violet">
                  Forgot Password
                </Text>
                <Text size="2" color="gray">
                  Enter your email to receive a reset link
                </Text>
              </Flex>

              {/* Error Message */}
              {error && (
                <Callout.Root color="red" variant="soft">
                  <Callout.Text>{error}</Callout.Text>
                </Callout.Root>
              )}

              {/* Success Message */}
              {success && (
                <Callout.Root color="green" variant="soft">
                  <Callout.Text>{success}</Callout.Text>
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

                  <Button size="3" type="submit" className="w-full">
                    Send Reset Link
                  </Button>
                </Flex>
              </form>

              {/* Footer */}
              <Flex justify="center" gap="1" align="center">
                <Text size="2" color="gray">
                  Remember your password?
                </Text>
                <Link href="/login" style={{ textDecoration: "none" }}>
                  <Text
                    size="2"
                    weight="medium"
                    color="violet"
                    className="hover:underline"
                  >
                    Login
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
