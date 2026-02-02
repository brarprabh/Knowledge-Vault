import { useState, useEffect } from "react";
import KnowledgeCard from "./knowledgeCard";

function App() {
  // STATE
  const [knowledgeItems, setKnowledgeItems] = useState(() => {
    const saved = localStorage.getItem("knowledgeItems");
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, title: "React Hooks Explained", type: "Video" },
          { id: 2, title: "System Design Podcast", type: "Podcast" },
        ];
  });

  const [title, setTitle] = useState("");
  const [type, setType] = useState("Note");
  const [url, setUrl] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("All");

  // EFFECTS
  useEffect(() => {
    localStorage.setItem("knowledgeItems", JSON.stringify(knowledgeItems));
  }, [knowledgeItems]);

  // LOGIC
  function detectTypeFromUrl(url) {
    if (!url) return null;
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      return "Video";
    }
    return null;
  }
  function normalizeUrl(url) {
    if (!url) return "";
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }
    return "https://" + url;
  }

  function handleAddKnowledge() {
    if (!title.trim()) return;

    const detectedType = url ? detectTypeFromUrl(url) : null;

    const newItem = {
      id: Date.now(),
      title,
      type: detectedType ?? type,
      url: normalizeUrl(url),
    };

    setKnowledgeItems([...knowledgeItems, newItem]);
    setTitle("");
    setType("Note");
    setUrl("");
  }

  // DERIVED DATA (SEARCH + FILTER)
  const filteredKnowledgeItems = knowledgeItems.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesType = filterType === "All" || item.type === filterType;

    return matchesSearch && matchesType;
  });
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleAddKnowledge();
    }
  }
  async function testSummarizeApi() {
    const response = await fetch("http://localhost:5000/summarize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "React Hooks Explained",
        url: "https://youtube.com/test",
        type: "Video",
      }),
    });

    const data = await response.json();
    console.log("Summary response:", data);
  }

  // UI
  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <h1 className="text-3xl font-bold mb-2">Knowledge Vault</h1>
      <p className="text-slate-600 mb-6">Your personal knowledge vault</p>
      {/* ADD KNOWLEDGE */}
      <div className="bg-white p-4 rounded-xl shadow-md mb-6">
        <div className="flex gap-4 flex-col md:flex-row">
          <input
            type="text"
            placeholder="Enter knowledge title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 border border-slate-300 rounded-lg px-3 py-2"
          />

          <input
            type="text"
            placeholder="Optional: paste URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 border border-slate-300 rounded-lg px-3 py-2"
          />

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border border-slate-300 rounded-lg px-3 py-2"
          >
            <option>Note</option>
            <option>Video</option>
            <option>Article</option>
            <option>Podcast</option>
          </select>

          <button
            onClick={handleAddKnowledge}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Add
          </button>
        </div>
      </div>
      {/* SEARCH & FILTER */}
      <div className="bg-white p-4 rounded-xl shadow-md mb-6">
        <div className="flex gap-4 flex-col md:flex-row">
          <input
            type="text"
            placeholder="Search knowledge..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 border border-slate-300 rounded-lg px-3 py-2"
          />

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border border-slate-300 rounded-lg px-3 py-2"
          >
            <option value="All">All</option>
            <option value="Video">Video</option>
            <option value="Article">Article</option>
            <option value="Podcast">Podcast</option>
            <option value="Note">Note</option>
          </select>
        </div>
      </div>
      {/* GRID / EMPTY STATE */}
      {filteredKnowledgeItems.length === 0 ? (
        <div className="text-center text-slate-500 mt-12">
          <p className="text-lg font-medium">No knowledge found</p>
          <p className="text-sm mt-1">
            Try adjusting your search or add new knowledge.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredKnowledgeItems.map((item) => (
            <KnowledgeCard
              key={item.id}
              title={item.title}
              type={item.type}
              url={item.url}
            />
          ))}
        </div>
      )}
      <button
        onClick={testSummarizeApi}
        className="bg-purple-600 text-white px-4 py-2 rounded-lg mb-6"
      >
        Test Summarize API
      </button>
    </div>
  );
}

export default App;
