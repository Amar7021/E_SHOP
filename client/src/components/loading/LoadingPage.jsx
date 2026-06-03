import LoadingSVG from "./LoadingSVG"

const LoadingPage = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
          <span className="text-2xl font-bold">E</span>
        </div>
        <LoadingSVG
          width={42}
          height={42}
        />
        <div className="text-center">
          <h3 className="font-semibold">
            Loading E-Cart
          </h3>
          <p className="text-sm text-muted-foreground">
            Preparing your shopping experience...
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoadingPage