import React, { useState, useContext } from "react"
import UserKit from "../data/UserKit"
import { useHistory } from "react-router-dom"
import styled from "styled-components"
import { AppCntxt } from "../context/AppCntxt"
import Greeting from "../components/Greeting"

const LoginPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

const LoginContainer = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgb(235, 235, 208);
  width: 300px;
  height: 270px;
  padding: 10px;
  border-radius: 10px;
`
const LoginLabel = styled.label``
const LoginInput = styled.input`
  background: rgb(235, 235, 208);
  margin: 10px;
  padding: 10px;
  width: 230px;
  height: 20px;
  border-radius: 5px;
  font-family: "Nunito", sans-serif;
  font-weight: 900;
  border: none;
  box-shadow: inset -2px -2px 0px 0px rgb(248, 248, 224),
    -2px -2px 0px 0px rgb(180, 180, 153);
`
const LoginBtn = styled.button`
  background: rgb(228, 228, 194);
  color: rgb(148, 148, 108);
  margin-top: 30px;
  width: 160px;
  height: 40px;
  border-radius: 5px;
  font-family: "Nunito", sans-serif;
  font-weight: 900;
  font-size: 20px;
  border: none;
  box-shadow: inset -2px -2px 0px 0px rgb(180, 180, 153),
    -2px -2px 0px 0px rgb(248, 248, 224);
  &:active {
    box-shadow: inset -2px -2px 0px 0px rgb(248, 248, 224),
      -2px -2px 0px 0px rgb(180, 180, 153);
  }
`
const ActivateUserContainer = styled(LoginContainer)`
  height: 200px;
`
const ActivateUserP = styled.p`
  font-family: "Nunito", sans-serif;
  font-weight: 900;
  font-size: 20px;
  text-align: center;
  color: rgb(148, 148, 108);
`
const ActivateUserBtn = styled(LoginBtn)``

export default function LoginPage() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const history = useHistory()
  const searchString = history.location.search

  const urlParameters = new URLSearchParams(searchString)

  const [uid, setUid] = useState(urlParameters.get("uid"))
  const [token, setToken] = useState(urlParameters.get("token"))
  const userKit = new UserKit()

  function handleActivateUser() {
    userKit.activateUser(uid, token).then(() => {
      setUid(null)
      setToken(null)
      history.push("/login")
    })
  }
  function handleLogin() {
    userKit
      .login(email, password)
      .then((res) => res.json())
      .then((data) => {
        userKit.setToken(data.token)
        if (data.token) {
          history.push("/home")
        } else {
          alert("Please register an account")
        }
      })
  }

  return (
    <div>
      <LoginPageContainer>
        {uid && token && (
          <ActivateUserContainer>
            <ActivateUserP>Click button to activate your account</ActivateUserP>
            <ActivateUserBtn onClick={handleActivateUser}>
              activate user
            </ActivateUserBtn>
          </ActivateUserContainer>
        )}
        {!uid && !token && <Greeting />}
        {!uid && !token && (
          <LoginContainer>
            <LoginLabel>
              <LoginInput
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></LoginInput>
            </LoginLabel>

            <LoginLabel>
              <LoginInput
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></LoginInput>
            </LoginLabel>
            <LoginBtn onClick={handleLogin}>Login</LoginBtn>
          </LoginContainer>
        )}
      </LoginPageContainer>
      <p>guesses.guesses+28@gmail.com</p>
      <p>js-fend-19</p>
    </div>
  )
}
