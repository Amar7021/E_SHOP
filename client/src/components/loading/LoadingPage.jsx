import LoadingSVG from "./LoadingSVG"

const LoadingPage = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
      }}
    >
      <div
        style={{
          width: "100px",
          height: "100px",
          backgroundColor: "#0e0e0e",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LoadingSVG
          width={64}
          height={64}
        />
      </div>
    </div>
  )
}

export default LoadingPage
