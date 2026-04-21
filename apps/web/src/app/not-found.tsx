export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-8 bg-gray-50 emil-fadein">
      <h1 className="text-4xl font-bold mb-2 text-gray-900 emil-spring">
        404 – Not Found
      </h1>
      <p className="text-base text-gray-500 mb-6 emil-fadein">
        Sorry, the page you are looking for does not exist.
      </p>
      <a
        href="/"
        className="text-green-600 underline hover:text-green-800 transition emil-underline emil-spring"
      >
        Go back home
      </a>
    </div>
  );
}
