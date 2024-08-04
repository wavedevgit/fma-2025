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
import { isValidPhoneNumber } from "react-phone-number-input";
import { PhoneInput } from "@/components/shared/phone-input";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent} from "@/components/shared/accordion";
import { RadioGroup, RadioGroupItem } from '@/components/shared/radio-group';
import Link from "next/link";
import { toast } from "@/components/hooks/use-toast";
import { useState } from "react"
import { postApplication, putApplication } from "@/api/ApplicationApi"
import { LoadingDots } from "@/components/shared/icons"
import { getSignedURL, uploadFile } from "@/api/MediaApi"

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
const ACCEPTED_FILE_TYPES = ['image/png','image/jpeg','image/jpg', 'image/png','image/webp', 'application/pdf'];
const zodFileValidation = z.any()
  .refine(files => files?.length == 1, 'File is required.')
  .refine(files => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type), { message: 'Please choose PNG, JPEG or PDF format files only' })
  .refine(files => files?.[0]?.size <= MAX_UPLOAD_SIZE, 'File size must be less than 3MB')
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
]

const relationshipsWithGuardian = [
  {label: "Père", value:"father"},
  {label: "Mère", value:"mother"},
  {label: "Tuteur", value:"guardian"},
]

const applicationSchema = z.object({
  /* Personal Informations */
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  dateOfBirth: z.date({ required_error: "La date de naissance est obligatoire." }),
  identityCardNumber: z.string().optional(),
  studentNumber: z.string().min(1).max(50),
  city: z.string().min(1).max(50),
  region: z.string().nonempty("Veuillez choisir une option"),
  phoneNumber: z.string().refine(isValidPhoneNumber, { message: "Numéro de téléphone invalide" }),
  guardianFullName: z.string().min(1).max(50),
  guardianPhoneNumber: z.string().refine(isValidPhoneNumber, { message: "Numéro de téléphone invalide" }),
  relationshipWithGuardian: z.string().min(1).max(50),
  specialConditions: z.string().optional().refine((val) => {
    if (val) {
      return val.split(' ').length <= 100
    }
    return true;
  } , { message: "Maximum 100 mots"}),

  /* Education */
  highschool: z.string().min(1).max(50),
  semesterAverageGrade: z.string().min(1).max(50),
  semesterMathAverageGrade: z.string().min(1).max(50),
  semesterRanking: z.string().min(1).max(50),
  semesterMathRanking: z.string().min(1).max(50),
  finalsAverageGrade: z.string().min(1).max(50),
  finalsMathAverageGrade: z.string().min(1).max(50),

  /* Competition */
  motivations: z.string().min(1).refine(async text => text.split(' ').length <= 300, { message: "Maximum 300 mots", }),
  hasPreviouslyParticipated: z.enum(["yes", "no"], { required_error: "Veuillez choisir une option" }),
  previousCompetitions: z.string().optional(),
  comments: z.string().optional().refine((val) => {
    if (val) {
      return val.split(' ').length <= 100
    }
    return true;
  } , { message: "Maximum 100 mots"}),

  /* Uploads */
  identityCard: zodFileValidation,
  schoolCertificate: zodFileValidation,
  grades: zodFileValidation,
  regulations: zodFileValidation,
  parentalAuthorization: zodFileValidation,

  /* Terms of agreement */
  termsAgreement: z.boolean().default(false).refine(value => value === true, { message: "L'acceptation des conditions de l'accord est obligatoire"}),
})

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
  const defaultValues = {
    firstName: userData?.firstName || "",
    lastName: userData?.lastName || "",
    dateOfBirth: "",
    identityCardNumber: "",
    studentNumber: "",
    city: "",
    region: "",
    phoneNumber: "",
    guardianFullName: "",
    guardianPhoneNumber: "",
    relationshipWithGuardian: "",
    specialConditions: "",
  
    highschool: "",
    semesterAverageGrade: "",
    semesterMathAverageGrade: "",
    semesterRanking: "",
    semesterMathRanking: "",
    finalsAverageGrade: "",
    finalsMathAverageGrade: "",
  
    motivations: "",
    hasPreviouslyParticipated: "",
    previousCompetitions: "",
    comments: "",
  
    identityCard: undefined,
    schoolCertificate: undefined,
    grades: undefined,
    regulations: undefined,
    parentalAuthorization: undefined,
  
    termsAgreement: false,
  }
  const form = useForm<z.infer<typeof applicationSchema>>({
    resolver: zodResolver(applicationSchema),
    defaultValues: application 
      ? {...sanitizeApplication(application), firstName: userData?.firstName, lastName: userData?.lastName} 
      : defaultValues,
    mode: "onChange",
  })

  const onSubmit = async (formData: z.infer<typeof applicationSchema>) => {
    setIsFormLoading(true);
    const { identityCard, schoolCertificate, grades, regulations, parentalAuthorization } = formData;
    const uploadFolderName = getUploadFolderName(userData.firstName, userData.lastName);
    const uploadFileNames = ['cnie', 'school_certificate', 'grades', 'regulations', 'parental_authorization']
      .map(name => `${name}_${generateFileName()}`)
    const files = [identityCard, schoolCertificate, grades, regulations, parentalAuthorization]
      .map((files, index) => new File(
        [files[0]], 
        uploadFileNames[index] + '.' + files[0].name.split('.').pop(),
        { type: files[0].type },
      ))

    try {
      // Upload files
      for (const file of files) {
        const checksum = await computeSHA256(file);

        const signedURLResponse = await getSignedURL(`upload_sc/${uploadFolderName}/${file.name}`, file.type, file.size, checksum) as any;
        if (signedURLResponse?.statusCode !== 200) {
          throw new Error('Get of application signed URL failed');
        }

        const uploadResponse = await uploadFile(signedURLResponse?.url, file) as any;
        if (uploadResponse?.statusCode !== 200) {
          throw new Error('Upload of file failed');
        }
      }

      // POST or PUT Application
      const body = {
        ...formData,
        userId: userData.id, 
        cnieUrl: `upload_sc/${uploadFolderName}/${files[0].name}`,
        schoolCertificateUrl: `upload_sc/${uploadFolderName}/${files[1].name}`,
        gradesUrl: `upload_sc/${uploadFolderName}/${files[2].name}`,
        regulationsUrl: `upload_sc/${uploadFolderName}/${files[3].name}`,
        parentalAuthorizationUrl: `upload_sc/${uploadFolderName}/${files[4].name}`
      };

      const applicationResponse = application
        ? await putApplication(application?.id, excludeFileFields(body)) as any
        : await postApplication(body) as any;
      if (applicationResponse?.statusCode !== 200) {
        throw new Error('Post of application failed')
      }

      toast({
        title: 'Application created with success',
        description: 'You can access your current application in your profile page',
      });

      setTimeout(() => {
        window.location.reload();
      }, 500)
    } catch(e) {
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
        Les champs marqués par &apos;<RequiredAsterisk />&apos; sont obligatoires.
      </p>

      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-6">
        <Accordion type="single" collapsible className="w-full space-y-8">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-cyan-800 font-semibold text-lg">Informations personnelles</AccordionTrigger>
            <AccordionContent className="space-y-6 px-1">
              {/* First Name */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prénom <RequiredAsterisk /></FormLabel>
                    <FormControl>
                      <Input disabled placeholder="Entrez votre prénom" {...field} />
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
                    <FormLabel>Nom <RequiredAsterisk /></FormLabel>
                    <FormControl>
                      <Input disabled placeholder="Entrez votre nom" {...field} />
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
                    <FormLabel>Date de naissance <RequiredAsterisk /></FormLabel>
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
                              <span>Choisissez une date</span>
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
                      Votre date de naissance permettra de calculer votre âge.
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
                    <FormLabel>Numéro CNIE</FormLabel>
                    <FormControl>
                      <Input placeholder="Entrez votre numéro CNIE" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Student Number */}
              <FormField
                control={form.control}
                name="studentNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Code Massar ou Code National de l&apos;Etudiant <RequiredAsterisk /></FormLabel>
                    <FormControl>
                      <Input placeholder="Entrez votre code" {...field} />
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
                    <FormLabel>Ville de résidence <RequiredAsterisk /></FormLabel>
                    <FormControl>
                      <Input placeholder="Entrez votre ville" {...field} />
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
                    <FormLabel>Region de résidence<RequiredAsterisk /></FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="w-[280px]">
                          <SelectValue placeholder="Choisissez votre région" />
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
                    <FormLabel className="text-left">Téléphone de l&apos;élève <RequiredAsterisk /></FormLabel>
                    <FormControl className="w-full">
                      <PhoneInput placeholder="Entrez un numéro de téléphone" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Guardian Full Name */}
              <FormField
                control={form.control}
                name="guardianFullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom et prénom du tuteur de l&apos;élève<RequiredAsterisk /></FormLabel>
                    <FormControl>
                      <Input placeholder="Entrez un nom complet" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
    
              {/* Guardian Phone Number */}
              <FormField
                control={form.control}
                name="guardianPhoneNumber"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-start">
                    <FormLabel className="text-left">Téléphone du tuteur de l&apos;élève <RequiredAsterisk /></FormLabel>
                    <FormControl className="w-full">
                      <PhoneInput placeholder="Enter a phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Relationship with Guardian */}
              <FormField
                control={form.control}
                name="relationshipWithGuardian"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Relation avec votre tuteur<RequiredAsterisk /></FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="w-[280px]">
                          <SelectValue placeholder="Choisissez une option" />
                        </SelectTrigger>
                        <SelectContent className="max-h-60">
                          <SelectGroup>
                            <SelectLabel>Relation avec votre tuteur</SelectLabel>
                            {relationshipsWithGuardian.map(relationship => 
                              <SelectItem key={relationship.value} value={relationship.value}>{relationship.label}</SelectItem>
                            )}
                          </SelectGroup>
                        </SelectContent>
                      </Select> 
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Special conditions */}
              <FormField
                control={form.control}
                name="specialConditions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Avez-vous des problèmes de santé, des allergies, ou toute autre information que nous devons connaître pour vous assurer des conditions adéquates sur place?</FormLabel>
                    <FormControl>
                    <Textarea
                      placeholder="Maximum 100 mots"
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

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-cyan-800 font-semibold text-lg">Etudes</AccordionTrigger>
            <AccordionContent className="space-y-6 px-1">
              {/* Highschool */}
              <FormField
                control={form.control}
                name="highschool"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Collège <RequiredAsterisk /></FormLabel>
                    <FormControl>
                      <Input placeholder="Nom du collège" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Grades */}
              <FormField
                control={form.control}
                name="semesterAverageGrade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Moyenne Générale | contrôle continu 1er semestre <RequiredAsterisk /></FormLabel>
                    <FormControl>
                      <Input placeholder="Entrez votre moyenne générale" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="semesterMathAverageGrade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Moyenne en Mathématiques | contrôle continu 1er semestre <RequiredAsterisk /></FormLabel>
                    <FormControl>
                      <Input placeholder="Entrez votre moyenne de mathématique" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="semesterRanking"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Classement Général | contrôle continu 1er semestre <RequiredAsterisk /></FormLabel>
                    <FormControl>
                      <Input placeholder="Entrez votre classement général" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="semesterMathRanking"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Classement en Mathématiques | contrôle continu 1er semestre <RequiredAsterisk /></FormLabel>
                    <FormControl>
                      <Input placeholder="Entrer votre classement de mathématique" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="finalsAverageGrade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Moyenne Générale | examen unifié 1er semestre <RequiredAsterisk /></FormLabel>
                    <FormControl>
                      <Input placeholder="Entrez votre moyenne générale" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="finalsMathAverageGrade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Moyenne en Mathématiques | examen unifié 1er semestre <RequiredAsterisk /></FormLabel>
                    <FormControl>
                      <Input placeholder="Entrez votre moyenne de mathématique" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-cyan-800 font-semibold text-lg">Summer Camp</AccordionTrigger>
            <AccordionContent className="space-y-6 px-1">
              {/* Motivations */}
              <FormField
                control={form.control}
                name="motivations"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quelles sont vos motivations pour participer au Summer Camp? (réponse dans la langue de votre choix) <RequiredAsterisk /></FormLabel>
                    <FormControl>
                    <Textarea
                      placeholder="Maximum 300 mots"
                      className="resize-none"
                      {...field}
                    />
                    </FormControl>
                    <FormDescription>
                      Remarque: l&apos;utilisation de ChatGPT ou toute autre intelligence artificielle pour répondre à cette question est strictement interdit et entrainera l&apos;élimination systématique.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Has Previously Participated */}
              <FormField
                control={form.control}
                name="hasPreviouslyParticipated"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Avez-vous déjà participé à des compétitions ou tout autre expérience que vous pensez être utile pour votre candidature? <RequiredAsterisk /></FormLabel>
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
                    <FormLabel>Si oui, décrivez votre expérience en détail (texte libre) </FormLabel>
                    <FormControl>
                    <Textarea
                      placeholder="Maximum 100 mots"
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
                    <FormLabel>Remarques / Commentaires </FormLabel>
                    <FormControl>
                    <Textarea
                      placeholder="Avez-vous quelque chose à rajouter?"
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
          Documents à télécharger
        </div>

        <FormField
          control={form.control}
          name="identityCard"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Justificatif d&apos;identité de l&apos;élève avec photo (carte d&apos;identité, passeport…) <RequiredAsterisk /></FormLabel>
              <FormControl>
              <Input
                {...form.register("identityCard", {
                  required: "Ce document est obligatoire",
                })}
                id="identityCard"
                type="file"
              />
              </FormControl>
              <FormDescription>
                <span className="text-red-400">Remarque</span>: Le document doit de préference être la CNIE ou le passeport. Sinon, vous pouvez envoyer tout document contenant les informations de l&apos;élève avec sa photo; ou bien son acte de naissance accompagné de sa photo dans le même PDF.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* School Certificate */}
        <FormField
          control={form.control}
          name="schoolCertificate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Certificat de scolarité pour l&apos;année 2023-2024. <RequiredAsterisk /></FormLabel>
              <FormControl>
                <Input
                  {...form.register("schoolCertificate", {
                    required: "Ce document est obligatoire",
                  })}
                  id="schoolCertificate"
                  type="file"                      
                />
              </FormControl>
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
              <FormLabel>Bulletin du 1er trimestre 2023-2024 (avec les notes du contrôle continu et de l&apos;examen unifié) <RequiredAsterisk /></FormLabel>
              <FormControl>
                <Input
                  {...form.register("grades", {
                    required: "Ce document est obligatoire",
                  })}
                  id="grades"
                  placeholder="id"
                  type="file"
                />
              </FormControl>
              <FormDescription>
                <span className="text-red-400">Remarque</span>: votre bulletin sera utilisé pour vérifier les notes que vous avez entrez plus haut.
              </FormDescription>
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
              <FormLabel>Règlement signé par l&apos;élève et le tuteur légal 
                (<Link className="text-blue-500 underline" href='https://drive.google.com/file/d/1Ah068enVUm9NnPcvPxtsUq4Db5KeNL2X/view' target="_blank">fichier</Link>)
                .<RequiredAsterisk /></FormLabel>
              <FormControl>
                <Input
                  {...form.register("regulations", {
                    required: "Ce document est obligatoire",
                  })}
                  id="regulations"
                  placeholder="id"
                  type="file"                    
                />
              </FormControl>
              <FormDescription>
                <span className="text-red-400">Remarque</span>: Il faut l&apos;imprimer, le signer à la main puis le scanner. Il n&apos;y a pas besoin de le légaliser.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Parental Authorization */}
        <FormField
          control={form.control}
          name="parentalAuthorization"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Autorisation parentale signée et légalisée par le tuteur légal (<Link className="text-blue-500 underline" href='https://drive.google.com/file/d/1aSP6Z_boXo8Fz1oef2Fwd6kPx7BGc0UM/view' target="_blank">fichier</Link>)<RequiredAsterisk /></FormLabel>
              <FormControl>
                <Input
                  {...form.register("parentalAuthorization", {
                    required: "Ce document est obligatoire",
                  })}
                  id="parentalAuthorization"
                  placeholder="id"
                  type="file"                    
                />
              </FormControl>
              <FormDescription>
                  <span className="text-red-400">Remarque</span>: il faut l&apos;imprimer, la signer à la main, la légaliser, puis le scanner; <span className="font-bold">la légalisation est obligatoire</span>.
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
                    Conditions de l&apos;accord <RequiredAsterisk />
                  </FormLabel>
                  <FormDescription>
                  Je confirme avoir lu entièrement le règlement de Summer Camp et m&apos;engage à le respecter. <br/>
                  En particulier, je m&apos;engage à être présent sur le campus de du LYMED pendant toute la durée prévue du Summer Camp (sauf dérogation demandée par mail et approuvée explicitement par le comité d&apos;organisation)<br/>
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
            <div>Envoyer ma candidature</div>
          )}
        </Button>
      </form>
      </Form>
    </>
  )
}

export default ApplicationForm