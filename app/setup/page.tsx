"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Form, FormField } from "@/components/ui/form";
import { useForm } from "react-hook-form";

export default function Setup() {
  const form = useForm();

  const supabase = createClientComponentClient();
  const [username, setUsername] = useState("");
  const [available, setAvailable] = useState<number>(0);

  const checkAvailability = async () => {
    if (!username) return;
    const data = (
      await supabase.from("profiles").select().eq("username", username)
    ).data;
    if (data === null || data.length === 0) {
      setAvailable(1);
    } else {
      setAvailable(2);
    }
  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <Card className="px-[40px] pt-[35px]">
        <CardTitle className="mb-[30px]">Choose a username</CardTitle>
        <Form {...form}>
          <form
            className="space-y-8 mb-[30px]"
            action="setup-username"
            method="post"
          >
            <FormField
              control={form.control}
              name="login"
              render={() => (
                <div>
                  <div className="flex flex-row">
                    <Input
                      name="username"
                      placeholder="bob"
                      className="pr-[100px] mr-2"
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                    />
                    <Button
                      onClick={checkAvailability}
                      className="mr-2 w-full text-[12px]"
                    >
                      Check Availability
                    </Button>
                  </div>

                  {available == 1 && (
                    <p className="text-neutral-50 mt-[4px] bg-success/70 rounded-lg p-2">
                      Username is available!
                    </p>
                  )}
                  {available == 2 && (
                    <p className="text-neutral-50 mt-[4px] bg-destructive/70 rounded-lg p-2">
                      Username is unavailable!
                    </p>
                  )}
                  <div className="mt-[30px] flex flex-row">
                    <Button
                      formAction="setup-username"
                      type="submit"
                      className="w-full text-white mb-[30px]"
                    >
                      Done
                    </Button>
                  </div>
                </div>
              )}
            />
          </form>
        </Form>
      </Card>
    </div>
  );
}
