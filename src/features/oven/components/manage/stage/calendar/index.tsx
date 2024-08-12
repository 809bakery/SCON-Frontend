import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

interface OvenManageCalendarProps {
  epsiodes: EpsiodeType[]
  setEpisodes: React.Dispatch<React.SetStateAction<EpsiodeType[]>>
  isReserve: boolean
}
interface EpsiodeType {
  episodeNumber: number
  time: string
  reserveTime: string
}

function OvenManageCalendar(props: OvenManageCalendarProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { epsiodes, setEpisodes, isReserve } = props
  const [dateDropdown, setDateDropdown] = useState<boolean[]>([])
  const [timeDropdown, setTimeDropdown] = useState<boolean[]>([])
  const [minDropdown, setMinDropdown] = useState<boolean[]>([])

  const [date, setDate] = useState<string[]>([])
  const [time, setTime] = useState<string[]>([])
  const [min, setMin] = useState<string[]>([])

  useEffect(() => {
    if (!epsiodes.length) return

    const newEpisodes = epsiodes.map((episode, index) => {
      const dateForm = `${date[index]}T${time[index]}:${min[index]}:00`
      if (!date[index] || !time[index] || !min[index]) {
        return {
          episodeNumber: episode.episodeNumber,
          time: !isReserve ? '' : episode.time,
          reserveTime: isReserve ? '' : episode.reserveTime,
        }
      }
      return {
        episodeNumber: episode.episodeNumber,
        time: !isReserve ? dateForm : episode.time,
        reserveTime: isReserve ? dateForm : episode.reserveTime,
      }
    })
    console.log(newEpisodes)
    setEpisodes(newEpisodes)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, time, min])

  const addEpisode = () => {
    setDate([...date, ''])
    setTime([...time, ''])
    setMin([...min, ''])

    setDateDropdown([...dateDropdown, false])
    setTimeDropdown([...timeDropdown, false])
    setMinDropdown([...minDropdown, false])

    const newEpisode = {
      episodeNumber: epsiodes.length + 1,
      time: '',
      reserveTime: '',
    }
    setEpisodes([...epsiodes, newEpisode])
  }

  return (
    <div className="flex flex-col gap-y-4">
      {epsiodes.map((episode, index) => (
        <div
          key={`${episode.episodeNumber}-${episode.time}`}
          className="flex items-center justify-between gap-x-3"
        >
          <input
            type="date"
            className="flex-1 p-4 border border-border rounded-xl focus:outline-none"
            value={date[index] || ''}
            onChange={(e) => {
              const { value } = e.target

              if (new Date(value) < new Date()) {
                toast.error('지난 날짜는 선택할 수 없습니다.')
                return
              }
              const newDate = [...date]
              newDate[index] = value
              setDate(newDate)
            }}
          />

          {/* 시 */}
          <select
            className="px-8 flex flex-col p-4 border border-border rounded-xl focus:outline-none appearance-none cursor-pointer"
            value={time[index] || ''}
            onChange={(e) => {
              const { value } = e.target
              const newTime = [...time]
              newTime[index] = value
              setTime(newTime)
            }}
          >
            <option value="">시간</option>
            <option value="00">00 시</option>
            <option value="01">01 시</option>
            <option value="02">02 시</option>
            <option value="03">03 시</option>
            <option value="04">04 시</option>
            <option value="05">05 시</option>
            <option value="06">06 시</option>
            <option value="07">07 시</option>
            <option value="08">08 시</option>
            <option value="09">09 시</option>
            <option value="10">10 시</option>
            <option value="11">11 시</option>
            <option value="12">12 시</option>
            <option value="13">13 시</option>
            <option value="14">14 시</option>
            <option value="15">15 시</option>
            <option value="16">16 시</option>
            <option value="17">17 시</option>
            <option value="18">18 시</option>
            <option value="19">19 시</option>
            <option value="20">20 시</option>
            <option value="21">21 시</option>
            <option value="22">22 시</option>
            <option value="23">23 시</option>
          </select>

          {/* 분 */}
          <select
            className="px-8 flex flex-col p-4 border border-border rounded-xl focus:outline-none appearance-none cursor-pointer"
            value={min[index] || ''}
            onChange={(e) => {
              const { value } = e.target
              const newMin = [...min]
              newMin[index] = value
              setMin(newMin)
            }}
          >
            <option value="">분</option>
            <option value="00">00 분</option>
            <option value="15">15 분</option>
            <option value="30">30 분</option>
            <option value="45">45 분</option>
          </select>
        </div>
      ))}

      <button
        type="button"
        onClick={addEpisode}
        className="w-full py-4 border border-border rounded-xl flex items-center justify-center text-[#A6A6B1]"
      >
        회차 추가하기
      </button>
    </div>
  )
}

export default OvenManageCalendar
