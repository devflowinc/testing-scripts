import { Trieve } from "./client/index";
import type { SearchMethod, SearchResponseBody } from "./client/types.gen";
import { DATASET_ID, trieve } from "./trieve";

const queries = [
  "How to cook a turkey",
  "Christmas gift ideas 2021",
  "Best coffee shops near me",
  "Keto diet recipes",
  "How to get a passport",
  "Closest gas station",
  "Directions to Central Park New York",
  "Taylor Swift latest album",
  "Home workout routines",
  "2022 Oscar nominations",
  "Top-rated waterproof mascaras",
  "Nearby hiking trails",
  "How to cure a hangover",
  "Easy DIY crafts for kids",
  "Best car insurance companies",
  "Symptoms of Covid-19",
  "How to lose belly fat fast",
  "Home remedies for sore throat",
  "10-day weather forecast",
  "Vegan meal prep ideas",
  "Best TV shows on Netflix",
  "Places to visit in Paris",
  "Affordable wedding dress",
  "How to train a puppy",
  "High protein vegetarian foods",
  "Best new mobile games",
  "How to invest in stocks",
  "University rankings in the US",
  "Job interview tips",
  "COVID-19 travel restrictions",
  "Easy Christmas cookie recipes",
  "Health benefits of green tea",
  "How to write a resume",
  "How to tie a tie",
  "Where to get a COVID-19 vaccine",
  "How to vote in the election",
  "Symptoms of anxiety",
  "Best fantasy books of all time",
  "Top educational apps for kids",
  "How does Bitcoin work",
  "How to remove makeup properly",
  "Free online photography courses",
  "Ways to reduce carbon footprint",
  "Exercises for lower back pain",
  "Symptoms of dehydration",
  "How to host a virtual event",
  "How to declutter your home",
  "Best digital marketing strategies",
  "Samsung Galaxy S21 review",
  "Anti-aging skincare routine",
  "How to clean a laptop",
  "Upcoming concerts near me",
  "How to apply for a mortgage",
  "Best selling books 2021",
  "Electric car models",
  "How to improve SEO",
  "Yoga poses for beginners",
  "Best dog breed for apartments",
  "Local movie theatre showtimes",
  "How to save money",
  "Mental health resources",
  "Home decor trends 2022",
  "Learning coding basics",
  "Local recycling drop-off locations",
  "Tips for growing indoor plants",
  "How to prevent hair loss",
  "Kids activities during quarantine",
  "Most comfortable mattresses",
  "Fast food nutrition facts",
  "Online safety tips for kids",
  "How to meditate effectively",
  "Latest Air Jordan release",
  "Cultural festivals in India",
  "How to start a podcast",
  "Emergency roadside assistance",
  "Order pizza near me",
  "How to learn Spanish",
  "Non-alcoholic cocktail recipes",
  "Relaxing sounds for sleep",
  "The history of the Internet",
  "Best laptops for students",
  "Most popular TikTok challenges",
  "How to make homemade candles",
  "Best audio books for road trips",
  "Restaurants with outdoor seating",
  "How to knit a sweater",
  "Women’s World Cup 2023",
  "How to play chess",
  "How to start a small business",
  "Weekend getaways in California",
  "High speed internet providers",
  "How to fix a leaky faucet",
  "Popular diet trends 2022",
  "Best charities to donate to",
  "How to avoid phishing scams",
  "How to use Photoshop",
  "Easy-to-make Halloween costumes",
  "Flight tickets to Hawaii",
  "Ways to increase productivity",
  "Designing a small kitchen space",
];

const SEARCH_TYPES: SearchMethod[] = ["fulltext", "hybrid", "semantic"];

while (true) {
  try {
    const results = (await trieve.fetch("/api/chunk/search", "post", {
      data: {
        // Get random query
        query: queries[Math.floor(Math.random() * queries.length)],
        // Random search type
        search_type:
          SEARCH_TYPES[Math.floor(Math.random() * SEARCH_TYPES.length)],
      },
      xApiVersion: "V2",
      datasetId: DATASET_ID,
    })) as SearchResponseBody;

    console.log(results);
  } catch (err) {
    console.error(err);
  }

  // Random sleep between 5 seconds and 30 seconds
  await Bun.sleep((Math.floor(Math.random() * 25) + 5) * 1000);
}
