interface StageDetailTagProps {
  text: string
  classnames?: string
}

function StageDetailTag(props: StageDetailTagProps) {
  const { text, classnames } = props
  return (
    <div className={`py-1 px-2 ${classnames} shrink-0 rounded-md`}>{text}</div>
  )
}

export default StageDetailTag
