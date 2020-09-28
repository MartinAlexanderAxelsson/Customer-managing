import React, { useState } from "react"
import styled from "styled-components"
import UserKit from "../data/UserKit"


const RegisterFormH4 = styled.h4`
font-family: "Nunito", sans-serif;
font-weight: 900;
text-align: center;
margin-top:0;
color: rgb(148, 148, 108);
`
const RegisterForm = styled.form`
margin-top:30px;
display: flex;
flex-direction: column;
justify-content: center;

background: rgb(235, 235, 208);
width: 300px;
height: 480px;
padding: 10px;
border-radius: 10px;

`
const RegisterFormLabels = styled.label``
const RegisterFormInputs = styled.input`
background: rgb(235, 235, 208);
margin: 10px;
padding: 10px;
width: 250px;
height: 10px;
border-radius: 5px;
font-family: "Nunito", sans-serif;
font-weight: 900;
border: none;
box-shadow:inset -2px -2px 0px 0px rgb(248, 248, 224), -2px -2px 0px 0px rgb(180, 180, 153);
`

const RegisterBtn = styled.button`
background: rgb(228, 228, 194);
color: rgb(148, 148, 108);
align-self: center;
margin-top: 30px;
width: 160px;
height: 40px;
border-radius: 5px;
font-family: "Nunito", sans-serif;
font-weight: 900;
font-size: 20px;
border: none;
  box-shadow:inset -2px -2px 0px 0px rgb(180, 180, 153), -2px -2px 0px 0px rgb(248, 248, 224);
  &:active {
    box-shadow:inset -2px -2px 0px 0px rgb(248, 248, 224), -2px -2px 0px 0px rgb(180, 180, 153);
  }
`

export default function RegisterUserForm() {
    
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [organisationName, setOrganisationName] = useState("")
  const [organisationKind, setOrganisationKind] = useState("")

const userKit = new UserKit()

  function handleRegister(event) {
    event.preventDefault()
    userKit.register(
      firstName,
      lastName,
      email,
      password,
      organisationName,
      organisationKind
    )
  }

  function confirm() {
    alert("An email has been sent to your email-account")
  }
  function renderLabels(type, placeholder, stateVar, stateSetVar) {
    return (
      <RegisterFormLabels>
        <RegisterFormInputs
          placeholder={placeholder}
          type={type}
          value={stateVar}
          onChange={(e) => stateSetVar(e.target.value)}
        />
      </RegisterFormLabels>
    )
  }
  return (
    <div>
      <RegisterForm onSubmit={handleRegister}>
        <RegisterFormH4>Fill out the form to register</RegisterFormH4>
        {renderLabels("text", "First Name", firstName, setFirstName)}
        {renderLabels("text", "Last Name", lastName, setLastName)}
        {renderLabels("text", "you@email.com", email, setEmail)}
        {renderLabels( "password", "Password", password, setPassword)}
        {renderLabels(
          "text",
          "Organisation Name",
          organisationName,
          setOrganisationName
        )}
        {renderLabels(
          
          "text",
          "Organisation Kind (1, 2 or 3)",
          organisationKind,
          setOrganisationKind
        )}

        <RegisterBtn type="submit" onClick={confirm}>
          Register User
        </RegisterBtn>
      </RegisterForm>
    </div>
  )
}
