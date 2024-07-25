interface InfoFiledProps {
  label: string
  data: string
}

export default function InfoFiled({ label, data }: InfoFiledProps) {
  return (
    <div className="w-full flex gap-3 h-[2rem] items-center">
      <span className="w-[7.5rem]">{label}</span>
      <span className="w-full">{data}</span>
    </div>
  )
}
