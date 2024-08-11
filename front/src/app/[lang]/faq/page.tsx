import { Accordion, AccordionItem, AccordionTrigger, AccordionContent} from "@/components/shared/accordion";

export default function FAQPage() {
  return (
    <div className="w-full max-w-sm md:max-w-5xl px-5 xl:px-0 mt-10">
    {/* Informations */}
      <div className="space-y-6">
        <h1
          className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] md:text-5xl md:leading-[4rem]"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          FAQ
        </h1>

        <p
          className="animate-fade-up bg-clip-text text-center font-display text-base font-bold text-black opacity-0"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          Before sending an email with your question, we kindly ask that you review this FAQ. Please note that we will not respond to emails for questions already addressed in this FAQ.
        </p>
      </div>

      <Accordion 
        type="single" 
        collapsible 
        className="animate-fade-up text-black opacity-0 mt-10"
        style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>Who can apply?</AccordionTrigger>
          <AccordionContent className="text-gray-700">
          Students officially enrolled in a higher education program, from <span className="font-bold">bac+1 to bac+4</span>, during the academic year <span className="font-bold">2023-2024</span>. This includes Moroccans studying in Morocco or abroad, and non-Moroccans studying in Morocco.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>When is the deadline to apply?</AccordionTrigger>
          <AccordionContent className="text-gray-700">
          The deadline is <span className="font-bold">May 31st at 23:59</span> Moroccan time. Do not wait until the last day to submit your application. No exceptions will be granted for late submissions, regardless of reasons such as forgetting to submit the application or experiencing internet connectivity issues or any other excuse.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>What is the level of the exams?</AccordionTrigger>
          <AccordionContent className="text-gray-700">
          All participants will undergo the same set of exercises. The questions will be based on the first-year program only and will not require theoretical knowledge beyond that level. Our goal is to assess mathematical excellence without favoring older students.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>How can I prepare?</AccordionTrigger>
          <AccordionContent className="text-gray-700">
          We provide a syllabus of required knowledge on our competition’s website. You can also review the set of practice exercises and last year’s exam.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger>Is participation free?</AccordionTrigger>
          <AccordionContent className="text-gray-700">
          Participation is free and includes accommodation for the nights of July 28th, 29th, 30th and 31st, as well as meals from July 28th dinner to August 1st breakfast. This doesn’t include transportation to/from UM6P.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6">
          <AccordionTrigger>Am I required to come in person?</AccordionTrigger>
          <AccordionContent className="text-gray-700">
          Yes. You must come in person at UM6P and stay during the entire duration of the event.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-7">
          <AccordionTrigger>What if I have a question, a special request?</AccordionTrigger>
          <AccordionContent className="text-gray-700">
          Write to <span className="text-blue-500">math.maroc.competition@gmail.com</span>. Any response provided through any other method or by any other individual is not considered official.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-8">
          <AccordionTrigger>What if I don{"’"}t have my official transcripts for this year?</AccordionTrigger>
          <AccordionContent className="text-gray-700">
          All documents are required and will be checked individually by our team. If you haven{"'"}t obtained your official transcript yet, you should utilize the ample registration period we offer to request it from your university. In that case, we recommend waiting until you have all your documents to submit your application (avoid waiting until the last day). If you still haven{"'"}t received it on May 27th, please email us at that time to explain the situation in detail (but not before).
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-9">
          <AccordionTrigger>How should I sign the rules document?</AccordionTrigger>
          <AccordionContent className="text-gray-700">
          You need to print it, then fill it and sign it in handwriting. However, there is no need to certify this document by the administration (&quot;legalisation&quot;).
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-10">
          <AccordionTrigger>When can I expect a response to my application?</AccordionTrigger>
          <AccordionContent className="text-gray-700">
          Results will be announced few weeks after the application deadline. Every applicant, whether selected, waitlisted or not selected will receive a response. Please do not send emails on this matter, as we will not be responding to them.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-11">
          <AccordionTrigger>When can I expect a final response if I&apos;m on the waitlist?</AccordionTrigger>
          <AccordionContent className="text-gray-700">
          We will reach out to waitlisted applicants on an individual basis and gradually as spots become available. Clearing a spot could happen up to a few days before the event, therefore we cannot provide any timeline. Please do not send emails about your waitlist position, as we will not be responding to them.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}