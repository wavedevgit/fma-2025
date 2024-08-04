"use client"
import { useRouter } from 'next/navigation'
import { MeteorCard } from './meteor-card'

const AboutSection = () => {
  const router = useRouter();

  return (
    <div className="">
      <div className='drop-shadow-sm space-y-6 md:space-y-0 md:flex md:justify-around mb-12 text-center text-lg'>
        Nous sommes avant tout un groupe de gens passionnés par la science, et uni par l&apos;envie de partager et de former les leaders de demain.<br/>
        Notre vision est celle d&apos;un Maroc où chaque jeune a l&apos;opportunité de réaliser son potentiel grâce à une éducation de qualité.
      </div>

      <div
        className="drop-shadow-sm space-y-6 md:space-y-0 md:flex md:justify-around"
      >
        <div className='w-full'>
          <MeteorCard 
            title='Equipe organisatrice' 
            description='Faites la connaissance de nos bénévoles passionnés qui ont consacré d&apos;innombrables heures pour rendre ce projet possible.'
            ctaLabel='Regarder l&apos;équipe'
            className='max-w-xs md:max-w-xl'
            onClick={() => router.push('/organizing-team')}
          />
        </div>

        <div className='w-full'>
          <MeteorCard 
            title='Partenaires' 
            description='Découvrez nos partenaires qui partagent notre engagement à promouvoir l&apos;excellence en mathématiques et sans qui ce projet ne serait pas possible.'
            ctaLabel='Regarder les Partenaires'
            className='max-w-xs md:max-w-xl'
            onClick={() => router.push('/partners')}
          />
        </div>
      </div>
    </div>
    
  )
}

export default AboutSection
