import React, { useEffect, useState } from 'react';
import LoginModal from '../../../assets/js/popup/login';
import Swal from 'sweetalert2';
import { axiosInstance, publicAxiosInstance } from '../../../assets/js/config/api';

function CourseReviewSection({ course_id }) {
    const [star, setStar] = useState(1);
    const [review, setReview] = useState('');
    const [averageRating, setAverageRating] = useState(0);
    const [totalReviews, setTotalReviews] = useState(0);
    const [starPercentages, setStarPercentages] = useState({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });
    const [reviews, setReviews] = useState([]);
    const [showModal, setShowModal] = useState(false)

    const closeModal = () => {
        setShowModal(false);
    };

    const handleStarClick = (starValue) => {
        setStar(starValue);
    };

    const handleReviewChange = (event) => {
        setReview(event.target.value);
    };

    const handleSubmit = (course_id) => {
        if (!star || !review || !course_id) {
            return Swal.fire({
                title: 'Error',
                text: 'Please fill all the fields!',
                icon: 'error',
            });
        }

        const payload = {
            course_id,
            feedback_point: star,
            feedback_comment: review
        };

        axiosInstance.post('/feedback/course', payload)
            .then(result => {
                if (result && result.data.status === 200) {
                    setStar('');
                    setReview('');
                    return Swal.fire({
                        title: 'Success',
                        text: 'Thank you for your feedback!',
                        icon: 'success',
                    });
                }
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    setShowModal(true);
                } else {
                    console.error('Error:', error);
                    // Swal.fire({
                    //     title: 'Error',
                    //     text: error.message || 'Failed to submit feedback. Please try again later.',
                    //     icon: 'error',
                    // });
                }
            });
    };

    useEffect(() => {
        getCourseFeedback();
    }, []);

    const getCourseFeedback = () => {
        publicAxiosInstance.get(`/feedback/course?course_id=${course_id}`)
            .then(response => {
                const { data } = response;
                if (data && data.status === 200) {
                    const feedback = data.data;
                    if (feedback && feedback.length > 0) {
                        let totalPoints = 0;
                        let feedbackCount = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
                        feedback.forEach(feedbackItem => {
                            totalPoints += feedbackItem.feedback_point;
                            feedbackCount[feedbackItem.feedback_point]++;
                        });

                        const averagePoints = totalPoints / feedback.length;
                        setAverageRating(averagePoints.toFixed(1));
                        setTotalReviews(feedback.length);

                        const feedbackCountPercentage = {};
                        for (let i = 1; i <= 5; i++) {
                            feedbackCountPercentage[i] = (feedbackCount[i] / feedback.length) * 100 || 0;
                        }
                        setStarPercentages(feedbackCountPercentage);

                        setReviews(feedback);
                    }
                }
            })
            .catch(error => {
                console.error('Error fetching book feedback:', error);
                Swal.fire({
                    title: 'Error',
                    text: 'Failed to fetch course feedback. Please try again later.',
                    icon: 'error',
                });
            });
    };


    return (
        <>
            {showModal && <LoginModal onClose={closeModal} />}
            <section className="margintop" id="review_segment">
                <div className="container-fluid">
                    <div className="container">
                        <div className="Info">
                            <h2>Customer Reviews</h2>
                        </div>
                        <div className="row">
                            <div className="col-md-3 revi">
                                <h6>OVERALL RATING</h6>
                                <h5 id="div_overall_rating">{averageRating}</h5>
                                <div className="mt-2 mb-3 mel">
                                    {[1, 2, 3, 4, 5].map(value => (
                                        <i
                                            key={value}
                                            className="fas fa-star"
                                            style={{ color: averageRating >= value ? '#f7c434' : 'gray' }}
                                        ></i>
                                    ))}
                                    <p id="div_total_review">{totalReviews} reviews</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="mt-2 mb-3 mel">
                                    {[1, 2, 3, 4, 5].map((value) => (
                                        <i
                                            key={value}
                                            style={{ color: value <= star ? '#f7c434' : 'gray' }}
                                            className="fas fa-star"
                                            onClick={() => handleStarClick(value)}
                                        ></i>
                                    ))}
                                </div>
                                <textarea
                                    className="form-control fr mt-3"
                                    id="txt_review"
                                    placeholder="Please enter your reviews"
                                    rows="5"
                                    value={review}
                                    onChange={handleReviewChange}
                                ></textarea>
                                <input type="hidden" id="txt_book_star" value={star} />
                                <button type="button" className="btn btn-success mt-3"
                                    onClick={() => handleSubmit(course_id)}>
                                    Submit
                                </button>
                            </div>
                            <div className="col-md-5">
                                {/* Star 5 */}
                                <div>
                                    <div className="mell">
                                        <p className="my-2" id="star_5">{starPercentages[5].toFixed(2)}%</p>
                                        <div className="d-inline-block my-2 float-right">
                                            {[...Array(5)].map((_, index) => (
                                                <i key={index} className="fas fa-star"></i>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="progress" style={{ height: '2px' }}>
                                        <div className="progress-bar bg-warning" role="progressbar" style={{ width: `${starPercentages[5]}%` }}
                                            aria-valuenow={starPercentages[5]} aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>

                                {/* Star 4 */}
                                <div>
                                    <div className="mell">
                                        <p className="my-2" id="star_4">{starPercentages[4].toFixed(2)}%</p>
                                        <div className="d-inline-block my-2 float-right">
                                            {[...Array(4)].map((_, index) => (
                                                <i key={index} className="fas fa-star"></i>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="progress" style={{ height: '2px' }}>
                                        <div className="progress-bar bg-warning" role="progressbar" style={{ width: `${starPercentages[4]}%` }}
                                            aria-valuenow={starPercentages[4]} aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>

                                {/* Repeat for Star 3, 2, and 1 */}
                                {/* Star 3 */}
                                <div>
                                    <div className="mell">
                                        <p className="my-2" id="star_3">{starPercentages[3].toFixed(2)}%</p>
                                        <div className="d-inline-block my-2 float-right">
                                            {[...Array(3)].map((_, index) => (
                                                <i key={index} className="fas fa-star"></i>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="progress" style={{ height: '2px' }}>
                                        <div className="progress-bar bg-warning" role="progressbar" style={{ width: `${starPercentages[3]}%` }}
                                            aria-valuenow={starPercentages[3]} aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>

                                {/* Star 2 */}
                                <div>
                                    <div className="mell">
                                        <p className="my-2" id="star_2">{starPercentages[2].toFixed(2)}%</p>
                                        <div className="d-inline-block my-2 float-right">
                                            {[...Array(2)].map((_, index) => (
                                                <i key={index} className="fas fa-star"></i>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="progress" style={{ height: '2px' }}>
                                        <div className="progress-bar bg-warning" role="progressbar" style={{ width: `${starPercentages[2]}%` }}
                                            aria-valuenow={starPercentages[2]} aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>

                                {/* Star 1 */}
                                <div>
                                    <div className="mell">
                                        <p className="my-2" id="star_1">{starPercentages[1].toFixed(2)}%</p>
                                        <div className="d-inline-block my-2 float-right">
                                            {[...Array(1)].map((_, index) => (
                                                <i key={index} className="fas fa-star"></i>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="progress" style={{ height: '2px' }}>
                                        <div className="progress-bar bg-warning" role="progressbar" style={{ width: `${starPercentages[1]}%` }}
                                            aria-valuenow={starPercentages[1]} aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 mt-5">
                                <h6 style={{ fontSize: '25px' }}>Reviews</h6>
                                <div className="revi" id="div_review_codeblock">
                                    {reviews.map((feedback, index) => (
                                        <div key={index} className="mt-2 mb-5 meal">
                                            <p className="d-inline-block mt-0">{feedback?.user?.first_name || 'FG User'} {feedback?.user?.last_name || ''}</p>
                                            {[1, 2, 3, 4, 5].map(value => (
                                                <i
                                                    key={value}
                                                    className="fas fa-star"
                                                    style={{ color: feedback.feedback_point >= value ? '#f7c434' : 'gray' }}
                                                ></i>
                                            ))}
                                            <span className="w-100 d-block">{feedback.feedback_comment}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default CourseReviewSection;