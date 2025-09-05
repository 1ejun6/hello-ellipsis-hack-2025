export function Hero() {
  return (
    <div className="flex flex-col gap-8 items-center text-center">
      <h1 className="text-4xl font-bold">Volunteer Now!</h1>
      <p className="text-lg max-w-xl">
        Sign up to be part of our volunteer group! We are striving to make a change in the lives of our migrant workers, whom we depend heavily on.
            Make an impact on their lives now!
      </p>
      <a
        href="/signup"
        target="_blank"
        rel="noreferrer"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Sign Up Now
      </a>
    </div>
  );
}