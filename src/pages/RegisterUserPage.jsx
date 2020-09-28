import React from "react"
import styled from "styled-components"
import RegisterForm from "../components/RegisterUserForm"


const RegisterFormContainer = styled.div`
display: flex;
justify-content: center;
`

export default function RegisterUserPage() {
  return (
    <div>
      <RegisterFormContainer>
        <RegisterForm></RegisterForm>
      </RegisterFormContainer>
    </div>
  )
}
