import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import ExploreItemsSkeleton from "../ExploreItemsSkeleton";

const AuthorItems = () => {
  const { authorId } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [authorItems, setAuthorItems] = useState({});

  async function fetchAuthorItems() {
    try {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
      );
      console.log("API data:", data);
      setAuthorItems(data);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error fetching author items:", error);
    }
  }

  function renderItemsSkeleton() {
    return Array(8)
      .fill(0)
      .map((_, i) => <ExploreItemsSkeleton key={i} />);
  }

  function renderAuthorItems() {
    return authorItems.nftCollection.map((item) => {
      return (
        <div
          className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
          key={item.id}
        >
          {/* <NftCard item={item} /> */}
          <div className="nft__item">
                <div className="author_list_pp">
                  <Link to="">
                    <img className="lazy" src={authorItems.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <Link to={`/item-details/${item.nftId}`}>
                    <img
                      src={item.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to="/item-details">
                    <h4>{item.title}</h4>
                  </Link>
                  <div className="nft__item_price">{item.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{item.likes}</span>
                  </div>
                </div>
              </div>
        </div>
      );
    });
  }

  useEffect(() => {
    fetchAuthorItems(authorId);
  }, []);

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {isLoading ? renderItemsSkeleton() : renderAuthorItems()}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
