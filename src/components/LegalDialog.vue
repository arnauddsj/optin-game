<script setup lang="ts">
import { ref } from 'vue'
import { 
  DialogRoot, 
  DialogTrigger,
  DialogPortal, 
  DialogOverlay, 
  DialogContent, 
  DialogTitle, 
  DialogClose
} from 'radix-vue'

const isOpen = ref(false)

const openDialog = () => {
  isOpen.value = true
}

const closeDialog = () => {
  isOpen.value = false
}
</script>

<template>
  <DialogRoot v-model:open="isOpen">
    <DialogTrigger @click="openDialog"
      class="trigger-button text-xs underline cursor-pointer min-height m-0 p-0 font-inherit bg-transparent border-none leading-none">
      Voir le règlement du jeu concours.
    </DialogTrigger>
    <DialogPortal>
      <DialogOverlay class="fixed inset-0 z-50 bg-black/50" />
      <DialogContent class="fixed inset-0 z-50 flex items-center justify-center">
        <div class="flex flex-col gap-3 bg-white py-5 px-5 shadow-lg text-center text-vw-dark w-[80%] max-w-md">
          <DialogTitle class="text-3xl font-bold mb-4">
            Règlement du jeu concours
          </DialogTitle>
          <div class="scrollable-content">
            <p>Règlement du jeu concours Stand Volkswagen Group France – Mondial de l'Auto 2024<br>
              Pour le challenge «Time Escape – Golf» disponible sur a plateforme https://vw.hivehorizon.com/
              (inscription et participation).</p>

            <p>ARTICLE 1 – ORGANISATEUR ET DURÉE DU JEU-CONCOURS<br>
              Volkswagen Group France est une société de droit français dont le siège social est situé 11 avenue de
              Boursonne 02600 Villers-Cotterets, enregistrée au RCS de Soissons sous le numéro d'entreprise Soissons B
              832 277 370, organise un jeu-concours intitulé «Time Escape - Golf» sans obligation d'achat dont les
              gagnants seront désignés par tirage au sort ensuivant les conditions définies ci-après. Le jeu-concours se
              déroulera du lundi 14 octobre 2024 au dimanche 20 octobre 2024.</p>

            <p>ARTICLE 2 – CONDITIONS DE PARTICIPATION AU JEU-CONCOURS<br>
              2.1. Le jeu-concours est gratuit et exclusivement réservé aux personnes de nationalité française ou
              résidant en France de minimum 21 ans s'étant inscrit au préalable sur la plateforme
              https://vw.hivehorizon.com/ à l'exclusion de toutes les personnes ayant participé à l'élaboration du
              jeu-concours.<br>
              2.2. La participation au jeu-concours implique l'acceptation irrévocable et sans réserve, des termes et
              conditions du présent règlement.<br>
              2.3. Le jeu-concours est limité à une seule participation par personne. La participation au jeu-concours
              est strictement personnelle et nominative. Il sera attribué un prix unique.<br>
              2.4. Le non-respect des conditions de participation énoncées dans le présent Règlement entraînera la
              nullité de la participation du Participant.</p>

            <p>ARTICLE 3 – PRINCIPE DE JEU-CONCOURS/MODALITÉS DE PARTICIPATION MECANIQUE<br>
              Ce jeu se déroule exclusivement sur la plateforme https://vw.hivehorizon.com/ du lundi 14 octobre 2024 au
              dimanche 20 octobre 2024 comme indiquées dans l'article 1.<br>
              Pour participer au concours, le visiteur s'inscrit sur la plateforme et participe ensuite à 3 quizz
              portants sur le véhicule Golf qui lui sont proposés. Seuls les participants ayant répondu correctement aux
              quizz pourront être tiré au sort.<br>
              Chaque participant doit confirmer son e-mail et son profil social en cliquant sur le lien reçu dans
              l'email de confirmation afin de valider définitivement sa participation.<br>
              Chaque participant doit répondre aux conditions du jeu s'il veut avoir une chance de remporter le lot mis
              en Jeu.</p>

            <p>ARTICLE 4 – DÉSIGNATION DES GAGNANTS<br>
              L'Organisateur désignera par tirage au sort 1 gagnant, parmi l'ensemble des personnes s'étant inscrites.
              Tirage au sort sera effectué le lundi 21 octobre à 14H. Afin de garantir un tirage au sort qui respecte
              les chances de chacun nous procèderons à un tirage au sort grâce à l'application web plouf-plouf.fr.<br>
              2 suppléants seront tirés au sort en plus du grand gagnant.</p>

            <p>ARTICLE 5 – DOTATIONS<br>
              1 lot unique sera à gagner pour le jeu concours «Time Escape - Golf»<br>
              Le gagnant se verra proposer :<br>
              - 1 bon d'achat sur la boutique en ligne Volkswagen Group France</p>

            <p>Lot d'une valeur de 100€</p>

            <p>ARTICLE 6 –REMISE DES DOTATIONS ET MODALITÉS D'UTILISATION DES DOTATIONS</p>

            <p>L'Organisateur du jeu-concours contactera uniquement sur sa boîte mail le gagnant tirés au sort et
              l'informera des modalités à suivre pour accéder à leur dotation. Aucun courrier ne sera adressé aux
              participants n'ayant pas gagné, seul le gagnant sera contacté. Les gagnants devront répondre dans un délai
              de 30 jours suivant l'envoi de ce courrier électronique et fournir leurs coordonnées complètes. Sans
              réponse de la part du gagnant dans les 30 jours suivant l'envoi de ce courrier électronique, il sera déchu
              de son lot et ne pourra prétendre à aucune indemnité, dotation ou compensation que ce soit. Dans cette
              hypothèse, le lot sera attribué au premier désigné lors du tirage au sort de la session concernée. Pour le
              cas où il ne répondrait pas dans les mêmes délais que ceux imposés au gagnant, le lot sera attribué au
              2ème suppléant. Sans réponse de ce dernier dans les délais, le lot ne pourra pas être attribué.</p>

            <p>Le gagnant (ou, le cas échéant, les suppléants) devra se conformer au présent règlement. S'il s'avérait
              qu'il ne répond pas aux critères du présent règlement, le lot ne lui sera pas attribué et sera attribué
              aux suppléants. À cet effet, les participants autorisent toutes les vérifications concernant leur
              identité, leur âge, leurs coordonnées ou la loyauté et la sincérité de leur participation. Toute fausse
              déclaration, indication d'identité ou d'adresse postale fausse entraîne l'élimination immédiate du
              participant et l'acquisition du lot par l'Organisateur. La dotation est à utiliser pendant la période
              indiquée selon les modalités et conditions communiquées ultérieurement au gagnant. En outre, en cas
              d'impossibilité pour l'Organisateur de délivrer au gagnant la dotation remportée, et ce, quel qu'en soit
              la cause, l'Organisateur se réserve le droit d'y substituer une dotation de valeur équivalente, ce que
              tout participant consent.</p>

            <p>ARTICLE 7 – RESPONSABILITE<br>
              L'Organisateur ne saurait voir sa responsabilité engagée du fait de l'impossibilité de contacter le
              gagnant, de même qu'en cas de perte, de vol ou de dégradation du lot lors de son acheminement.
              L'Organisateur ne pourra non plus être responsable des erreurs éventuelles portant sur le nom, l'adresse
              et/ou les coordonnées communiquées par les personnes ayant participé au jeu-concours. Par ailleurs,
              l'Organisateur du jeu concours décline toute responsabilité pour tous les incidents qui pourraient
              survenir lors de la jouissance du prix attribué et/ou fait de son utilisation et/ou de ses conséquences,
              notamment de la jouissance d'un lot par un mineur, qui reste sous l'entière et totale responsabilité d'une
              personne ayant l'autorité parentale. L'Organisateur se réserve le droit, si les circonstances l'exigent,
              d'écourter, de prolonger, de modifier, d'interrompre, de différer ou d'annuler le jeu-concours, sans que
              sa responsabilité ne soit engagée. Toutefois, toute modification fera l'objet d'un avenant qui sera mis en
              ligne sur le Site et adressé gratuitement à toute personne ayant fait une demande de règlement par écrit.
              L'Organisateur se dégage de toute responsabilité en cas de dysfonctionnement empêchant l'accès et/ ou le
              bon déroulement du jeu-concours notamment dû à des actes de malveillances externes. L'utilisation de
              robots ou de tous autres procédés similaires permettant de participer au jeu-concours de façon mécanique
              ou autre est proscrite, la violation de cette règle entraînant l'élimination définitive de son réalisateur
              et/ ou utilisateur. L'Organisateur pourra annuler tout ou partie du jeu-concours s'il apparaît que des
              fraudes sont intervenues sous quelque forme que ce soit, notamment de manière informatique dans le cadre
              de la participation au jeu-concours ou de la détermination des gagnants. Il se réserve, dans cette
              hypothèse, le droit de ne pas attribuer les dotations aux fraudeurs et/ ou de poursuivre devant les
              juridictions compétentes les auteurs de ces fraudes.</p>

            <p>Article 8 – DÉPÔT DU REGLEMENT<br>
              Le règlement est, à titre gratuit et en intégralité, mis à disposition des Participants sur la plateforme.
              Il pourra être, à titre gratuit, adressé par e-mail sur simple demande. Une copie peut être obtenue
              gratuitement auprès de la Société Organisatrice sur simple demande écrite à l'adresse indiquée ci-dessous
              ou directement accessible sur https://vw.hivehorizon.com/<br>
              Volkswagen Group France dont le siège social est situé 11 avenue de Boursonne 02600 Villers-Cotterets,
              enregistrée au RCS de Soissons sous le numéro d'entreprise Soissons B 832 277 370,il ne sera répondu à
              aucune autre demande orale concernant le Jeu.</p>

            <p>Le règlement est déposé à l'étude FRADIN TRONEL SASSARD et associés, Commissaires de Justice à Lyon.</p>

            <p>ARTICLE 9. LA LOI APPLICABLE<br>
              Le Règlement est exclusivement régi par la loi française notamment pour tout litige qui viendrait à naître
              du fait du Jeu ou qui serait directement ou indirectement lié au Jeu, ce sans préjudice des éventuelles
              règles de conflits de lois pouvant exister. Pour tout litige entre le(s) Participant(s) et la Société
              Organisatrice, les règles de compétence légale s'appliqueront.</p>

            <p>Le Jeu, le Règlement et son interprétation sont soumis à la loi française.</p>

            <p>ARTICLE 10 – LES DONNEES A CARACTERE PERSONNEL<br>
              Les données à caractère personnel collectées dans le cadre de chaque Jeu-concours sont les noms, prénoms,
              catégories professionnels, revenus du foyer, pays, emails des participants et des Gagnants (ci-après les «
              Données à caractère personnel »).<br>
              Les Données à caractère personnel ainsi collectées font l'objet d'un traitement de la part de la Société
              Organisatrice, afin de permettre la désignation des Gagnants et des suppléants et l'envoi des Lots.<br>
              Le responsable du traitement des Données à caractère personnel Volkswagen Group France dont le siège
              social est situé 11 avenue de Boursonne 02600 Villers-Cotterets, enregistrée au RCS de Soissons sous le
              numéro d'entreprise Soissons B 832 277 370, (Si après « responsable du traitement »)<br>
              Le Responsable du Traitement s'engage à collecter et traiter les Données à caractère personnel
              conformément à la règlementation en vigueur, à savoir :<br>
              - La loi dite « Informatiques et Libertés » n°78-17 du 6 janvier 1978 modifiée</p>

            <p>- La loi n°2018-493 du 20 juin 2018 relative à la protection des données personnelles et son décret
              d'application n°2018-687 du 1er août 2018,<br>
              - Règlement (UE) 2016/79 du Parlement européen et du Conseil du 27 avril 2016 relatif à la protection des
              personnes physiques à l'égard du traitement des données à caractère personnel et à la libre circulation de
              ces données.<br>
              Les Données à caractère personnel sont transmises à l'entreprise WMH PROJECT (ci-après les « Destinataires
              des Données ») pour le compte de DAIKIN (ci-après le « Propriétaire des Données »).<br>
              Les Données à caractère personnel seront conservées par les Destinataires pour la durée nécessaire à la
              réalisation du Jeu-concours soit pour une durée de 3 mois.<br>
              Les Données à caractère personnel seront conservées par le Propriétaire des Données pendant 2 ans dans le
              cadre de leurs actions de communications/marketing.<br>
              Le Participant dispose des droits suivants, qu'il peut librement exercer auprès du Responsable du
              traitement :<br>
              - Le droit d'accès, de rectification et/ou d'effacement de ses Données à caractère personnel,<br>
              - Le droit de limiter le traitement de ses Données à caractère personnel,<br>
              - Le droit de s'opposer au traitement de ses Données à caractère personnel,<br>
              - Le droit à la portabilité de ses Données à caractère personnel,<br>
              - Le droit de retirer son consentement au traitement de ses Données à caractère personnel, et ce, à tout
              moment.</p>

            <p>Afin d'exercer ses droits, vous pouvez joindre notre service de protection des données, y compris le
              délégué à la protection des données, à l'adresse suivante:</p>

            <p>Courriel : donneespersonnelles@volkswagengroup.fr<br>
              Ou par écrit : VOLKSWAGEN Group France, Relations client – 11 avenue de Boursonne, BP 62, 02601 Villers
              Cotterêts Cedex, France.</p>

            <p>Le Participant dispose également du droit d'introduire une réclamation auprès d'une autorité de contrôle.
              En France, l'autorité de contrôle compétente est la Commission Nationale de l'Informatique et des Libertés
              (CNIL) - 3 Place de Fontenoy - TSA 80715- 75334 PARIS CEDEX 07.</p>

          </div>
          <div class="flex flex-col justify-center items-center gap-2 mt-4">
            <DialogClose asChild>
              <button @click="closeDialog" class="bg-vw-light text-white text-base py-2 px-4 rounded">
                Fermer
              </button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<style scoped lang="scss">
.inline {
  display: inline;
}

.trigger-button {
  display: inline;
  min-height: 1px;
  margin: 0;
  padding: 0;
}

.scrollable-content {
  max-height: 60vh;
  overflow-y: auto;
  text-align: left;
  border: 1px solid #ccc;

  p {
    padding: 1rem;
  }

  h2 {
    padding: 1rem;
  }
}
</style>
