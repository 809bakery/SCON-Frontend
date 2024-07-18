interface SideBarMenuProps {
  text: string
}

function SideBarMenu(props: SideBarMenuProps) {
  const { text } = props
  return (
    <div className="px-14 py-7 font-extrabold text-xl border-b border-[#F2F3F7] cursor-pointer">
      <p>{text}</p>
    </div>
  )
}
export default SideBarMenu
