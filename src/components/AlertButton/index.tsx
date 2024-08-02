interface AlertButtonProps {
  text: string
}

export default function AlertButton({ text }: AlertButtonProps) {
  return (
    <button
      type="button"
      className="cursor-pointer"
      // eslint-disable-next-line no-alert
      onClick={() => alert('준비 중 입니다🍪')}
    >
      {text}
    </button>
  )
}
