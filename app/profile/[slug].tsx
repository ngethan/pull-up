import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { getOneFromDB } from '../../components/db';
import { Avatar, AvatarImage } from '../../components/ui/avatar';

type ProfileType = {
  name: string;
  avatar_url: string;
  bio: string;
};

export default function ProfilePage() {
  const router = useRouter();
  const supabase = createServerComponentClient({ cookies });
  const { slug } = router.query;
  console.log('slug:', slug);
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