'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

import { privateApi } from '@/api/config/privateApi.ts'
import SquareFillSVG from '@/static/svg/square-fill-icon.svg'
import SquareUnfillSVG from '@/static/svg/square-unfill-icon.svg'

function OvenSettingDelete() {
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const router = useRouter()
  const segment = usePathname().split('/')[2]

  const { data } = useQuery({
    queryKey: ['ovenInfo', segment],
    queryFn: async () => {
      const response = await privateApi.get(`/api/oven/${segment}`)
      return response.data
    },
  })

  const { data: OvenStageData } = useQuery({
    queryKey: ['ovenStage', segment],
    queryFn: async () => {
      const response = await privateApi.get(`/api/event/oven/${segment}`)
      return response.data
    },
  })

  const { mutate: quitOvenFn } = useMutation({
    mutationFn: async () => {
      const response = await privateApi.delete(`/api/oven/${segment}`)
      return response.data
    },

    onSuccess: () => {
      toast.success('오븐 삭제가 완료되었습니다.')
      router.push('/main')
    },

    onError: () => {
      toast.error('오븐 삭제에 실패했습니다.')
    },
  })

  const handleDelete = () => {
    if (!isChecked) {
      toast.error('위 내용에 동의해주세요.')
      return
    }

    if (data.headCount > 1) {
      toast.error(
        '오븐에 자신 외에 남아있는 멤버가 있어 오븐을 삭제할 수 없습니다.',
      )
      return
    }

    if (OvenStageData?.content.length > 0) {
      toast.error('개최중인 스테이지가 있어 오븐을 삭제할 수 없습니다.')
      return
    }

    quitOvenFn()
  }
  return (
    <div className="py-32 px-14">
      <h3 className="text-4xl font-bold pb-14">
        오븐 삭제 전,
        <br />꼭 확인해주세요!
      </h3>

      <ul className="text-disabled text-xl pb-24">
        <li className="py-4">
          • 오븐에 오븐짱 외 남아있는 멤버가 없어야합니다.
        </li>
        <li className="py-4">• 오븐의 모든 정보가 삭제됩니다.</li>
        <li className="py-4">• 복구할 수 없습니다.</li>
        <li className="py-4">
          • 스테이지가 등록되어있는 경우 삭제할 수 없습니다.
        </li>
      </ul>

      <button
        type="button"
        onClick={() => setIsChecked(!isChecked)}
        className="flex items-center gap-x-2 text-disabled mb-10"
      >
        <div id="oven-delete-checkbox">
          {isChecked ? (
            <SquareFillSVG className="w-8 h-8" />
          ) : (
            <SquareUnfillSVG className="w-8 h-8" />
          )}
        </div>

        <span>위 모든 사항을 확인했으며, 동의합니다</span>
      </button>

      <button
        type="button"
        onClick={handleDelete}
        className={`${isChecked ? 'bg-primary text-[#363232]' : 'bg-[#E5E5ED] text-disabled'} text-2xl rounded-xl w-full py-5 flex items-center justify-center`}
      >
        오븐 삭제
      </button>
    </div>
  )
}

export default OvenSettingDelete
