import { DUMMY_OVEN_DETAIL_DATA } from '@/constants/dummy.ts'
import OvenAddCard from '@/features/oven/components/card/add/index.tsx'
import OvenCard from '@/features/oven/components/card/index.tsx'

function MyOvenPage() {
  return (
    <div className="px-5 pt-12 pb-10 flex flex-wrap justify-between items-center gap-x-3 gap-y-10">
      {DUMMY_OVEN_DETAIL_DATA.map((data) => (
        <OvenCard
          ovenName={data.ovenName}
          image={data.image}
          key={data.ovenId}
        />
      ))}
      <OvenAddCard />
    </div>
  )
}

export default MyOvenPage
