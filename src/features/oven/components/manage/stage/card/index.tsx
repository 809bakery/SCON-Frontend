interface OvenManageCardProps {
  children: React.ReactNode
  className?: string
}

function OvenManageCard(props: OvenManageCardProps) {
  const { children, className } = props
  return (
    <div className={`${className} border border-border rounded-xl`}>
      {children}
    </div>
  )
}

export default OvenManageCard
