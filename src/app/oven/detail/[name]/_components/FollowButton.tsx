import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { privateApi } from '@/api/config/privateApi.ts'
import FilledHeartSVG from '@/static/svg/heart-fill-icon.svg'
import UnfilledHeartSVG from '@/static/svg/heart-unfill-icon.svg'

interface FollowButtonProps {
  id: string
  isFollow: boolean
  ovenName?: string
  refetchFollow?: () => void
  refetchOvenDetail?: () => void
}

export default function FollowButton({
  id,
  isFollow,
  ovenName,
  refetchFollow,
  refetchOvenDetail,
}: FollowButtonProps) {
  const queryClient = useQueryClient()
  const { mutate: followMutate } = useMutation({
    mutationFn: async () => {
      const response = await privateApi.post(`/api/follow`, {
        ovenId: id,
      })
      return response.data
    },
    onSuccess: () => {
      toast.success(`${ovenName} 오븐을 팔로우했습니다.`)
      queryClient.invalidateQueries({ queryKey: ['follow'] })
      queryClient.invalidateQueries({ queryKey: ['oven-detail', id] })
      refetchFollow?.()
      refetchOvenDetail?.()
    },

    onError: () => {
      toast.error('오븐 팔로우에 실패했습니다.')
    },
  })

  const { mutate: unfollowMutate } = useMutation({
    mutationFn: async () => {
      const response = await privateApi.delete(`/api/follow/${id}`)
      return response.data
    },
    onSuccess: () => {
      toast.success(`${ovenName} 오븐을 언팔로우했습니다.`)
      queryClient.invalidateQueries({ queryKey: ['follow'] })
      queryClient.invalidateQueries({ queryKey: ['oven-detail', id] })
      refetchFollow?.()
      refetchOvenDetail?.()
    },
    onError: () => {
      toast.error('오븐 언팔로우에 실패했습니다')
    },
  })

  const onClickFollow = () => {
    if (isFollow) {
      unfollowMutate()
    } else {
      followMutate()
    }
  }

  return (
    <button
      type="button"
      className="flex items-center justify-center gap-2 border border-border px-3 py-1 rounded-xl"
      onClick={onClickFollow}
    >
      {isFollow ? (
        <FilledHeartSVG className="w-[1.875rem] h-[1.875rem]" />
      ) : (
        <UnfilledHeartSVG className="w-[1.875rem] h-[1.875rem]" />
      )}
      <span className="font-bold text-sm">팔로우</span>
    </button>
  )
}
