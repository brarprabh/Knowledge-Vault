function KnowledgeCard({ title, type }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
      <h2 className="text-lg font-semibold text-slate-900">
        {title}
      </h2>

      <p className="text-sm text-slate-600 mt-1">
        {type}
      </p>
    </div>
  );
}

export default KnowledgeCard;
