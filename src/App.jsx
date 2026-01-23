import { useState } from "react";
import KnowledgeCard from "./knowledgeCard";

function App() {
  const [knowledgeItems, setKnowledgeItems] = useState([
    { id: 1, title: "React Hooks Explained", type: "Video" },
    { id: 2, title: "System Design Podcast", type: "Podcast" },
    { id: 3, title: "Tailwind CSS Guide", type: "Article" },
  ]);

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <h1 className="text-2xl font-bold mb-6">
        Knowledge Vault
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {knowledgeItems.map((item) => (
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
