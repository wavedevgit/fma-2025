"use client"

import { Compass, Exam, Rocket, Solution, Trophy } from "@/components/shared/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProblemsPage() {
  const router = useRouter();

  return (
    <div className="w-full max-w-sm md:max-w-5xl px-5 xl:px-0 mt-10">
      <div className="space-y-6">
        <h1
          className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] md:text-5xl md:leading-[4rem]"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          Problems <span className='bg-gradient-to-br from-sky-500 to-[#272162] inline-block text-transparent bg-clip-text'>&</span> Syllabus
        </h1>

        <div
          className="mt-6 animate-fade-up text-center text-gray-800 opacity-0 [text-wrap:balance] md:text-lg"
          style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
        >
          <p className="mt-12">
            For this 2nd edition of <span className='bg-gradient-to-br from-sky-500 to-[#272162] inline-block text-transparent bg-clip-text'>Math&Maroc Competition</span>, the participation will be open to students from <span className="font-semibold">Bac+1 to Bac+4</span>.  
          </p>

          <p className="mt-6">
            Nevertheless, the questions will be based on the first-year program. Our goal is to assess mathematical excellence without favoring older students.
          </p>

          <p className="mt-6">
            Below are useful links to help you prepare for the competition, including the <span className="font-semibold">syllabus</span> and <span className="font-semibold">practice exercises</span>.
          </p>
        </div>
        
        <div
          className="flex justify-around flex-wrap gap-6 p-8 animate-fade-up opacity-0"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          <div className="space-y-4 flex flex-col md:flex-row md:space-x-4 md:space-y-0">          
            <Link href='https://drive.google.com/file/d/138cwliaGh_KuHp4RIKGVrmzirtHaW3tf/view' target="_blank">
              <div 
                className="h-[7rem] w-[8rem] bg-white border-b-4 border-b-red-500 border-2 shadow-md flex justify-center items-center rounded-md py-2 hover:cursor-pointer"
              > 
                <div className="flex flex-col items-center text-center">
                <span className="text-sm">Syllabus 2024</span>
                <Compass />
                </div>
              </div>
            </Link>

            <Link href='https://drive.google.com/file/d/1L8Zla_r5Qh86J8lx36va9IE_YTuP04L2/view?usp=drive_link' target="_blank">
              <div 
                className="h-[7rem] w-[8rem] bg-white border-b-4 border-b-red-500 border-2 shadow-md flex justify-center items-center rounded-md py-2 hover:cursor-pointer"
              > 
                <div className="flex flex-col items-center text-center">
                  <span className="text-sm">Exam 1 2024</span>
                  <Exam />
                </div>
              </div>
              {/* <div className="text-sm text-gray-500 w-[8rem] text-center mt-2">
                Released after contest
              </div> */}
            </Link>

            <Link href='https://drive.google.com/file/d/14JGyh9KM5ekbF9XYe-auTgpwfdjYDu1e/view?usp=drive_link' target="_blank">
              <div 
                className="h-[7rem] w-[8rem] bg-white border-b-4 border-b-red-500 border-2 shadow-md flex justify-center items-center rounded-md py-2 hover:cursor-pointer"
                onClick={() => router.push('/past-edition/results')}
              > 
                <div className="flex flex-col items-center text-center">
                  <span className="text-sm">Exam 2 2024</span>
                  <Exam />
                </div>
              </div>
              {/* <div className="text-sm text-gray-500 w-[8rem] text-center mt-2">
                Released after contest
              </div> */}
            </Link>

            <Link href='https://drive.google.com/file/d/13qO6jjetOpObz2MGRZe_9dRdWTQhYMq8/view?usp=drive_link' target="_blank">
              <div 
                className="h-[7rem] w-[8rem] bg-white border-b-4 border-b-red-500 border-2 shadow-md flex justify-center items-center rounded-md py-2 hover:cursor-pointer"
              > 
                <div className="flex flex-col items-center text-center">
                <span className="text-sm">Solutions 2024</span>
                <Rocket />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}