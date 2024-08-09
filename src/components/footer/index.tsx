function Footer() {
  return (
    <div className="w-full p-8 flex flex-col gap-y-6 bg-[#F9F9F9] text-disabled">
      <h3 className="font-bold">팔공구 베이커리</h3>
      <div className="text-2xs">
        <p>
          싸피 11기 공통프로젝트 8반 9조 이하림, 곽성재, 박상우, 유우준, 이민정,
          박진우
        </p>
        <p>서울특별시 강남구 테헤란로 212, 멀티캠퍼스 역삼</p>
        <p>
          고객센터 <a href="mailto:809bakery@gmail.com">809bakery@gmail.com</a>
        </p>
      </div>
      <div className="text-sm font-bold flex gap-x-2">
        <a
          target="_blank"
          href="https://hazzz.notion.site/339bc8aeb14a40f9a4a2e44c95764474?pvs=4"
          className="underline cursor-pointer"
          rel="noreferrer"
        >
          이용약관
        </a>
        <span>·</span>
        <a
          target="_blank"
          href="https://hazzz.notion.site/437262d8acef49e9b87641f5d1f64fe6?pvs=4"
          className="underline cursor-pointer"
          rel="noreferrer"
        >
          개인정보처리방침
        </a>
      </div>
    </div>
  )
}

export default Footer
