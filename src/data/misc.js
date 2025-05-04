export const systemRequirements = () => {
  return [
    { hardware: "OS", data: "Windows 10/11" },
    { hardware: "Processor", data: "Intel i5 10400, AMD Ryzen 5 3600" },
    { hardware: "Memory", data: "8 GB RAM" },
    {
      hardware: "Graphics",
      data: "NVIDIA RTX 2060 (6G VRAM), AMD Radeon RX 5600 XT (6G VRAM)",
    },
    { hardware: "Storage", data: "20 GB available space" },
  ];
};

export const newsItems = [
  {
    title: "IGF & Choice Awards",
    image: "https://gdconf.com/sites/default/files/IGF%20GDCA%20costream.png",
    alt: "IGF & Choice Awards",
    updated: "Last updated 3 mins ago",
    description:
      "The IGF competition awards winners in eight categories during GDC. Join thousands of attendees to honor innovative and independently created video games from around the world with any GDC pass before the Game Developers Choice Awards.",
  },
  {
    title: "Kick off 2025 with these game jams!",
    image: "https://img.itch.zone/aW1nLzE5MjY2NTI2LmpwZw==/original/jk0o3d.jpg",
    alt: "Pizza Doggy's Ham-Jam",
    description: "The new year brings a fresh wave of game jams!",
  },
  {
    title: "'Consume Me' Wins Grand Prize, Nuovo Award at the 2025 IGF Awards",
    image:
      "https://gdconf.com/sites/default/files/ss_0277c27cc3a4c7ace2d33fe0c036bd35d60a1ad1.1920x1080.jpg",
    alt: "Consume Me",
    description:
      "Darkly humorous personal game about creator relationship with food.",
  },
  {
    title: "Moon Studios' Ori series tops 15m sales",
    image:
      "https://assetsio.gnwcdn.com/Ori-and-the-Will-of-the-Wisps1-scaled-4035452908.jpg?width=720&quality=70&format=jpg&auto=webp",
    alt: "Ori series",
    description:
      "The creator defends the Metroidvania genre, noting that it was previously deemed obsolete.",
  },
];

export const missionKeypoints = [
  { text: "Easy to Use, Fun to Buy with Exclusive Deals" },
  { text: "Secure Payments, Shop Confidently" },
  { text: "Support Community, Connect and Play" },
  { text: "Excellent Support and Grow Further Together" },
  { text: "Continuous Growth for Developers" },
  { text: "Expand Reach to Investors" },
];

export const communityItems = [
  {
    title: "gamescom asia x Thailand Game Show",
    image:
      "https://www.thailandgameshow.com/wp-content/uploads/2025/02/GAxTGS-2025-Banner-1640px-x-720px-1536x674.png",
    alt: "gamescom asia x Thailand Game Show",
    description:
      "After 4 successful editions in Singapore, gamescom asia moves to Bangkok, Thailand, and joining forces with Thailand Game Show! This merger brings together two powerhouse events, creating the biggest B2B2C platform for the games industry in Southeast Asia and one of the biggest in the world. Get ready for an expansive business area, an industry gaming conference, and an exciting entertainment area uniting game industry professionals, publishers, and fans in one place.",
  },
  {
    title: "Thailand Game Festival",
    image:
      "https://s.isanook.com/ga/0/ud/236/1184066/tg.jpg?ip/resize/w728/q80/jpg",
    alt: "Thailand Game Festival",
    description:
      "Culture Ministry & TGA Host Thailand Game Festival 2024 at Emsphere.",
  },
  {
    title: "Game Talent Showcase 2025",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSArdtA4eF04Lu64HSjD8B5UYJazoRgtsTmzw&s",
    alt: "Game Talent Showcase 2025",
    description: "Young Game Creators Apply Now!",
  },
  {
    title: "depa ESPORTS TOURNAMENT: Online Tournament - RoV",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa5hCqXwFjD55cxxENC4_cdW4QzmHgm1bVeQ&shttps://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa5hCqXwFjD55cxxENC4_cdW4QzmHgm1bVeQ&s",
    alt: "depa ESPORTS TOURNAMENT: Online Tournament - RoV",
    description:
      "Esports dreamers, unite! Develop skills, compete in depa Regional Tournaments nationwide!",
  },
];

import productsData from "../data/products.json";

export const reviewItems = [
  {
    product: productsData[2],
    ratingValue: 4.0,
    reviewContent:
      "Once you get past the initial awkwardness of the door-opening mechanics, this is actually a pretty scary game.",
  },
  {
    product: productsData[8],
    ratingValue: 3.5,
    reviewContent:
      "Once you play it for 30 mins above and understand the mechanics of how to make your friend angry, this game is good. Give it a try with 1 or 2 of your friends (with a mic) in a public match!",
  },
];

export const devlogItems = [
  {
    imageUrl: "https://img.itch.zone/aW1nLzIwNDI3NDAwLnBuZw==/350x196%23cm/e8RO9n.png",
    altText: "Special Giveaway",
    tag: "Marketing",
    title: "Special Giveaway",
    gameCollection: "The Motel",
    developerAvatarUrl: "https://pbs.twimg.com/profile_images/1895194033888075776/iqkW1cX5_400x400.jpg",
    developerName: "Aura Studios",
    developerAltText: "Aura Studios",
  },
  {
    imageUrl: "https://img.itch.zone/aW1nLzIwOTQyMzczLnBuZw==/350x196%23cm/ClLCwv.png",
    altText: "New Update Released",
    tag: "Development",
    title: "Version 1.3.3 Patch Notes",
    gameCollection: "Starlight Adventures",
    developerAvatarUrl: "https://yt3.googleusercontent.com/ytc/AL5GRJXW0b274qL-4aY74gX0_Z0jF8jJv9c9P1v9=s900-c-k-c0x00ffffff-no-rj",
    developerName: "Cosmic Games",
    developerAltText: "Cosmic Games",
  },
  {
    imageUrl: "https://img.itch.zone/aW1hZ2UvMjM2NTUwMC8yMDk0OTQzNS5naWY=/350x196%23cm/IG7ZLA.gif",
    altText: "Battle Background: Town",
    tag: "Major Update",
    title: "Battle Background: Town",
    gameCollection: "Gothicvania Collection",
    developerAvatarUrl: "https://pbs.twimg.com/profile_images/1272969808007626762/XhUQYtqO_400x400.png",
    developerName: "ansimuz",
    developerAltText: "ansimuz",
  },
  {
    imageUrl: "https://img.itch.zone/aW1nLzIxMDEzMTg3LmpwZw==/350x196%23cm/2Lo4bT.jpg",
    altText: "Patch Notes-1.1",
    tag: "Major Update",
    title: "Patch Notes-1.1",
    gameCollection: "Solar Sandbox",
    developerAvatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCxEebn7U-GMZyg4sljOOqODRDd6UA2EY-9g&s",
    developerName: "totoriel",
    developerAltText: "totoriel",
  },
  {
    imageUrl: "https://img.itch.zone/aW1hZ2UvNzk1NDgxLzQ0NTM0NDAuanBn/350x196%23cm/93smb4.jpg",
    altText: "5 Things you didn't know about Dwarf Mine",
    tag: "Game Design",
    title: "5 Things you didn't know about",
    gameCollection: "Dwarf Mine",
    developerAvatarUrl: "https://yt3.googleusercontent.com/ytc/AIdro_mSy6W39sMICqXHuuINngvP4QF9FV7bMO4r5idj_CbqWg=s160-c-k-c0x00ffffff-no-rj",
    developerName: "Paper Dice Games",
    developerAltText: "Paper Dice Games",
  },
  {
    imageUrl: "https://img.itch.zone/aW1nLzIwMzQ1Mjc1LnBuZw==/350x196%23cm/OAb%2Fzn.png",
    altText: "Optimisation",
    tag: "Tech Discussion",
    title: "Optimisation",
    gameCollection: "Shark Turtle",
    developerAvatarUrl: "https://pbs.twimg.com/profile_images/928339899480240128/RMWHeTkx_400x400.jpg",
    developerName: "gingerbeardman",
    developerAltText: "gingerbeardman",
  },
  {
    imageUrl: "https://img.itch.zone/aW1nLzE5OTU5NzE4LnBuZw==/350x196%23cm/T%2BKqTT.png",
    altText: "v1.08 Chinese Translation",
    tag: "Announcement",
    title: "v1.08 Chinese Translation",
    gameCollection: "Dawntide",
    developerAvatarUrl: "https://pbs.twimg.com/profile_images/1692910103194718208/h05gLAGW_400x400.jpg",
    developerName: "Choob",
    developerAltText: "Choob",
  },
];