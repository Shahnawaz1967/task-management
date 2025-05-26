const LoadingSpinner = ({ size = "medium", text = "Loading..." }) => {
  const sizeClasses = {
    small: "w-6 h-6",
    medium: "w-12 h-12",
    large: "w-16 h-16",
  }

  return (
    <div className="flex flex-col items-center justify-center p-12">
      <div className="relative">
        <div
          className={`${sizeClasses[size]} border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin`}
        ></div>
        <div
          className={`${sizeClasses[size]} border-4 border-transparent border-t-purple-600 rounded-full animate-spin absolute top-0 left-0`}
          style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
        ></div>
      </div>
      {text && <p className="mt-6 text-gray-600 font-medium">{text}</p>}
    </div>
  )
}

export default LoadingSpinner
