import React from "react";
import Skeleton from "react-loading-skeleton";
import { button } from "react-router-dom";

const AuthorProfileSkeleton = () => {
  return (
    <div className="col-md-12">
      <div className="d_profile de-flex">
        <div className="de-flex-col">
          <div className="profile_avatar">
            <Skeleton circle height={150} width={150} />

            <i className="fa fa-check"></i>
            <div className="profile_name">
              <h4>
                <Skeleton />
                <span className="profile_username">
                  <Skeleton />
                </span>
                <span id="wallet" className="profile_wallet">
                  <Skeleton />
                </span>
                <button id="btn_copy" title="Copy Text">
                  <Skeleton />
                </button>
              </h4>
            </div>
          </div>
        </div>
        <div className="profile_follow de-flex">
          <div className="de-flex-col">
            <div className="profile_follower">
              <Skeleton width={200} height={30}/>
            </div>
            {/* <h1>
              <Skeleton />
            </h1> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorProfileSkeleton;
