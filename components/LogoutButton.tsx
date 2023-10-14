"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { TbLogout } from "react-icons/tb";
import { SupabaseClient } from "@supabase/supabase-js";

const LogoutButton = ({ supabase }: { supabase: SupabaseClient }) => {
  return (
    <Button
      onClick={() => {
        supabase.auth.signOut();
      }}
    >
      <TbLogout />
    </Button>
  );
};

export default LogoutButton;
