"use client"

import { Label } from '@/components/shared/label'
import Separator from '@/components/shared/separator';
import { formatDate } from '@/lib/utils'
import { applicationsState } from '@/store/applicationsState';
import React, { ReactNode, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shared/tabs";
import { useRouter } from 'next/navigation';
import { ExpandingArrow } from '@/components/shared/icons';
import ApplicationStatus from '../components/application-status';
import FilesTable from './files-table';

const regionLabels = {
  'tanger-tetouan-al-houceima': "Tanger-Tétouan-Al Hoceïma",
  'oriental': "Oriental",
  'fes-meknes': "Fès-Meknès",
  'rabat-sale-kenitra': "Rabat-Salé-Kénitra",
  'beni-mellal-khenifra': "Béni Mellal-Khénifra",
  'casablanca-settat': "Casablanca-Settat",
  'marrakech-safi': "Marrakech-Safi",
  'draa-tafilalet': "Drâa-Tafilalet",
  'souss-massa': "Souss-Massa",
  'guelmim-oued-noun': "Guelmim-Oued Noun",
  'laayoune-sakia-el-hamra': "Laâyoune-Sakia El Hamra",
  'dakhla-oued-eddahab': "Dakhla-Oued Eddahab",
  'abroad': "Abroad",
} as any;

const educationLevelLabels = {
  'bac-plus-1': "Bac +1",
  'bac-plus-2': "Bac +2",
  'bac-plus-3': "Bac +3",
  'bac-plus-4': "Bac +4",
} as any;

const educationProgramLabels = {
  'cpge': 'CPGE',
  'university': 'University',
  'engineering-school-post-bac': 'Engineering School post BAC',
  'engineering-school-post-cpge': 'Engineering School post CPGE'
} as any;

const Field = ({
  label,
  children,
}: {
  label: string,
  children: ReactNode,
}) => {
  return <div>
    <Label className='text-[#272162] font-semibold'>{label}</Label>
    <p>{children}</p>
  </div>
}

export default function ApplicationDetailsPage({ params }: { params: { id: string } }) {
  const [applications, setApplications] = useRecoilState(applicationsState);
  const [application, setApplication] = useState<any>(undefined);
  const id = parseInt(params.id);
  const router = useRouter();

  useEffect(() => {
    if (applications) {
      setApplication(applications.find((application: any) => application?.id === id))
    }
  }, [applications])

  return (
    <>
      {application
        ? (
          <Tabs defaultValue="personal-informations" className='space-y-8'>
            <div 
              className='font-semibold flex cursor-pointer'
              onClick={() => router.push('/home/applications')}
            >
              <ExpandingArrow className='rotate-180 mr-2'/> {"  "} Back
            </div>

            <div 
              className='font-semibold text-2xl flex justify-between'
            >
              <div>
                Application of <span className='bg-gradient-to-br from-sky-800 to-[#272162] inline-block text-transparent bg-clip-text'>{application?.firstName} {application?.lastName}</span>
              </div>

              <ApplicationStatus applicationId={application?.id} status={application?.status?.status} />
            </div>

            <TabsList className="flex justify-start space-x-8 h-[4rem] bg-slate-200 text-black">
              <TabsTrigger value="personal-informations" className='text-base h-full'>Personal Informations</TabsTrigger>
              <TabsTrigger value="education" className='text-base h-full'>Education</TabsTrigger>
              <TabsTrigger value="competition" className='text-base h-full'>Competition</TabsTrigger>
              <TabsTrigger value="uploads" className='text-base h-full'>Uploads</TabsTrigger>
            </TabsList>
            <Separator className="my-6" />

            {/* PERSONAL INFORMARIONS */}
            <TabsContent value="personal-informations">
              <div className='space-y-6'>
                <Field label='First name'>{application?.firstName}</Field>
                <Field label='Last name'>{application?.lastName}</Field>
                <Field label='Date of birth'>{formatDate(application?.dateOfBirth)}</Field>
                <Field label='CNIE number'>{application?.identityCardNumber}</Field>
                <Field label='City of residence'>{application?.city}</Field>
                <Field label='Region of residence'>{regionLabels[application?.region]}</Field>
                <Field label='Phone number'>{application?.phoneNumber}</Field>
                <Field label='Emergency contact full Name'>{application?.emergencyContactName}</Field>
                <Field label='Emergency contact phone number'>{application?.emergencyContactPhoneNumber}</Field>
              </div>
            </TabsContent>
            
            {/* EDUCATION */}
            <TabsContent value="education">
              <div className='space-y-6'>
                <Field label='In 2023-2024, I attended higher education (in Morocco or abroad) at'>{educationLevelLabels[application?.lastYearEducationLevel]}</Field>
                <Field label='Education program'>{educationProgramLabels[application?.educationProgram]}</Field>
                <Field label='University Name'>{application?.establishment}</Field>
                <Field label='Field of study'>{application?.fieldOfStudy}</Field>

                <Separator className="my-6" />

                {application?.educationProgram === 'cpge'
                  ? (
                    <>
                      <Field label='Math Grade Trimester 1 '>{application?.cpgeGradeTrimesterOne}</Field>
                      <Field label='Math Grade Trimester 2 '>{application?.cpgeGradeTrimesterTwo}</Field>
                      <Field label='Math Ranking Trimester 1 '>{application?.cpgeRankingTrimesterOne}</Field>
                      <Field label='Math Ranking Trimester 2 '>{application?.cpgeRankingTrimesterTwo}</Field>
                    </>
                  )
                  : (
                    <>
                      <Field label='Average Grade of the 3 best scientific subjects'>{application?.nonCpgeAverageThreeBestScienceGrades}</Field>
                      <Field label='Average Grade of all scientific subjects'>{application?.nonCpgeAverageScienceGrades}</Field>
                      <Field label='Overall Average Grade'>{application?.nonCpgeOverallAverage}</Field>
                    </>
                  )
                }
              </div>
            </TabsContent>
              
            {/* COMPETTION */}
            <TabsContent value="competition">
              <div className='space-y-6'>
                <Field label='Have you participated in competitions before (Olympiads, national contests...) ?'>{application?.hasPreviouslyParticipated}</Field>
                <Field label='If yes, please specify which ones and the achieved result.'>{application?.previousCompetitions ? application?.previousCompetitions : <span className='text-gray-400'>(empty)</span>}</Field>
                <Field label='Have you participated in Math&Maroc Competition 2023 ?'>{application?.hasPreviouslyParticipatedInMmc}</Field>
                <Field label='If yes, please specify your ranking'>{application?.previousResultsInMmc ? application?.previousResultsInMmc : <span className='text-gray-400'>(empty)</span>}</Field>
                <Separator className="my-6" />
                <Field label='Motivations'>{application?.motivations}</Field>
                <Field label='Comments'>{application?.comments ? application?.comments : <span className='text-gray-400'>(empty)</span>}</Field>
              </div>
            </TabsContent>
            
            {/* UPLOADS */}
            <TabsContent value="uploads">
              <div className='md:flex space-y-4 md:space-x-4 md:space-y-0 mt-8'>
                <FilesTable application={application} />
              </div>
            </TabsContent>
          </Tabs>
        )
        : <></>
      }
    </>
  )
}
