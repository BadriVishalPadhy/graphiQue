

const Head = () => {
  return (
    <main className='flex justify-center h-[95vh]'>
      <Background />

      <div className="top-0 lg:top-48 p-4 mx-auto relative w-full md:pt-0 scale-50 lg:scale-100">
        <h1 className="text-6xl pb-4 font-extrabold tracking-wide text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-950 to-neutral-600 bg-opacity-50">
          Definitely <span className='text-red-500'>not</span>  Canva
            <br /> But something cool
        </h1>
        <p className="mt-4 font-normal text-xl text-neutral-900 max-w-lg text-center mx-auto">
          Graphique is an open-source graphic design tool <br/> inspired by Canva
        </p>
        <div className='flex justify-center mt-8'>
            <MainButton />
        </div>

    </div>
    

    

    </main>
  )
}

export default Head

function MainButton() {
  return (
    <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[3px] focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-pink-500 shadow-lg  shadow-violet-200">
      <span className="absolute inset-[-1000%] animate-[spin_8s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-7 py-1 text-lg font-semibold text-white backdrop-blur-3xl">
        Get Started
      </span>
    </button>
  );
}

function Background(){
  return(
    <div className="absolute inset-0 -z-10 h-full w-full bg-[#F9F7EE] bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
      </div>
  )
}

