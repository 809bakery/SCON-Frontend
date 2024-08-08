import Image, { StaticImageData } from 'next/image'

interface OvenBankCardProps {
  image: string | StaticImageData
  bankName: string
  profileBankName: string
  setProfileBankName: React.Dispatch<React.SetStateAction<string>>
}
function OvenBankCard(props: OvenBankCardProps) {
  const { image, bankName, setProfileBankName, profileBankName } = props
  return (
    <button
      type="button"
      onClick={() => setProfileBankName(bankName)}
      className={`w-fit px-4 py-2 shrink-0 flex gap-x-2 items-center border-2 bg-[#FAFAFA] border-border rounded-xl cursor-pointer ${profileBankName === bankName && '!border-primary'} `}
    >
      <Image src={image} alt={bankName} className="w-7 h-7" />
      <span>{bankName}</span>
    </button>
  )
}

export default OvenBankCard
