
const organizers = [
  {
    key: 'math-and-maroc',
    label: 'Math&Maroc',
    imageHref: '/mm.png'
  },
]

const partners = [
  {
    key: 'adria',
    label: 'Adria ',
    imageHref: '/adria_official_partner.png',
    imageHeight: '90px',
  },
  {
    key: 'akhawayn',
    label: 'Akhawayn ',
    imageHref: '/akhawayn.png',
    imageHeight: '130px',
  },
  {
    key: 'ram',
    label: 'RAM ',
    imageHref: '/ram.svg',
    imageHeight: '120px',
  },
]

export default function PartnersPage() {
  return (
    <div className="w-full max-w-sm md:max-w-7xl px-5 xl:px-0 mt-10">
      <div className="space-y-6">
        <h1
          className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] md:text-5xl md:leading-[4rem]"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          Organisateur
        </h1>

        <div 
          className="flex justify-around flex-wrap gap-6 bg-gray-200 shadow-lg p-8 rounded-lg animate-fade-up opacity-0"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          <div 
            className="w-[16rem] md:h-[18rem] md:w-[40rem] bg-white border-b-4 border-red-500 md:flex justify-center items-center rounded-md"
            key={organizers[0].key}
          > 
            <div className="h-[8rem] w-[16rem] md:h-fit md:w-[18rem] flex justify-center items-center">
              <img
                src={organizers[0].imageHref}
                style={{height: '60px', width: 'auto'}}
              />
            </div>

            <div className="h-fit w-[16rem] p-4 md:w-[24rem] flex flex-col space-y-2">
              <div><span className='mb-8 bg-gradient-to-br from-sky-500 to-[#272162] text-transparent bg-clip-text font-semibold'>Math&Maroc</span> est une association à but non lucratif créée en 2016 par de jeunes Marocains désireux de redonner à la collectivité.</div>
              <div><span className="mb-8 bg-gradient-to-br from-sky-500 to-[#272162] text-transparent bg-clip-text font-semibold">Notre mission</span> est de promouvoir les mathématiques et les sciences au Maroc, d&apos;inspirer et de guider les jeunes vers l&apos;excellence, et de contribuer au développement de notre pays.</div>
            </div>
          </div>
        </div>

        <h1
          className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] md:text-5xl md:leading-[4rem]"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          Partenaires
        </h1>

        <div 
          className="flex justify-around flex-wrap gap-6 bg-gray-200 shadow-lg p-8 rounded-lg animate-fade-up opacity-0"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          <div 
            className="w-[16rem] md:h-[18rem] md:w-[36rem] bg-white border-b-4 border-red-500 md:flex justify-center items-center rounded-md"
            key={partners[0].key}
          >
            <div className="h-[8rem] w-[16rem] md:h-fit md:w-[18rem] flex justify-center items-center">
              <img
                src={partners[0].imageHref}
                style={{height: partners[0].imageHeight, width: 'auto'}}
              />
            </div>

            <div className="h-fit w-[16rem] p-4 md:w-[20rem] flex flex-col space-y-2">
              <div><span className='mb-8 bg-gradient-to-br from-stone-500 to-[#FC5C00] text-transparent bg-clip-text font-semibold'>Adria Business and Technology</span> est un expert dans l&apos;édition et l&apos;intégration des logiciels destinés aux institutions financières.</div>
              <div>Il s&apos;agit du <span className="font-semibold">partenaire officiel</span> de Math&Maroc, qui a permis à la majorité de nos événements de voir le jour.</div>
            </div>
          </div>

          <div
            className="w-[16rem] md:h-[18rem] md:w-[36rem] bg-white border-b-4 border-red-500 md:flex justify-center items-center rounded-md"
            key={partners[1].key}
          > 
            <div className="h-[8rem] w-[16rem] md:h-fit md:w-[18rem] flex justify-center items-center">
              <img
                src={partners[1].imageHref}
                style={{height: partners[1].imageHeight, width: 'auto'}}
              />
            </div>

            <div className="h-fit w-[16rem] p-4 md:w-[20rem] flex flex-col space-y-2">
              <div><span className='mb-8 bg-gradient-to-br from-[#1d9145] to-[#166432] text-transparent bg-clip-text font-semibold'>Université Al Akhawayn (AUI)</span> est une institution d&apos;élite au Maroc, reconnue pour son excellence académique. Elle forme des leaders engagés et ouverts sur le monde, dans un cadre multiculturel et moderne.</div>
            </div>
          </div>

          <div
            className="w-[16rem] md:h-[18rem] md:w-[36rem] bg-white border-b-4 border-red-500 md:flex justify-center items-center rounded-md"
            key={partners[2].key}
          > 
            <div className="h-[8rem] w-[16rem] md:h-fit md:w-[18rem] flex justify-center items-center">
              <img
                src={partners[2].imageHref}
                style={{height: partners[2].imageHeight, width: 'auto'}}
              />
            </div>

            <div className="h-fit w-[16rem] p-4 md:w-[20rem] flex flex-col space-y-2">
              <div>La <span className='mb-8 bg-gradient-to-br from-[#f9597c] to-[#c3022d] text-transparent bg-clip-text font-semibold'>Royal Air Maroc</span>, compagnie aérienne nationale du Maroc, est une référence en matière d&apos;excellence et de service. Alliant modernité et tradition, elle relie le Maroc au monde tout en offrant une expérience de voyage unique et authentique.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}