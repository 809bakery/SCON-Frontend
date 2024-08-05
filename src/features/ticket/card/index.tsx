interface TicketWrapperCardProps {
  children: React.ReactNode
  classnames?: string
}

function TicketWrapperCard(props: TicketWrapperCardProps) {
  const { children, classnames } = props
  return (
    <div
      className={`${classnames} w-full justify-between border border-border rounded-xl`}
    >
      {children}
    </div>
  )
}

export default TicketWrapperCard
