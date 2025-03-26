import React, { useEffect, useState } from "react";
import LoginModal from "../../../assets/js/popup/login";
import Swal from "sweetalert2";
import {
  axiosInstance,
  publicAxiosInstance,
} from "../../../assets/js/config/api";

function NutritionReviewSection({ product_id }) {
  const [star, setStar] = useState(1);
  const [review, setReview] = useState("");
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [starPercentages, setStarPercentages] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  });
  const [reviews, setReviews] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  const handleStarClick = (starValue) => {
    setStar(starValue);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleSubmit = (product_id) => {
    if (!star || !review || !product_id) {
      return Swal.fire({
        title: "Error",
        text: "Please fill all the fields!",
        icon: "error",
      });
    }

    const payload = {
      product_id,
      feedback_point: star,
      feedback_comment: review,
    };
    axiosInstance
      .post("/feedback/product", payload)
      .then((result) => {
        if (result && result.data.status === 200) {
          setStar("");
          setReview("");
          return Swal.fire({
            title: "Success",
            text: "Thank you for your feedback!",
            icon: "success",
          });
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          setShowModal(true);
        } else {
          console.error("Error:", error);
          Swal.fire({
              title: 'Error',
              text: error.message || 'Failed to submit feedback. Please try again later.',
              icon: 'error',
          });
        }
      });
  };

  useEffect(() => {
    getBookFeedback();
  }, []);

  const getBookFeedback = () => {
    publicAxiosInstance
      .get(`/feedback/products?product_id=${product_id}`)
      .then((response) => {
        const { data } = response;
        if (data && data.status === 200) {
          const feedback = data.data;
          if (feedback && feedback.length > 0) {
            let totalPoints = 0;
            let feedbackCount = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

            feedback.forEach((feedbackItem) => {
              totalPoints += feedbackItem.feedback_point;
              feedbackCount[feedbackItem.feedback_point]++;
            });
            const averagePoints = totalPoints / feedback.length;

            setAverageRating(averagePoints.toFixed(1));
            setTotalReviews(feedback.length);

            const feedbackCountPercentage = {};
            for (let i = 1; i <= 5; i++) {
              feedbackCountPercentage[i] =
                (feedbackCount[i] / feedback.length) * 100 || 0;
            }

            setStarPercentages(feedbackCountPercentage);
            setReviews(feedback);
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching product feedback:", error);
        Swal.fire({
          title: "Error",
          text: "Failed to fetch product feedback. Please try again later.",
          icon: "error",
        });
      });
  };

  return (
    <>
      {showModal && <LoginModal onClose={closeModal} />}
      <div className="product-desc-content">
        <div className="add-review">
          <h4 className="title">Add a review</h4>
          <form action="#">
            <div className="form-rating">
              <label>your rating</label>
              <ul className="list-wrap">
                <li>
                  {[1, 2, 3, 4, 5].map((value) => (
                    <i
                      key={value}
                      style={{ color: value <= star ? "#f7c434" : "gray" }}
                      className="fas fa-star"
                      onClick={() => handleStarClick(value)}
                    ></i>
                  ))}
                </li>
              </ul>
            </div>
            <div className="from-grp">
              <label for="comment">
                Write Your review <span>*</span>
              </label>
              <textarea
                className="form-control fr mt-3"
                id="txt_review"
                placeholder="Please enter your reviews"
                cols="30"
                rows="10"
                value={review}
                onChange={handleReviewChange}
              ></textarea>
            </div>
            <input type="hidden" id="txt_book_star" value={star} />
            <button
              type="button"
              className="btn"
              onClick={() => handleSubmit(product_id)}
            >
              Submit
            </button>
          </form>
        </div>
        <div className="reviews-comment">
          {reviews.map((feedback, index) => (
            <div className="review-info">
              <div className="review-content">
                <ul className="review-rating list-wrap">
                  <li>
                    {[1, 2, 3, 4, 5].map((value) => (
                      <i
                        key={value}
                        className="fas fa-star"
                        style={{
                          color:
                            feedback.feedback_point >= value
                              ? "#f7c434"
                              : "gray",
                        }}
                      ></i>
                    ))}
                  </li>
                </ul>
                <div className="review-meta">
                  <h6>
                    {feedback?.user?.first_name || "FG User"}{" "}
                    {feedback?.user?.last_name || ""}
                  </h6>
                </div>
                <p>
                  {feedback.feedback_comment}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default NutritionReviewSection;
