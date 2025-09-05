export default function Dashboard() {
  return (
    <div className="min-h-screen h-screen m-0 bg-stone-100">
      <div className="flex h-1/5 justify-center items-center mx-auto">
        <h1 className="text-5xl">Welcome to Flash Card App</h1>
      </div>
      <div className="flex flex-col h-3/5 justify-center items-center mx-auto">
        {/*card*/}
        <div className="flex flex-col w-80 h-96 rounded-lg justify-center items-center [perspective:1000px]">
          <div
            className={
              "relative w-full h-full transition-all rounded-lg shadow-lg bg-orange-200 duration-500 [transform-style:preserve-3d] [backface-visibility:hidden] hover:[transform:rotateY(180deg)]"
            }
          >
            {/*card content on front side*/}
            <div className="absolute inset-0 overflow-y-auto">a</div>
            {/*card content on back side*/}
            <div className="absolute inset-0 rounded-lg shadow-lg bg-orange-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
              b
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}