'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const Header = () => {
  const router = useRouter();
  const [user, setUser] = useState<{ uid: string; nickname: string } | null>(null);

  useEffect(() => {
    // 하드코딩된 사용자 데이터 (로그인 구현 전까지 테스트 용도입니다!)
    const userData = { uid: '12345', nickname: '테스트유저' };
    setUser(userData);
  }, []);

  // 로그아웃 핸들러
  const handleLogout = () => {
    setUser(null);
    router.push('/');
  };

  return (
    <header className="flex justify-between items-center px-4 py-2 border-b">
      {/* 로고 클릭시 홈으로 이동 */}
      <Link href="/">
        <img src="/images/logo.svg" alt="Pick n Click Logo" className="h-10" />
      </Link>

      {/* 네브 바 */}
      <nav className="flex items-center gap-4 text-sm">
        <Link href="/cart">장바구니</Link>
        {/* 조건부 렌더링(로그인:로그아웃) */}
        {user ? (
          <>
            <Link href="/mypage">마이페이지</Link>
            <button onClick={handleLogout}>로그아웃</button>
          </>
        ) : (
          <>
            <Link href="/login">로그인</Link>
            <Link href="/register">회원가입</Link>
          </>
        )}
      </nav>
    </header>
  );
};