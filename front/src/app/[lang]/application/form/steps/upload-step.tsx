import { motion } from 'framer-motion'
import { UseFormReturn } from 'react-hook-form'
import { Input, Separator } from "@/components/shared"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shared/form"
import Link from 'next/link';

const RequiredAsterisk = () => <span className="text-red-500"> * </span>;

export const UploadStep = ({
  form,
  delta,
}:{
  form: UseFormReturn,
  delta: number
}) => {
  return (
    <motion.div
      initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <h2 className='text-base font-semibold leading-7 text-[#0284C7]'>
        Uploads
      </h2>
      <p className='mt-1 text-sm leading-6 text-gray-600'>
        Provide personal documents
        <Separator className='mt-4 bg-[#0284C7]'/>
      </p>

      <div className='mt-10 grid grid-cols-1 md:grid-cols-2md:grid-cols-2 gap-8 justify-between'>
        <FormField
          control={form.control}
          name="cnie"
          render={({ field }) => {
            if (field?.value && field?.value.length) {
              const dataTransfer = new DataTransfer();
              dataTransfer.items.add(field?.value[0]);
              setTimeout(() => {
                const fileInputElement = document.querySelector('#cnie') as HTMLInputElement;
                fileInputElement.files = dataTransfer.files;
              }, 300)
            }

            return (
              <FormItem>
                <FormLabel>Justificatif d&apos;identité de l&apos;élève avec photo (carte d&apos;identité, passeport…) <RequiredAsterisk /></FormLabel>
                <FormControl>
                <Input
                  {...form.register("cnie", {
                    required: "Ce document est obligatoire",
                  })}
                  id="cnie"
                  type="file"
                />
                </FormControl>
                <FormDescription>
                  <span className="text-red-400">Remarque</span>: Le document doit de préference être la CNIE ou le passeport. Sinon, vous pouvez envoyer tout document contenant les informations de l&apos;élève avec sa photo; ou bien son acte de naissance accompagné de sa photo dans le même PDF.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )
          }}
        />

        {/* School Certificate */}
        <FormField
          control={form.control}
          name="schoolCertificate"
          render={({ field }) => {
            if (field?.value && field?.value.length) {
              const dataTransfer = new DataTransfer();
              dataTransfer.items.add(field?.value[0]);
              setTimeout(() => {
                const fileInputElement = document.querySelector('#schoolCertificate') as HTMLInputElement;
                fileInputElement.files = dataTransfer.files;
              }, 300)
            }

            return (
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
            )
          }}
        />

        {/* ID File */}
        <FormField
          control={form.control}
          name="grades"
          render={({ field }) => {
            if (field?.value && field?.value.length) {
              const dataTransfer = new DataTransfer();
              dataTransfer.items.add(field?.value[0]);
              setTimeout(() => {
                const fileInputElement = document.querySelector('#grades') as HTMLInputElement;
                fileInputElement.files = dataTransfer.files;
              }, 300)
            }

            return (
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
            )
          }}
        />

        {/* Regulations File */}
        <FormField
          control={form.control}
          name="regulations"
          render={({ field }) => {
            if (field?.value && field?.value.length) {
              const dataTransfer = new DataTransfer();
              dataTransfer.items.add(field?.value[0]);
              setTimeout(() => {
                const fileInputElement = document.querySelector('#regulations') as HTMLInputElement;
                fileInputElement.files = dataTransfer.files;
              }, 300)
            }

            return (
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
            )
          }}
        />

        {/* Parental Authorization */}
        <FormField
          control={form.control}
          name="parentalAuthorization"
          render={({ field }) => {
            if (field?.value && field?.value.length) {
              const dataTransfer = new DataTransfer();
              dataTransfer.items.add(field?.value[0]);
              setTimeout(() => {
                const fileInputElement = document.querySelector('#parentalAuthorization') as HTMLInputElement;
                fileInputElement.files = dataTransfer.files;
              }, 300)
            }

            return (
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
            )
          }}
        />
      </div>
    </motion.div>
  )
}