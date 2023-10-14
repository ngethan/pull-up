"use client";

import Link from "next/link";
import Messages from "./messages";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { BsArrowLeftShort } from "react-icons/bs"
export default function Login() {
  const form = useForm();

  const onSubmit = (e: any) => {
    console.log(e);
  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
    
        {/* <Messages /> */}

      <Card className="px-[40px] py-[35px]">
        <CardTitle>Sign In</CardTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" action="/auth/sign-in" method="post">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <div>
                    <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormDescription>

                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                  
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormDescription>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                  </div>
           
                  
                )}
              />

            <Button formAction="/auth/sign-up" type="submit" className="w-full">Sign in</Button>
          </form>
        </Form>
        <CardFooter>
          <div className="w-full flex flex-row">
            <Link href="/">
            <span className="inline-block">
            <BsArrowLeftShort className="mr-2" /> Back</span>
            </Link>
          </div>
        </CardFooter>
      </Card>

      {/* 
      <FormField
        name="login"
        control={form.control}
        render={({ field }) => (
          <Card>
            <CardHeader>
              <CardTitle>Sign in</CardTitle>
            </CardHeader>
            <CardContent>
              <Label htmlFor="email">Email</Label>
              <Input type="email" placeholder="Email" />
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
      )}
      /> */}
    </div>
  );
}
