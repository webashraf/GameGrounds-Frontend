import { Skeleton } from "../../ui/skeleton";

function LoadingSkeleton({ skeletonLength = 4, styles = " " }) {
  console.log("skeletonLength", skeletonLength);
  const fakeArr = Array.from({ length: skeletonLength });

  return (
    <div
      className={`grid lg:grid-cols-3 grid-cols-2 gap-12 pb-20  ${styles} items-center justify-center`}
    >
      {fakeArr.map((_, i) => (
        <div key={i} className="flex flex-col space-y-3">
          <Skeleton className="h-[200px] bg-zinc-400 rounded-xl">
            <div className="space-y-2 relative h-full p-5">
              <Skeleton className="h-4 w-[150px] bg-zinc-500" />
              <Skeleton className="h-4 w-[200px] bg-zinc-500" />
              <Skeleton className="h-[110px] w-[160px] bg-zinc-500 rounded-xl absolute -right-10 -bottom-8" />
            </div>
          </Skeleton>
        </div>
      ))}
    </div>
  );
}
export default LoadingSkeleton;
