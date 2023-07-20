import React from 'react';
import Profile from './Profile';
import Review from './Review';
import "./style.css";
const ProfileSection = ({ profile, reviews }) => {
  const [userDetail, setUserDetail] = useState('');
  const [reviews, setReviews] = useState('');
  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem('user'));
    const formData = new FormData();
    formData.append("userId", user.userId);
    if (user && user.userId) {
      axios.post(process.env.REACT_APP_BACKEND_URL + 'user/detail', formData, {
        headers: {
          'Authorization': `Bearer ${window.localStorage.getItem("token")}`
        }
      }).then((response) => {
        setUserDetail(response.data);
      })
      axios.get(process.env.REACT_APP_BACKEND_URL + 'review/user?id=' + user.UserId).then((response) => {
        setReviews(response.data);
      })
    }
  }, []);
  return (
    <div>
      <h1>Movie Reviews</h1>
      <Profile
        name={profile.name}
        email={profile.email}
        filmsRated={profile.filmsRated}
      />
      <h2>Reviews</h2>
      {reviews.map((review, index) => (
        <Review
          key={index}
          name={review.name}
          stars={review.stars}
          comment={review.comment}
        />
      ))}
    </div>
  );
};

export default ProfileSection;

