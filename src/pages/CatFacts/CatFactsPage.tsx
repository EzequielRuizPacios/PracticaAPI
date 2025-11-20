import { useEffect, useState } from "react";
import styles from "./CatFactsPage.module.css";

interface CatFact {
  id: number;
  fact: string;
  length: number;
  date: string;
}

function Spinner() {
  return (
    <svg width="36" height="36" viewBox="0 0 50 50">
      <circle
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeWidth="5"
        stroke="#333"
        strokeLinecap="round"
        strokeDasharray="31.4 31.4"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          repeatCount="indefinite"
          dur="0.8s"
          from="0 25 25"
          to="360 25 25"
        />
      </circle>
    </svg>
  );
}

const LOCAL_KEY = "catfacts_history_v1";
const HISTORY_LIMIT = 50;

export default function CatFactsPage() {
  const [fact, setFact] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<CatFact[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (raw) setHistory(JSON.parse(raw));
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(history));
  }, [history]);

  const addToHistory = (text: string, length: number) => {
    const entry: CatFact = {
      id: Date.now(),
      fact: text,
      length,
      date: new Date().toISOString(),
    };

    if (history[0]?.fact === text) return;

    setHistory([entry, ...history].slice(0, HISTORY_LIMIT));
  };

  const fetchCatFact = async () => {
    try {
      setLoading(true);
      const CATFACT_ENTRY_POINT = "https://catfact.ninja/fact";
      const res = await fetch(CATFACT_ENTRY_POINT);
      const data = await res.json();
      setFact(data.fact);
    } catch {
      setFact("❌ Error al obtener el fact");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCatFact();
  }, []);

  const clearHistory = () => {
    if (confirm("¿Seguro querés borrar el historial?")) setHistory([]);
  };

  const removeEntry = (id: number) => {
    setHistory(history.filter((h) => h.id !== id));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🐱 Cat Facts</h1>
      <p className={styles.subtitle}>
        Práctica: fetch, historial y localStorage
      </p>

      <div className={styles.card}>
        <div className={styles.cardLeft}>
          <h2 className={styles.factTitle}>Último fact</h2>
          {loading ? (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Spinner /> <span>Cargando...</span>
            </div>
          ) : (
            <p className={styles.factText}>{fact}</p>
          )}
        </div>

        <div className={styles.buttonGroup}>
          <button className={styles.button} onClick={fetchCatFact}>
            Obtener otro dato
          </button>

          <button
            className={styles.buttonSecondary}
            onClick={() => addToHistory(fact, fact.length)}
            disabled={loading || !fact}
          >
            Guardar en historial
          </button>
        </div>
      </div>

      <section style={{ marginTop: 20 }}>
        <div className={styles.historyHeader}>
          <h3>📜 Historial ({history.length})</h3>

          <div style={{ display: "flex", gap: 8 }}>
            <button className={styles.smallButton} onClick={clearHistory}>
              Borrar todo
            </button>

            <button
              className={styles.smallButton}
              onClick={() => {
                const blob = new Blob([JSON.stringify(history, null, 2)], {
                  type: "application/json",
                });
                const url = URL.createObjectURL(blob);

                const a = document.createElement("a");
                a.href = url;
                a.download = "catfacts_history.json";
                a.click();

                URL.revokeObjectURL(url);
              }}
            >
              Exportar JSON
            </button>
          </div>
        </div>

        {history.length === 0 ? (
          <p style={{ color: "#666" }}>No hay facts guardados aún.</p>
        ) : (
          <ul className={styles.historyList}>
            {history.map((h) => (
              <li key={h.id} className={styles.historyItem}>
                <div className={styles.historyText}>
                  <div>{h.fact}</div>
                  <div className={styles.historyMeta}>
                    Largo: {h.length} • {new Date(h.date).toLocaleString()}
                  </div>
                </div>

                <div className={styles.actionButtons}>
                  <button
                    className={styles.smallButton}
                    onClick={() => {
                      setFact(h.fact);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    Usar
                  </button>

                  <button
                    className={styles.smallButton}
                    onClick={() => removeEntry(h.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
