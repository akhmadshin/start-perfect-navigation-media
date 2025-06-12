export const ArticlePageContentSkeleton = () => {
  return (
    <div className="h-screen flex flex-col">
      <div className="basis-1/2 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`animate-spin`}
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
        </svg>
      </div>
      <div className="basis-1/2" />
    </div>
  );
}
