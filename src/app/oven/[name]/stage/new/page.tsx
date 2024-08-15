'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import Image, { StaticImageData } from 'next/image'
import { useState } from 'react'
import toast from 'react-hot-toast'

import { privateApi } from '@/api/config/privateApi.ts'
import OvenManageCalendar from '@/features/oven/components/manage/stage/calendar/index.tsx'
import OvenManageCard from '@/features/oven/components/manage/stage/card/index.tsx'
import SquareFillSVG from '@/static/svg/square-fill-icon.svg'
import SquareUnfillSVG from '@/static/svg/square-unfill-icon.svg'
import 'react-quill/dist/quill.snow.css'
import CameraSVG from '@/static/svg/stage/stage-camera-icon.svg'

// const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

interface EpsiodeType {
  episodeNumber: number
  time: string
  reserveTime: string
}

interface OvenNewStagePageProps {
  params: {
    name: string
  }
}
type EpisodeType = {
  episodeNumber: number
  time: string
  reserveTime: string
}

function serializeEpisodesToString(episodes: EpisodeType[]): string {
  const serializedParts: string[] = []

  episodes.forEach((episode, index) => {
    Object.keys(episode).forEach((key) => {
      const serializedKey = `content[${index}].${key}`
      const value = episode[key as keyof EpisodeType]
      serializedParts.push(`${serializedKey}=${value}`)
    })
  })

  // if (serializedParts.length > 0) {
  //   // 마지막 요소에서 쉼표 제거
  //   serializedParts[serializedParts.length - 1] = serializedParts[
  //     serializedParts.length - 1
  //   ].slice(0, -1)
  // }

  return serializedParts.join('')
}

function OvenNewStagePage({ params: { name: id } }: OvenNewStagePageProps) {
  const queryClient = useQueryClient()
  const [submitImage, setSubmitImage] = useState<File | null>(null)
  const [stageName, setStageName] = useState<string>('')
  const [stageSubName, setStageSubName] = useState<string>('')
  const [profile, setProfile] = useState<string | StaticImageData>('')
  const [category, setCategory] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ])
  const [cost, setCost] = useState<number>(0)
  const [location, setLocation] = useState<string>('')
  const [headCount, setHeadCount] = useState<number>(0)

  const [isMaxTicketChecked, setIsMaxTicketChecked] = useState<boolean>(false)
  const [maxTicketCount, setMaxTicketCount] = useState<number>(0)

  const [runningTime, setRunningTime] = useState<number>(0)

  const [episodes, setEpisodes] = useState<EpsiodeType[]>([])

  const [detail, setDetail] = useState<string | StaticImageData>('')
  const [detailImage, setDetailImage] = useState<File | null>(null)
  const { mutate: createStage } = useMutation({
    mutationFn: async () => {
      const formData = new FormData()
      formData.append('ovenId', id)
      formData.append('location', location)
      formData.append('title', stageName)
      formData.append('subTitle', stageSubName)
      if (category[0]) formData.append('category', 'PERFORMANCE')
      if (category[1]) formData.append('category', 'LECTURE')
      if (category[2]) formData.append('category', 'CLUB')
      if (category[3]) formData.append('category', 'ETC')
      formData.append('detail', '')
      formData.append('detailImage', detailImage as File)
      formData.append('image', submitImage as File)
      formData.append('headCount', String(headCount))
      formData.append('episodeAmount', String(episodes.length))
      formData.append('content', serializeEpisodesToString(episodes))
      formData.append('cost', String(cost))
      formData.append('runningTime', String(runningTime))
      formData.append('reserveLimit', String(maxTicketCount))
      const response = await privateApi.post(`/api/event/regist`, formData)
      return response.data
    },
    onSuccess: () => {
      toast.success('스테이지 등록이 완료되었습니다.')
      queryClient.invalidateQueries({ queryKey: ['oven-detail', id] })
    },
    onError: () => {
      toast.error('스테이지 등록에 실패했습니다.')
    },
  })

  const submitForm = () => {
    if (
      !stageName ||
      !stageSubName ||
      !profile ||
      !location ||
      !cost ||
      !headCount ||
      !runningTime ||
      !detail
      // checkEpsiodes
    ) {
      toast.error('미작성 항목이 있습니다.')
      return
    }

    const confirm = window.confirm(
      '한 번 등록 후에는 수정이 어렵습니다.\n정말 이 내용으로 등록하시겠습니까?',
    )

    if (confirm) {
      createStage()
    }
  }

  // const checkEpsiodes = episodes.some(
  //   (episode) => episode.time === '' || episode.reserveTime === '',
  // )

  const handleCategory = (index: number) => {
    setCategory((prev) => {
      const newCategory = prev.map((_, i) =>
        i === index ? !prev[index] : false,
      )
      return newCategory
    })
  }

  const handleProfileImage = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string,
  ) => {
    const {
      target: { files },
    } = e

    if (files?.length === 0) {
      return
    }

    const file = files?.[0]
    if (type === 'profile') setSubmitImage(file as File)
    if (type === 'detail') setDetailImage(file as File)
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file as Blob)
    fileReader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }: any = finishedEvent
      if (type === 'profile') setProfile(result)
      if (type === 'detail') setDetail(result)
    }
  }

  const handleRunningTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const regex = /^[0-9]*$/
    if (regex.test(value)) {
      setRunningTime(Number(value))
    } else {
      toast.error('숫자만 입력해주세요.')
    }
  }

  const handleMaxTicketCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const regex = /^[0-9]*$/
    if (regex.test(value)) {
      setMaxTicketCount(Number(value))
    } else {
      toast.error('숫자만 입력해주세요.')
    }
  }

  const handleCost = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const regex = /^[0-9]*$/
    if (regex.test(value)) {
      setCost(Number(value))
    } else {
      toast.error('숫자만 입력해주세요.')
    }
  }

  const handleHeadCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const regex = /^[0-9]*$/
    if (regex.test(value)) {
      setHeadCount(Number(value))
    } else {
      toast.error('숫자만 입력해주세요.')
    }
  }
  return (
    <div className="px-7 py-4 flex flex-col gap-y-4">
      {/* poster */}
      <OvenManageCard className="p-5 flex flex-col gap-y-3">
        <h3 className="text-xl font-bold">스테이지 대표 포스터 등록</h3>
        <div className="flex flex-col text-sm text-disabled">
          <span>스테이지의 대표 포스터를 등록해주세요.</span>
          <span>이미지는 png,jpg,jpeg 형식, 2MB 이하만 등록 가능합니다.</span>
          <span>일반 포스터 규격(A2,A4)사이즈 등록을 권장드립니다.</span>
        </div>
        <div className="py-5 border border-border rounded-xl flex items-center justify-center">
          <label
            htmlFor="oven-profile-file"
            className="cursor-pointer max-h-[21.25rem] w-60 flex items-center justify-center"
          >
            {profile === '' ? (
              <div className="w-full flex flex-col gap-y-2 items-center py-32 bg-[#E5E5ED]  rounded-xl">
                <CameraSVG className="w-6 h-6" />
                <span className="text-xs underline">파일 선택</span>
              </div>
            ) : (
              <Image
                src={profile}
                alt="stage-profile"
                width={240}
                height={340}
                className="w-52 h-52 rounded-xl"
              />
            )}
          </label>
          <input
            type="file"
            name="oven-profile-file"
            id="oven-profile-file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleProfileImage(e, 'profile')}
          />
        </div>
      </OvenManageCard>

      <OvenManageCard className="p-5 flex flex-col gap-y-3">
        <h3 className="text-xl font-bold">스테이지명을 입력</h3>
        <label htmlFor="stage-name-input" className="text-disabled">
          최상단에 표시될 스테이지의 제목을 입력해주세요. (최대 15자)
        </label>
        <input
          id="stage-name-input"
          type="text"
          value={stageName}
          className="p-4 border border-border rounded-xl focus:outline-none"
          placeholder="스테이지 제목 입력"
          onChange={(e) => setStageName(e.target.value)}
        />
      </OvenManageCard>

      <OvenManageCard className="p-5 flex flex-col gap-y-3">
        <h3 className="text-xl font-bold">스테이지 부제목을 입력</h3>
        <label htmlFor="stage-sub-name-input" className="text-disabled">
          제목과 부제목을 전부 포함한 긴 제목을 입력해주세요.
        </label>
        <input
          id="stage-sub-name-input"
          type="text"
          value={stageSubName}
          className="p-4 border border-border rounded-xl focus:outline-none"
          placeholder="스테이지 부제목 입력"
          onChange={(e) => setStageSubName(e.target.value)}
        />
      </OvenManageCard>

      <OvenManageCard className="p-5 flex flex-col gap-y-3">
        <h3 className="text-xl font-bold">스테이지 카테고리 선택</h3>

        <div className="flex flex-wrap justify-between items-center gap-y-2">
          {category.map((item, index) => (
            <button
              type="button"
              // eslint-disable-next-line react/no-array-index-key
              key={`stage-category-${index}`}
              id={`stage-category-${index}`}
              onClick={() => handleCategory(index)}
              className="w-[45%] py-1 px-2 flex-shrink-0 flex items-center gap-x-4"
            >
              {item ? (
                <SquareFillSVG className="w-6 h-6" />
              ) : (
                <SquareUnfillSVG className="w-6 h-6" />
              )}
              <label htmlFor={`stage-category-${index}`}>
                {index === 0 && '공연'}
                {index === 1 && '강연'}
                {index === 2 && '소모임'}
                {index === 3 && '기타'}
              </label>
            </button>
          ))}
        </div>
      </OvenManageCard>

      <OvenManageCard className="p-5 flex flex-col gap-y-3">
        <h3 className="text-xl font-bold">스테이지 장소 입력</h3>
        <label htmlFor="stage-location-input" className="text-disabled">
          지역 - 장소로 입력해주세요. 예 ) 서울 - 멀티캠퍼스 역삼
        </label>
        <input
          id="stage-location-input"
          type="text"
          value={location}
          className="p-4 border border-border rounded-xl focus:outline-none"
          placeholder="스테이지 장소를 입력"
          onChange={(e) => setLocation(e.target.value)}
        />
      </OvenManageCard>

      <OvenManageCard className="p-5 flex flex-col gap-y-3">
        <h3 className="text-xl font-bold">티켓 종류 선택</h3>

        <div className="flex items-center gap-x-3">
          <div className="w-6 h-6 flex items-center justify-center bg-white rounded-full border-2 border-primary">
            <div className="w-4 h-4 bg-primary rounded-full" />
          </div>
          <div>전석 자유석 | 입장 순서순으로 안내</div>
        </div>
      </OvenManageCard>

      <OvenManageCard className="p-5 flex flex-col gap-y-3">
        <h3 className="text-xl font-bold">티켓 금액 (원)</h3>
        <label htmlFor="stage-cost-input" className="text-disabled">
          숫자만 입력해주세요.
        </label>
        <div className="flex items-center justify-between gap-x-3">
          <input
            id="stage-cost-input"
            type="text"
            value={cost === 0 ? '' : cost}
            className="flex-1 p-4 border border-border rounded-xl focus:outline-none"
            placeholder="티켓 가격 입력"
            onChange={handleCost}
          />
          <span>원</span>
        </div>
      </OvenManageCard>

      <OvenManageCard className="p-5 flex flex-col gap-y-3">
        <h3 className="text-xl font-bold">입장 인원 (명)</h3>
        <label htmlFor="stage-head-count-input" className="text-disabled">
          숫자만 입력해주세요.
        </label>
        <div className="flex items-center justify-between gap-x-3">
          <input
            id="stage-head-count-input"
            type="text"
            value={headCount === 0 ? '' : headCount}
            className="flex-1 p-4 border border-border rounded-xl focus:outline-none"
            placeholder="수용 가능한 인원 수 입력"
            onChange={handleHeadCount}
          />
          <span>명</span>
        </div>
      </OvenManageCard>

      <OvenManageCard className="p-5 flex flex-col gap-y-3">
        <h3 className="text-xl font-bold">1인 구매수량</h3>
        <span className="text-disabled">
          1인당 티켓 구매 가능 수량이 제한되어 있을 경우 입력해주세요.
        </span>
        <button
          type="button"
          className="p-1 flex items-center gap-x-2"
          onClick={() => setIsMaxTicketChecked(!isMaxTicketChecked)}
        >
          {isMaxTicketChecked ? (
            <SquareFillSVG className="w-6 h-6" />
          ) : (
            <SquareUnfillSVG className="w-6 h-6" />
          )}
          <span>수량 제한 있음</span>
        </button>
        {isMaxTicketChecked && (
          <div className="flex items-center justify-between gap-x-3">
            <span>최대</span>
            <input
              type="text"
              name="max-ticket-count"
              value={maxTicketCount === 0 ? '' : maxTicketCount}
              className="flex-1 p-4 border border-border rounded-xl focus:outline-none"
              placeholder="1인 당 구매 가능한 수량을 입력"
              onChange={handleMaxTicketCount}
            />
            <span>매</span>
          </div>
        )}
      </OvenManageCard>

      {/* 스테이지 */}
      <OvenManageCard className="p-5 flex flex-col gap-y-3">
        <h3 className="text-xl font-bold">스테이지 날짜/시간</h3>
        <span className="text-disabled">
          예매를 시작할 날짜와 시간을 입력해주세요.
        </span>
        <OvenManageCalendar
          epsiodes={episodes}
          setEpisodes={setEpisodes}
          isReserve={false}
        />
      </OvenManageCard>
      {/* 예매오픈 */}
      <OvenManageCard className="p-5 flex flex-col gap-y-3">
        <h3 className="text-xl font-bold">예매 오픈 예정일</h3>
        <span className="text-disabled">
          예매를 시작할 날짜와 시간을 입력해주세요.
        </span>
        <OvenManageCalendar
          epsiodes={episodes}
          setEpisodes={setEpisodes}
          isReserve
        />
      </OvenManageCard>
      {/* 러닝타임 */}
      <OvenManageCard className="p-5 flex flex-col gap-y-3">
        <h3 className="text-xl font-bold">러닝타임 (분)</h3>
        <label htmlFor="stage-running-input" className="text-disabled">
          스테이지 진행 시간을 입력해주세요.
        </label>
        <div className="flex items-center justify-between gap-x-3">
          <input
            id="stage-running-input"
            type="text"
            value={runningTime === 0 ? '' : runningTime}
            className="flex-1 p-4 border border-border rounded-xl focus:outline-none"
            placeholder="러닝타임을 입력"
            onChange={handleRunningTime}
          />
          <span>분</span>
        </div>
      </OvenManageCard>
      {/* 정산계좌 */}
      <OvenManageCard className="p-5 flex flex-col gap-y-3">
        <h3 className="text-xl font-bold">정산 계좌</h3>
        <div className="p-4 rounded-xl bg-[#E5E5ED] text-disabled">
          신한은행 김릴파 110-105-466890
        </div>
      </OvenManageCard>
      {/* 상세설명 */}
      <OvenManageCard className="p-5 flex flex-col gap-y-3">
        <h3 className="text-xl font-bold">상세 설명</h3>
        <h4 className="text-disabled mb-4">
          스테이지에 대한 상세 설명이 담긴 사진을 입력해주세요.
        </h4>
        <label
          htmlFor="stage-detail-file"
          className="cursor-pointer w-full flex items-center justify-center"
        >
          {profile === '' ? (
            <div className="w-full flex flex-col gap-y-2 items-center py-32 bg-[#E5E5ED]  rounded-xl">
              <CameraSVG className="w-6 h-6" />
              <span className="text-xs underline">파일 선택</span>
            </div>
          ) : (
            <Image
              src={detail}
              alt="stage-profile"
              width={500}
              height={300}
              className="w-[31.25rem] rounded-xl object-cover"
            />
          )}
        </label>
        <input
          type="file"
          name="stage-detail-file"
          id="stage-detail-file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleProfileImage(e, 'detail')}
        />
        {/* <ReactQuill
          theme="snow"
          style={{ height: '18.75rem' }}
          modules={{
            toolbar: [
              [{ header: [1, 2, false] }],
              ['bold', 'italic', 'underline', 'strike', 'blockquote'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              ['link', 'image'],
              ['clean'],
            ],
          }}
          value={detail}
          onChange={setDetail}
        /> */}
      </OvenManageCard>

      <button
        className="p-5 flex items-center justify-center text-2xl bg-primary rounded-xl"
        type="button"
        onClick={submitForm}
      >
        등록하기
      </button>
    </div>
  )
}

export default OvenNewStagePage
