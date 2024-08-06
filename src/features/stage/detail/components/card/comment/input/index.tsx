import Image, { StaticImageData } from 'next/image'
import { useState } from 'react'
import toast from 'react-hot-toast'

interface UserType {
  nickname: string
  email: string
  image: string | StaticImageData | undefined
  isOvener: boolean
  isAuthorized: boolean
}

function StageCommentInputCard({ user }: { user?: UserType }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [comment, setComment] = useState<string>('')

  const handleComment = () => {
    if (!user) {
      toast.error('로그인 후 이용해주세요.')
      return
    }

    if (!comment) {
      toast.error('최소 1자 이상 입력해주세요.')
      return
    }
    setComment('')
    toast.success('의견이 등록되었습니다.')
  }
  return (
    <div className="w-full p-5 flex flex-col gap-y-2 border border-border rounded-xl whitespace-pre-wrap">
      <p className="font-bold">의견쓰기</p>
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center gap-x-2">
          {user?.image && (
            <Image
              src={user.image}
              className="rounded-full"
              alt="profile"
              width={34}
              height={34}
            />
          )}

          <h3 className="font-bold">{user?.nickname}</h3>
        </div>
      </div>

      <div className="flex flex-col gap-y-2">
        {/* 작성란 */}
        <textarea
          placeholder={
            user
              ? '의견을 입력해주세요.'
              : '예매자만 공연 종료 후 작성할 수 있습니다.'
          }
          disabled={!user}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full min-h-[5.5rem] text-xs text-disabled rounded-xl border border-border p-4 resize-none outline-none"
        />

        <div className="w-full flex items-center justify-end">
          <span className="text-2xs text-[#CECCCC]">{`${comment.length} / 500`}</span>
        </div>

        <div className="w-full flex items-center justify-end">
          <button
            type="button"
            className="w-16  py-2 rounded-xl text-xs bg-primary"
            onClick={handleComment}
          >
            등록
          </button>
        </div>
      </div>
    </div>
  )
}

export default StageCommentInputCard
