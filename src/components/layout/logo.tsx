import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center text-xl font-bold text-white">
      <svg
        className="mr-2 h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
        />
      </svg>
      CodeMaster
    </Link>
  );
};

export default Logo;
