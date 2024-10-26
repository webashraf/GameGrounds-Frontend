import { Skeleton } from "../../ui/skeleton";

const Loader = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="flex-col gap-4 w-full flex items-center justify-center">
        <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
          <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;

export function SkeletonCard(arrLength = 6) {
  // Creates an array of undefined elements with a length of arrLength
  const fakeArr = Array.from({ length: 6 });

  return (
    <div className="flex gap-10 flex-wrap items-center justify-center">
      {fakeArr.map((_, i) => (
        <div key={i} className="flex flex-col space-y-3">
          <Skeleton className="h-[125px] bg-zinc-400 w-[250px] rounded-xl" />

          <div className="space-y-2 relative">
            <Skeleton className="h-4 w-[250px] bg-zinc-400" />
            <Skeleton className="h-4 w-[200px] bg-zinc-400" />
            <Skeleton className="h-[80px] w-[120px] bg-zinc-400 rounded-xl absolute right-0 -bottom-10" />
          </div>
        </div>
      ))}
    </div>
  );
}
