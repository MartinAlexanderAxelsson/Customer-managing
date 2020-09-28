import React, { useState, useContext, useEffect } from "react"
import styled from "styled-components"
import UserKit from "../data/UserKit"
import { Link } from "react-router-dom"
import { AppCntxt } from "../context/AppCntxt"

const MainContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  height: 100%;
`
const CreateCustomerContainer = styled.div`
  margin: 40px;
  background: rgb(235, 235, 208);
  width: 400px;
  height: fit-content;
  padding-bottom: 20px;
  border-radius: 5px;
`
const CreateCustomerH2 = styled.h2`
  font-family: "Nunito", sans-serif;
  font-weight: 900;
  font-size: 25px;
  text-align: center;
  color: rgb(148, 148, 108);
`
const CreateCustomerForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`
const CreateCustomerLabels = styled.label``
const CreateCustomerInputs = styled.input`
  background: rgb(235, 235, 208);
  margin: 5px;
  padding: 7px;
  width: 250px;
  height: 10px;
  border-radius: 5px;
  font-family: "Nunito", sans-serif;
  font-weight: 900;
  border: none;
  box-shadow: inset -2px -2px 0px 0px rgb(248, 248, 224),
    -2px -2px 0px 0px rgb(180, 180, 153);
`
const CreateCustomerBtn = styled.button`
  background: rgb(228, 228, 194);
  color: rgb(148, 148, 108);
  align-self: center;
  margin-top: 20px;
  width: 100px;
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

const CustomerListContainer = styled(CreateCustomerContainer)`
  padding-bottom: 10px;
`
const CustomerListH2 = styled(CreateCustomerH2)``
const CustomerListText = styled.p`
  font-family: "Nunito", sans-serif;
  font-weight: 400;
  font-size: 16px;
  text-align: center;
`
const CustomerUl = styled.ul``
const CustomerListItem = styled.li`
  font-family: "Nunito", sans-serif;
  font-weight: 400;
  font-size: 18px;
  list-style: none;
`

export default function HomePage() {
  const [name, setName] = useState("")
  const [organisationNr, setOrganisationNr] = useState("")
  const [vatNr, setVatNr] = useState("")
  const [reference, setReference] = useState("")
  const [paymentTerm, setPaymentTerm] = useState("")
  const [website, setWebsite] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const { customerList, setCustomerList } = useContext(AppCntxt)
  const { user, setUser } = useContext(AppCntxt)
  const userKit = new UserKit()

  function fetchClients() {
    userKit
      .fetchClientList()
      .then((res) => res.json())
      .then((data) => {
        setCustomerList(data.results)
      })
  }

  function handleCreateCustomer() {
    const payload = {
      name,
      organisationNr,
      vatNr,
      reference,
      paymentTerm,
      website,
      email,
      phoneNumber,
    }
    userKit
      .createCustomer(payload)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        fetchClients()
      })
  }

  function renderInputs(type, placeholder, stateVar, stateSetVar) {
    return (
      <CreateCustomerLabels>
        <CreateCustomerInputs
          placeholder={placeholder}
          type={type}
          value={stateVar}
          onChange={(e) => stateSetVar(e.target.value)}
        />
      </CreateCustomerLabels>
    )
  }

  useEffect(() => {
    fetchClients()
  }, [])
  return (
    <div>
      {user.firstname}
      <MainContainer>
        <CreateCustomerContainer>
          <CreateCustomerH2>Create Customer</CreateCustomerH2>
          <CreateCustomerForm onSubmit={handleCreateCustomer}>
            {renderInputs("text", "Name", name, setName)}
            {renderInputs(
              "text",
              "Organisation Nr",
              organisationNr,
              setOrganisationNr
            )}
            {renderInputs("text", "Vat Nr", vatNr, setVatNr)}
            {renderInputs("text", "Reference", reference, setReference)}
            {renderInputs("text", "PaymentTerm", paymentTerm, setPaymentTerm)}
            {renderInputs("text", "Website", website, setWebsite)}
            {renderInputs("text", "Email", email, setEmail)}
            {renderInputs("text", "PhoneNumber", phoneNumber, setPhoneNumber)}

            <CreateCustomerBtn type="submit">
              Add
            </CreateCustomerBtn>
          </CreateCustomerForm>
        </CreateCustomerContainer>
        <CustomerListContainer>
          <CustomerListH2>Customers</CustomerListH2>

          {customerList <= 0 ? (
            <CustomerListText>No Customers</CustomerListText>
          ) : (
            <CustomerListText>
              Click on the customer to see detailed information
            </CustomerListText>
          )}

          {customerList &&
            customerList.map((customerItem) => {
              return (
                <CustomerUl key={customerItem.id}>
                  <CustomerListItem>
                    <Link
                      style={{ textDecoration: "none" }}
                      to={`/customers/${customerItem.id}`}
                    >
                      {customerItem.name}
                    </Link>
                  </CustomerListItem>
                </CustomerUl>
              )
            })}
        </CustomerListContainer>
      </MainContainer>
    </div>
  )
}
