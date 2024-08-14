import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CreateOvenStore {
  ovenName: string
  setOvenName: (ovenName: string) => void
  ovenDetail: string
  setOvenDetail: (ovenDetail: string) => void
  bankName: string
  setBankName: (bankName: string) => void
  wishCategory: string[]
  setWishCategory: (wishCategory: string[]) => void
  account: string
  setAccount: (account: string) => void
  accountName: string
  setAccountName: (accountName: string) => void
  image: File | string
  setImage: (image: File | string) => void
}

const useCreateOvenStore = create(
  persist<CreateOvenStore>(
    (set) => ({
      ovenName: '',
      setOvenName: (ovenName) => set({ ovenName }),
      ovenDetail: '',
      setOvenDetail: (ovenDetail) => set({ ovenDetail }),
      bankName: '',
      setBankName: (bankName) => set({ bankName }),
      wishCategory: [],
      setWishCategory: (wishCategory) => set({ wishCategory }),
      account: '',
      setAccount: (account) => set({ account }),
      accountName: '',
      setAccountName: (accountName) => set({ accountName }),
      image: '',
      setImage: (image) => set({ image }),
    }),
    {
      name: 'createOvenState',
    },
  ),
)

export default useCreateOvenStore
