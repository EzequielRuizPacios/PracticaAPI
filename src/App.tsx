import { useState, useEffect } from "react";

interface CatFact {
  fact: string;
  length: number;
}

export default function App() {
  const [fact, setFact] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const CAT_FACT_ENTRYPOINT: string = "https://catfact.ninja/fact";

  const fetchCatFact = async () => {
    try {
      setLoading(true);
      const response = await fetch(CAT_FACT_ENTRYPOINT);
      const data: CatFact = await response.json();
      setFact(data.fact);
    } catch (error) {
      setFact("❌ Error al obtener el fact");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCatFact();
  }, []);

  return (
    <>
      <h1>🐱 Cat Facts</h1>

      {loading ? <p>Cargando...</p> : <p>{fact}</p>}

      <button onClick={fetchCatFact}>Obtener otro dato</button>
    </>
  );
}
