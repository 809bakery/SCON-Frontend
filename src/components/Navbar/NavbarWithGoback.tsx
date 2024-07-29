import { useRouter } from 'next/navigation'

import { DOMAIN_NAME_MAPPING } from '@/components/Navbar/index.tsx'
import BackSVG from '@/static/svg/arrow-left-icon.svg'

interface NavbarWithGobackProps {
  name?: string
  nameList?: string[]
}

const getNameFromDomainMapping = (nameList: string[]) => {
  const index = nameList.length >= 2 ? 1 : 0
  return (
    DOMAIN_NAME_MAPPING[nameList[index]] || DOMAIN_NAME_MAPPING[nameList[0]]
  )
}

export default function NavbarWithGoback({
  name,
  nameList,
}: NavbarWithGobackProps) {
  const router = useRouter()
  // eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle
  let _name
  if (nameList) {
    _name = getNameFromDomainMapping(nameList)
  } else {
    _name = name
  }

  return (
    <div className="abolute top-0 w-full h-[60px] relative flex items-center justify-center py-[14px] border-b border-border text-center text-[#565551]">
      <div
        role="presentation"
        onClick={() => router.back()}
        className="absolute left-7 cursor-pointer"
      >
        <BackSVG className="w-8 h-8 min-w-[24px] min-h-[24px]" />
      </div>
      <span className="font-bold text-[1.5rem]">{_name}</span>
    </div>
  )
}
