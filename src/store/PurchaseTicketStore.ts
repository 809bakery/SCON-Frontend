import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface TicketPurchaseStore {
  subEventId: number
  setSubEventId: (subEventId: number) => void
  headCount: number
  setHeadCount: (headCount: number) => void
}

const useTicketPurchaseStore = create(
  persist<TicketPurchaseStore>(
    (set) => ({
      subEventId: 0,
      setSubEventId: (subEventId) => set({ subEventId }),
      headCount: 1,
      setHeadCount: (headCount) => set({ headCount }),
    }),
    {
      name: 'ticketPurchaseState',
    },
  ),
)

export default useTicketPurchaseStore
