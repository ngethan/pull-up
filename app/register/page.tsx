"use client";

import Link from "next/link";
import Messages from "./messages";
import { Card, CardFooter, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { HiArrowNarrowLeft } from "react-icons/hi";
import PasswordStrengthBar from "@/components/PasswordStrengthBar";
import { useState } from "react";

export default function Login() {
  const form = useForm();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmationPassword] = useState("");

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <Card className="px-[40px] pt-[35px]">
        <CardTitle className="mb-[30px]">Register</CardTitle>
        <Form {...form}>
          <form
            className="space-y-8 mb-[30px]"
            action="/auth/sign-up"
            method="post"
          >
            <FormField
              control={form.control}
              name="register"
              render={({ field }) => (
                <div>
                  <FormItem className="pb-[20px]">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        name="password"
                        type="password"
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        placeholder="••••••••••••"
                      />
                    </FormControl>
                    <PasswordStrengthBar password={password} />
                    <FormMessage />
                  </FormItem>

                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••••••"
                        onChange={(e) => {
                          setConfirmationPassword(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />
            <Button
              formAction="/auth/sign-up"
              type="submit"
              className="w-full text-white"
              disabled={confirmPassword !== password || confirmPassword === ""}
            >
              Register
            </Button>
          </form>
        </Form>
        <CardFooter className="px-0">
          <div className="w-full flex flex-row">
            <Link href="/">
              <span className="text-sm hover-circle hover:cursor-pointer font-medium hover:underline text-primary-500">
                <HiArrowNarrowLeft className="inline-block mr-1" />
                Back
              </span>
            </Link>
          </div>
          <div>
            <Link href="/login">
              <span className="text-sm hover-circle hover:cursor-pointer font-medium hover:underline text-primary-500">
                Login
              </span>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
