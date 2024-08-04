import ScheduleCarousel from "./components/schedule-carousel";

export default function SchedulePage() {
  return (
    <div className="w-full max-w-md md:max-w-[85rem] px-5 xl:px-0 mt-10">
      <div className="space-y-6">
        <h1
          className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] md:text-5xl md:leading-[4rem]"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          <span className='mb-8 bg-gradient-to-br from-sky-500 to-[#272162] inline-block text-transparent bg-clip-text'>Programme</span>
        </h1>

        <div
          className="animate-fade-up bg-clip-text text-center font-display text-base font-bold text-black opacity-0"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          <div className="flex justify-start space-x-10">
            <div className="flex flex-col space-y-1">
              <div className="p-1 bg-red-400">Maths</div>
              <div className="p-1 bg-orange-400">Programming</div>
              <div className="p-1 bg-purple-400">Projet</div>
              <div className="p-1 bg-blue-400">Ateliers</div>
              <div className="p-1 bg-green-400">Fun</div>
              <div className="p-1 bg-purple-200">Restauration</div>
            </div>

            <div className="font-normal text-left">
              <p>
                Les élèves seront divisés en 3 petits groupes de 15 personnes pour les activités suivantes:
                <ul className="list-disc text-left pl-6">
                  <li>Mathématiques</li>
                  <li>Informatique</li>
                  <li>Tables rondes orientation</li>
                  <li>Premiers Secours</li>
                  <li>Espace room</li>
                  <li>Board Games</li>
                </ul>
                Des pauses sont prévues au milieu des activités longues.
              </p>
            </div>
          </div>
        </div>

        <div
          className="animate-fade-up bg-clip-text text-center font-display text-base font-bold text-black opacity-0 mt-12"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          <div className="mt-12">
            <ScheduleCarousel />
          </div>
        </div>
      </div>
    </div>
  )
}