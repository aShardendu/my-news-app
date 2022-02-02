import React, { useEffect, useState } from "react";
import Spinner from "./component/Spinner";
import "./News.css";

import { useSearchStore } from "./store";

export default function News() {
  const [search] = useSearchStore();
  const [recentData, setRecentData] = useState([]);
  const [loading, setLoading] = useState(false);

  

  useEffect(() => {
    setRecentData([]);
    // let baseURL = `https://webhose.io/nseFilter?token=3cb756ed-146c-4715-95cf-5040d4c58a13&order=published&size=20&ts=1621239591269&q=${
    //   search.name ? `${search.name}%20` : ``
    // }sentences%3A%3C30%20language%3Aenglish%20site.country:IN%20published%3A%3C${search.date}`;
    let baseURL = `https://newsapi.org/v2/everything?q=${
      search.name ? `${search.name}` : `india`
    }&from=${search.date}&apiKey=880c02949b8f451da7a67e8e52cbc37d`;

    async function fetchData() {
      setLoading(true);

      let api = await fetch(baseURL );
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
  img,
  author,
  url,
  domain,
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
            Author:{author && <span>{author}</span>}
              {!author && <span>Anonymous</span>} &ensp; | &ensp; 
              Source: {domain && <span>{sectionTitle}</span>} &ensp; | &ensp; 
              Published On: {date}
          </p>
          {/*<p>
            <i>
              Author: {author && <span>{author}</span>}
              {!author && <span>Anonymous</span>}
            </i>
          </p>
          <p className="news__source">
            <i>Source: {domain && <span>{sectionTitle}</span>}</i>
          </p>
          <p>
            <i>Published On: {date}</i>
          </p> */}
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
