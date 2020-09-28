import React, { useState, useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import styled from "styled-components"
import UserKit from "../data/UserKit"
import { AppCntxt } from "../context/AppCntxt"

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`
const CustomerContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: rgb(235, 235, 208);
  width: 500px;
  height: 470px;
  border-radius: 10px;
`
const CustomerH2 = styled.h2`
  color: rgb(148, 148, 108);
  font-family: "Nunito", sans-serif;
  font-weight: 900;
  text-align: center;
`
const CustomerData = styled.p`
  color: rgb(148, 148, 108);
  margin: 0;
  padding: 10px;
  padding-left: 20px;
  font-family: "Nunito", sans-serif;
`
const BtnCont = styled.div`
  align-self: center;
`
const CustomerEditBtn = styled.button`
  background: rgb(228, 228, 194);
  color: rgb(148, 148, 108);
  margin: 10px;
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
const CustomerDelBtn = styled(CustomerEditBtn)``

export default function CustomerDetailedPage(props) {

  const history = useHistory()
  const { customer, setCustomer } = useContext(AppCntxt)
  const userKit = new UserKit()
  const customerItem = props.match.params.id

  function fetchClientItem() {
    userKit
      .getCustomerById(customerItem)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setCustomer(data)
      })
  }
  function handleDeleteCustomer() {
    userKit.deleteCustomer(customerItem).then(() => history.push("/home"))
  }

  const [render, setRender] = useState()
  const [refName, setRefName] = useState()

  function changeSetRender() {
    setRender(true)
  }
  function renderEditCustomer(stateVar) {
    if (render == true) {
      alert("This feature is currently under development:)")
      return (
        <div>
          <input ref={refName} placeholder={"Name"}></input>
          <input placeholder={customer.name}></input>
          <input placeholder={customer.name}></input>
          <input placeholder={customer.name}></input>
          <input placeholder={customer.name}></input>
        </div>
      )
    }
  }

  useEffect(() => {
    fetchClientItem()
  }, [])
  return (
    <div>
      <MainContainer>
        <CustomerContainer>
          <CustomerH2>Customer</CustomerH2>
          <CustomerData onChange={(e) => setRefName(e.target.value)}>
            <strong>Name: </strong>
            {customer.name}
          </CustomerData>

          <CustomerData>
            <strong>Organisation Nr: </strong>
            {customer.organisationNr}
          </CustomerData>

          <CustomerData>
            <strong>Vat Nr: </strong>
            {customer.vatNr}
          </CustomerData>
          <CustomerData>
            <strong>Reference: </strong>
            {customer.reference}
          </CustomerData>
          <CustomerData>
            <strong>PaymentTerm: </strong>
            {customer.paymentTerm}
          </CustomerData>
          <CustomerData>
            <strong>Website: </strong>
            {customer.website}
          </CustomerData>
          <CustomerData>
            <strong>Email: </strong>
            {customer.email}
          </CustomerData>
          <CustomerData>
            <strong>Phone Nr: </strong>
            {customer.phoneNumber}
          </CustomerData>
          <BtnCont>
            <CustomerEditBtn onClick={changeSetRender}>Edit</CustomerEditBtn>
            <CustomerDelBtn onClick={handleDeleteCustomer}>
              Delete
            </CustomerDelBtn>
          </BtnCont>
        </CustomerContainer>
        {renderEditCustomer()}
      </MainContainer>
    </div>
  )
}
