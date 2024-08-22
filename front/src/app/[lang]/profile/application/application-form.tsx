"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Checkbox, Textarea } from "@/components/shared"
import { format } from "date-fns"
import { cn, excludeFileFields } from "@/lib/utils"
import { computeSHA256, generateFileName, getUploadFolderName } from "@/lib/utils"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shared/form"
import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
} from "@/components/shared/select"
import { Input } from "@/components/shared"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shared/popover"
import { Calendar } from "@/components/shared"
import { CalendarIcon } from "@radix-ui/react-icons"
import { PhoneInput } from "@/components/shared/phone-input";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent} from "@/components/shared/accordion";
import { RadioGroup, RadioGroupItem } from '@/components/shared/radio-group';
import Link from "next/link";
import { toast } from "@/components/hooks/use-toast";
import { useState } from "react"
import { deleteApplication, postApplication, putApplication } from "@/api/ApplicationApi"
import { LoadingDots } from "@/components/shared/icons"
import { getSignedURL, uploadFile } from "@/api/MediaApi"
import { applicationSchema, getApplicationDefaultValues } from "@/lib/schemas/application.schema"

const regions = [
  {label: "Tanger-Tétouan-Al Hoceïma", value:"tanger-tetouan-al-houceima"},
  {label: "Oriental", value:"oriental"},
  {label: "Fès-Meknès", value:"fes-meknes"},
  {label: "Rabat-Salé-Kénitra", value:"rabat-sale-kenitra"},
  {label: "Béni Mellal-Khénifra", value:"beni-mellal-khenifra"},
  {label: "Casablanca-Settat", value:"casablanca-settat"},
  {label: "Marrakech-Safi", value:"marrakech-safi"},
  {label: "Drâa-Tafilalet", value:"draa-tafilalet"},
  {label: "Souss-Massa", value:"souss-massa"},
  {label: "Guelmim-Oued Noun", value:"guelmim-oued-noun"},
  {label: "Laâyoune-Sakia El Hamra", value:"laayoune-sakia-el-hamra"},
  {label: "Dakhla-Oued Eddahab", value:"dakhla-oued-eddahab"},
  {label: "Abroad", value:"abroad"},
]


const RequiredAsterisk = () => <span className="text-red-500"> * </span>;

const handleNullValues = (value: any) => value===null ? "" : value;

const sanitizeApplication = (application: any) => {
  const newObject = {} as any;
  Object.keys(application).forEach((key) => {
    newObject[key] = (key === 'dateOfBirth')
      ? new Date(application[key])
      : handleNullValues(application[key]);
  });
  return newObject;
}

const ApplicationForm = ({
  application,
  userData,
}: {
  application: any,
  userData: any,
}) => {
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [postId, setPostId] = useState(null);
  const [educationProgram, setEducationProgram] = useState<string>(application ? application?.educationProgram : '');

  const form = useForm<z.infer<typeof applicationSchema>>({
    resolver: zodResolver(applicationSchema),
    defaultValues: application 
      ? {...sanitizeApplication(application), firstName: userData?.firstName, lastName: userData?.lastName} 
      : getApplicationDefaultValues(userData),
    mode: "onChange",
  })

  const onSubmit = async (formData: z.infer<typeof applicationSchema>) => {
    setIsFormLoading(true);
    const { identityCard, certificateOfSchooling, regulations, grades } = formData;
    const uploadFolderName = getUploadFolderName(userData.firstName, userData.lastName);
    const uploadFileNames = ['cnie', 'school_certificate', 'regulations', 'grades']
      .map(name => `${name}_${generateFileName()}`)
    const files = [identityCard, certificateOfSchooling, regulations, grades]
      .map((files, index) => new File(
        [files[0]], 
        uploadFileNames[index] + '.' + files[0].name.split('.').pop(),
        { type: files[0].type },
      ))

    try {
      // POST or PUT Application content
      const applicationResponse = application
        ? await putApplication(application?.id, excludeFileFields(formData)) as any
        : await postApplication({userId: userData.id, ...formData}) as any
      ;
      
      if (applicationResponse?.statusCode !== 200) {
        throw new Error('Post of application failed')
      }

      const applicationId = applicationResponse?.id;
      setPostId(applicationResponse?.id)

      // Upload files
      for (const file of files) {
        const checksum = await computeSHA256(file);

        const signedURLResponse = await getSignedURL(`upload/${uploadFolderName}/${file.name}`, file.type, file.size, checksum) as any;
        if (signedURLResponse?.statusCode !== 200) {
          throw new Error('Get of application signed URL failed');
        }

        const uploadResponse = await uploadFile(signedURLResponse?.url, file) as any;
        if (uploadResponse?.statusCode !== 200) {
          throw new Error('Upload of file failed');
        }
      }

      // Update Application
      const putApplicationResponse = await putApplication(applicationId, {
        cnieUrl: `upload/${uploadFolderName}/${files[0].name}`,
        schoolCertificateUrl: `upload/${uploadFolderName}/${files[1].name}`,
        regulationsUrl: `upload/${uploadFolderName}/${files[2].name}`,
        gradesUrl: `upload/${uploadFolderName}/${files[3].name}`,
      }) as any
      if (putApplicationResponse?.affected === 0) {
        throw new Error('Put of application failed');
      }

      toast({
        title: 'Application created with success',
        description: 'You can access your current application in your profile page',
      });

      window.location.reload();
    } catch(e) {
      if (postId) {
        await deleteApplication(postId);
      }

      toast({
        title: 'Application creation failed',
        description: 'There have a been a problem in application creation. Please try later',
        variant: 'destructive',
      });
      console.error(e);
    } finally {
      setIsFormLoading(false);
    }
  }

  const onError = (errors: any) => {
    toast({
      title: "The form is invalid",
      description: "Not all required fields have been filled in.",
      variant: 'destructive',
    })
  }
  

  return (
    <>
      <p>
        Take your time to give us your input on the <span className="font-semibold">4 sections below</span>, and don&apos;t forget to click on the <span className="font-semibold">&apos;Submit Application&apos;</span> button to confirm.
      </p>

      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-6">
        <Accordion type="single" collapsible className="w-full space-y-8">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-cyan-800 font-semibold text-lg">Personal Information</AccordionTrigger>
            <AccordionContent className="space-y-6 px-1">
              {/* First Name */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name <RequiredAsterisk /></FormLabel>
                    <FormControl>
                      <Input disabled placeholder="First Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Last Name */}
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name <RequiredAsterisk /></FormLabel>
                    <FormControl>
                      <Input disabled placeholder="Last Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Date of birth */}
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of birth <RequiredAsterisk /></FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          initialFocus
                          mode="single"
                          captionLayout="dropdown" //Also: dropdown | buttons
                          fromYear={1990} 
                          toYear={2010}
                          selected={field.value}
                          onSelect={field.onChange}
                          className="rounded-md border"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Your date of birth is used to calculate your age.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* ID Number */}
              <FormField
                control={form.control}
                name="identityCardNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CNIE Number <RequiredAsterisk /></FormLabel>
                    <FormControl>
                      <Input placeholder="CNIE Number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* City */}
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City of residence<RequiredAsterisk /></FormLabel>
                    <FormControl>
                      <Input placeholder="City" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Region */}
              <FormField
                control={form.control}
                name="region"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Region of residence<RequiredAsterisk /></FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="w-[280px]">
                          <SelectValue placeholder="Select a region" />
                        </SelectTrigger>
                        <SelectContent className="max-h-60">
                          <SelectGroup>
                            <SelectLabel>Regions</SelectLabel>
                            {regions.map(region => 
                              <SelectItem key={region.value} value={region.value}>{region.label}</SelectItem>
                            )}
                          </SelectGroup>
                        </SelectContent>
                      </Select> 
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Phone Number */}
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-start">
                    <FormLabel className="text-left">Phone Number <RequiredAsterisk /></FormLabel>
                    <FormControl className="w-full">
                      <PhoneInput placeholder="Enter a phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Emergency Contact */}
              <FormField
                control={form.control}
                name="emergencyContactName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Emergency Contact Full Name <RequiredAsterisk /></FormLabel>
                    <FormControl>
                      <Input placeholder="Enter full name of emergency contact" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Emergency Contact Phone Number */}
              <FormField
                control={form.control}
                name="emergencyContactPhoneNumber"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-start">
                    <FormLabel className="text-left">Emergency Contact Phone Number <RequiredAsterisk /></FormLabel>
                    <FormControl className="w-full">
                      <PhoneInput placeholder="Enter a phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-cyan-800 font-semibold text-lg">Education</AccordionTrigger>
            <AccordionContent className="space-y-6 px-1">
              {/* Last year studies level */}
              <FormField
                control={form.control}
                name="lastYearEducationLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>In 2023-2024, I attended higher education (in Morocco or abroad) at: <RequiredAsterisk /></FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="w-[280px]">
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent className="max-h-60">
                          <SelectGroup>
                            <SelectLabel>Levels</SelectLabel>
                              <SelectItem key="bac-plus-1" value="bac-plus-1">Bac +1</SelectItem>
                              <SelectItem key="bac-plus-2" value="bac-plus-2">Bac +2</SelectItem>
                              <SelectItem key="bac-plus-3" value="bac-plus-3">Bac +3</SelectItem>
                              <SelectItem key="bac-plus-4" value="bac-plus-4">Bac +4</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Education Program */}
              <FormField
                control={form.control}
                name="educationProgram"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Education Program <RequiredAsterisk /></FormLabel>
                    <FormControl>
                      <Select onValueChange={(v) => {setEducationProgram(v); field.onChange(v)}} defaultValue={field.value}>
                        <SelectTrigger className="w-[280px]">
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent className="max-h-60">
                          <SelectGroup>
                            <SelectLabel>Programs</SelectLabel>
                              <SelectItem key="cpge" value="cpge">Preparatory Classes (CPGE)</SelectItem>
                              <SelectItem key="university" value="university">University</SelectItem>
                              <SelectItem key="engineering-school-post-bac" value="engineering-school-post-bac">Engineering School post Bac</SelectItem>
                              <SelectItem key="engineering-school-post-cpge" value="engineering-school-post-cpge">Engineering School post CPGE</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Establishement */}
              <FormField
                control={form.control}
                name="establishment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>University Name <RequiredAsterisk /></FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your establishment" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Field of Study */}
              <FormField
                control={form.control}
                name="fieldOfStudy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Field of Study <RequiredAsterisk /></FormLabel>
                    <FormControl>
                    <Input
                      placeholder="Enter your field of study"
                      className="resize-none"
                      {...field}
                    />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Grades */}
              
              <div className={`space-y-4 ${(!educationProgram || educationProgram !== 'cpge') ? 'hidden' : ''}`}>
                <FormField
                  control={form.control}
                  name="cpgeGradeTrimesterOne"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Math Grade Trimester 1 (academic year 2023/2024)<RequiredAsterisk /></FormLabel>
                      <FormControl>
                        <Input placeholder="Enter numerical value" type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cpgeGradeTrimesterTwo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Math Grade Trimester 2 (academic year 2023/2024)<RequiredAsterisk /></FormLabel>
                      <FormControl>
                        <Input placeholder="Enter numerical value" type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cpgeRankingTrimesterOne"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Math Ranking Trimester 1 (academic year 2023/2024)<RequiredAsterisk /></FormLabel>
                      <FormControl>
                        <Input placeholder="Enter numerical value" type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cpgeRankingTrimesterTwo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Math Ranking Trimester 2 (academic year 2023/2024)<RequiredAsterisk /></FormLabel>
                      <FormControl>
                        <Input placeholder="Enter numerical value" type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className={`space-y-4 ${(!educationProgram || educationProgram === 'cpge') ? 'hidden' : ''}`}>
                <FormField
                  control={form.control}
                  name="nonCpgeAverageThreeBestScienceGrades"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Average Grade of the 3 best scientific subjects (academic year 2023/2024)<RequiredAsterisk /></FormLabel>
                      <FormControl>
                        <Input placeholder="Enter numerical value" type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="nonCpgeAverageScienceGrades"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Average Grade of all scientific subjects (academic year 2023/2024)<RequiredAsterisk /></FormLabel>
                      <FormControl>
                        <Input placeholder="Enter numerical value" type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="nonCpgeOverallAverage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Overall Average Grade (academic year 2023/2024)<RequiredAsterisk /></FormLabel>
                      <FormControl>
                        <Input placeholder="Enter numerical value" type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-cyan-800 font-semibold text-lg">Competition</AccordionTrigger>
            <AccordionContent className="space-y-6 px-1">
              {/* Has Previously Participated */}
              <FormField
                control={form.control}
                name="hasPreviouslyParticipated"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Have you participated in competitions before (Olympiads, national contests...) ? <RequiredAsterisk /></FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="yes" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Yes
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="no" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            No
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Previous Participations */}
              <FormField
                control={form.control}
                name="previousCompetitions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>If yes, please specify which ones and the achieved result.</FormLabel>
                    <FormControl>
                    <Textarea
                      placeholder="Tell us about your achievements"
                      className="resize-none"
                      {...field}
                    />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Has Previously Participated in MMC */}
              <FormField
                control={form.control}
                name="hasPreviouslyParticipatedInMmc"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Have you participated in Math&Maroc Competition 2023 ? <RequiredAsterisk /></FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="yes" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Yes
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="no" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            No
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Previous Results in MMC */}
              <FormField
                control={form.control}
                name="previousResultsInMmc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>If yes, please specify your ranking <Link className="text-blue-500" href={"https://mmc.mathmaroc.org/past-edition/results"} target="blank">(2023 results)</Link></FormLabel>
                    <FormControl>
                    <Textarea
                      placeholder="Tell us about your ranking"
                      className="resize-none"
                      {...field}
                    />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Motivations */}
              <FormField
                control={form.control}
                name="motivations"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tell us about your motivations to participate in the competition ? <RequiredAsterisk /></FormLabel>
                    <FormControl>
                    <Textarea
                      placeholder="Max 300 words"
                      className="resize-none"
                      {...field}
                    />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Comments */}
              <FormField
                control={form.control}
                name="comments"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Remarks / Comments</FormLabel>
                    <FormControl>
                    <Textarea
                      placeholder="Anything to add ?"
                      className="resize-none"
                      {...field}
                    />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* UPLOADS */}
        {/* CNIE File */}
        {<span className="text-transparent"> {"You found the Easter Egg!"}</span>}

        <div className="text-cyan-800 font-semibold text-lg mt-[7rem]">
          Uploads
        </div>

        <FormField
          control={form.control}
          name="identityCard"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CNIE <RequiredAsterisk /></FormLabel>
              <FormControl>
              <Input
                {...form.register("identityCard", {
                  required: "ID File is required",
                })}
                id="identityCard"
                type="file"
              />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Certificate of Schooling */}
        <FormField
          control={form.control}
          name="certificateOfSchooling"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Certificate of Schooling 2023-2024 <RequiredAsterisk /></FormLabel>
              <FormControl>
                <Input
                  {...form.register("certificateOfSchooling", {
                    required: "Certificate file is required",
                  })}
                  id="certificateOfSchooling"
                  type="file"                      
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> 

        {/* Regulations File */}
        <FormField
          control={form.control}
          name="regulations"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Handwritten signed regulation (<Link className="text-blue-500 underline" href="https://drive.google.com/file/d/1Qj0KONxATeMhIVMr4Llqp_X6boAUxBcV/view?usp=sharing" target="_blank">file</Link>)<RequiredAsterisk /></FormLabel>
              <FormControl>
                <Input
                  {...form.register("regulations", {
                    required: "Regulations file is required",
                  })}
                  id="regulations"
                  placeholder="id"
                  type="file"                    
                />
              </FormControl>
              <FormDescription>
              You need to print it, then fill it and sign it in handwriting, scan it and upload it. However, there is no need to certify this document by the administration (&quot;légalisation&quot;).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ID File */}
        <FormField
          control={form.control}
          name="grades"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Official Transcript 2023/2024 <RequiredAsterisk /></FormLabel>
              <FormControl>
                <Input
                  {...form.register("grades", {
                    required: "Grades file is required",
                  })}
                  id="grades"
                  placeholder="id"
                  type="file"
                />
              </FormControl>
              <FormDescription>
              Please upload all the transcripts you have for the year 2023/2024 (&quot;relevés de notes&quot;) merged in one PDF file. We will use them to check the grades you entered above.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="termsAgreement"
          render={({ field }) => (
            <div className="space-y-2">
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Terms of Agreement <RequiredAsterisk />
                  </FormLabel>
                  <FormDescription>
                  I confirm that I have read the competition regulations in full and commit to abide by them.<br/> 
                  In particular, I undertake to be present on the UM6P Benguérir campus for the entire duration of the competition (except for any derogation requested by email and explicitly approved by the organizing committee).<br/>
                  I acknowledge that providing false or incomplete information may result the automatic refusal of my application, the interdiction to compete and/or the withdrawal of prizes.
                  </FormDescription>
                </div>
              </FormItem>
              <FormMessage />
            </div>
          )}
        />
        
        {/* Submit Button */}
        <Button type="submit">
          {isFormLoading ? (
            <LoadingDots color="#808080" />
          ) : (
            <div>Submit Application</div>
          )}
        </Button>
      </form>
      </Form>
    </>
  )
}

export default ApplicationForm