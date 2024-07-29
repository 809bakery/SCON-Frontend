import Image, { StaticImageData } from 'next/image'
import { useState } from 'react'

import CommentSettingSVG from '@/static/svg/stage/stage-setting-icon.svg'

interface StageDetailCardProps {
  // eslint-disable-next-line react/require-default-props
  comment: string
  createdAt: string
  liked: number
  user: UserType
}

interface UserType {
  nickname: string
  profile: string | StaticImageData
  isWrite: boolean
}

function StageDetailCommentCard(props: StageDetailCardProps) {
  const [isLiked, setIsLiked] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isDeleteModal, seteDeleteModal] = useState<boolean>(false)

  const { comment, createdAt, liked, user } = props

  const deleteComment = () => {
    alert('해당 댓글이 삭제되었습니다.')
    seteDeleteModal(false)
  }

  const handleDeleteModal = () => {
    setIsModalOpen(false)
    seteDeleteModal(true)
  }

  return (
    <div className="w-full p-5 flex flex-col gap-y-3 border border-border rounded-xl whitespace-pre-wrap">
      {/* user info */}
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

          <span className="text-xs text-disabled">
            {new Date(createdAt).toLocaleDateString('ko-kr')}
          </span>
        </div>

        {user.isWrite && (
          <div className="realtive">
            <CommentSettingSVG
              className="w-6 h-6 cursor-pointer"
              onClick={() => setIsModalOpen(!isModalOpen)}
            />
            {isModalOpen && (
              <div className="absolute right-14 text-xs flex flex-col items-center justify-center bg-white border border-border rounded-xl">
                <button
                  type="button"
                  className="px-6 py-2 flex items-center justify-center border-b border-border"
                >
                  수정
                </button>
                <button
                  type="button"
                  className="px-6 py-2 flex items-center justify-center"
                  onClick={() => handleDeleteModal()}
                >
                  삭제
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {comment && <div>{comment}</div>}

      {/* liked */}
      <div className="w-full flex items-center justify-end">
        <button
          type="button"
          className={`w-16  py-2 rounded-xl text-xs border ${isLiked ? 'border-primary text-primary' : 'border-border text-disabled '}`}
          onClick={() => setIsLiked(!isLiked)}
        >
          👍 {isLiked ? liked + 1 : liked}
        </button>
      </div>

      {/* delete modal */}

      <div
        className={`${!isDeleteModal && 'hidden'} w-full h-dvh z-50 fixed left-0 top-0 flex items-center justify-center bg-[#4C4C4C] bg-opacity-80`}
      >
        <div className="bg-white rounded-xl">
          <div className="py-5 px-10 flex items-center justify-center border-b border-border">
            기대평(후기)를 삭제하시겠습니까?
          </div>
          <div className="flex items-center text-xs">
            <button
              type="button"
              className="flex-1 py-4 border-r border-border"
              onClick={deleteComment}
            >
              삭제
            </button>
            <button
              type="button"
              className="flex-1 py-4"
              onClick={() => seteDeleteModal(false)}
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StageDetailCommentCard
