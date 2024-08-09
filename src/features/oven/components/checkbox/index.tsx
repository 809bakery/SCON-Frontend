import SquareFillSVG from '@/static/svg/square-fill-icon.svg'
import SquareUnfillSVG from '@/static/svg/square-unfill-icon.svg'

interface CheckboxProps {
  text: string
  checked: boolean
  index: number
  handleCheck: (index: number) => void
}

function OvenCheckbox(props: CheckboxProps) {
  const { text, checked, index, handleCheck } = props
  return (
    <button
      type="button"
      onClick={() => handleCheck(index)}
      className="w-full px-8 py-6 rounded-xl border border-border bg-[#FAFAFA] text-2xl flex items-center gap-x-7"
    >
      <div id={`${index}-checkbox`}>
        {checked ? (
          <SquareFillSVG className="w-8 h-8" />
        ) : (
          <SquareUnfillSVG className="w-8 h-8" />
        )}
      </div>
      <span>{text}</span>
    </button>
  )
}

export default OvenCheckbox
