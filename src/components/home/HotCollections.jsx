import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import CardSkeleton from "../CardSkeleton";

const HotCollections = () => {
  // https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections

  const [hotCollections, setHotCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  async function fetchHotCollections() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    // console.log(data);
    setHotCollections(data);
    setIsLoading(false)
  }

  function renderHotCollections() {
    return hotCollections.map((item) => {
      return (
        <div className="px-2" key={item.id}>
          <div className="nft_coll">
            <div className="nft_wrap">
              <Link to={`/item-details/${item.nftId}`}>
                <img src={item.nftImage} className="lazy img-fluid" alt="" />
              </Link>
            </div>
            <div className="nft_coll_pp">
              <Link to="/author">
                <img className="lazy pp-coll" src={item.authorImage} alt="" />
              </Link>
              <i className="fa fa-check"></i>
            </div>
            <div className="nft_coll_info">
              <Link to="/explore">
                <h4>{item.title}</h4>
              </Link>
              <span>{item.code}</span>
            </div>
          </div>
        </div>
      );
    });
  }

  function renderCardSkeleton() {
    return Array(6).fill(0).map((_, i)=> {
      <CardSkeleton key={i}/>
    })
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
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <Slider {...settings}>
            {isLoading ? <CardSkeleton /> : renderHotCollections()}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
