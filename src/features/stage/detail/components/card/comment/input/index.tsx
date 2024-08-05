import Image, { StaticImageData } from 'next/image'
import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

interface UserType {
  nickname: string
  email: string
  image: string | StaticImageData | undefined
  isOvener: boolean
}

function StageCommentInputCard() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [comment, setComment] = useState<string>('')
  const [loginUser, setLoginUser] = useState<UserType>()

  useEffect(() => {
    setLoginUser(JSON.parse(sessionStorage.getItem('user')!))
  }, [])

  const handleComment = () => {
    if (!loginUser) {
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
          {loginUser?.image && (
            <Image
              src={loginUser.image}
              alt="profile"
              className="w-8 h-8 rounded-full"
            />
          )}

          <h3 className="font-bold">{loginUser?.nickname}</h3>
        </div>
      </div>

      <div className="flex flex-col gap-y-2">
        {/* 작성란 */}
        <textarea
          placeholder={
            loginUser
              ? '의견을 입력해주세요.'
              : '예매자만 공연 종료 후 작성할 수 있습니다.'
          }
          disabled={!loginUser}
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
      <Toaster />
    </div>
  )
}

export default StageCommentInputCard
