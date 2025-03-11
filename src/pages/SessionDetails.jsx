import { Link, useLoaderData } from "react-router-dom";
import Navbar from "../shared/Navbar";
import StarRatings from "react-star-ratings";
import { FaCalendar, FaCalendarTimes, FaDollarSign, FaRegCalendarCheck, FaUserGraduate } from "react-icons/fa";
import { HiArrowRightStartOnRectangle } from "react-icons/hi2";
import { GiDuration } from "react-icons/gi";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useReviews from "../hooks/useReviews";
import useRole from "../hooks/useRole";
import { MdEmail } from "react-icons/md";
import Swal from "sweetalert2";
import Footer from "../shared/Footer";

const SessionDetails = () => {
  const { user } = useAuth();
  const [review, setReview] = useState('');
  const [star, setStar] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const axiosSecure = useAxiosSecure();
  const session = useLoaderData();
  const [reviews, refetch] = useReviews(session?._id);
  const { role } = useRole();

  useEffect(() => {
    const currentDate = new Date();
    const endDate = new Date(session.registrationEndDate);

    if (currentDate > endDate) {
      setDisabled(true);
    }
  }, [session.registrationEndDate]);


  const handleReviews = () => {
    const reviewValue = review;
    const reviewObj = {
      sessionId: session?._id,
      name: user?.displayName,
      photo: user?.photoURL,
      review: reviewValue,
      rating: parseFloat(star),
    }

    if (review === '' || star === NaN) {
      return;
    }


    axiosSecure.post('/reviews', reviewObj)
      .then(res => {
        if (res.data.insertedId) {
          refetch();
          setReview('');
        }
      })
      .catch(err => {
        // console.log("Something Went Wrong (Comment), Please Try Again")
      })
  }


  const handleBooking = () => {

    const bookedSession = {
      sessionId: session._id,
      sessionTitle: session.sessionTitle,
      tutorName: session.tutorName,
      tutorEmail: session.tutorEmail,
      averageRating: session.averageRating,
      sessionDescription: session.sessionDescription,
      registrationStartDate: session.registrationStartDate,
      registrationEndDate: session.registrationEndDate,
      classStartTime: session.classStartTime,
      classEndDate: session.classEndDate,
      sessionDuration: session.sessionDuration,
      registrationFee: session.registrationFee,
      studentEmail: user?.email || user?.providerData[0].email,
    }

    axiosSecure.post('/bookedSessions', bookedSession)
      .then(res => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Session Booked Successfully",
          showConfirmButton: false,
          timer: 1500
        });
      })

  }



  return (
    <div>
      <header>
        <nav>
          <Navbar></Navbar>
        </nav>
      </header>
      <div className="flex flex-col justify-center lg:h-screen container mx-auto my-12 lg:px-0 px-5">
        <div>
          <h1 className="text-center font-bold text-5xl border border-t-2 border-b-2 border-r-0 border-l-0 p-4">
            {session.sessionTitle}
          </h1>
        </div>
        <div className="mt-12">
          <p className="text-gray-500 text-center mb-8">{session.sessionDescription}</p>
        </div>
        <div className="space-y-8">
          <div className="flex items-center">
            <StarRatings
              starRatedColor="yellow"
              rating={parseFloat(session?.averageRating)}
              starDimension="40px"
              starSpacing="15px"
            ></StarRatings>
            <p className="ml-12 text-2xl font-bold">{parseFloat(session?.averageRating)}</p>
          </div>
          <div className="flex items-center">
            <FaCalendar className="w-7 h-7 mr-4"></FaCalendar>
            <h3 className="text-xl font-bold">
              Registration Start Date: {session.registrationStartDate}
            </h3>
          </div>
          <div className="flex items-center">
            <FaCalendarTimes className="w-7 h-7 mr-4"></FaCalendarTimes>
            <h3 className="text-xl font-bold">
              Registration End Date: {session.registrationEndDate}
            </h3>
          </div>
          <div className="flex items-center">
            <HiArrowRightStartOnRectangle className="w-7 h-7 mr-4"></HiArrowRightStartOnRectangle>
            <h3 className="text-xl font-bold">
              Class Start Time: {session.classStartTime}
            </h3>
          </div>
          <div className="flex items-center">
            <FaRegCalendarCheck className="w-7 h-7 mr-4"></FaRegCalendarCheck>
            <h3 className="text-xl font-bold">
              Class End Date: {session.classEndDate}
            </h3>
          </div>
          <div className="flex items-center">
            <GiDuration className="w-7 h-7 mr-4"></GiDuration>
            <h3 className="text-xl font-bold">
              Session Duration: {session.sessionDuration}
            </h3>
          </div>
          <div className="flex items-center">
            <FaDollarSign className="w-7 h-7 mr-4"></FaDollarSign>
            <h3 className="text-xl font-bold">
              Registration Fee: {session.registrationFee}$
            </h3>
          </div>
          <div className="flex items-center">
            <FaUserGraduate className="w-7 h-7 mr-4"></FaUserGraduate>
            <h3 className="text-xl font-bold">
              Tutor: {session.tutorName}
            </h3>
          </div>
          <div className="flex items-center">
            <MdEmail className="w-7 h-7 mr-4"></MdEmail>
            <h3 className="text-xl font-bold">
              Contact Email: {session.tutorEmail || "Contact Email Not Available"}
            </h3>
          </div>
        </div>
        <div className="flex justify-end lg:mt-0 md:mt-0 mt-12">
          {session.registrationFee > 0 ?
            (
              <Link
                to='/payment'
                state={{ session: session }}
              >
                <button
                  className="btn btn-lg btn-outline font-bold hover:bg-black hover:text-white"
                  disabled={role == 'admin' || role == 'tutor' || disabled}
                >
                  BOOK NOW
                </button>
              </Link>
            )
            :
            (
              <button
                onClick={handleBooking}
                className="btn btn-lg btn-outline font-bold hover:bg-black hover:text-white"
                disabled={role == 'admin' || role == 'tutor' || disabled}
              >
                BOOK NOW
              </button>
            )}
        </div>
      </div>
      <div className="mb-24 lg:px-0 px-5">
        <h1 className="font-bold text-xl container mx-auto mb-8">Reviews:</h1>
        <div className="container mx-auto">
          {
            reviews.map((review, index) => (
              <div key={index}>
                <div className="flex items-center mb-3">
                  <img className="w-7 h-7 rounded-full mr-3" src={review?.photo} alt="" />
                  <p className="font-bold mr-5">{review?.name}</p>
                  <StarRatings
                    starRatedColor="#edab05"
                    border
                    rating={review.rating}
                    starDimension="15px"
                    starSpacing="5px"
                  ></StarRatings>
                </div>
                <div className="mb-3">
                  <p className="ml-6">{review?.review}</p>
                </div>
              </div>
            ))
          }
        </div>
        <div className="container mx-auto flex justify-center items-center mt-8">
          {
            role === 'admin' || role === 'tutor' ?
              <>
                <div className="space-y-5 mt-12">
                  <h2 className="text-3xl text-center font-bold">You Are Unable To Post A Review</h2>
                  <p className="text-center">Only students are able to post reviews about the session</p>
                </div>
              </>
              :
              <>
                <textarea value={review} onChange={(e) => setReview(e.target.value)} className='w-full h-16 p-5 border border-black overflow-hidden resize-none rounded-l-xl m-0' name="review" id="" placeholder="Write Your Opinion Here"></textarea>
                <input type="number" name="studentRating" onChange={(e) => setStar(e.target.value)} className="w-20 h-16 p-5 border border-black overflow-hidden resize-none m-0" max={5} min={0} id="" />
                <button onClick={handleReviews} className='ml-0 w-24 h-16 bg-black hover:bg-gray-500 font-bold text-white rounded-r-xl'>SEND</button>
              </>
          }
        </div>
      </div>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default SessionDetails;
