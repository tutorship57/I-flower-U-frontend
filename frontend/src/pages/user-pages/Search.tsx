import { useState, useEffect, useRef, useCallback } from "react";
import { Search as SearchIcon, X} from "lucide-react";
import { useNavigate } from "react-router";
import { useProducts } from "../../queries/product/product.query";
import SearchDropdown from "../../components/SearchDropdown.tsx";
import useDebounce from "../../hooks/useDebounce";
import { useSearchHistory } from "../../hooks/useSearchHistory";
import { ProductSchema2 } from "../../types/product.ts";

const HISTORY_KEY = "ifloweru_search_history";

const Search = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);

  const [history, setHistory] = useSearchHistory(HISTORY_KEY);

  const debouncedQuery = useDebounce(query, 250);

  // ── Fetch products ──
  const { data: allProducts = [] } = useProducts();

  // ── Suggestions ──
  const suggestions: ProductSchema2[] =
    debouncedQuery.trim().length >= 1
      ? (allProducts as ProductSchema2[])
          .filter(
            (p) =>
              p.product_name
                .toLowerCase()
                .includes(debouncedQuery.toLowerCase()) ||
              p.category?.category_name
                .toLowerCase()
                .includes(debouncedQuery.toLowerCase())
          )
          .slice(0, 5)
      : [];

  // ── Open ──
  const open = () => {
    setIsOpen(true);
    setTimeout(() => inputRef.current?.focus(), 150);
  };

  // ── Close ──
  const close = useCallback(() => {
    setIsOpen(false);
    setQuery("");
    setActiveIndex(-1);
  }, []);

  // ── Click outside ──
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        close();
      }
    };
    document.addEventListener("mousedown", handler);
    return () =>
      document.removeEventListener("mousedown", handler);
  }, [close]);

  // ── ESC ──
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handler);
    return () =>
      window.removeEventListener("keydown", handler);
  }, [close]);

  // ── Submit ──
  const handleSubmit = (keyword: string) => {
    const kw = keyword.trim();
    if (!kw) return;

    // update history
    setHistory((prev) => {
      const filtered = prev.filter((h) => h !== kw);
      return [kw, ...filtered].slice(0, 5);
    });

    close();
    navigate(`/products?search=${encodeURIComponent(kw)}`);
  };

  // ── Delete history ──
  const handleDeleteHistory = (
    e: React.MouseEvent,
    keyword: string
  ) => {
    e.stopPropagation();
    setHistory((prev) => prev.filter((h) => h !== keyword));
  };

  // ── Keyboard ──
  const handleKeyDown = (
  e: React.KeyboardEvent<HTMLInputElement>
) => {
  const isTyping = query.trim().length > 0;
  const items = isTyping ? suggestions : history;
  const total = items.length;

  if (e.key === "ArrowDown") {
    e.preventDefault();
    setActiveIndex((prev) =>
      Math.min(prev + 1, total - 1)
    );
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    setActiveIndex((prev) =>
      Math.max(prev - 1, -1)
    );
  } else if (e.key === "Enter") {
    e.preventDefault();

    if (activeIndex >= 0 && items[activeIndex]) {
      if (isTyping) {
        handleSubmit(items[activeIndex].product_name);
      } else {
        handleSubmit(items[activeIndex]);
      }
    } else {
      handleSubmit(query);
    }
  }
};

  return (
    <div
      ref={containerRef}
      className="relative flex items-center"
    >
      {/* Input */}
      <div
        className={`flex items-center overflow-hidden transition-all duration-300 rounded-full border
        ${
          isOpen
            ? "w-48 sm:w-64 border-rose-200 bg-rose-50 shadow-sm"
            : "w-0 border-transparent"
        }`}
      >
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActiveIndex(-1);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Search flowers..."
          className="flex-1 bg-transparent text-sm text-gray-700 px-4 py-2 outline-none"
        />

        {query && (
          <button
            onClick={() => {
              setQuery("");
              setActiveIndex(-1);
              inputRef.current?.focus();
            }}
            className="pr-3 text-gray-300 hover:text-gray-500"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Icon */}
      <button
        onClick={
          isOpen
            ? query.trim()
              ? () => handleSubmit(query)
              : close
            : open
        }
        className="p-2 hover:bg-gray-100 rounded-full"
      >
        {isOpen ? (
          <X className="w-5 h-5 text-rose-400" />
        ) : (
          <SearchIcon className="w-5 h-5 text-gray-700" />
        )}
      </button>

      {/* Dropdown */}
      <SearchDropdown
        isOpen={isOpen}
        query={query}
        history={history}
        suggestions={suggestions}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        onSelect={handleSubmit}
        onDeleteHistory={handleDeleteHistory}
      />
    </div>
  );
};

export default Search;