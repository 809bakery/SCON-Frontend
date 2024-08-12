interface MemberCheckboxProps {
  children: React.ReactNode
  className?: string
}

function MemberCheckbox(props: MemberCheckboxProps) {
  const { children, className } = props
  return (
    <div className={`${className} flex items-center px-5 py-3 gap-x-5`}>
      {children}
    </div>
  )
}

export default MemberCheckbox
