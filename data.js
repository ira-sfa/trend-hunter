window.TREND_HUNTER_DATA = {
  gameName: 'WINTER FANCYFAIRE* TREND HUNTER',
  tagline: 'Can you spot what\'s next?',
  launchText: 'THE 2027 TRENDS ARE HERE.\nTHE HUNT IS ON.',
  personas: [
    {
      min: 90,
      max: 100,
      name: 'THE TREND ORACLE',
      blurb: 'You see what\'s coming before everyone else.'
    },
    {
      min: 75,
      max: 89,
      name: 'THE TASTEMAKER',
      blurb: 'You don\'t follow specialty food trends. You find them.'
    },
    {
      min: 60,
      max: 74,
      name: 'THE HIDDEN GEM HUNTER',
      blurb: 'You know there\'s something amazing hiding three aisles away.'
    },
    {
      min: 45,
      max: 59,
      name: 'THE EARLY ADOPTER',
      blurb: 'If it\'s about to become big, you\'ve probably already tried it.'
    },
    {
      min: 0,
      max: 44,
      name: 'THE CATEGORY MASTERMIND',
      blurb: 'You connect products, people and trends like a pro.'
    }
  ],
  challengePool: [
    {
      id: 'spot-full-flavor',
      type: 'spot-trend',
      category: 'trend-spotting',
      trendName: 'FULL FLAVOR FUTURES',
      description: 'Consumers want food experiences that are bold, unexpected and impossible to ignore.',
      prompt: 'Which product best captures this trend?',
      choices: [
        { name: 'CHILI CRUNCH CLOUDS', detail: 'Sweet-spicy crispy rice clusters', correct: true },
        { name: 'MIDNIGHT MISO', detail: 'Black garlic miso caramel', correct: false },
        { name: 'PLAIN SEA SALT CRACKERS', detail: 'Classic salted crackers', correct: false }
      ],
      explanation: 'Chili crunch clouds deliver a loud, craveable flavor hit with heat, crunch and sweet-spicy contrast.'
    },
    {
      id: 'spot-skyline-snacking',
      type: 'spot-trend',
      category: 'trend-spotting',
      trendName: 'CLEAN COMFORT',
      description: 'The next big favorites feel familiar, soothing and easy to crave.',
      prompt: 'Which product best captures this trend?',
      choices: [
        { name: 'MAPLE OAT BAKED BITS', detail: 'Warm, golden and cozy little bites', correct: true },
        { name: 'NIGHT MARKET NIBBLES', detail: 'Fizzy, punchy and dramatic', correct: false },
        { name: 'LIME DUST POPCORN', detail: 'Citrus zing with extra sparkle', correct: false }
      ],
      explanation: 'Maple oat baked bits feel comforting, familiar and quietly premium—the sweet spot of clean comfort.'
    },
    {
      id: 'buyer-drift-shelf',
      type: 'buyer-choice',
      category: 'buyer-instinct',
      scenario: 'YOU\'RE THE BUYER.\nYou have room for ONE new product. Which one are you betting on?',
      prompt: 'Pick the strongest bet for the next season.',
      choices: [
        {
          name: 'CLOUDY COCONUT CREAM',
          detail: 'Silky spread with toasted vanilla and sea salt',
          price: '$14',
          trend: 'Clean Comfort',
          emoji: '🥥',
          correct: true
        },
        {
          name: 'SMOKY LAVA PEANUTS',
          detail: 'Fiery, blurry heat and playful crunch',
          price: '$9',
          trend: 'Full Flavor',
          emoji: '🌶️',
          correct: false
        },
        {
          name: 'UNICORN PICKLE POPS',
          detail: 'Color-coded brine bites with a novelty twist',
          price: '$8',
          trend: 'Novelty novelty',
          emoji: '🦄',
          correct: false
        }
      ],
      explanation: 'The creamy coconut spread balances trend appeal with broad, everyday comfort and premium positioning.'
    },
    {
      id: 'buyer-expedition',
      type: 'buyer-choice',
      category: 'buyer-instinct',
      scenario: 'YOU\'RE THE BUYER.\nYou need a product that feels must-have, not just novelty. Which one gets the shelf space?',
      prompt: 'Trust your buyer instincts.',
      choices: [
        {
          name: 'SOUR CANDY GINGER',
          detail: 'A bold candy-coated ginger bite with a chewy finish',
          price: '$7',
          trend: 'Big Flavor',
          emoji: '🍬',
          correct: false
        },
        {
          name: 'EVERYDAY HERB DRIZZLE',
          detail: 'A savory finishing glaze for cheese, grains and roasted veg',
          price: '$13',
          trend: 'Elevated Everyday',
          emoji: '🌿',
          correct: true
        },
        {
          name: 'DRAGONFRUIT DUST',
          detail: 'Color-forward seasonings with a dramatic push',
          price: '$10',
          trend: 'Visual Boldness',
          emoji: '🐉',
          correct: false
        }
      ],
      explanation: 'The herb drizzle has a clear use case and a premium everyday story—ideal for the next wave of category growth.'
    },
    {
      id: 'exhibitor-miso-maple',
      type: 'exhibitor-match',
      category: 'product-iq',
      product: {
        name: 'MISO MAPLE CRUNCH',
        description: 'Sweet and savory crispy clusters with maple, miso and sesame.'
      },
      prompt: 'Which 2027 trend gives this product its strongest story?',
      choices: [
        { name: 'FULL FLAVOR FUTURES', correct: false },
        { name: 'CLEAN COMFORT', correct: false },
        { name: 'ELEVATED EVERYDAY', correct: true },
        { name: 'CITRUS AFTERGLOW', correct: false }
      ],
      explanation: 'Miso maple crunch is exactly the kind of elevated everyday flavor story that feels premium but instantly familiar.'
    },
    {
      id: 'exhibitor-banana-snack',
      type: 'exhibitor-match',
      category: 'product-iq',
      product: {
        name: 'SMOKED BANANA BITS',
        description: 'A chewy, smoky-sweet snack with a hint of black pepper and toasted sugar.'
      },
      prompt: 'Which trend gives this product its strongest story?',
      choices: [
        { name: 'SWEET & SAVORY REBELLION', correct: true },
        { name: 'CITRUS AFTERGLOW', correct: false },
        { name: 'CLEAN COMFORT', correct: false },
        { name: 'SCHOOLNIGHT SNACKS', correct: false }
      ],
      explanation: 'Sweet-and-savory rebellion fits the product perfectly—part unexpected, part craveable, and impossible to ignore.'
    },
    {
      id: 'hype-fern',
      type: 'trend-or-hype',
      category: 'product-iq',
      productName: 'FERMENTED HOT HONEY',
      productDetail: 'A dramatic drizzle with a spicy kick and a cult-following claim.',
      prompt: 'TREND or HYPE?',
      isTrend: true,
      explanation: 'Fermented heat hits the right notes for flavor-forward innovation and a story-rich product category.'
    },
    {
      id: 'hype-lava-soda',
      type: 'trend-or-hype',
      category: 'product-iq',
      productName: 'MIDNIGHT MANGO BLAST',
      productDetail: 'A neon-sparked soda built for social-media spectacle and zero taste restraint.',
      prompt: 'TREND or HYPE?',
      isTrend: false,
      explanation: 'It is loud and attention-grabbing, but the concept reads more novelty than lasting category signal.'
    },
    {
      id: 'hype-snow-cocoa',
      type: 'trend-or-hype',
      category: 'product-iq',
      productName: 'SNOWDAY HOT CHOCOLATE WAFERS',
      productDetail: 'A seasonally themed snack with texture, indulgence and a cozy winter mood.',
      prompt: 'TREND or HYPE?',
      isTrend: true,
      explanation: 'Seasonal comfort and elevated indulgence keep this firmly in the category of real consumer interest instead of fluff.'
    },
    {
      id: 'final-ingredient-story',
      type: 'final-challenge',
      category: 'product-iq',
      title: 'FINAL CHALLENGE',
      subtitle: 'TREND OF THE YEAR',
      scenario: 'You\'ve found the product.\nYou\'ve found the buyer.\nNow make the call.',
      prompt: 'Which move feels most aligned with the official 2027 Trend of the Year?',
      choices: [
        {
          label: 'Launch a premium limited drop',
          description: 'Position it as a seasonal must-have with a strong story and visual appeal.',
          correct: true
        },
        {
          label: 'Stick to a plain, classic version',
          description: 'Keep it safe and familiar with no trend signal at all.',
          correct: false
        },
        {
          label: 'Lean hard into novelty alone',
          description: 'Bet on meme value without proving the product has staying power.',
          correct: false
        }
      ],
      explanation: 'A premium limited drop gives the brand a real story, a clear consumer hook and a stronger path to trend momentum.'
    }
  ]
};
