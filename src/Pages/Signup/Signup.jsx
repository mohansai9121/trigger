import background from "../../assets/videos/water-background.mp4";
import "./Signup.css";

const Signup = () => {
  return (
    <div>
      <div className="background">
        <video src={background} autoPlay loop muted playsInline />
      </div>
      <div className="content">
        <form>
          <label>First Name:</label>
          <input type="text" />
          <br />
          <label>Last Name:</label>
          <input type="text" />
          <br />
        </form>
      </div>
    </div>
  );
};

export default Signup;
