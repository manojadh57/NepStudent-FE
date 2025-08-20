export default function SubtopicsSidebar({
  items = [],
  active = "all",
  onSelect = () => {},
}) {
  return (
    <aside className="sidebar">
      <div className="side-card">
        <div className="side-title">Subtopics</div>
        <ul className="side-list">
          {items.map((it) => {
            const key = it.slug || it;
            const label = it.label || it;
            const isActive = String(active) === String(key);
            return (
              <li key={key}>
                <button
                  className={`side-item ${isActive ? "active" : ""}`}
                  onClick={() => onSelect(key)}
                >
                  <span>{label}</span>
                  {typeof it.count === "number" && (
                    <span className="side-count">{it.count}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
