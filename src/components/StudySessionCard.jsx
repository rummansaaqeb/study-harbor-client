import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const StudySessionCard = ({ _id, title, description, registrationStartDate, registrationEndDate }) => {

  const [status, setStatus] = useState('');
  const location = useLocation();
  // console.log(_id);

  useEffect(() => {
    const currentDate = new Date();
    const startDate = new Date(registrationStartDate);
    const endDate = new Date(registrationEndDate);

    if (currentDate >= endDate) {
      setStatus('Closed');
    }
    else {
      setStatus('Ongoing')
    }
  }, [registrationStartDate, registrationEndDate])

  return (
    <div className="card w-96 bg-base-100 card-lg shadow-sm">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p className="mb-4">{description}</p>
        <div>
          {
            status === "Ongoing" ? (
              <>
                <div className="btn bg-green-600 text-white">{status}</div>
              </>
            ) : (
              <>
                <div className="btn bg-red-600 text-white">{status}</div>
              </>
            )
          }
        </div>
        <div className="justify-end card-actions">
          <Link to={`/session/${_id}`}>
            <button className="btn btn-primary">{location.pathname == '/' ? "Read More" : "View Details"}</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudySessionCard;
