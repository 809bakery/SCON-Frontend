import { useState } from 'react'

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

  const handleMin = (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number,
  ) => {
    const { value } = e.target
    const newMin = [...min]
    newMin[index] = value
    setMin(newMin)
  }

  //   const handleMinModal = (index: number) => {
  //     const newMinDropdown = [...minDropdown]
  //     newMinDropdown[index] = !newMinDropdown[index]
  //     setMinDropdown(newMinDropdown)
  //   }
  return (
    <div className="flex flex-col gap-y-4">
      {epsiodes.map((episode, index) => (
        <div
          key={episode.time}
          className="flex items-center justify-between gap-x-3"
        >
          <input
            type="date"
            className="flex-1 p-4 border border-border rounded-xl focus:outline-none"
            value={episode.time}
          />

          {/* 시 */}
          <div>
            <button type="button">시</button>
          </div>

          {/* 분 */}
          <select
            className="flex flex-col p-4 border border-border rounded-xl focus:outline-none appearance-none cursor-pointer"
            value={min[index]}
            onChange={(e) => handleMin(e, index)}
          >
            <option value="00" selected>
              00분
            </option>
            <option value="15">15분</option>
            <option value="30">30분</option>
            <option value="45">45분</option>
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
