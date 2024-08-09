function OvenSetting() {
  return (
    <div className="py-8 bg-[#FAFAFA] text-xl flex flex-col gap-y-8">
      <div>
        <div className="w-full px-8 py-5 bg-white border-y border-border font-bold">
          <p>오븐 관리</p>
        </div>

        <button
          type="button"
          className="w-full px-16 py-5 bg-white text-disabled border-border border-b text-start"
        >
          오븐 프로필 수정하기
        </button>
        <button
          type="button"
          className="w-full px-16 py-5 bg-white text-disabled border-border border-b text-start"
        >
          오븐 멤버
        </button>
      </div>

      <div>
        <div className="w-full px-8 py-5 bg-white border-y border-border font-bold">
          <p>스테이지 관리</p>
        </div>

        <button
          type="button"
          className="w-full px-16 py-5 bg-white text-disabled border-border border-b text-start"
        >
          스테이지 등록하기
        </button>
        <button
          type="button"
          className="w-full px-16 py-5 bg-white text-disabled border-border border-b text-start"
        >
          등록된 스테이지 관리 (QR리더기 / 예매자 명단 확인)
        </button>
      </div>

      <div className="mt-20">
        <button
          type="button"
          className="w-full px-16 py-5 bg-white text-warning font-bold border-border border-y text-start"
        >
          오븐 탈퇴
        </button>
        <button
          type="button"
          className="w-full px-16 py-5 bg-white text-warning font-bold border-border border-b text-start"
        >
          오븐 삭제
        </button>
      </div>
    </div>
  )
}

export default OvenSetting
