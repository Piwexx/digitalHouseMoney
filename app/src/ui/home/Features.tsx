import { getStaticData } from "@/services/strapi";

export default async function Features() {
   const { data:home, error } = await getStaticData('homes');

  if (error) {
    return <div className="text-red-600">Error</div>;
  }

  return (
    <>
      <section className='relative z-10 bg-primary-color rounded-t-4xl pb-8'>
        <div className='relative z-20 grid gap-y-30 md:gap-4 md:grid-cols-2 max-w-6xl mx-auto'>
          {home.map((el) => (
            <div
              key={el.id} // importante agregar una `key` única si estás renderizando listas
              className='bg-white shadow-lg p-4 rounded-4xl relative z-30 -mt-28 m-3'
            >
              <h2 className='sm:text-4xl text-2xl font-bold mb-4 border-b-2 border-primary-color pb-2 text-secondary-color'>
                {el.title}
              </h2>
              <p className='text-black sm:text-xl text-base'>
                {el.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
