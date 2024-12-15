import "./Login.css";
import background from "../../assets/videos/water-background.mp4";

const Login = () => {
  return (
    <div>
      <div className="background">
        <video src={background} autoPlay loop muted playsInline />
      </div>
      <div className="content">
        <form>
          <label>userName:</label>
          <input type="text" />
          <br />
          <label>Password:</label>
          <input type="text" />
          <br />
        </form>
      </div>
    </div>
  );
};

export default Login;
