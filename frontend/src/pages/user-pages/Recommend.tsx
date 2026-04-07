import React, { useState, useEffect, useRef } from "react"
import { useProducts } from "../../queries/product/product.query"
import type { ProductSchema2 } from "../../types/product"
import { SUGGESTION_CHIPS } from "../../mock/recommendation-mock"
import { useAuthStore } from "../../stores/auth-store"
import { useNavigate } from "react-router-dom"
import { useWishlistStore } from "../../stores/wishlist-store"
import { Heart } from "lucide-react"

const HISTORY_KEY = "flowerSearchHistory"
const MAX_HISTORY_ITEMS = 5

const Recommend: React.FC = () => {
  const navigate = useNavigate()
  const { toggleItem, isWishlisted } = useWishlistStore() 
  const [userInput, setUserInput] = useState("")
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const [showThinking, setShowThinking] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [featuredFlower, setFeaturedFlower] = useState<ProductSchema2 | null>(null)
  const [personality, setPersonality] = useState("")
  const [flowerDescriptions, setFlowerDescriptions] = useState<string[]>([])
  const resultsRef = useRef<HTMLDivElement>(null)
  const { data: products } = useProducts()
  const { user_id } = useAuthStore()

  useEffect(() => {
    const saved = localStorage.getItem(HISTORY_KEY)
    if (saved) setSearchHistory(JSON.parse(saved))
  }, [])

  const saveHistory = (text: string) => {
    const updated = [text, ...searchHistory.filter((i) => i !== text)].slice(0, MAX_HISTORY_ITEMS)
    setSearchHistory(updated)
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated))
  }

  const clearSearchHistory = () => {
    setSearchHistory([])
    localStorage.removeItem(HISTORY_KEY)
  }

  const handleRecommend = async () => {
    const currentInput = userInput.trim()
    if (!currentInput) return
    if (!products || products.length === 0) return

    try {
      setShowThinking(true)
      saveHistory(currentInput)

      // ค้นหาชื่อสินค้าตรงๆ
      const directMatch = products.find((p: ProductSchema2) =>
        p.product_name?.toLowerCase().includes(currentInput.toLowerCase())
      )
      if (directMatch) {
        setFeaturedFlower(directMatch)
        setPersonality("")
        setFlowerDescriptions([])
        setShowModal(true)
        return
      }

      // ยิง POST เพื่อเอา jobId
      const response = await fetch("http://localhost:3000/api/recommendation/flower", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-client-id": user_id ?? "guest"
        },
        body: JSON.stringify({ userInput: currentInput }),
      })
      const data = await response.json()
      const jobId = data.data
      if (!jobId) throw new Error("No jobId")

      // Polling
      let result = null
      for (let i = 0; i < 20; i++) {
        await new Promise((res) => setTimeout(res, 2000))
        const jobRes = await fetch(`http://localhost:3000/api/recommendation/flower/job/${jobId}`)
        const jobData = await jobRes.json()
        if (jobData?.data && jobData.status !== "error") {
          result = jobData.data
          break
        }
      }

      if (!result) throw new Error("Timeout")

      // Match สินค้าจาก flower_description
      const flowerNames: string[] = (result.flower_description ?? []).map(
        (desc: string) => desc.split(":")[0].trim().toLowerCase().replace(/s$/, "")
      )

      const match = flowerNames.reduce((found: ProductSchema2 | null, name: string) => {
        if (found) return found
        return products.find((p: ProductSchema2) =>
          p.product_name?.toLowerCase().includes(name) ||
          name.includes(p.product_name?.toLowerCase().split(" ")[0] ?? "")
        ) || null
      }, null) || products[0]

      setPersonality(result.user_personality || "")
      setFlowerDescriptions(result.flower_description ?? [])
      setFeaturedFlower(match)
      setShowModal(true)

      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth" })
      }, 300)

    } catch (err) {
      console.error(err)
      if (products) {
        setFeaturedFlower(products[0])
        setShowModal(true)
      }
    } finally {
      setShowThinking(false)
    }
  }

  const orderedFlowers = featuredFlower
    ? [featuredFlower, ...(products?.filter((p: ProductSchema2) => p.product_id !== featuredFlower.product_id) || [])]
    : products || []

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
            className="bg-[#e63956] text-white font-semibold px-10 py-4 rounded-full shadow-lg shadow-pink-300 hover:scale-105 transition w-full max-w-[400px]"
          >
            Recommend flowers for me
          </button>

          {/* SEARCH HISTORY */}
          {searchHistory.length > 0 && (
            <div className="mt-10 pt-8 border-t text-left">
              <div className="flex justify-between mb-4">
                <span className="text-gray-500 text-sm font-semibold">Your recent flower searches</span>
                <button onClick={clearSearchHistory} className="text-gray-400 text-sm hover:text-gray-600">
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
            <span className="text-gray-500 text-sm block mb-4">Not sure what to write? Try these:</span>
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
        <div className="fixed inset-0 bg-white/90 flex flex-col items-center justify-center z-50">
          <h2 className="text-2xl font-semibold text-[#e63956] mb-4">Finding the perfect flowers</h2>
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
          <div className="bg-white rounded-3xl max-w-[720px] w-full p-8 relative overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => { setShowModal(false); setShowResults(true) }}
              className="absolute top-6 right-6 text-gray-400 text-xl"
            >
              ✕
            </button>

            <h2 className="text-3xl font-bold text-[#e63956] mb-6 text-center">
              The flower that feels just right for you
            </h2>

            {personality && (
              <div className="bg-pink-50 p-5 rounded-xl text-center mb-6">
                <h3 className="text-[#e63956] font-semibold mb-1">Your personality:</h3>
                <p className="text-gray-600">{personality}</p>
              </div>
            )}

            <img
              src={featuredFlower.productImage?.[0]?.image_url}
              className="rounded-xl mb-6 w-full h-[320px] object-cover"
            />

            <span className="bg-pink-100 text-[#e63956] px-4 py-1 rounded-full text-sm">
              Recommended for You
            </span>

            <h3 className="text-2xl font-semibold mt-4">{featuredFlower.product_name}</h3>
            <p className="text-gray-500 mb-2">{featuredFlower.product_description}</p>

            {flowerDescriptions.length > 0 && (
              <div className="bg-gray-50 p-5 rounded-xl mt-2">
                <h4 className="font-semibold text-[#e63956] mb-3">Why this flower?</h4>
                <ul className="flex flex-col gap-2">
                  {flowerDescriptions
                    .filter(desc =>
                      featuredFlower?.product_name?.toLowerCase().split(" ").some(word =>
                        desc.toLowerCase().includes(word) && word.length > 3
                      )
                    )
                    .map((desc, i) => (
                      <li key={i} className="text-gray-600 text-sm">{desc}</li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* RESULT GRID */}
      {showResults && (
        <section ref={resultsRef} className="max-w-[1300px] mx-auto mt-20 px-6 mb-20">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">All Flowers</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {orderedFlowers.map((flower: ProductSchema2, i: number) => {
              const featured = i === 0
              const wishlisted = isWishlisted(flower.product_id)
              return (
                <div
                  key={flower.product_id}
                  className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition ${featured ? "border-2 border-[#e63956]" : ""}`}
                >
                  <div className="relative">
                    {featured && (
                      <span className="absolute top-4 left-4 bg-[#e63956] text-white text-xs px-3 py-1 rounded-full">
                        Recommended for You
                      </span>
                    )}
                    <img src={flower.productImage?.[0]?.image_url} className="h-[220px] w-full object-cover" />
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleItem(flower) }}
                      className={`absolute top-4 right-4 p-2 bg-white rounded-full shadow-md transition ${wishlisted ? "bg-rose-50" : "hover:bg-rose-50"}`}
                    >
                      <Heart
                        className="w-5 h-5 text-rose-500"
                        fill={wishlisted ? "currentColor" : "none"}
                      />
                    </button>
                  </div>
                  <div className="p-6">
                    <span className="text-gray-400 text-sm">{flower.category?.category_name || "-"}</span>
                    <h3 className="text-xl font-semibold mt-1">{flower.product_name}</h3>
                    <p className="text-gray-400 text-sm mt-1 mb-4">{flower.product_description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-[#e63956]">${flower.product_price}</span>
                      <button
                        onClick={() => navigate(`/productInfo/${flower.product_id}`)}
                        className="bg-[#e63956] text-white px-5 py-2 rounded-full text-sm hover:scale-105 transition"
                      >
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