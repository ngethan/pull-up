"use client"

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { getOneFromDB } from '@/components/db';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

type ProfileType = {
  name: string;
  avatar_url: string;
  bio: string;
};

// Removed params from the function arguments
export default function ProfilePage() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const slug = usePathname().substring(9);
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof slug === 'string') {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const profileData = await getOneFromDB(supabase, 'profiles', slug);
          setProfile(profileData);
        } catch (error) {
          console.error('Error fetching profile: ', error);
          setProfile(null);
        }
        setIsLoading(false);
      };

      fetchData();
    }
  }, [slug]);

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : profile ? (
        <div>
          <Avatar>
            <AvatarImage src={profile.avatar_url} alt={`${profile.name}'s avatar`} />
          </Avatar>
          <h1>{profile.name}</h1>
          <p>{profile.bio}</p>
        </div>
      ) : (
        <div>User Not Found</div>
      )}
    </div>
  );
}