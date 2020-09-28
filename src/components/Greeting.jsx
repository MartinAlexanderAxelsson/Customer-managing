import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

const GreetingContainer = styled.div`
  display: flex;
  justify-content: center;
padding:0;
`
const GreetingText = styled.p`
  border-radius: 10px;
  background: rgb(235, 235, 208);
  color: rgb(148, 148, 108);
padding: 20px;
  font-family: "Nunito", sans-serif;
  font-weight: 900;
  text-align: center;
`

export default function Greeting() {
  return (
    <div>
      <GreetingContainer>
        <GreetingText>
          Hello Friend, <br /> Welcome to your customer management system
          <br />
          Dont have an account? <Link to="/register">Register</Link>
        </GreetingText>
      </GreetingContainer>
    </div>
  )
}
