export default function Hero() {
  return (
   <>
      <section className="relative bg-[url('/header.jpg')] bg-cover bg-[center_top_30%] md:bg-[center_top_5%] grid min-h-[590px] -mb-6">
        <div className=' flex flex-col px-8 py-12 text-white max-w-3xl mt-10 gap-2'>
          <h1 className='text-2xl sm:text-5xl font-semibold max-w-[450px] leading-[50px]'>
            De ahora en
            <br />
            adelante, hacés
            <br />
            más con tu dinero
          </h1>
          <div className='w-[25px] border-4 border-primary-color block md:hidden'></div>
          <p className='text-xl sm:text-3xl text-primary-color font-normal'>
            Tu nueva <strong className='font-bold'>billetera virtual</strong>
          </p>
        </div>
      </section>
   </>
  )
}
