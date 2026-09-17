# Book API

Gruppuppgift i API-utveckling, FED25.

**Grupp 9:** Rasmus Fransson, Oscar Holmblad, Chariklia Sait

---

## Ansvarsområden

### Ansvarsområde 1

Rasmus ansvarade för område 1. Jag ansvarade för att sätta upp GitHub-repot och projektets grundstruktur. Jag byggde även navbaren samt användarhanteringen med users, login, registrering och logout. På frontend ansvarade jag för login-/registreringsrutan, navbaren och UI-feedback vid inloggning, registrering och utloggning.

### Ansvarsområde 2:

Oscar ansvarade för ansvarsområde 2. Jag började med att installera MongoDB lokalt på min dator för att testa, och satte sedan upp ett kluster på MongoDB Atlas som vi alla tre kunde koppla mot. I början hade vi varsin databas på samma kluster så att ingen skulle råka radera någon annans testdata när vi testade. Senare, när vi skulle köra ihop allt så bytte vi alla till samma databasnamn. Jag skrev också ett seed-skript som lägger in fem böcker i databasen. Det gjorde att vi alla kunde få samma testdata när vi testade vilket var viktigt för Chariklia eftersom hennes reviews måste kopplas till böcker som faktiskt finns.

Jag skrev Mongoose-schemat för böcker med fälten från uppgiften, plus egna regler om vad som måste fyllas i. Sen byggde jag alla fem endpoints, där tre kräver token via den middleware Rasmus skrev.

På klientsidan gjorde jag boklistan för besökare, adminlistan i tabellform och formuläret för att skapa böcker. Jag la även till en knapp för att ta bort böcker.

### Ansvarsområde 3

Chariklia ansvarade för område 3. Jag började med att bygga Review-modellen i Mongoose, för recensioner kopplade till böcker som Oscar redan lagt till i databasen. Sen byggde jag de fem endpointsen för recensioner, där jag la in skydd på uppdatera och radera med hjälp av Rasmus middleware.

Efter att jag va klar med backend delen byggde jag boksidan i klienten, med ett formulär för att skriva nya recensioner och en lista som visar bokens befintliga recensioner. Jag la även in validering både i webbläsaren och i backend.

Jag stötte på några mindre buggar, men löste de genom att felsöka.

---

## Samarbetet

Samarbetet skulle jag säga gick väldigt bra. Vi hade dailys nästan varje dag där vi träffades på Teams och gick igenom vad som skulle göras dag för dag. Vi tog en dag i taget, då vi i början kände att det var svårt att se en bild framför sig hur det skulle se ut när det var färdigt. Men en dag i taget gick bra för oss, då vi bara behövde lägga fokus på vad vi skulle göra den dagen, och sedan lita på att resten skulle falla på plats.

Alla bidrog, och alla visade både ambition och realism kring vad vi kunde hinna med på den tid vi hade. Vi jobbade alla bra på egen hand, och när vi träffades vara alla trevliga och beredda på att bjuda på sig själva och hjälpa varandra.
