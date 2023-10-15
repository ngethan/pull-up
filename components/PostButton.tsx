"use client";

import React from "react";
import { BsPlusLg } from "react-icons/bs";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogHeader,
} from "./ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Form, FormItem } from "./ui/form";

import { useForm } from "react-hook-form";
import Datetime from "react-datetime";
import "@/components/ui/react-datetime.css";

const PostButton = () => {
  const form = useForm();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-white w-full mb-[10px]">
          <BsPlusLg className="mr-1" />
          Post Up
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-neutral-100">
        <DialogHeader>
          <DialogTitle>Post Up!</DialogTitle>
          <DialogDescription>
            Create a new post here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="space-y-8 mb-[30px]"
            action="/auth/sign-in"
            method="post"
          >
            <div className="grid gap-4 py-4">
              <FormItem className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  defaultValue=""
                  placeholder="Movie night in Olin!"
                  className="col-span-3"
                />
              </FormItem>
              <FormItem className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="We're watching the shining tonight! Bring snacks :)"
                  defaultValue=""
                  className="col-span-3"
                />
              </FormItem>
              <FormItem className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="start-time" className="text-right">
                  Start Time
                </Label>
                <Datetime className="w-full" initialValue={new Date()} />
              </FormItem>
              <FormItem className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="end-time" className="text-right">
                  End Time
                </Label>
                <Datetime
                  className="w-full"
                  initialValue={
                    new Date(
                      new Date().getFullYear(),
                      new Date().getMonth(),
                      new Date().getDay(),
                      new Date().getHours() + 1,
                      new Date().getMinutes(),
                    )
                  }
                />
              </FormItem>
            </div>
          </form>
        </Form>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PostButton;
