import React, { useEffect, useState } from "react";
// import svgIcons from "../../assets/image/SVG/svg";
import svgIcons from "../../assets/image/SVG/svg";
import axios from "axios";
import { useNativeReactSdk } from "../../context/NativeReactSdkContext";
import image1 from "../../assets/image/ArcadePlayerCharactersDesktop/Bubbly_Kirby.png";
import image2 from "../../assets/image/ArcadePlayerCharactersDesktop/Giggly_Goldie.png";
import image3 from "../../assets/image/ArcadePlayerCharactersDesktop/Chris_Labroo.png";
import image4 from "../../assets/image/ArcadePlayerCharactersDesktop/Hoodie_Harmony.png";
import image5 from "../../assets/image/ArcadePlayerCharactersDesktop/Marvelous_Munchkin.png";
import image6 from "../../assets/image/ArcadePlayerCharactersDesktop/Mini_Mighty.png";
import image7 from "../../assets/image/ArcadePlayerCharactersDesktop/Puffy_Plum.png";
import image8 from "../../assets/image/ArcadePlayerCharactersDesktop/Rosy_Cheeks.png";
import image9 from "../../assets/image/ArcadePlayerCharactersDesktop/Telly_Topper.png";
import image10 from "../../assets/image/ArcadePlayerCharactersDesktop/Tummy_Tumblekins.png";
import image11 from "../../assets/image/ArcadePlayerCharactersDesktop/Rafa_The_Slammer.png"
const images = {
  0:image1,
  1:image2,
  2:image3,
  3:image4,
  4:image5,
  5:image6,
  6:image7,
  7:image8,
  8:image9,
  9:image10,
  10:image11
};

const Card = ({
  
  name = "Oliver",
  points = 120,
  moments = 3,
  ranking = 2,
  streak = 7,
  discount = "20% discount on next month",
  task = "Create 3 moments in 7 days",
  onButtonClick,
}) => {
  const { email, token } = useNativeReactSdk();  // Get email and token from context
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    // Make an API call with the stored email and token
    const fetchData = async () => {
        try {
            
            const response = await axios.get('https://dev.api.pitch.space/api/player-history', {
              params: {
                email: decodeURIComponent(email),
                token: token
            }
            });
            if (response.status === 200) {
                setData(response.data?.data[0]);
            }
        } catch (err) {
            setError(email);
        }
    };
    if (email && token) {
        fetchData();  // Only fetch if both email and token are set
    }
}, [email, token]);

if (error) {
    return <div>{error}</div>;
}





  return (
    <div className="user-card">
      {/* Profile section */}
      <div className="profile-section"> 
      <img src={`https://res.cloudinary.com/pitchspace/image/upload/v1/player-icons/${data?.history?.playerAvatar}`}
          style={{height:'120px',width:'121px',borderRadius:'15px'}}
        />
        <div className="first-level">
        
          <div className="name-title">
            <h2 style={{margin:'0'}}>Hi {name}</h2>
            <p style={{marginBottom:'0',color: '#888'}} className="subtitle">YOU'RE A STAR 🎉</p>
          </div>
          

          {/* Points and Ranking */}
          
          <div className="status-section">
            <div className="points">
              <p>{data?.history?.points}</p>
              <span>Points</span>
            </div>
            <div className="moments">
              <p >{moments}</p>
              <span>Moments</span>
            </div>
            <div className="ranking">
              <p >
                {ranking}
                <sup>th</sup>
              </p>
              <span>Place</span>
            </div>
          </div>
          </div>
        </div>
      

      {/* Streak, rewards, and progress */}
      <div className="streak-section">
        <div className="streak-background">
            <p className="streak">⚡ {streak}-Week Streak</p>
        </div>
        <div className="isolation">
        <div
          dangerouslySetInnerHTML={{ __html: svgIcons.isolation }}
          style={{marginRight:'3px',marginLeft:'10px'}}
        />
        <p style={{marginRight:'10px'}}>X1</p>
        </div>
        
        <div className="isolation">
        <div
          dangerouslySetInnerHTML={{ __html: svgIcons.stardust }}
          style={{marginRight:'3px',marginLeft:'10px'}}
        />
        <p >150</p>
        </div>
        
        
        <div className="progress-bar">
          <span
            className="progress-indicator"
            style={{ width: `${(2 / moments) * 100}%` }}
          ></span>
        </div>
       
      </div>
      <p className="task">{task}</p>
      {/* Discount and Button */}
      <div className="discount-section">
      <div className="icon-text">
      <div
          dangerouslySetInnerHTML={{ __html: svgIcons.Reward }}
          style={{marginRight:'5px'}}
        />
        <p >{discount}</p>
        </div>
        <button className="go-button" onClick={onButtonClick}>
          Go
        </button>
      </div>
    </div>
  );
};

export default Card;
