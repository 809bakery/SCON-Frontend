interface OvenManageCardProps {
  children: React.ReactNode
  className?: string
}

function OvenManageCard(props: OvenManageCardProps) {
  const { children, className } = props
  return (
    <div
      className={`${className} px-8 py-5 border border-border rounded-xl flex flex-col gap-y-4`}
    >
      {children}
    </div>
  )
}

export default OvenManageCard
