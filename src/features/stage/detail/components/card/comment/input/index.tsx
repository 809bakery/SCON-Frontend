import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { useState } from 'react'
import toast from 'react-hot-toast'

import { privateApi } from '@/api/config/privateApi.ts'

interface StageCommentInputCardProps {
  id: string
  isReview: boolean
}

function StageCommentInputCard(props: StageCommentInputCardProps) {
  const { id, isReview } = props
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [comment, setComment] = useState<string>('')

  const { data: user } = useQuery({
    queryKey: ['user-info'],
    queryFn: async () => {
      const response = await privateApi.get('/api/user/info')
      return response.data
    },
  })

  const queryClient = useQueryClient()
  const { mutate: createComment } = useMutation({
    mutationFn: async () => {
      if (isReview) {
        await privateApi.post(`/api/board/${id}/review`, {
          content: comment,
        })
      } else {
        await privateApi.post(`/api/board/${id}/expect`, {
          content: comment,
        })
      }
    },

    onSuccess: () => {
      toast.success('코멘트가 등록되었습니다.')
      queryClient.invalidateQueries({
        queryKey: ['list_stage_expected_comments', id, isReview],
      })
      setComment('')
    },
    onError: () => {
      toast.error('코멘트 등록에 실패했습니다.')
    },
  })

  const handleComment = () => {
    if (!user) {
      toast.error('로그인 후 이용해주세요.')
      return
    }

    if (!comment) {
      toast.error('최소 1자 이상 입력해주세요.')
      return
    }

    createComment()
  }
  return (
    <div className="w-full p-5 flex flex-col gap-y-2 border border-border rounded-xl whitespace-pre-wrap">
      <p className="font-bold">의견쓰기</p>
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center gap-x-2">
          {user?.image && (
            <Image
              src={user.image}
              className="w-8 h-8 object-cover rounded-full"
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
