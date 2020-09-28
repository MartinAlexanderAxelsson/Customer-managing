import React, { useContext, useEffect, useState } from "react"
import { AppCntxt } from "../context/AppCntxt"
import UserKit from "../data/UserKit"
import { useHistory, Link } from "react-router-dom"
import styled from "styled-components"

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgb(192, 231, 218);
  color: rgb(32, 151, 155);
  height: 14vh;
  margin: 0;
`

const HeaderH1 = styled.h1`
  font-family: "Nunito", sans-serif;
  font-weight: 900;
  padding-right: 120px;
`
const HomeLink = styled.p`
  font-family: "Nunito", sans-serif;
  font-weight: 900;
  margin: 0;
  text-align: center;
  margin-top: 5px;
`

const LogoutBtnContainer = styled.div`
  margin-top: 10px;
  margin-right: 20px;
`
const LogoutBtn = styled.button`
  width: 100px;
  height: 35px;
  font-family: "Nunito", sans-serif;
  font-weight: 900;
  font-size: 20px;
  border-radius: 7px;

  background: rgb(228, 228, 194);
  color: rgb(148, 148, 108);

  border: none;
  box-shadow: inset -2px -2px 0px 0px rgb(180, 180, 153),
    -2px -2px 0px 0px rgb(248, 248, 224);
  &:active {
    box-shadow: inset -2px -2px 0px 0px rgb(248, 248, 224),
      -2px -2px 0px 0px rgb(180, 180, 153);
  }
`
const LoggedInUserContainer = styled.div``

const LoggedInUserP = styled.p`
  font-family: "Nunito", sans-serif;
  margin: 2px;
  padding-left: 40px;
`
const LoggedOutUserP = styled(LoggedInUserP)``

const Main = styled.main`
display:flex;
justify-content: center;
align-items: center;

  height: 90vh;
  background: rgb(23, 26, 25);
`
const BlinkBoxCont = styled.div`
  margin: 0;
  display: flex;
  flex-direction: row;
  width: 100vw;

  flex-wrap: wrap;
`
const BlinkBox = styled.div`

margin:0px;
background: ${(props) => props.bgColor};
  height: 2vw;
  width: 2vw;
  transition: opacity: 4s;
opacity: 0.6;
`
export default function GlobalLayout({ children }) {
  const [boxes, setBoxes] = useState(Array(50).fill())
  const { user, setUser } = useContext(AppCntxt)

  const history = useHistory()
  const userKit = new UserKit()
  const token = userKit.getToken()

  function getRandomColor() {
    let [color1, color2, color3] = Array(3)
      .fill()
      .map((c) => Math.floor(Math.random() * 256))

    return `rgb(${color1},${color2},${color3})`
    // document.body.style.background = colors
  }

  function handleUser() {
    userKit
      .getUser()
      .then((res) => res.json())
      .then((data) => {
        setUser(data)
        console.log(token)
      })
  }

  function handleLogout() {
    userKit.deleteToken()

    history.push("/")

    window.location.reload()
  }

  useEffect(() => {
    handleUser()
  }, [token])

  return (
    <div>
      <Header>
        {!token && (
          <LoggedOutUserP>
            <strong>Signed out</strong>
          </LoggedOutUserP>
        )}

        {token && (
          <LoggedInUserContainer>
            <LoggedInUserP>
              <strong>Signed in as:</strong>
            </LoggedInUserP>
            <LoggedInUserP>
              {user.firstName} {user.lastName}
            </LoggedInUserP>
            <LoggedInUserP>{user.email}</LoggedInUserP>
          </LoggedInUserContainer>
        )}

        <HeaderH1>Customer Management System</HeaderH1>
        <LogoutBtnContainer>
          {token && <LogoutBtn onClick={handleLogout}>Log out</LogoutBtn>}
          {token && (
            <Link
              style={{ textDecoration: "none", color: "rgb(32, 151, 155)" }}
              to="/home"
            >
              <HomeLink>Home</HomeLink>
            </Link>
          )}
        </LogoutBtnContainer>
      </Header>
      <BlinkBoxCont>
        {boxes.map(() => (
          <BlinkBox bgColor={getRandomColor}></BlinkBox>
        ))}
      </BlinkBoxCont>
      <Main>{children}</Main>

      <footer></footer>

      {/* {token && (
        <nav>
          <p>Logo</p>
          <ul>
            <li>Customers</li>
            <button onClick={handleLogout}>Log out</button>
            {user.firstName && user.lastName && (
              <li>
                <p>Signed in as</p>
                <p>
                  {user.firstName} {user.lastName}
                </p>
                <p>{user.email}</p>
              </li>
            )}
          </ul>
        </nav>
      )}
      {!token && (
        <nav>
          <p>Logo</p>
          <ul>
            <li>Login</li>
          </ul>
        </nav>
      )}
      <main>{children}</main> */}
    </div>
  )
}
