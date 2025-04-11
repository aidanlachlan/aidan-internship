import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import TopSellersSkeleton from "../TopSellersSkeleton";
import AOS from "aos";
import "aos/dist/aos.css";

const TopSellers = () => {
  useEffect(() => {
    AOS.init({});
  }, []);

  const [topSellers, setTopSellers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchTopSellers() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
    );
    setTopSellers(data);
    setTimeout(() => {
      setIsLoading(false);
    }, 250);
  }

  function renderTopSellers() {
    return topSellers.map((seller) => {
      return (
        <li key={seller.id}>
          <div className="author_list_pp">
            <Link to={`/author/${seller.authorId}`}>
              <img className="lazy pp-author" src={seller.authorImage} alt="" />
              <i className="fa fa-check"></i>
            </Link>
          </div>
          <div className="author_list_info">
            <Link to={`/author/${seller.authorId}`}>{seller.authorName}</Link>
            <span>{seller.price} ETH</span>
          </div>
        </li>
      );
    });
  }

  function renderTopSellersSkeleton() {
    return Array(12)
      .fill(0)
      .map((_, i) => {
        return <TopSellersSkeleton key={i} />;
      });
  }

  useEffect(() => {
    fetchTopSellers();
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2 data-aos='fade-in' data-aos-duration='1000'>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list" data-aos='fade-up' data-aos-duration='700'>
              {isLoading ? renderTopSellersSkeleton() : renderTopSellers()}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
