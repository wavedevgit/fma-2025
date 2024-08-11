
const organizers = [
  {
    key: 'math-and-maroc',
    label: 'Math&Maroc',
    imageHref: '/mm.png'
  },
]

const partners = [
  {
    key: 'um6p-cc',
    label: 'UM6P ',
    imageHref: '/um6p_cc.png'
  },
  {
    key: 'adria',
    label: 'Adria ',
    imageHref: '/adria_official_partner.png'
  },
  {
    key: 'evalmee',
    label: 'Evalmee ',
    imageHref: '/evalmee.png'
  },
]

export default function PartnersPage() {
  return (
    <div className="w-full max-w-sm md:max-w-5xl px-5 xl:px-0 mt-10">
      <div className="space-y-6">
        <h1
          className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] md:text-5xl md:leading-[4rem]"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          Organizer
        </h1>

        <div 
          className="flex justify-around flex-wrap gap-6 bg-gray-200 shadow-lg p-8 rounded-lg animate-fade-up opacity-0"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          {organizers.map(organizer =>
            <div 
              className="h-[16rem] w-[16rem] md:h-[18rem] md:w-[18rem] bg-white border-b-4 border-red-500 flex justify-center items-center rounded-md"
              key={organizer.key}
            > 
              <div className="h-fit">
                <img
                  src={organizer.imageHref}
                  style={{height: '60px', width: 'auto'}}
                />
              </div>
            </div>
          )}
        </div>

        <h1
          className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] md:text-5xl md:leading-[4rem]"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          Partners
        </h1>

        <div 
          className="flex justify-around flex-wrap gap-6 bg-gray-200 shadow-lg p-8 rounded-lg animate-fade-up opacity-0"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          {partners.map((partner, index) =>
            <div 
              className="h-[16rem] w-[16rem] md:h-[18rem] md:w-[18rem] bg-white border-b-4 border-red-500 flex justify-center items-center rounded-md"
              key={partner.key}
            > 
              <div className="h-fit">
                <img
                  src={partner.imageHref}
                  style={{height: partner.key === 'adria' ? '80px' : '50px', width: 'auto'}}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}