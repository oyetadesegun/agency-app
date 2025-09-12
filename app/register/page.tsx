"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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

type FormFields = {
  username: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  referredBy: string;
};

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormFields>({
    username: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    referredBy: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (field: keyof FormFields, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const {
      username,
      firstName,
      lastName,
      phone,
      email,
      password,
      confirmPassword,
    } = form;

    if (
      !username ||
      !firstName ||
      !lastName ||
      !phone ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          firstName,
          lastName,
          phone,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed");
        setLoading(false);
        return;
      }

      // Auto-login
      const signInRes = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (signInRes?.error) {
        setError("Login failed after registration");
        setLoading(false);
        return;
      }
      router.push("/"); // Redirect to home
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <Theme
      appearance="light"
      accentColor="green"
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
              <Flex direction="column" align="center" gap="2">
                <Text size="6" weight="bold" color="green">
                  Create Account
                </Text>
              </Flex>

              {error && (
                <Callout.Root color="red" variant="soft">
                  <Callout.Text>{error}</Callout.Text>
                </Callout.Root>
              )}

              <form onSubmit={handleSubmit}>
                <Flex direction="column" gap="4">
                  {(
                    [
                      { label: "Username", field: "username", type: "text" },
                      { label: "First Name", field: "firstName", type: "text" },
                      { label: "Last Name", field: "lastName", type: "text" },
                      { label: "Phone", field: "phone", type: "tel" },
                      { label: "Email", field: "email", type: "email" },
                      {
                        label: "Password",
                        field: "password",
                        type: "password",
                      },
                      {
                        label: "Confirm Password",
                        field: "confirmPassword",
                        type: "password",
                      },
                    ] as const
                  ).map(({ label, field, type }) => (
                    <Flex key={field} direction="column" gap="2">
                      <Text size="2" weight="medium" color="gray">
                        {label}
                      </Text>
                      <TextField.Root
                        size="3"
                        type={type}
                        placeholder={`Enter your ${label.toLowerCase()}`}
                        value={form[field]}
                        onChange={(e) => handleChange(field, e.target.value)}
                        required
                      />
                    </Flex>
                  ))}

                  <Button
                    size="3"
                    type="submit"
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? "Registering..." : "Register"}
                  </Button>
                </Flex>
              </form>

              <Flex justify="center" gap="1" align="center">
                <Text size="2" color="gray">
                  Already have an account?
                </Text>
                <Link href="/login" style={{ textDecoration: "none" }}>
                  <Text
                    size="2"
                    weight="medium"
                    color="green"
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
