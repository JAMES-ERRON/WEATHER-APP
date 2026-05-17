import { useState } from "react";

function App() {
  const [city, setCity] = useState("Manila");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "f3fbb62f095f0334aabe31fecacf1c6e"; // keep yours

  const getWeather = async () => {
    if (!city.trim()) return;

    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "City not found");
      }

      setWeather(data);
    } catch (err) {
      setWeather(null);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>🌤 Weather App</h1>

        <div style={styles.searchBox}>
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city..."
            style={styles.input}
          />

          <button onClick={getWeather} style={styles.button}>
            Search
          </button>
        </div>

        {loading && <p style={styles.loading}>Loading weather...</p>}

        {error && <p style={styles.error}>{error}</p>}

        {weather && (
          <div style={styles.weatherCard}>
            <h2 style={styles.city}>{weather.name}</h2>

            <p style={styles.temp}>
              {Math.round(weather.main.temp)}°C
            </p>

            <p style={styles.desc}>
              {weather.weather[0].description}
            </p>

            <div style={styles.details}>
              <p>💧 Humidity: {weather.main.humidity}%</p>
              <p>🌬 Wind: {weather.wind.speed} m/s</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

/* ===== STYLES ===== */
const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #132495, #000a39)",
    fontFamily: "Arial, sans-serif",
  },

  card: {
    background: "white",
    padding: "30px",
    borderRadius: "20px",
    width: "320px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
  },

  title: {
    marginBottom: "20px",
  },

  searchBox: {
    display: "flex",
    gap: "10px",
  },

  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    outline: "none",
  },

  button: {
    padding: "10px 15px",
    border: "none",
    borderRadius: "10px",
    background: "#00ccff",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  },

  loading: {
    marginTop: "15px",
    color: "#555",
  },

  error: {
    marginTop: "15px",
    color: "red",
  },

  weatherCard: {
    marginTop: "20px",
    padding: "20px",
    borderRadius: "15px",
    background: "#f5f5f5",
  },

  city: {
    margin: "0",
  },

  temp: {
    fontSize: "40px",
    margin: "10px 0",
  },

  desc: {
    textTransform: "capitalize",
  },

  details: {
    marginTop: "10px",
    fontSize: "14px",
  },
};