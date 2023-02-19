import "./contact.scss";
import {
  Facebook,
  Instagram,
  Twitter,
  Google,
  Pinterest,
} from "@mui/icons-material";

function Contact() {
  return (
    <div className="contact">
      <div className="wrapper">
        <label htmlFor="email">Join with us</label>
        <div className="inputField">
          <input type="email" id="email" placeholder="Enter your email." />
          <button>JOIN US</button>
        </div>
        <div className="icons">
          <Facebook />
          <Instagram />
          <Twitter />
          <Google />
          <Pinterest />
        </div>
      </div>
    </div>
  );
}

export default Contact;
