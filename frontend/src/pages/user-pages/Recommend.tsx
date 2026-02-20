import React, { useState, useEffect, useRef } from 'react';

// ============================================================
// TYPES & INTERFACES
// ============================================================
interface Flower {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
  emotionBadge: string;
  why: string;
  keywords: string[];
}

// ============================================================
// CONSTANTS
// ============================================================
const HISTORY_KEY = 'flowerSearchHistory';
const MAX_HISTORY_ITEMS = 5;

const FLOWER_DATABASE: Flower[] = [
  {
    id: 1,
    name: "Rose Bouquet",
    category: "Bouquets",
    description: "Beautiful red roses perfect for any occasion",
    price: 45,
    image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=500&h=400&fit=crop",
    emotionBadge: "💖 Romantic Match",
    why: "Roses are the timeless symbol of {love} and {romance}. Red roses express deep {affection} and passion, making them perfect for showing someone how much you care. Their classic beauty never fails to impress and will make your {girlfriend} feel truly special on her {birthday}.",
    keywords: ["romantic", "love", "girlfriend", "boyfriend", "partner", "birthday", "special", "affection", "romance", "passion"]
  },
  {
    id: 2,
    name: "Tulip Arrangement",
    category: "Arrangements",
    description: "Fresh spring tulips in vibrant colors",
    price: 32.5,
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=500&h=400&fit=crop",
    emotionBadge: "🎉 Joyful Celebration",
    why: "Tulips bring the freshness of spring and symbolize perfect {love} and {celebration}. Their cheerful colors and elegant shape make them ideal for {congratulations} and joyful occasions. They express happiness and {new beginnings}.",
    keywords: ["congratulations", "spring", "fresh", "cheerful", "elegant", "celebration", "new beginning", "happy", "joyful"]
  },
  {
    id: 3,
    name: "Sunflower Bundle",
    category: "Bundles",
    description: "Cheerful sunflowers to brighten any room",
    price: 32.5,
    image: "https://images.unsplash.com/photo-1597848212624-e333f0d60d5e?w=500&h=400&fit=crop",
    emotionBadge: "🌼 Cheerful Choice",
    why: "Sunflowers radiate {warmth}, positivity, and {happiness}. Their bright, sunny disposition is perfect for {brightening} someone's day and bringing {comfort} and joy. These flowers lift spirits and spread positive energy wherever they go.",
    keywords: ["cheerful", "brighten", "warm", "happy", "positive", "comfort", "sunshine", "joy", "uplifting"]
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
    keywords: ["romantic", "soft colors", "elegant", "special occasion", "beautiful", "pastel", "gentle", "sweet", "tender", "affection"]
  },
  {
    id: 5,
    name: "Lily Elegance",
    category: "Arrangements",
    description: "Sophisticated white lilies for special moments",
    price: 48,
    image: "https://images.unsplash.com/photo-1594582227453-7073259bc0eb?w=500&h=400&fit=crop",
    emotionBadge: "✨ Sophisticated Grace",
    why: "Lilies symbolize purity, commitment, and refined beauty. Their {elegant} presence and sweet fragrance make them perfect for {sophisticated} occasions and heartfelt gestures. These flowers convey respect, admiration, and {special} appreciation.",
    keywords: ["elegant", "special occasion", "sophisticated", "pure", "beautiful", "grace", "refined", "appreciation", "respect"]
  },
  {
    id: 6,
    name: "Mixed Garden Bouquet",
    category: "Bouquets",
    description: "A delightful mix of seasonal flowers",
    price: 38,
    image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=500&h=400&fit=crop",
    emotionBadge: "🌈 Warm & Comforting",
    why: "This diverse arrangement combines various blooms to create a joyful, garden-fresh feel. Perfect for bringing {comfort}, {warmth}, and a touch of nature's beauty indoors. It's like sending a hug in flower form - {cheerful}, caring, and full of life.",
    keywords: ["comforting", "warm", "variety", "natural", "cheerful", "caring", "diverse", "garden", "fresh", "heartfelt"]
  }
];

const SUGGESTION_CHIPS = [
  "Flowers for my girlfriend's birthday",
  "Flowers to say congratulations",
  "A romantic bouquet in soft colors",
  "Something cheerful to brighten someone's day",
  "Elegant flowers for a special occasion",
  "I want something warm and comforting"
];

// ============================================================
// HELPER FUNCTIONS
// ============================================================
function findBestMatch(inputText: string): Flower {
  const lowerInput = inputText.toLowerCase();
  let bestMatch = FLOWER_DATABASE[0];
  let highestScore = 0;

  FLOWER_DATABASE.forEach(flower => {
    let score = 0;
    flower.keywords.forEach(keyword => {
      if (lowerInput.includes(keyword)) {
        score++;
      }
    });
    if (score > highestScore) {
      highestScore = score;
      bestMatch = flower;
    }
  });

  return bestMatch;
}

function highlightKeywords(text: string, inputText: string): string {
  const lowerInput = inputText.toLowerCase();
  let highlightedText = text;
  
  const wordsToHighlight: string[] = [];
  const matches = text.match(/\{([^}]+)\}/g);
  
  if (matches) {
    matches.forEach(match => {
      const word = match.slice(1, -1);
      if (lowerInput.includes(word.toLowerCase())) {
        wordsToHighlight.push(word);
      }
    });
  }
  
  highlightedText = highlightedText.replace(/\{([^}]+)\}/g, (match, keyword) => {
    if (wordsToHighlight.includes(keyword)) {
      return `<span class="highlight">${keyword}</span>`;
    }
    return keyword;
  });
  
  return highlightedText;
}

// ============================================================
// STYLES COMPONENT
// ============================================================
const GlobalStyles = () => (
  <style>{`

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background: linear-gradient(135deg, #ffeef8 0%, #fff5f7 100%);
      color: #333;
      line-height: 1.6;
      overflow-x: hidden;
    }

    /* Animations */
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes fadeInDown {
      from { opacity: 0; transform: translateY(-20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes modalSlideUp {
      from { opacity: 0; transform: translateY(50px) scale(0.9); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    @keyframes floatUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }

    @keyframes floatPetal {
      0% { opacity: 0; transform: translateY(0) rotate(0deg); }
      20% { opacity: 1; }
      80% { opacity: 1; }
      100% { opacity: 0; transform: translateY(-100px) rotate(180deg); }
    }

    @keyframes textPulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }

    @keyframes dotBounce {
      0%, 80%, 100% { transform: translateY(0); }
      40% { transform: translateY(-10px); }
    }

    @keyframes imageZoomIn {
      from { opacity: 0; transform: scale(0.8); }
      to { opacity: 1; transform: scale(1); }
    }

    @keyframes badgePop {
      from { opacity: 0; transform: scale(0.5); }
      to { opacity: 1; transform: scale(1); }
    }

    @keyframes cardFadeInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes heartBeat {
      0%, 100% { transform: scale(1); }
      25% { transform: scale(1.3); }
      50% { transform: scale(1.1); }
      75% { transform: scale(1.25); }
    }

    @keyframes chipFadeIn {
      from { opacity: 0; transform: translateX(-10px); }
      to { opacity: 1; transform: translateX(0); }
    }

    @keyframes ribbonSlide {
      from { opacity: 0; transform: translateX(-100px); }
      to { opacity: 1; transform: translateX(0); }
    }

    .highlight {
      background: linear-gradient(120deg, #ffe8f0 0%, #ffe8f0 100%);
      padding: 0.1rem 0.3rem;
      border-radius: 3px;
      font-weight: 600;
      color: #e63956;
    }
  `}</style>
);

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function FlowerRecommender() {
  const [userInput, setUserInput] = useState('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showThinking, setShowThinking] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [featuredFlower, setFeaturedFlower] = useState<Flower | null>(null);
  const [currentInput, setCurrentInput] = useState('');
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());
  
  const resultsRef = useRef<HTMLDivElement>(null);

  // Load search history from localStorage on mount
  useEffect(() => {
    const history = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
    setSearchHistory(history);
  }, []);

  // Save search history
  const saveSearchHistory = (searchText: string) => {
    let history = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
    history = history.filter((item: string) => item !== searchText);
    history.unshift(searchText);
    history = history.slice(0, MAX_HISTORY_ITEMS);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    setSearchHistory(history);
  };

  const clearSearchHistory = () => {
    if (window.confirm('Are you sure you want to clear your search history?')) {
      localStorage.removeItem(HISTORY_KEY);
      setSearchHistory([]);
    }
  };

  const handleRecommend = () => {
    const inputText = userInput.trim();
    
    if (!inputText) {
      alert("Please tell us what you're looking for! ✨");
      return;
    }

    saveSearchHistory(inputText);
    setCurrentInput(inputText);
    const match = findBestMatch(inputText);
    setFeaturedFlower(match);

    // Show thinking animation
    setShowThinking(true);
    document.body.style.overflow = 'hidden';

    // After 2 seconds, show modal
    setTimeout(() => {
      setShowThinking(false);
      setShowModal(true);
    }, 2000);
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = '';
    setShowResults(true);
    
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
  };

  const toggleWishlist = (id: number) => {
    setWishlist(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showModal) closeModal();
        if (showThinking) {
          setShowThinking(false);
          document.body.style.overflow = '';
        }
      }
      
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && document.activeElement?.id === 'userInput') {
        handleRecommend();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showModal, showThinking, userInput]);

  // Create ordered product list (featured first)
  const orderedFlowers = featuredFlower
    ? [featuredFlower, ...FLOWER_DATABASE.filter(f => f.id !== featuredFlower.id)]
    : FLOWER_DATABASE;

  return (
    <>
      <GlobalStyles />

      {/* Main Content */}
      <main>
        {/* Recommendation Section */}
        <section style={{
          maxWidth: 960,
          margin: '4rem auto',
          padding: '0 2rem',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            color: '#e63956',
            marginBottom: '0.5rem',
            animation: 'fadeInDown 0.6s ease-out'
          }}>
            Tell us what you're looking for
          </h1>
          <p style={{
            color: '#999',
            fontSize: '1.1rem',
            marginBottom: '3rem',
            animation: 'fadeInDown 0.6s ease-out 0.1s backwards'
          }}>
            We'll help you find the perfect flowers
          </p>

          <div style={{
            background: 'white',
            borderRadius: 20,
            padding: '2.5rem',
            boxShadow: '0 10px 40px rgba(230, 57, 86, 0.1)',
            marginBottom: '2rem',
            animation: 'fadeInUp 0.6s ease-out 0.2s backwards'
          }}>
            <textarea
              id="userInput"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Tell us who the flowers are for, the occasion, or how you want to make them feel... For example: 'I want to surprise my girlfriend with something romantic and sweet for her birthday'"
              style={{
                width: '100%',
                minHeight: 120,
                padding: '1.5rem',
                border: '2px solid #f0f0f0',
                borderRadius: 15,
                fontSize: '1rem',
                fontFamily: 'inherit',
                resize: 'vertical',
                transition: 'all 0.3s',
                marginBottom: '1.5rem'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#e63956';
                e.target.style.boxShadow = '0 0 0 3px rgba(230, 57, 86, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#f0f0f0';
                e.target.style.boxShadow = 'none';
              }}
            />

            <button
              onClick={handleRecommend}
              style={{
                background: 'linear-gradient(135deg, #e63956 0%, #ff5c7c 100%)',
                color: 'white',
                border: 'none',
                padding: '1.2rem 3rem',
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: 50,
                cursor: 'pointer',
                transition: 'all 0.3s',
                boxShadow: '0 8px 20px rgba(230, 57, 86, 0.3)',
                width: '100%',
                maxWidth: 400,
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              Recommend flowers for me
            </button>

            {/* Search History */}
            {searchHistory.length > 0 && (
              <div style={{
                marginTop: '2rem',
                paddingTop: '2rem',
                borderTop: '1px solid #f0f0f0',
                textAlign: 'left'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1rem'
                }}>
                  <span style={{
                    color: '#666',
                    fontSize: '0.9rem',
                    fontWeight: 600
                  }}>Your recent flower searches</span>
                  <button
                    onClick={clearSearchHistory}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#999',
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      transition: 'color 0.3s'
                    }}
                  >Clear history</button>
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                  gap: '0.7rem 0.6rem'
                }}>
                  {searchHistory.map((text, i) => (
                    <button
                      key={i}
                      title={text}
                      onClick={() => setUserInput(text)}
                      style={{
                        background: '#f8f8f8',
                        border: '1px solid #e8e8e8',
                        padding: 0,
                        height: 40,
                        borderRadius: 20,
                        color: '#666',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        transition: 'all 0.3s',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        padding: '0 1.2rem',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        minWidth: 0,
                        animation: `chipFadeIn 0.4s ease-out ${i * 0.1}s backwards`
                      }}
                    >{text}</button>
                  ))}
                </div>
              </div>
            )}

            {/* Suggestion Chips */}
            <div style={{ marginTop: '2rem', textAlign: 'left' }}>
              <span style={{
                color: '#666',
                fontSize: '0.9rem',
                marginBottom: '1rem',
                display: 'block'
              }}>Not sure what to write? Try these:</span>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '0.7rem 0.6rem'
              }}>
                {SUGGESTION_CHIPS.map((text) => (
                  <button
                    key={text}
                    title={text}
                    onClick={() => setUserInput(text)}
                    style={{
                      background: '#ffe8f0',
                      border: '1px solid #ffcfe0',
                      padding: 0,
                      height: 40,
                      borderRadius: 20,
                      color: '#e63956',
                      cursor: 'pointer',
                      fontSize: '0.95rem',
                      transition: 'all 0.3s',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      padding: '0 1.2rem',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      minWidth: 0
                    }}
                  >{text}</button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Thinking Overlay */}
        {showThinking && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(255, 238, 248, 0.98) 0%, rgba(255, 245, 247, 0.98) 100%)',
            zIndex: 2000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            animation: 'fadeIn 0.4s ease-out'
          }}>
            <div style={{ textAlign: 'center', animation: 'floatUp 0.6s ease-out' }}>
              <div style={{
                position: 'relative',
                width: 120,
                height: 120,
                margin: '0 auto 2rem'
              }}>
                <div style={{
                  fontSize: '4rem',
                  animation: 'pulse 1.5s ease-in-out infinite'
                }}>🌸</div>
                {[
                  { top: -20, left: 20, delay: '0s' },
                  { top: 30, left: -10, delay: '0.5s' },
                  { top: -10, right: 10, delay: '1s' },
                  { bottom: 10, left: 30, delay: '1.5s' },
                  { bottom: 20, right: 20, delay: '2s' }
                ].map((pos, i) => (
                  <div key={i} style={{
                    position: 'absolute',
                    fontSize: '2rem',
                    animation: `floatPetal 3s ease-in-out infinite`,
                    animationDelay: pos.delay,
                    opacity: 0,
                    ...pos
                  }}>🌸</div>
                ))}
              </div>
              <div style={{
                fontSize: '1.5rem',
                color: '#e63956',
                fontWeight: 600,
                marginBottom: '0.5rem',
                animation: 'textPulse 1.5s ease-in-out infinite'
              }}>Finding the perfect flowers for you</div>
              <div style={{ color: '#999', fontSize: '1rem' }}>
                <div style={{ display: 'inline-flex', gap: '0.3rem' }}>
                  {[0, 0.2, 0.4].map((delay, i) => (
                    <span key={i} style={{
                      width: 8,
                      height: 8,
                      background: '#e63956',
                      borderRadius: '50%',
                      animation: 'dotBounce 1.4s ease-in-out infinite',
                      animationDelay: `${delay}s`
                    }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal */}
        {showModal && featuredFlower && (
          <div
            onClick={(e) => {
              if (e.target === e.currentTarget) closeModal();
            }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.6)',
              zIndex: 1000,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              animation: 'fadeIn 0.3s ease-out'
            }}
          >
            <div style={{
              background: 'white',
              borderRadius: 25,
              maxWidth: 550,
              width: '90%',
              maxHeight: '90vh',
              overflowY: 'auto',
              position: 'relative',
              animation: 'modalSlideUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
            }}>
              <div style={{
                padding: '2rem 2rem 1rem',
                textAlign: 'center',
                position: 'relative'
              }}>
                <h2 style={{
                  color: '#e63956',
                  fontSize: '1.8rem',
                  marginBottom: '0.5rem'
                }}>The flower that feels just right for you</h2>
                <button
                  onClick={closeModal}
                  style={{
                    position: 'absolute',
                    top: '1.5rem',
                    right: '1.5rem',
                    background: '#f5f5f5',
                    border: 'none',
                    width: 35,
                    height: 35,
                    borderRadius: '50%',
                    cursor: 'pointer',
                    fontSize: '1.3rem',
                    color: '#666',
                    transition: 'all 0.3s',
                    zIndex: 10
                  }}
                >×</button>
              </div>
              <div style={{ padding: '0 2rem 2rem' }}>
                <img
                  src={featuredFlower.image}
                  alt={featuredFlower.name}
                  style={{
                    width: '100%',
                    height: 300,
                    objectFit: 'cover',
                    borderRadius: 20,
                    marginBottom: '1.5rem',
                    animation: 'imageZoomIn 0.8s ease-out',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                  }}
                />
                <div style={{
                  display: 'inline-block',
                  background: 'linear-gradient(135deg, #ffe8f0 0%, #fff0f4 100%)',
                  padding: '0.6rem 1.5rem',
                  borderRadius: 25,
                  color: '#e63956',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  marginBottom: '1rem',
                  animation: 'badgePop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s backwards'
                }}>{featuredFlower.emotionBadge}</div>
                <h3 style={{
                  fontSize: '1.6rem',
                  color: '#333',
                  marginBottom: '0.5rem',
                  animation: 'fadeInUp 0.6s ease-out 0.4s backwards'
                }}>{featuredFlower.name}</h3>
                <p style={{
                  color: '#666',
                  marginBottom: '1.5rem',
                  animation: 'fadeInUp 0.6s ease-out 0.5s backwards'
                }}>{featuredFlower.description}</p>
                <div style={{
                  background: '#fff9fb',
                  padding: '1.5rem',
                  borderRadius: 15,
                  borderLeft: '4px solid #e63956',
                  textAlign: 'left',
                  animation: 'fadeInUp 0.6s ease-out 0.6s backwards'
                }}>
                  <h4 style={{
                    color: '#e63956',
                    marginBottom: '0.8rem',
                    fontSize: '1.1rem'
                  }}>Why this flower?</h4>
                  <p
                    style={{ color: '#666', lineHeight: 1.8 }}
                    dangerouslySetInnerHTML={{
                      __html: highlightKeywords(featuredFlower.why, currentInput)
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results Section */}
        {showResults && featuredFlower && (
          <section ref={resultsRef} style={{
            maxWidth: 1400,
            margin: '4rem auto',
            padding: '0 2rem'
          }}>
            <div style={{
              textAlign: 'center',
              marginBottom: '3rem',
              animation: 'fadeInUp 0.6s ease-out'
            }}>
              <h2 style={{
                fontSize: '2.2rem',
                color: '#333',
                marginBottom: '0.5rem'
              }}>Flowers chosen just for you</h2>
              <p style={{
                color: '#999',
                fontSize: '1.1rem'
              }}>We found these beautiful options that match what you're looking for</p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '2rem',
              marginBottom: '4rem'
            }}>
              {orderedFlowers.map((flower, index) => {
                const isFeatured = index === 0 && flower.id === featuredFlower.id;
                return (
                  <div
                    key={flower.id}
                    style={{
                      background: 'white',
                      borderRadius: 20,
                      overflow: 'hidden',
                      boxShadow: isFeatured 
                        ? '0 8px 30px rgba(230, 57, 86, 0.25)'
                        : '0 5px 20px rgba(0,0,0,0.08)',
                      transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      position: 'relative',
                      opacity: 0,
                      transform: 'translateY(30px)',
                      animation: `cardFadeInUp 0.6s ease-out ${index * 0.1}s forwards`,
                      ...(isFeatured && {
                        border: '3px solid transparent',
                        backgroundImage: 'linear-gradient(white, white), linear-gradient(135deg, #e63956, #ff5c7c)',
                        backgroundOrigin: 'border-box',
                        backgroundClip: 'padding-box, border-box'
                      })
                    }}
                  >
                    {isFeatured && (
                      <div style={{
                        position: 'absolute',
                        top: 20,
                        left: -5,
                        background: 'linear-gradient(135deg, #e63956 0%, #ff5c7c 100%)',
                        color: 'white',
                        padding: '0.5rem 1.5rem 0.5rem 1rem',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        zIndex: 20,
                        borderRadius: '0 25px 25px 0',
                        boxShadow: '0 4px 15px rgba(230, 57, 86, 0.4)',
                        animation: 'ribbonSlide 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s backwards'
                      }}>⭐ Our Top Recommendation</div>
                    )}
                    
                    <div style={{
                      position: 'relative',
                      overflow: 'hidden',
                      height: 250
                    }}>
                      <img
                        src={flower.image}
                        alt={flower.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
                        }}
                      />
                      <button
                        onClick={() => toggleWishlist(flower.id)}
                        style={{
                          position: 'absolute',
                          top: '1rem',
                          right: '1rem',
                          background: wishlist.has(flower.id) ? '#e63956' : 'white',
                          color: wishlist.has(flower.id) ? 'white' : 'inherit',
                          border: 'none',
                          width: 40,
                          height: 40,
                          borderRadius: '50%',
                          cursor: 'pointer',
                          fontSize: '1.2rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                          transition: 'all 0.3s',
                          zIndex: 10
                        }}
                      >{wishlist.has(flower.id) ? '♥' : '♡'}</button>
                      <span style={{
                        position: 'absolute',
                        bottom: '1rem',
                        left: '1rem',
                        background: 'rgba(255,255,255,0.95)',
                        padding: '0.4rem 1rem',
                        borderRadius: 20,
                        fontSize: '0.8rem',
                        color: '#e63956',
                        fontWeight: 600,
                        backdropFilter: 'blur(10px)'
                      }}>{flower.category}</span>
                    </div>

                    <div style={{ padding: '1.5rem' }}>
                      <h3 style={{
                        fontSize: '1.3rem',
                        color: '#333',
                        marginBottom: isFeatured ? '0.3rem' : '0.5rem'
                      }}>{flower.name}</h3>
                      {isFeatured && (
                        <p style={{
                          color: '#e63956',
                          fontSize: '0.85rem',
                          fontStyle: 'italic',
                          marginTop: '0.3rem',
                          marginBottom: '0.5rem',
                          fontWeight: 500
                        }}>This is the flower we recommended based on your request.</p>
                      )}
                      <p style={{
                        color: '#999',
                        fontSize: '0.9rem',
                        marginBottom: '1rem'
                      }}>{flower.description}</p>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <span style={{
                          fontSize: '1.5rem',
                          color: '#e63956',
                          fontWeight: 700
                        }}>${flower.price}</span>
                        <button style={{
                          background: '#e63956',
                          color: 'white',
                          border: 'none',
                          padding: '0.6rem 1.5rem',
                          borderRadius: 25,
                          cursor: 'pointer',
                          fontSize: '0.9rem',
                          fontWeight: 600,
                          transition: 'all 0.3s'
                        }}>View Detail</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </main>
    </>
  );
}


