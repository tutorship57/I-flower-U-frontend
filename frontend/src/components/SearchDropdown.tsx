import { X, Clock, Search, ArrowRight } from "lucide-react";
import { ProductSchema2 } from "../types/product.ts";

type Props = {
  isOpen: boolean;
  query: string;
  history: string[];
  suggestions: ProductSchema2[];
  activeIndex: number;
  setActiveIndex: (i: number) => void;
  onSelect: (keyword: string) => void;
  onDeleteHistory: (e: React.MouseEvent, keyword: string) => void;
};

const SearchDropdown = ({
  isOpen,
  query,
  history,
  suggestions,
  activeIndex,
  setActiveIndex,
  onSelect,
  onDeleteHistory,
}: Props) => {
  if (!isOpen) return null;

  const showHistory = query.trim() === "";
  const showSuggestions = query.trim() !== "";

  return (
    <div className="absolute right-0 top-12 w-64 bg-white rounded-2xl border border-rose-100 shadow-lg overflow-hidden z-50">

      {/* HISTORY */}
      {showHistory && history.length > 0 && (
        <>
          <div className="px-4 pt-3 text-xs text-gray-400 uppercase">
            Recent
          </div>
          <ul>
            {history.map((keyword, i) => (
              <li key={keyword}>
                <button
                  onClick={() => onSelect(keyword)}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={`w-full flex items-center gap-3 px-4 py-2
                  ${activeIndex === i ? "bg-rose-50" : "hover:bg-gray-50"}`}
                >
                  <Clock className="w-3.5 h-3.5 text-gray-300" />
                  <span className="flex-1 text-sm text-gray-600 truncate">
                    {keyword}
                  </span>
                  <span onClick={(e) => onDeleteHistory(e, keyword)}>
                    <X className="w-3.5 h-3.5 text-gray-300 hover:text-gray-500" />
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </>
      )}

      {/* SUGGESTIONS */}
      {showSuggestions && (
        <>
          {suggestions.length > 0 ? (
            <>
              <div className="px-4 pt-3 text-xs text-gray-400 uppercase">
                Suggestions
              </div>
              <ul>
                {suggestions.map((p, i) => (
                  <li key={p.product_id}>
                    <button
                      onClick={() => onSelect(p.product_name)}
                      onMouseEnter={() => setActiveIndex(i)}
                      className={`w-full flex items-center gap-3 px-4 py-2
                      ${activeIndex === i ? "bg-rose-50" : "hover:bg-gray-50"}`}
                    >
                      <Search className="w-3.5 h-3.5 text-rose-300" />
                      <span className="flex-1 text-sm text-gray-700 truncate">
                        {p.product_name}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-gray-200" />
                    </button>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div className="px-4 py-6 text-center text-sm text-gray-400">
              No results for "{query}"
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchDropdown;