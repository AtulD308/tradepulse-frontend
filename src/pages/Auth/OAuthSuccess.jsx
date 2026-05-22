import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuthSuccess = () => {

    const navigate = useNavigate();

    useEffect(() => {

        const params = new URLSearchParams(window.location.search);

        const token = params.get("token");

        if(token){

            localStorage.setItem("jwt", token);

            navigate("/");

        }

    }, []);

    return <div>Logging in...</div>;
};

export default OAuthSuccess;

/*

Frontend Button
      ↓
5454/login/oauth2/authorization/google
      ↓
Google Login
      ↓
Spring Security SuccessHandler
      ↓
JWT Generated
      ↓
Redirect to:
5173/oauth-success?token=JWT
      ↓
Frontend stores JWT
      ↓
Navigate to homepage/dashboard

*/