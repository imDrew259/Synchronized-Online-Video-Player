import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { getUserCall, RegisterCall } from "../ApiCalls";
import { Link, useNavigate } from "react-router-dom";
import spinnerImg from "../images/spinnerImg.gif";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    // Linearr gradient to apply opacity to the background-image.
    url("https://cdn.shopify.com/s/files/1/0972/9458/articles/Outdoor_movie_1024x1024.jpg?v=1533094315");
  background-size: cover;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  padding: 20px;
  padding-bottom: 50px;
  width: 40%;
  background-color: white;
  border-radius: 10px;
  ${mobile({ width: "80%" })}
  ${mobile({ paddingBottom: "220px" })}
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  height: 255px;
`;
const Error = styled.span`
  color: red;
  font-size: 15px;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;
const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%; //40% means 40% of the available space of the parent element
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-left: 29%;
`;
const LINK = styled.a`
  margin: 10px 0px;
  font-size: 15px;
`;

const Spinner = styled.img`
  width: 45px;
  height: 45px;
`;
const Loader = styled.div`
  text-align: center;
  margin-top: 20px;
  margin-left: 50px;
  display: none;
`;

const Register = ({ currUser, setCurrUser }) => {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [passwordagain, setpasswordagain] = useState("");
  const [error, seterror] = useState("");
  const navigate = useNavigate();
  useEffect(async () => {
    document.getElementById("loader").style.display = "block";
    document.getElementById("registerBtn").disabled = true;
    const res = await getUserCall();
    document.getElementById("loader").style.display = "none";
    document.getElementById("registerBtn").disabled = false;
    if (res.data.User) {
      setCurrUser(res.data.User.username);
    } else {
      setCurrUser(null);
    }
  }, []);

  useEffect(() => {
    if (error) {
      document.getElementById("err").style.display = "block";
      document.getElementById("loader").style.display = "none";
    } else {
      document.getElementById("err").style.display = "none";
    }
  }, [error]);

  const handleClick = async (e) => {
    e.preventDefault();
    document.getElementById("loader").style.display = "block";
    document.getElementById("registerBtn").disabled = true;
    seterror(null);
    const data = {
      email: email,
      password: password,
      username: username,
    };
    const res1 = await RegisterCall(data);

    if (res1.data.error) {
      seterror(true);
    }
    const res2 = await getUserCall();

    document.getElementById("loader").style.display = "none";
    document.getElementById("registerBtn").disabled = false;
    if (res2.data.User) {
      setCurrUser(res2.data.User.username);
    } else {
      setCurrUser(null);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form className="form">
          <Input
            placeholder="username"
            onChange={(e) => setusername(e.target.value)}
          />
          <Input
            placeholder="email"
            onChange={(e) => setemail(e.target.value)}
            type="email"
          />
          <Input
            placeholder="password"
            onChange={(e) => setpassword(e.target.value)}
            type="password"
          />
          <Input
            placeholder="Confirm password"
            onChange={(e) => setpasswordagain(e.target.value)}
            type="password"
          />
          <Agreement>
            By creating an account, I consert to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button id="registerBtn" onClick={handleClick}>
            CREATE
          </Button>
          <LINK>
            Already have an account ? <Link to="/login"> Login</Link>{" "}
          </LINK>
          <Error id="err">Something went wrong..</Error>
          <Loader id="loader">
            <Spinner src={spinnerImg} alt="loader"></Spinner>
          </Loader>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
