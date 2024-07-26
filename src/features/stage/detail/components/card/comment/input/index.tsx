import Image, { StaticImageData } from 'next/image'
import { useState } from 'react'

interface StageCommentInputCardProps {
  user: {
    nickname: string
    profile: string | StaticImageData
  }
}

function StageCommentInputCard(props: StageCommentInputCardProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [comment, setComment] = useState<string>('')
  const { user } = props
  return (
    <div className="w-full p-5 flex flex-col gap-y-2 border border-border rounded-xl whitespace-pre-wrap">
      <p className="font-bold">의견쓰기</p>
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center gap-x-2">
          <Image
            src={user.profile}
            alt="profile"
            width={34}
            height={34}
            className="rounded-full"
          />

          <h3 className="font-bold">{user.nickname}</h3>
        </div>
      </div>

      <div className="flex flex-col gap-y-2">
        {/* 작성란 */}
        <textarea
          placeholder="예매자만 공연 종료 후 작성할 수 있습니다."
          className="w-full min-h-[5.5rem] text-xs text-disabled rounded-xl border border-border p-2 resize-none outline-none"
        />

        <div className="w-full flex items-center justify-end">
          <span className="text-2xs text-[#CECCCC]">{`${comment.length} / 500`}</span>
        </div>

        <div className="w-full flex items-center justify-end">
          <button
            type="button"
            className="w-16  py-2 rounded-xl text-xs bg-primary"
            onClick={() => alert('댓글이 등록되었습니다.')}
          >
            등록
          </button>
        </div>
      </div>
    </div>
  )
}

export default StageCommentInputCard
