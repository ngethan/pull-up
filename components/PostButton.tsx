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
} from "@radix-ui/react-dialog";
import { DialogFooter, DialogHeader } from "./ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { ChevronDownIcon } from "lucide-react";

import { useForm } from "react-hook-form";

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
      <DialogContent className="sm:max-w-[425px]">
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
                <Input id="title" defaultValue="" className="col-span-3" />
              </FormItem>
              <FormItem className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe your event!"
                  defaultValue=""
                  className="col-span-3"
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
