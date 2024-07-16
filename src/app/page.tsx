import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <h1>SCON</h1>
      <p>당신만의 스테이지, 스콘이 연결합니다.</p>

      <Link href="/login">로그인 페이지로 이동</Link>
    </div>
  )
}
