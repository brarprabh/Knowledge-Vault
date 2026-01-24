import { useState, useEffect } from "react";
import KnowledgeCard from "./knowledgeCard";

function App() {
  // 1️⃣ STATE
  const [knowledgeItems, setKnowledgeItems] = useState(() => {
    const saved = localStorage.getItem("knowledgeItems");
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, title: "React Hooks Explained", type: "Video" },
          { id: 2, title: "System Design Podcast", type: "Podcast" },
        ];
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Note");
  const [url, setUrl] = useState("");

  // 2️⃣ EFFECTS
  useEffect(() => {
    localStorage.setItem(
      "knowledgeItems",
      JSON.stringify(knowledgeItems)
    );
  }, [knowledgeItems]);

  // 3️⃣ LOGIC
  function detectTypeFromUrl(url) {
    if (!url) return null;
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      return "Video";
    }
    return null;
  }

  function handleAddKnowledge() {
    if (!title.trim()) return;

    const detectedType = detectTypeFromUrl(url);

    const newItem = {
      id: Date.now(),
      title,
      type: detectedType ?? type,
      url,
    };

    setKnowledgeItems([...knowledgeItems, newItem]);
    setTitle("");
    setType("Note");
    setUrl("");
  }
   const filteredKnowledgeItems = knowledgeItems.filter((item) => {
  const matchesSearch = item.title
    .toLowerCase()
    .includes(searchQuery.toLowerCase());

  const matchesType =
    filterType === "All" || item.type === filterType;

  return matchesSearch && matchesType;
});



  // 4️⃣ UI
  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Knowledge Vault</h1>

      <div className="bg-white p-4 rounded-xl shadow-md mb-6">
        <div className="flex gap-4 flex-col md:flex-row">
          <input
            type="text"
            placeholder="Enter knowledge title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 border border-slate-300 rounded-lg px-3 py-2"
          />

          <input
            type="text"
            placeholder="Optional: paste URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 border border-slate-300 rounded-lg px-3 py-2"
          />

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border border-slate-300 rounded-lg px-3 py-2"
          >
            <option>Video</option>
            <option>Article</option>
            <option>Podcast</option>
            <option>Note</option>
          </select>

          <button
            onClick={handleAddKnowledge}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Add
          </button>
        </div>
      </div>
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


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredKnowledgeItems.map((item) => (
          <KnowledgeCard
            key={item.id}
            title={item.title}
            type={item.type}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
