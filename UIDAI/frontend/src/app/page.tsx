'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    router.push('/dashboard');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="text-center">
        <div className="w-12 h-12 mx-auto mb-4 flex flex-col border-2 border-[#1A1A1A] animate-pulse">
          <div className="h-1/3 bg-[#FF9933]"></div>
          <div className="h-1/3 bg-white"></div>
          <div className="h-1/3 bg-[#138808]"></div>
        </div>
        <p className="text-[#6B6B6B]">Redirecting to Dashboard...</p>
      </div>
    </div>
  );
}
