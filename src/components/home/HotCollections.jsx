import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-loading-skeleton/dist/skeleton.css";
import HotCollectionsSkeleton from "../HotCollectionsSkeleton";
import AOS from "aos";
import "aos/dist/aos.css";

const HotCollections = () => {
  useEffect(() => {
    AOS.init({});
  }, []);

  const [hotCollections, setHotCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchHotCollections() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    setHotCollections(data);
    setTimeout(() => {
      setIsLoading(false);
    }, 250);
  }

  function renderHotCollections() {
    return hotCollections.map((item) => {
      return (
        <div className="px-2" key={item.id}>
          <div className="nft_coll">
            <div className="nft_wrap">
              <Link to={`/item-details/${item.nftId}`}>
                <img src={item.nftImage} className="lazy img-fluid" alt="" data-aos='fade-in' data-aos-duration='700'/>
              </Link>
            </div>
            <div className="nft_coll_pp">
              <Link to={`/author/${item.authorId}`}>
                <img className="lazy pp-coll" src={item.authorImage} alt="" data-aos='fade-in' data-aos-duration='700'/>
              </Link>
              <i className="fa fa-check"></i>
            </div>
            <div className="nft_coll_info">
              <Link to="/explore">
                <h4 data-aos='fade-in' data-aos-duration='700'>{item.title}</h4>
              </Link>
              <span data-aos='fade-in' data-aos-duration='700'>{item.code}</span>
            </div>
          </div>
        </div>
      );
    });
  }

  function renderHotCollectionsSkeleton() {
    return Array(6)
      .fill(0)
      .map((_, i) => {
        return <HotCollectionsSkeleton key={i} />;
      });
  }

  useEffect(() => {
    fetchHotCollections();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 250,
    slidesToShow: 4,
    slideToScroll: 1,
    responsive: [
      {
        breakpoint: 980,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2 data-aos='fade-in' data-aos-duration='2000'>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <Slider {...settings} data-aos='fade-in' data-aos-duration='700'>
            {isLoading
              ? renderHotCollectionsSkeleton()
              : renderHotCollections()}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
