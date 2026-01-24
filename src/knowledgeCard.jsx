function KnowledgeCard({ title, type, url }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
      <h2 className="text-lg font-semibold text-slate-900">
        {title}
      </h2>

      <p className="text-sm text-slate-600 mt-1">
        {type}
      </p>

      {url && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-3 text-sm text-blue-600 hover:underline break-all"
        >
          View source
        </a>
      )}
    </div>
  );
}

export default KnowledgeCard;
