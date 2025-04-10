import React from "react";
import Skeleton from "react-loading-skeleton";

const ItemDetailsSkeleton = () => {
  return (
    <>
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>
          <section aria-label="section" className="mt90 sm-mt-0">
            <div className="container">
              <div className="row">
                <div className="col-md-6 text-center">
                  <Skeleton style={{ height: "100%" }} />
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <h2>
                      <Skeleton />
                    </h2>

                    <div className="item_info_counts">
                      <Skeleton />
                      <div
                        className="item_info_views"
                        style={{ height: "30px" }}
                      ></div>
                      <Skeleton />
                      <div
                        className="item_info_like"
                        style={{ height: "30px" }}
                      ></div>
                    </div>
                    <p>
                      <Skeleton count={4} />
                    </p>
                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <h6>Owner</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Skeleton circle width={50} height={50} />
                            <i className="fa fa-check"></i>
                          </div>
                          <div className="author_list_info">
                            <Skeleton />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="de_tab tab_simple">
                      <div className="de_tab_content">
                        <h6>Creator</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Skeleton circle width={50} height={50} />
                            <i className="fa fa-check"></i>
                          </div>
                          <div className="author_list_info">
                            <Skeleton width={0} />
                          </div>
                        </div>
                      </div>
                      <div className="spacer-40"></div>
                      <h6>Price</h6>
                      <div className="nft-item-price">
                        <Skeleton width={100} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default ItemDetailsSkeleton;
