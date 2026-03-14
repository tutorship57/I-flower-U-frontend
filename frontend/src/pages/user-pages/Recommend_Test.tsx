import React, { useState, useEffect, useRef } from "react"
import type { Flower } from "../../types/flower"
import { FLOWER_DATABASE, SUGGESTION_CHIPS } from "../../mock/recommendation-mock"

const HISTORY_KEY = "flowerSearchHistory"
const MAX_HISTORY_ITEMS = 5

const Recommend: React.FC = () => {

  const [userInput, setUserInput] = useState("")
  const [searchHistory, setSearchHistory] = useState<string[]>([])

  const [showThinking, setShowThinking] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const [featuredFlower, setFeaturedFlower] = useState<Flower | null>(null)
  const [personality, setPersonality] = useState("")

  const [wishlist, setWishlist] = useState<Set<number>>(new Set())

  const resultsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const saved = localStorage.getItem(HISTORY_KEY)
    if (saved) setSearchHistory(JSON.parse(saved))
  }, [])

  const saveHistory = (text: string) => {

    const updated = [text, ...searchHistory.filter((i) => i !== text)]
      .slice(0, MAX_HISTORY_ITEMS)

    setSearchHistory(updated)

    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated))
  }

  const clearSearchHistory = () => {
    setSearchHistory([])
    localStorage.removeItem(HISTORY_KEY)
  }

  const toggleWishlist = (id: number) => {

    const newSet = new Set(wishlist)

    newSet.has(id) ? newSet.delete(id) : newSet.add(id)

    setWishlist(newSet)

  }

  //Highlightคำใน popup card - why this flower
  const highlightKeywords = (text: string, input: string) => {

  const lowerInput = input.toLowerCase()

  return text.replace(/\{([^}]+)\}/g, (_, word) => {

    const lowerWord = word.toLowerCase()

    const isMatch =
      lowerInput.includes(lowerWord) ||
      lowerWord.includes(lowerInput)

    if (isMatch) {
      return `<span class="text-[#e63956] font-semibold">${word}</span>`
    }

    return word
  })
}

//  moch data แทน API------ (1.1)
// const detectPersonality = (text: string) => {

//   const input = text.toLowerCase()

//   if (input.includes("love") || input.includes("romantic") || input.includes("date")) {
//     return "Romantic, affectionate, and emotionally expressive"
//   }

//   if (input.includes("friend") || input.includes("birthday")) {
//     return "Warm, friendly, and thoughtful"
//   }

//   if (input.includes("cheer") || input.includes("happy") || input.includes("bright")) {
//     return "Positive, energetic, and uplifting"
//   }

//   if (input.includes("calm") || input.includes("peace")) {
//     return "Calm, reflective, and peaceful"
//   }

//   return "Thoughtful and expressive"
// }
//---------------------------

  const handleRecommend = () => {

    const currentInput = userInput.trim()

    if (!currentInput) return

    setShowThinking(true)

//  moch data แทน API------ (1.2)
//    setTimeout(() => {

//   const lowerInput = currentInput.toLowerCase()

//   let match = FLOWER_DATABASE.find(f =>
//     lowerInput.includes(f.name.toLowerCase().split(" ")[0]) ||
//     f.keywords.some(k => lowerInput.includes(k.toLowerCase()))
//   )

//   if (!match) {
//     match = FLOWER_DATABASE[0]
//   }
//     setPersonality(detectPersonality(currentInput))

//   setFeaturedFlower(match)

//   saveHistory(currentInput)

//   setShowThinking(false)

//   setShowModal(true)

// }, 800)
//---------------------------

    //เชื่อม API
    fetch("http://localhost:3000/api/recommendation/flower", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        prompt: currentInput
      })

    })

      .then(res => res.json())

      .then(data => {

        console.log("API RESULT:", data)

        setPersonality(data?.data?.user_personality || "")

        if (!data.data || !data.data.suitable_flowers) {
          console.log("No flower returned from API")
          return
        }

        const aiFlowers = data.data.suitable_flowers.map(
          (f: string) => f.toLowerCase().trim()
        )

        const flowerName =
          aiFlowers.find((f: string) => currentInput.toLowerCase().includes(f)) ||
          aiFlowers.find((f: string) => f.includes(currentInput.toLowerCase())) ||
          aiFlowers[0]

        let match = FLOWER_DATABASE.find(f =>
          currentInput.toLowerCase().includes(f.name.toLowerCase().split(" ")[0]) ||
          f.keywords.some(k => currentInput.toLowerCase().includes(k.toLowerCase()))
        )

        if (!match) {

          const flowerNameFromAI = aiFlowers[0]

          match = FLOWER_DATABASE.find(f =>
            f.name.toLowerCase().includes(flowerNameFromAI) ||
            flowerNameFromAI.includes(f.name.toLowerCase()) ||
            f.keywords.some(k => flowerNameFromAI.includes(k.toLowerCase()))
          )

        }

        console.log("match:", match)

        if (match) {
          setFeaturedFlower(match)
        } else {
          setFeaturedFlower(FLOWER_DATABASE[0])
        }

        saveHistory(currentInput)

        setShowThinking(false)

        setShowModal(true)

        setTimeout(() => {
          resultsRef.current?.scrollIntoView({ behavior: "smooth" })
        }, 400)

      })

      .catch(err => {

        console.error(err)

        setShowThinking(false)

      })

  }

  const orderedFlowers = featuredFlower
    ? [featuredFlower, ...FLOWER_DATABASE.filter((f) => f.id !== featuredFlower.id)]
    : FLOWER_DATABASE

  return (

    <main>

      {/* INPUT */}

      <section className="max-w-[960px] mx-auto mt-16 px-8 text-center">

        <h1 className="text-4xl font-bold text-[#e63956] mb-2">
          Tell us what you're looking for
        </h1>

        <p className="text-gray-400 text-lg mb-12">
          We'll help you find the perfect flowers
        </p>

        <div className="bg-white rounded-[20px] p-10 shadow-xl shadow-pink-200/40">

          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Tell us who the flowers are for..."
            className="w-full min-h-[120px] p-6 border-2 border-gray-200 rounded-xl resize-y focus:border-[#e63956] focus:ring-4 focus:ring-pink-200 outline-none mb-6"
          />

          <button
            onClick={handleRecommend}
            className="bg-gradient-to-r from-[#e63956] to-[#ff5c7c] text-white font-semibold px-10 py-4 rounded-full shadow-lg shadow-pink-300 hover:scale-105 transition w-full max-w-[400px]"
          >
            Recommend flowers for me
          </button>

          {/* SEARCH HISTORY */}

          {searchHistory.length > 0 && (

            <div className="mt-10 pt-8 border-t text-left">

              <div className="flex justify-between mb-4">

                <span className="text-gray-500 text-sm font-semibold">
                  Your recent flower searches
                </span>

                <button
                  onClick={clearSearchHistory}
                  className="text-gray-400 text-sm hover:text-gray-600"
                >
                  Clear history
                </button>

              </div>

              <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-2">

                {searchHistory.map((text, i) => (

                  <button
                    key={i}
                    onClick={() => setUserInput(text)}
                    className="bg-gray-100 border border-gray-200 h-10 rounded-full px-5 text-sm text-gray-600 truncate hover:bg-gray-200"
                  >
                    {text}
                  </button>

                ))}

              </div>

            </div>

          )}

          {/* SUGGESTIONS */}

          <div className="mt-10 text-left">

            <span className="text-gray-500 text-sm block mb-4">
              Not sure what to write? Try these:
            </span>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-2">

              {SUGGESTION_CHIPS.map((text) => (

                <button
                  key={text}
                  onClick={() => setUserInput(text)}
                  className="bg-pink-100 border border-pink-200 text-[#e63956] h-10 rounded-full px-5 text-sm truncate hover:bg-pink-200"
                >
                  {text}
                </button>

              ))}

            </div>

          </div>

        </div>

      </section>


      {/* LOADING */}

        {showThinking && (

        <div className="fixed inset-0 bg-gradient-to-br from-pink-50 via-white to-pink-100 flex flex-col items-center justify-center z-50">

            {/* flower icon */}
            <div className="text-6xl mb-6 animate-pulse">
            🌸
            </div>

            {/* title */}
            <h2 className="text-2xl font-semibold text-[#e63956] mb-2">
            Finding the perfect flowers
            </h2>

            {/* animated dots */}
            <div className="flex gap-2 mt-2">
            <span className="w-2 h-2 bg-[#e63956] rounded-full animate-bounce"></span>
            <span className="w-2 h-2 bg-[#e63956] rounded-full animate-bounce [animation-delay:.2s]"></span>
            <span className="w-2 h-2 bg-[#e63956] rounded-full animate-bounce [animation-delay:.4s]"></span>
            </div>

        </div>

        )}
            


      {/* POPUP */}

      {showModal && featuredFlower && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">

          <div className="bg-white rounded-3xl max-w-[720px] w-full p-8 relative">

            <button
              onClick={() => {
                setShowModal(false)
                setShowResults(true)
              }}
              className="absolute top-6 right-6 text-gray-400 text-xl"
            >
              ✕
            </button>

            <h2 className="text-3xl font-bold text-[#e63956] mb-6 text-center">
              The flower that feels just right for you
            </h2>

            {/* PERSONALITY */}

            <div className="bg-pink-50 p-5 rounded-xl text-center mb-6">

              <h3 className="text-[#e63956] font-semibold mb-1">
                Your personality:
              </h3>

              <p className="text-gray-600">
                {personality || "Analyzing your personality..."}
              </p>

            </div>

            <img
              src={featuredFlower.image}
              className="rounded-xl mb-6 w-full h-[320px] object-cover"
            />

            <span className="bg-pink-100 text-[#e63956] px-4 py-1 rounded-full text-sm">
              💖 Romantic Match
            </span>

            <h3 className="text-2xl font-semibold mt-4">
              {featuredFlower.name}
            </h3>

            <p className="text-gray-500 mb-4">
              {featuredFlower.description}
            </p>

            {/* WHY THIS FLOWER */}
            
            <div className="bg-gray-50 p-5 rounded-xl mt-4">
            <h4 className="font-semibold text-[#e63956] mb-1">
                Why this flower?
            </h4>

            <p
                className="text-gray-600 text-sm"
                dangerouslySetInnerHTML={{
                    __html: highlightKeywords(featuredFlower.why, userInput)
                }}
            />

            </div>
          </div>

        </div>

      )}


      {/* RESULT GRID */}

      {showResults && featuredFlower && (

        <section
          ref={resultsRef}
          className="max-w-[1300px] mx-auto mt-20 px-6"
        >

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {orderedFlowers.map((flower, i) => {

              const featured = i === 0

              return (

                <div
                  key={flower.id}
                  className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition ${
                    featured ? "border-2 border-[#e63956]" : ""
                  }`}
                >

                  <div className="relative">

                    {featured && (
                      <span className="absolute top-4 left-4 bg-[#e63956] text-white text-xs px-3 py-1 rounded-full">
                        Recommended for You
                      </span>
                    )}

                    <img
                      src={flower.image}
                      className="h-[220px] w-full object-cover"
                    />

                    <button
                      onClick={() => toggleWishlist(flower.id)}
                      className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center shadow ${
                        wishlist.has(flower.id)
                          ? "bg-[#e63956] text-white"
                          : "bg-white"
                      }`}
                    >
                      {wishlist.has(flower.id) ? "♥" : "♡"}
                    </button>

                  </div>

                  <div className="p-6">

                    <span className="text-gray-400 text-sm">
                      {flower.category}
                    </span>

                    <h3 className="text-xl font-semibold mt-1">
                      {flower.name}
                    </h3>

                    <p className="text-gray-400 text-sm mt-1 mb-4">
                      {flower.description}
                    </p>

                    <div className="flex justify-between items-center">

                      <span className="text-xl font-bold text-[#e63956]">
                        ${flower.price}
                      </span>

                      <button className="bg-[#e63956] text-white px-5 py-2 rounded-full text-sm hover:scale-105 transition">
                        View Details
                      </button>

                    </div>

                  </div>

                </div>

              )

            })}

          </div>

        </section>

      )}

    </main>
  )
}

export default Recommend