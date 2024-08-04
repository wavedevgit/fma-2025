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
          Avant d&apos;envoyer vos questions par mail, nous vous demandons de bien vouloir consulter cette FAQ. Veuillez noter que nous ne répondrons pas aux courriels concernant des questions déjà traitées dans cette FAQ.
        </p>
      </div>

      <Accordion 
        type="single" 
        collapsible 
        className="animate-fade-up text-black opacity-0 mt-10"
        style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>Qui peut participer?</AccordionTrigger>
          <AccordionContent className="text-gray-700">
          Seuls les élèves inscrits en <span className="font-bold">dernière année de collège</span> pendant l&apos;année scolaire 2023-2024 peuvent participer à cette édition de Summer Camp.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger> Quelle est la date limite de candidature?</AccordionTrigger>
          <AccordionContent className="text-gray-700">
          La date limite est le <span className="font-bold">21 juin à 23h59</span>, heure marocaine. Ne tardez pas à soumettre votre candidature. Aucune exception ne sera accordée pour les soumissions tardives, quelles que soient les raisons, qu&apos;il s&apos;agisse d&apos;un oubli, de problèmes de connexion Internet ou de toute autre excuse.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>Est-ce que la participation à cet événement est gratuite?</AccordionTrigger>
          <AccordionContent className="text-gray-700">
          La participation à cet événement est gratuite. Elle inclut l&apos;hébergement et les repas à partir du samedi 20 juillet au soir jusqu&apos;au dimanche 28 juillet au matin.<br/>
          Les participants et leurs parents sont responsables d&apos;organiser leur propre transport aller-retour et d&apos;assurer une arrivée et un départ ponctuels vers/depuis le LYMED. Cependant, les étudiants confrontés à des difficultés financières importantes avérées peuvent soumettre une demande spéciale au comité organisateur par email.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>Si j&apos;ai une question, que dois-je faire ?</AccordionTrigger>
          <AccordionContent className="text-gray-700">
          Écrivez à <span className="text-blue-500">math.maroc.summer.camp@gmail.com</span>. Toute réponse fournie par un autre moyen ou par une autre personne n&apos;est pas considérée comme officielle.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger>Si je n&apos;ai pas les bulletins de cette année, que dois-je faire?</AccordionTrigger>
          <AccordionContent className="text-gray-700">
          Tous les documents sont requis et seront vérifiés individuellement par notre équipe. Si vous n&apos;avez pas encore obtenu votre relevé de notes officiel, vous devez profiter de la période d&apos;inscription que nous offrons pour le demander à votre école. Dans ce cas, nous vous recommandons d&apos;attendre d&apos;avoir tous vos documents avant de soumettre votre candidature (évitez cependant d&apos;attendre le dernier jour). Si vous ne l&apos;avez toujours pas reçu le 14 Juin, veuillez nous envoyer un mail à ce moment-là pour expliquer la situation en détail.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6">
          <AccordionTrigger>Comment faut-il signer le document du règlement?</AccordionTrigger>
          <AccordionContent className="text-gray-700">
          L&apos;élève et le tuteur légal doivent signer le règlement: il faut imprimer le document, le remplir et le signer à la main, puis le scanner. Cependant, il n&apos;est pas nécessaire de le légaliser.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-7">
          <AccordionTrigger>Comment faut-il signer le document de l&apos;autorisation parentale?</AccordionTrigger>
          <AccordionContent className="text-gray-700">
          Le parent/tuteur légal doit signer le document d&apos;autorisation parentale: il faut imprimer le document, le remplir et le signer à la main, puis le scanner. <span className="font-bold">Ce document doit être légalisé</span>.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-8">
          <AccordionTrigger>Quand est-ce que vous allez répondre à ma candidature?</AccordionTrigger>
          <AccordionContent className="text-gray-700">
          Les résultats seront annoncés quelques semaines après la date limite de dépôt des candidatures. Chaque candidat, qu&apos;il soit sélectionné, mis en liste d&apos;attente ou non sélectionné, recevra une réponse. Nous vous prions de ne pas envoyer de mail à ce sujet.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-9">
          <AccordionTrigger>Quand puis-je espérer recevoir une réponse définitive si je suis sur la liste d&apos;attente?</AccordionTrigger>
          <AccordionContent className="text-gray-700">
          Nous contacterons les candidats sur liste d&apos;attente individuellement et progressivement au fur et à mesure que des places se libèrent. La libération d&apos;une place peut se produire jusqu&apos;à quelques jours avant l&apos;événement, donc nous ne pouvons pas fournir de calendrier précis. Nous vous prions de ne pas envoyer de mails concernant votre position sur la liste d&apos;attente, car nous ne répondrons pas à ceux-ci.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}