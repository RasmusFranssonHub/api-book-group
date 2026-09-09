import "dotenv/config";
import mongoose from "mongoose";
import { Book } from "./models/Book";

const books = [
  {
    title: "Bröderna Lejonhjärta",
    description:
      "Karl och Jonatan återförenas efter döden i sagolandet Nangijala, där de dras in i kampen mot tyrannen Tengil och draken Katla.",
    author: "Astrid Lindgren",
    genres: ["Barnbok", "Fantasy"],
    image: "https://placehold.co/200x300",
    published_year: 1973,
  },
  {
    title: "Pippi Långstrump",
    description:
      "Världens starkaste flicka flyttar in i Villa Villekulla med en apa och en häst, och vänder upp och ner på de vuxnas regler.",
    author: "Astrid Lindgren",
    genres: ["Barnbok", "Klassiker"],
    image: "https://placehold.co/200x300",
    published_year: 1945,
  },
  {
    title: "Nils Holgerssons underbara resa genom Sverige",
    description:
      "En pojke förvandlas till tomte och flyger över Sverige på ryggen av en gåskarl. Skriven som läsebok i geografi för folkskolan.",
    author: "Selma Lagerlöf",
    genres: ["Barnbok", "Klassiker"],
    image: "https://placehold.co/200x300",
    published_year: 1906,
  },
  {
    title: "Älskade lilla gris",
    description:
      "En bilderbok om en flicka som får en gris i present och om vad som händer när hon blir tvungen att skiljas från den.",
    author: "Ulf Nilsson",
    genres: ["Bilderbok", "Barnbok"],
    image: "https://placehold.co/200x300",
    published_year: 1982,
  },
  {
    title: "Pannkakstårtan",
    description:
      "Gubben Pettson ska baka en tårta till katten Findus födelsedag, men saknar mjöl. Vägen till granngården visar sig bli längre än väntat.",
    author: "Sven Nordqvist",
    genres: ["Bilderbok", "Barnbok"],
    image: "https://placehold.co/200x300",
    published_year: 1984,
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URL || "");
  await Book.deleteMany({});
  const created = await Book.insertMany(books);
  console.log(`La in ${created.length} böcker`);
  await mongoose.disconnect();
}

seed();
