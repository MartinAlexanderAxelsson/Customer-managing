import React, { useState } from "react"
import { Switch, Route } from "react-router-dom"
import Greeting from "./components/Greeting"
import GlobalLayout from "./components/GlobalLayout"
import LoginPage from "./pages/LoginPage"
import RegisterUserPage from "./pages/RegisterUserPage"
import HomePage from "./pages/HomePage"
import CustomerDetailedPage from "./pages/CustomerDetailedPage"
import { AppCntxt } from "./context/AppCntxt"
import "./App.css"

function App() {
  const [customerList, setCustomerList] = useState([])
  const [customer, setCustomer] = useState({})
  const [user, setUser] = useState({})
  return (
    <div>
      <AppCntxt.Provider
        value={{
          customerList,
          setCustomerList,
          customer,
          setCustomer,
          user,
          setUser,
        }}
      >
        <GlobalLayout>
          <Switch>

            <Route
              path="/customers/:id"
              render={(props) => <CustomerDetailedPage {...props} />}
            ></Route>

            <Route path="/home">
              <HomePage />
            </Route>

            <Route path="/login">
              <LoginPage />
            </Route>

            <Route path="/register">
              <RegisterUserPage />
            </Route>

            <Route path="/">
              <LoginPage />
            </Route>
          </Switch>
        </GlobalLayout>
      </AppCntxt.Provider>
    </div>
  )
}

export default App
