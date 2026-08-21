import React, { useState, useEffect } from "react";
import EthImage from "../images/ethereum.svg";
import { Link } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import axios from "axios";
import { useParams } from "react-router-dom";
import Skeleton from "../components/UI/Skeleton";


const ItemDetails = () => {
  const [itemDetails, setItemDetails] = useState(null);
  const { nftId } = useParams();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`);
        setItemDetails(response.data);
      } catch (error) {
        console.error("Error fetching item details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItemDetails();
    window.scrollTo(0, 0);
  }, [nftId]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
                              {loading ? (
  <Skeleton
    width="100%"
    height="400px"
    borderRadius="10px"
  />
) : (
  <>
              <div className="col-md-6 text-center">
                <img
                  src={itemDetails?.nftImage || nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt=""
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{itemDetails?.title || "Item Title"} #{itemDetails?.tag || "#194"}</h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {itemDetails?.views || 0} views
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {itemDetails?.likes || 0} likes
                    </div>
                  </div>
                  <p>
                    {itemDetails?.description || "Item description goes here."}
                  </p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${itemDetails?.ownerId}`}>
                            <img className="lazy" src={itemDetails?.ownerImage || AuthorImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${itemDetails?.ownerId}`}>
                            {itemDetails?.ownerName || "Monica Lucas"}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${itemDetails?.creatorId}`}>
                            <img className="lazy" src={itemDetails?.creatorImage || AuthorImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${itemDetails?.creatorId}`}>
                            {itemDetails?.creatorName || "Monica Lucas"}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{itemDetails?.price || "0.00"} ETH</span>
                    </div>
                  </div>
                </div>
              </div>
              </>
              )};
              </div>
              </div>
        </section>
        </div>
    </div>
  );
};

export default ItemDetails;
