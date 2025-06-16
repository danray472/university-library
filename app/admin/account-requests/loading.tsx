export default function Loading() {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 border-solid"></div>
      <span className="ml-4 text-blue-600 font-semibold">Loading...</span>
    </div>
  );
} 