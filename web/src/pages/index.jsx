import React from "react";
import Meta from "../components/Meta";
import styles from "../styles/pages/home.module.scss";
import pic from "../../public/img/shop.jpg";
import Section from "../components/Section";
import Article from "../components/Article";

function Home(_props) {
  const sections = [
    {
      title: "Nearby Hatts",
    },
    {
      title: "Best Selling Products",
    },
    {
      title: "Top Deliveries",
    },
  ];
  const hatts = [
    {
      mainPic: pic,
      title: "Shiv Shakti Poojan Samagri Bhandar",
      body: "Samast poojan samagri athva aarti sangraha vikray hetu ek matra sthan.",
      url: "shiv-shakti-poojan-samagri-bhandar",
    },
    {
      mainPic: pic,
      title: "Shiv Shakti Poojan Samagri Bhandar",
      body: "Samast poojan samagri athva aarti sangraha vikray hetu ek matra sthan.",
      url: "shiv-shakti-poojan-samagri-bhandar",
    },
    {
      mainPic: pic,
      title: "Shiv Shakti Poojan Samagri Bhandar",
      body: "Samast poojan samagri athva aarti sangraha vikray hetu ek matra sthan.",
      url: "shiv-shakti-poojan-samagri-bhandar",
    },
  ];
  return (
    <>
      <div className="container">
        <Meta title="OnlineHatt: An online local market." />
        {sections.map((section) => (
          <Section key={`home-${section.title}`} title={section.title}>
            {hatts.map((hatt) => (
              <Article
                key={hatt.title}
                article={hatt}
                className="section-article"
              />
            ))}
          </Section>
        ))}
      </div>
    </>
  );
}

export default Home;
