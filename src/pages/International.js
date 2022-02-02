import React, { useEffect, useState } from "react";
import Spinner from "../component/Spinner";
// import './../component/Jpi.css';

import { useSearchStore } from "../store";

export default function About(props) {
  const [search] = useSearchStore();
  const [recentData, setRecentData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setRecentData([]);
    let baseURL = `https://newsapi.org/v2/top-headlines?country=us&category=general&apiKey=059fea3d670f4ab78a427e681105e7b1`;

    if (search.name) {
      baseURL = `https://newsapi.org/v2/everything?q=${search.name}&from=${search.date}?country=in&apiKey=059fea3d670f4ab78a427e681105e7b1`;
    }

    async function fetchData() {
      setLoading(true);

      let api = await fetch(baseURL);
      let cdata = await api.json();
      console.log(cdata);
      setLoading(false);
      setRecentData(cdata["articles"]);
    }
    fetchData();
  }, [search]);

  return (
    <React.Fragment>
      {search.name && <h1>Showing Results for {search.name} </h1>}
      <NewsCard data={recentData} loading={loading} />
    </React.Fragment>
  );
}

const NewsArticle = ({
  title,
  text,
  author,
  url,
  img,
  domain,
  sectionTitle,
  date,
}) => {
  //var x = {text}
  //var d = x.slice(1,100)

  return (
    <div className="term">
      <div className="news__title">
        <span>
          <b>
            <a href={url} target="_blank" rel="noreferrer">
              {title}{" "}
            </a>
          </b>
        </span>
      </div>

      <div className="news">
        <div className="news__author">
          <p>
            <i>
              Author: {author && <span>{author}</span>}
              {!author && <span>Anonymous</span>}
            </i>
          </p>
          <p className="news__source">
            <i>Source: {domain && <span>{domain}</span>}</i>
          </p>
          <p>
            <i>Published On: {date}</i>
          </p>
        </div>
        <div className="news__desc">
        <div className="news__img mb10 df">
          <img  src={img} />
        </div>
          {text}
          <a href={url} target="_blank" rel="noreferrer">
            Explore more
          </a>
        </div>
        <br />
      </div>
      <br />
    </div>
  );
};

const NewsCard = ({ data, loading }) => {
  return (
    <React.Fragment>
      <div className="news_card">
        <div className="newsheader">
          <div className="all__news">
            {loading ? <Spinner /> : ``}

            {data.map((news) => (
              <NewsArticle
              key={news["source"]["id"]}
              title={news["title"]}
              text={news["content"]}
              author={news["author"]}
              date={news["publishedAt"]}
              url={news["url"]}
              domain={news["source"]["name"]}
              sectionTitle={news["title"]}
              img = {news["urlToImage"]}
              />
            ))}
            <br />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
