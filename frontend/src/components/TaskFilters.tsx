export default function TaskFilters({ filter, setFilter }: any) {
  return (
    <div style={styles.filters}>
      {["ALL", "TODO", "IN_PROGRESS", "DONE"].map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          style={{
            ...styles.btn,
            background: filter === f ? "#22c55e" : "#334155",
          }}
        >
          {f}
        </button>
      ))}
    </div>
  );
}

const styles: any = {
  filters: { display: "flex", gap: "10px", marginBottom: "20px" },
  btn: {
    padding: "6px 12px",
    borderRadius: "8px",
    border: "none",
    color: "white",
    cursor: "pointer",
  },
};