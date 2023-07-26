'use strict'

/* ESERCIZIO: Vue Boolzapp
Milestone 1
● Replica della grafica con la possibilità di avere messaggi scritti dall’utente (verdi) e
dall’interlocutore (bianco) assegnando due classi CSS diverse
● Visualizzazione dinamica della lista contatti: tramite la direttiva v-for, visualizzare
nome e immagine di ogni contatto
Milestone 2
● Visualizzazione dinamica dei messaggi: tramite la direttiva v-for, visualizzare tutti i
messaggi relativi al contatto attivo all’interno del pannello della conversazione
● Click sul contatto mostra la conversazione del contatto cliccato
Milestone 3
● Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e digitando
“enter” il testo viene aggiunto al thread sopra, come messaggio verde
● Risposta dall’interlocutore: ad ogni inserimento di un messaggio, l’utente riceverà
un “ok” come risposta, che apparirà dopo 1 secondo.
Milestone 4
● Ricerca utenti: scrivendo qualcosa nell’input a sinistra, vengono visualizzati solo i
contatti il cui nome contiene le lettere inserite (es, Marco, Matteo Martina -> Scrivo
“mar” rimangono solo Marco e Martina)
Milestone 5 - opzionale
● Cancella messaggio: cliccando sul messaggio appare un menu a tendina che
permette di cancellare il messaggio selezionato
● Visualizzazione ora e ultimo messaggio inviato/ricevuto nella lista dei contatti
*/

const app = Vue.createApp({
  data() {
    return {
      contacts: [
        {
          name: "Michele",
          avatar: "_1",
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Hai portato a spasso il cane?",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Ricordati di dargli da mangiare",
              status: "sent",
            },
            {
              date: "10/01/2020 16:15:22",
              message: "Tutto fatto!",
              status: "received",
            },
          ],
        },
        {
          name: "Fabio",
          avatar: "_2",
          messages: [
            {
              date: "20/03/2020 16:30:00",
              message: "Ciao come stai?",
              status: "sent",
            },
            {
              date: "20/03/2020 16:30:55",
              message: "Bene grazie! Stasera ci vediamo?",
              status: "received",
            },
            {
              date: "20/03/2020 16:35:00",
              message: "Mi piacerebbe ma devo andare a fare la spesa.",
              status: "sent",
            },
          ],
        },
        {
          name: "Samuele",
          avatar: "_3",
          messages: [
            {
              date: "28/03/2020 10:10:40",
              message: "La Marianna va in campagna",
              status: "received",
            },
            {
              date: "28/03/2020 10:20:10",
              message: "Sicuro di non aver sbagliato chat?",
              status: "sent",
            },
            {
              date: "28/03/2020 16:15:22",
              message: "Ah scusa!",
              status: "received",
            },
          ],
        },
        {
          name: "Luisa",
          avatar: "_4",
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Lo sai che ha aperto una nuova pizzeria?",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Si, ma preferirei andare al cinema",
              status: "received",
            },
          ],
        },
      ],
      // Imposto una variabile con valore null per il contatto corrente
      currentContact: null,
      // Creo un oggetto universale per stampare i nuovi messaggi inviati e ricevuti
      newMessage: {
        date: "",
        message: "",
        status: ""
      },
      // Creo una variabile universale filterInput per la ricerca tramite search-bar
      filterInput: "",
    }
  },
  methods: {
    // CLICK EVENT: Al click sul contatto compare il nome di quel contatto nella parte destra dell'app con relativa chat
    onContactClick(contact) {
      this.currentContact = contact
    },
    // FUNZIONE: Aggiungo un nuovo messaggio alla chat tramite input
    addNewMessage() {
      // Clone messaggio inviato per eliminare la reattività tramite spread operator
      const newMessage = {...this.newMessage}
      // Imposto lo status su received
      newMessage.status = "sent"
      // Aggiungo la data e l'ora di invio del nuovo messaggio
      newMessage.date = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()
      // Pusho la risposta all'interno dell'oggetto currentContact
      this.currentContact.messages.push(newMessage)
      // Imposto una setTimeout per la risposta dopo 1 secondo
      setTimeout(this.addAnswer, 1000);
    },
    // FUNZIONE: Aggiungo una risposta al messaggio aggiunto in chat tramite input
    addAnswer() {
      // Clone messaggio ricevuto per eliminare la reattività tramite spread operator
      const newMessage = {...this.newMessage}
      // Imposto lo status su received
      newMessage.status = "received"
      // Aggiungo la data e l'ora di invio della risposta al nuovo messaggio
      newMessage.date = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()
      // Imposto la stringa "ok" come risposta
      newMessage.message = "Ok"
      // Pusho la risposta all'interno dell'oggetto currentContact
      this.currentContact.messages.push(newMessage);
    },
    deleteMessage(i) {
      // Imposto una variabile che va ad individuare l'indice del contatto della chat
      let indexNewMessage = this.contacts.indexOf(this.currentContact);
      // Rimuovo tramite splice il messaggio che seleziono
      this.contacts[indexNewMessage].messages.splice(i, 1)
    }
  },
  beforeMount() {
    // Con il beforeMount, all'avvio dell'app compare il primo contatto della lista
    this.currentContact = this.contacts[0]
  }
}).mount('#app')