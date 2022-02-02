import React, { useEffect, useState } from "react";
import Spinner from "../component/Spinner";

import { useSearchStore } from "../store";

export default function About(props) {
  const [search] = useSearchStore();
  const [loading, setLoading] = useState(false);
  const [recentData, setRecentData] = useState([]);
  
  useEffect(() => {
    setRecentData([]);
    let baseURL = `https://newsapi.org/v2/everything?q=covid&from=2019-01-02?country=in&apiKey=880c02949b8f451da7a67e8e52cbc37d`;
    if (search && search.name) {
       baseURL = `https://newsapi.org/v2/everything?q=${search.name}&from=${search.date}?country=in&apiKey=880c02949b8f451da7a67e8e52cbc37d`;
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
  console.log(recentData);

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
  domain,
  img,
  sectionTitle,
  date,
}) => {
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
        <span className="df">
          {text}
          <a href={url} target="_blank" rel="noreferrer">
            Explore more
          </a>
          </span>
        </div>
        <br />
      </div>
      <br />
    </div>
  );
};

const NewsCard = ({ data, loading }) => {
  console.log(data);
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
