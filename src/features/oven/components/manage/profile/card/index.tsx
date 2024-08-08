function OvenProfileCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="py-8 px-5 flex justify-between gap-x-7 border border-border rounded-xl">
      {children}
    </div>
  )
}

export default OvenProfileCard
