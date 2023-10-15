"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { getOneFromDB } from "@/components/db";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

type ProfileType = {
  name: string;
  avatar_url: string;
  bio: string;
};

// Removed params from the function arguments
export default function ProfilePage() {
  const supabase = createClientComponentClient();
  const slug = usePathname().substring(9);
  const [profile, setProfile] = useState<any>("bruh");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const profileData = await supabase
          .from("profiles")
          .select()
          .eq("username", slug);
        setProfile(profileData.data![0]);
        console.log(profileData.data![0]);
      } catch (error) {
        console.error("Error fetching profile: ", error);
        setProfile(null);
      }
      setIsLoading(false);
      console.log(isLoading);
    };

    fetchData();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : profile ? (
        <div>
          <Avatar>
            <AvatarImage
              src={profile.avatar_url}
              alt={`${profile.name}'s avatar`}
            />
          </Avatar>
          <h1>{profile.name}</h1>
          <p>{profile.bio}</p>
        </div>
      ) : (
        <div>
          <Button
            onClick={() => {
              console.log(profile);
            }}
          >
            print
          </Button>
          User Not Found
        </div>
      )}
    </div>
  );
}
