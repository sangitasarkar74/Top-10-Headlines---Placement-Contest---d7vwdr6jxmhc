import React, { useState, useEffect } from "react";
import "../styles/App.css";

const App = () => {
  const [category, setCategory] = useState("general");
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://gnews.io/api/v4/top-headlines?category=${category}&apikey=18627a52ea958ef443c09c08adb9a4a5&max=10&lang=en`
    )
      .then((res) => res.json())
      .then((data) => {
        setNewsData(data.articles);
        setLoading(false);
      });
  }, [category]);

  const handleChange = (event) => {
    setCategory(event.target.value);
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
          {newsData.map((items) => {
            return (
              <li key={items.title}>
                <img className="news-img" src={items.image} alt="image" />
                <section className="new-title-content-author">
                  <h3 className="news-title">{items.title}</h3>
                  <section className="new-content-author">
                    <p className="news-description">{items.description}</p>
                    <p className="news-source">
                      <strong>Source:</strong>
                      {items.source.name}
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
