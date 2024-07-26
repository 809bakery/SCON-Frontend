interface StageDetailCardProps {
  title: string
  // eslint-disable-next-line react/require-default-props
  content?: string
}

function StageDetailCard(props: StageDetailCardProps) {
  const { title, content } = props
  return (
    <div className="w-full p-5 flex flex-col gap-y-2 border border-border rounded-xl whitespace-pre-wrap">
      <p className="font-bold">{title}</p>
      {content && <p>{content}</p>}
    </div>
  )
}

export default StageDetailCard
