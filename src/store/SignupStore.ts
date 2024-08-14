import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SignupStore {
  email: string
  setEmail: (email: string) => void
  password: string
  setPassword: (password: string) => void
  nickname: string
  setNickname: (nickname: string) => void
  image: File | string
  setImage: (image: File | string) => void
  type: string
  setType: (type: string) => void
}

const useSignupStore = create(
  persist<SignupStore>(
    (set) => ({
      email: '',
      setEmail: (email) => set({ email }),
      password: '',
      setPassword: (password) => set({ password }),
      nickname: '',
      setNickname: (nickname) => set({ nickname }),
      image: '',
      setImage: (image) => set({ image }),
      type: 'credentials',
      setType: (type) => set({ type }),
    }),
    {
      name: 'signupState',
    },
  ),
)

export default useSignupStore
