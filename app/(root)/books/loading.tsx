export default function Loading() {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-white border-solid"></div>
      <span className="ml-4 text-white font-semibold">Loading...</span>
    </div>
  );
} 