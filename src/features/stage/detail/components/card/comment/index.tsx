import { useMutation, useQueryClient } from '@tanstack/react-query'
import Image, { StaticImageData } from 'next/image'
import { useState } from 'react'
import toast from 'react-hot-toast'

import { privateApi } from '@/api/config/privateApi.ts'
import CommentSettingSVG from '@/static/svg/stage/stage-setting-icon.svg'

interface StageDetailCardProps {
  id: string
  boardId: number
  isReview: boolean
  comment: string
  createdAt: string
  liked: number
  user: UserType
}

interface UserType {
  nickname: string
  profile: string | StaticImageData
  isWrite: boolean
  isLike: boolean
}

function StageDetailCommentCard(props: StageDetailCardProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isDeleteModal, seteDeleteModal] = useState<boolean>(false)
  const [isModify, setIsModify] = useState<boolean>(false)
  const [modifyComment, setModifyComment] = useState<string>()

  const { comment, createdAt, liked, user, id, isReview, boardId } = props

  const queryClient = useQueryClient()
  const { mutate: deleteComment } = useMutation({
    mutationFn: async () => {
      if (isReview) {
        await privateApi.delete(`/api/board/${id}/review/${boardId}`)
      } else {
        await privateApi.delete(`/api/board/${id}/expect/${boardId}`)
      }
    },
    onSuccess: () => {
      toast.success('해당 댓글이 삭제되었습니다.')
      queryClient.invalidateQueries({
        queryKey: ['list_stage_expected_comments', id, isReview],
      })
    },
    onError: () => {
      toast.error('댓글 삭제에 실패했습니다.')
    },
  })

  const { mutate: modifyCommentFn } = useMutation({
    mutationFn: async () => {
      if (isReview) {
        await privateApi.patch(`/api/board/${id}/review/${boardId}`, {
          content: modifyComment,
        })
      } else {
        await privateApi.patch(`/api/board/${id}/expect/${boardId}`, {
          content: modifyComment,
        })
      }
    },
    onSuccess: () => {
      toast.success('해당 댓글이 수정되었습니다.')
      queryClient.invalidateQueries({
        queryKey: ['list_stage_expected_comments', id, isReview],
      })
    },
    onError: () => {
      toast.error('댓글 수정에 실패했습니다.')
      setModifyComment(comment)
    },
  })

  const handleDeleteModal = () => {
    setIsModalOpen(false)
    seteDeleteModal(true)
  }

  const handleModifyModal = () => {
    setIsModalOpen(false)
    setIsModify(true)
    setModifyComment(comment)
  }

  const handleDelete = () => {
    deleteComment()
    seteDeleteModal(false)
  }

  const handleModify = () => {
    modifyCommentFn()
    setIsModify(false)
  }

  const cancelModify = () => {
    setIsModify(false)
    setModifyComment(comment)
  }

  const { mutate: patchLike } = useMutation({
    mutationFn: async () => {
      await privateApi.patch(`/api/board/${boardId}/like`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['list_stage_expected_comments', id, isReview],
      })
    },
  })

  const postLike = () => {
    patchLike()
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
            className="rounded-full w-8 h-8 object-cover"
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
                  onClick={() => handleModifyModal()}
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

      <textarea
        placeholder={
          user.isWrite
            ? '내용을 입력해주세요.'
            : '예매자만 공연 종료 후 작성할 수 있습니다.'
        }
        disabled={!isModify}
        value={modifyComment || comment}
        className={`${isModify && 'text-disabled rounded-xl border border-border min-h-[5.5rem]'} w-full text-xs p-4 resize-none outline-none`}
        onChange={(e) => setModifyComment(e.target.value)}
      />
      <div className="flex justify-between items-center gap-x-4">
        <button
          type="button"
          onClick={handleModify}
          className={` ${!isModify && 'hidden'} w-full text-black focus:outline-none bg-primary rounded-xl py-2`}
        >
          저장
        </button>
        <button
          type="button"
          onClick={cancelModify}
          className={` ${!isModify && 'hidden'} w-full border text-disabled focus:outline-none border-border rounded-xl py-2`}
        >
          취소
        </button>
      </div>
      {/* liked */}
      <div className="w-full flex items-center justify-end">
        <button
          type="button"
          className={`w-16  py-2 rounded-xl text-xs border ${user.isLike ? 'border-primary text-primary' : 'border-border text-disabled '}`}
          onClick={postLike}
        >
          👍 {liked}
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
              onClick={handleDelete}
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
