import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios";
import { useEffect, useState } from "react";
import Skeleton from "../UI/Skeleton";

const TopSellers = () => {
  const [topSellers, setTopSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopSellers = async () => {
      try {
        const response = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers");
        setTopSellers(response.data);
      } catch (error) {
        console.error("Error fetching top sellers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopSellers();
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">

              {loading ? (
                <>
              {new Array(12).fill(0).map((_, index) => (
               <div
              key={index}
                 style={{
                display: "flex",
                alignItems: "center",
                 gap: "12px",
                marginBottom: "16px",}}
                  >
                 <Skeleton
                 width="50px"
                  height="50px"
                  borderRadius="50%"
                 />

              <Skeleton
               width="80px"
               height="18px"
                borderRadius="4px"
                />
              </div>
                     ))}
  
                     </>
              ) : (
              topSellers.map((seller, index) => (
                <li key={seller.id}>
                  <div className="author_list_pp">
                     <Link to={`/author/${seller.authorId}`}>
                      <img
                        className="lazy pp-author"
                        src={seller.authorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to={`/author/${seller.authorId}`}>
                      {seller.name}
                    </Link>
                    <span>{seller.price} ETH</span>
                  </div>
                </li>
              ))
            )}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
