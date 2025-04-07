import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import AuthorProfileSkeleton from "../components/AuthorProfileSkeleton";

const Author = () => {
  const { authorId } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState({});
  const [followerCount, setFollowerCount] = useState(0); // Initialize follower count to 0
  const [isFollowing, setIsFollowing] = useState(false); // Track if the user is following

  async function fetchProfile() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
    );
    console.log(data);
    setProfile(data);
    setFollowerCount(data.followers); // Set the follower count from the API response
    setIsLoading(false);
  }

  function handleFollowClick() {
    if (isFollowing) {
      // If the user is already following, change to unfollow
      setIsFollowing(false);
      setFollowerCount(prev => prev - 1); // Decrease the follower count
    } else {
      // If the user is not following, change to follow
      setIsFollowing(true);
      setFollowerCount(prev => prev + 1); // Increase the follower count
    }
  }

  function renderProfile() {
    return (
      <div className="col-md-12">
        <div className="d_profile de-flex">
          <div className="de-flex-col">
            <div className="profile_avatar">
              <img src={profile.authorImage} alt="" />

              <i className="fa fa-check"></i>
              <div className="profile_name">
                <h4>
                  {profile.authorName}
                  <span className="profile_username">@{profile.tag}</span>
                  <span id="wallet" className="profile_wallet">
                    {profile.address}
                  </span>
                  <button id="btn_copy" title="Copy Text">
                    Copy
                  </button>
                </h4>
              </div>
            </div>
          </div>
          <div className="profile_follow de-flex">
            <div className="de-flex-col">
              <div className="profile_follower">
                {followerCount} followers
              </div>
              <Link
                to="#"
                className="btn-main"
                onClick={handleFollowClick} // Handle follow/unfollow logic
              >
                {isFollowing ? "Unfollow" : "Follow"} {/* Conditionally render the button text */}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  useEffect(() => {
    fetchProfile();
  }, []); // Only run on mount

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              {isLoading ? <AuthorProfileSkeleton /> : renderProfile(profile)}

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;

