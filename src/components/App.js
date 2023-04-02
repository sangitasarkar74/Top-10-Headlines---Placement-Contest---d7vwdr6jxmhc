import React, { useState, useEffect } from "react";
import "../styles/App.css";

const App = () => {
  const [category, setCategory] = useState("general");
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://gnews.io/api/v4/top-headlines?category=${category}&apikey=9fd8b22cbe7061cc139ea019baad35a5

      &max=10&lang=en`
    )
      .then((res) => res.json())
      .then((data) => setNewsData(data.articles));
    setLoading(false);
  }, [category]);

  console.log("newsDta", newsData);

  const handleChange = (e) => {
    setCategory(e.target.value);
    setLoading(true);
  };

  return (
    <div id="main">
      <h1 className="heading">Top 10 {category} news.</h1>

      <select value={category} onChange={handleChange}>
        <option value="general">General</option>
        <option value="business">Business</option>
        <option value="sports">Sports</option>
        <option value="technology">Technology</option>
        <option value="world">World</option>
        <option value="entertainment">Entertainment</option>
        <option value="science">Science</option>
      </select>
      {loading ? (
        <p className="loader">Loading...</p>
      ) : (
        <ol>
          {newsData.map((item) => {
            return (
              <li key={item.title}>
                <img className="news-img" src={item.image} alt="Image" />
                <section className="new-title-content-author">
                  <h3 className="news-title">{item.title}</h3>
                  <section className="new-content-author">
                    <p className="news-description">{item.description}</p>
                    <p className="news-source">
                      <strong>Source:</strong>
                      {item.source.name}
                    </p>
                  </section>
                </section>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
};

export default App;
