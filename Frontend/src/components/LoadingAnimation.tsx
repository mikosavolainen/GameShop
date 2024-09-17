export default function LoadingAnimation({className}: {className?: string}) {
  return (
    <div className={`w-16 h-16 border-[6px] border-solid border-r-wrench-purple border-b-wrench-purple border-t-transparent border-l-transparent rounded-full animate-rotate ${className}`}></div>
  );
}
