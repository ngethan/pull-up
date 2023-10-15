"use client";

import React, { useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const Signout = () => {
  const supabase = createClientComponentClient();

  useEffect(() => {
    supabase.auth.signOut().then(() => {
      window.location.href = "/";
    });
  });
  return (
    <div>
      <span className={"text-white"}>Signing out...</span>
    </div>
  );
};

export default Signout;
