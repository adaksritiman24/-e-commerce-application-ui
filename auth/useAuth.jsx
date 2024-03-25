import axios from "axios";
import { useEffect, useState } from "react";
import { SPRING_BOOT_BASE_URL } from "../components/constants";
import { useRouter } from "next/router";

const useAuth = (anonymousAuthSessionId) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const router = useRouter();

  const getToken = () => {
    return localStorage.getItem("buzzUserToken");
  };
  const setUserTokenInLocalStorage = (token) => {
    localStorage.setItem("buzzUserToken", token);
  };

  const removeTokenFromLocalStorage = () => {
    localStorage.removeItem("buzzUserToken");
  };

  const fetchUserFromToken = () => {
    const userToken = getToken();
    if (userToken == null) {
      setUser(null);
      setToken(null);

      fetchOrCreateAnonymousCart();
    } else {
      const data = JSON.stringify({
        token: userToken,
      });

      var config = {
        method: "post",
        url: `${SPRING_BOOT_BASE_URL}/customer/me`,
        headers: {
          "Content-Type": "application/json",
        },
        data,
      };

      axios(config)
        .then((response) => {
          console.log("Got user data :", response.data);
          setUser(response.data);
          setToken(userToken);
        })
        .catch((error) => {
          setUser(null);
          setToken(null);
          console.log("error: ", error);
        });
    }
  };
  const handleLogout = () => {
    console.log("Logout!");
    removeTokenFromLocalStorage();
    fetchUserFromToken();
    router.push("/");
  };

  const fetchOrCreateAnonymousCart = () => {
    //anonymous journey -->> fetch/create cart
    console.log("Fetch Cart For anonymous user: " + anonymousAuthSessionId);
    var config = {
      method: "get",
      url: `${SPRING_BOOT_BASE_URL}/cart/anonymous/${anonymousAuthSessionId}`,
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios(config)
      .then((resp) => {
        console.log(resp);
      })
      .catch((error) => {
        console.log("error");
      });
  };

  const handleLoginThroughModal = (
    username,
    password,
    setUsername,
    setPassword,
    setHelperText,
    setLoginModalOpen
  ) => {
    const data = JSON.stringify({
      username: username,
      anonymousCartUsername: anonymousAuthSessionId,
      password: password,
    });
    const config = {
      method: "post",
      url: `${SPRING_BOOT_BASE_URL}/customer/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data,
    };
    axios(config)
      .then((response) => {
        setUserTokenInLocalStorage(response.data.authToken);
        fetchUserFromToken();
        setHelperText(null);
        setLoginModalOpen(false);
        setUsername("");
        setPassword("");
        document.getElementById("searchBoxMain").focus();
      })
      .catch((error) => {
        setHelperText("Invalid userame or password !!");
      });
  };

  const handleSignupThroughModal = async (
    signupRequest,
    setSuccess,
    setErrorMessage,
    setModalOpen,
    setLoading,
    setSignupRequest
  ) => {
    const data = JSON.stringify({
      ...signupRequest,
      anonymousCartUsername: anonymousAuthSessionId,
    });
    const config = {
      method: "post",
      url: `${SPRING_BOOT_BASE_URL}/customer/signup`,
      headers: {
        "Content-Type": "application/json",
      },
      data,
    };
    try {
      const response = await axios(config);
      setUserTokenInLocalStorage(response.data.authToken);
      fetchUserFromToken();
      setErrorMessage("");
      setSuccess(true);
      setModalOpen(false);
      //reset form
      setSignupRequest({
        name: "",
        username: "",
        email: "",
        address: {
          house: "",
          locality: "",
          city: "",
          country: "India",
          pincode: "",
        },
        phoneNumber: "",
        password: "",
        confirmPassword: "",
      });
      router.push("/");
      document.getElementById("searchBoxMain").focus();
    } catch (e) {
      console.log("Signup Error:", e.response.data?.message);
      setSuccess(false);
      let errorDetails = e.response.data?.details;
      if(errorDetails === null || errorDetails === undefined) {
        setErrorMessage(e.response.data?.message);
      }
      else {
        errorDetails = errorDetails.slice(1, errorDetails.length - 1);
        var errors = errorDetails.split(",");
        setErrorMessage(errors[0].trim());
      }
      
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUserFromToken();
  }, []);

  return {
    user,
    token,
    setUser,
    setToken,
    handleLoginThroughModal,
    handleSignupThroughModal,
    handleLogout,
  };
};

export default useAuth;
