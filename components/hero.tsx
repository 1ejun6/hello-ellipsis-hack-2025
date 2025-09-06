// import { NextLogo } from "./next-logo";
// import { SupabaseLogo } from "./supabase-logo";

// export function Hero() {
//   return (
//     <div className="flex flex-col gap-16 items-center">
//       <div className="flex gap-8 justify-center items-center">
//         <a
//           href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
//           target="_blank"
//           rel="noreferrer"
//         > 
//           <SupabaseLogo />
//          </a>
//         <span className="border-l rotate-45 h-6" />
//         <a href="https://nextjs.org/" target="_blank" rel="noreferrer">
//           <NextLogo />
//         </a>
//       </div>
//       <h1 className="sr-only">Welcome!</h1>
//       <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center">
//         {"jejeee "} heebeejee bee
//         <a
//           href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
//           target="_blank"
//           className="font-bold hover:underline"
//           rel="noreferrer"
//         >
//           Supabase
//         </a>{" "}
//         and{" "}
//         <a
//           href="https://nextjs.org/"
//           target="_blank"
//           className="font-bold hover:underline"
//           rel="noreferrer"
//         >
//           Next.js
//         </a>
//       </p>
//       <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
//     </div>
//   );
// }


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

