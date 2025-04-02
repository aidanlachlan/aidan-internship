import React from "react";
import Skeleton from "react-loading-skeleton";

const CardSkeleton = () => {

  return (
        <div className="px-2">
          <div className="nft_coll">
            <div className="nft_wrap">
                <Skeleton />
                <img src="" className="lazy img-fluid" alt="" />
            </div>
            <div className="nft_coll_pp">
                <Skeleton circle width={50} height={50} />
                <img className="lazy pp-coll" src="" alt="" />
              <i className="fa fa-check"></i>
            </div>
            <div className="nft_coll_info">
              <h4>
                <Skeleton />
              </h4>
              <span>
                <Skeleton />
              </span>
            </div>
          </div>
        </div>
  );
};

export default CardSkeleton;
