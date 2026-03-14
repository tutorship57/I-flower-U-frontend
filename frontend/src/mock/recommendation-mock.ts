import type { Flower } from "../types/flower";

export const FLOWER_DATABASE: Flower[] = [
  {
    id: 1,
    name: "Rose Bouquet",
    category: "Bouquets",
    description: "Beautiful red roses perfect for any occasion",
    price: 45,
    image: "https://images.pexels.com/photos/11166470/pexels-photo-11166470.jpeg",
    emotionBadge: "💖 Romantic Match",
    why: "{Roses} are the timeless symbol of {love} and {romance}. Red roses express deep {affection} and passion, making them perfect for showing someone how much you care. Their classic beauty never fails to impress and will make your {girlfriend} feel truly special on her {birthday}.",
    keywords: ["rose","roses","romantic", "love", "girlfriend", "boyfriend", "partner", "birthday", "special", "affection", "romance", "passion"]
  },
  {
    id: 2,
    name: "Tulip Arrangement",
    category: "Arrangements",
    description: "Fresh spring tulips in vibrant colors",
    price: 32.5,
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=500&h=400&fit=crop",
    emotionBadge: "🎉 Joyful Celebration",
    why: "{Tulips} bring the freshness of spring and symbolize perfect {love} and {celebration}. Their cheerful colors and elegant shape make them ideal for {congratulations} and joyful occasions. They express happiness and {new beginnings}.",
    keywords: ["tulip","tulips","congratulations", "spring", "fresh", "cheerful", "elegant", "celebration", "new beginning", "happy", "joyful"]
  },
  {
    id: 3,
    name: "Sunflower Bundle",
    category: "Bundles",
    description: "Cheerful sunflowers to brighten any room",
    price: 32.5,
    image: "https://www.peachtreepetals.com/cdn/shop/articles/all_about_sunflowers.jpg?v=1631036676&width=1600",
    emotionBadge: "🌼 Cheerful Choice",
    why: "{Sunflowers} radiate {warmth}, positivity, and {happiness}. Their bright, sunny disposition is perfect for {brightening} someone's day and bringing {comfort} and joy. These flowers lift spirits and spread positive energy wherever they go.",
    keywords: ["sunflower","cheerful", "brighten", "warm", "happy", "positive", "comfort", "sunshine", "joy", "uplifting"]
  },
  {
    id: 4,
    name: "Peony Collection",
    category: "Bouquets",
    description: "Soft romantic peonies in pastel shades",
    price: 52,
    image: "https://images.unsplash.com/photo-1591886960571-74d43a9d4166?w=500&h=400&fit=crop",
    emotionBadge: "💕 Soft Romance",
    why: "Peonies represent {romance}, prosperity, and good fortune. Their lush, full blooms in {soft colors} create a dreamy, {romantic} atmosphere perfect for {special celebrations}. The gentle pastel hues evoke feelings of tenderness and sweet {affection}.",
    keywords: ["peony","romantic", "soft colors", "elegant", "special occasion", "beautiful", "pastel", "gentle", "sweet", "tender", "affection"]
  },
  {
    id: 5,
    name: "Lily Elegance",
    category: "Arrangements",
    description: "Sophisticated white lilies for special moments",
    price: 48,
    image: "https://images.squarespace-cdn.com/content/v1/58b5d3da9f7456597d2f8956/1640815692284-ZS1EGQZXA6YU20E8DQDD/lotus-elegance-1355.jpg?format=1000w",
    emotionBadge: "✨ Sophisticated Grace",
    why: "{Lilies} symbolize purity, commitment, and refined beauty. Their {elegant} presence and sweet fragrance make them perfect for {sophisticated} occasions and heartfelt gestures. These flowers convey respect, admiration, and {special} appreciation.",
    keywords: ["lily","lilies","elegant", "special occasion", "sophisticated", "pure", "beautiful", "grace", "refined", "appreciation", "respect"]
  },
  {
    id: 6,
    name: "Mixed Garden Bouquet",
    category: "Bouquets",
    description: "A delightful mix of seasonal flowers",
    price: 38,
    image: "https://img.freepik.com/free-photo/beautiful-flowers-valentines-wedding-scene_1232-2409.jpg?semt=ais_user_personalization&w=740&q=80",
    emotionBadge: "🌈 Warm & Comforting",
    why: "This diverse arrangement combines various blooms to create a joyful, garden-fresh feel. Perfect for bringing {comfort}, {warmth}, and a touch of nature's beauty indoors. It's like sending a hug in flower form - {cheerful}, caring, and full of life.",
    keywords: ["comforting", "warm", "variety", "natural", "cheerful", "caring", "diverse", "garden", "fresh", "heartfelt"]
  }
];

export const SUGGESTION_CHIPS = [
  "Flowers for my girlfriend's birthday",
  "Flowers to say congratulations",
  "A romantic bouquet in soft colors",
  "Something cheerful to brighten someone's day",
  "Elegant flowers for a special occasion",
  "I want something warm and comforting"
];