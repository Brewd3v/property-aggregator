import Slider from './Slider'

export default function Listings({ listings }) {
    return (
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-4xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Lastest Properties from Rightmove</h2>
            <div className="mt-16 space-y-20 lg:mt-20 lg:space-y-20">
              {listings.items && listings.items.map((item, index) => (
                <article key={index} className="flex gap-6">
                    <div className="w-[45%]">
                        <Slider images={item.images} />
                    </div>
                  <div>
                    <div className="flex items-center gap-x-4 text-xs">
                      <span className="text-gray-500">
                        {item.dateListed}
                      </span>
                      <a
                        href={item.url} target="_blank" rel="noopener"
                        className="relative z-10 cursor-pointer rounded-full bg-gray-50 py-1.5 px-3 font-medium text-gray-600 hover:bg-gray-100"
                      >
                        {item.estateAgent}
                      </a>
                    </div>
                    <div className="group relative max-w-xl">
                      <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                        <a href={item.url} target="_blank" rel="noopener">
                          <span className="absolute inset-0" />
                          {item.address}
                        </a>
                      </h3>
                      <p>{item.price}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
  