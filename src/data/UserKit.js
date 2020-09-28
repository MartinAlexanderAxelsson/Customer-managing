const ROOT_URL = "https://frebi.willandskill.eu/"

export default class {
  async register(
    firstName,
    lastName,
    email,
    password,
    organisationName,
    organisationKind
  ) {
    const url = `${ROOT_URL}auth/users/`
    const payload = {
      firstName,
      lastName,
      email,
      password,
      organisationName,
      organisationKind,
    }
    return fetch(url, {
      method: "POST",
      headers: this.getPublicHeaders(),
      body: JSON.stringify(payload),
    })
  }

  async activateUser(uid, token) {
    const url = `${ROOT_URL}auth/users/activate/`

    const payload = {
      uid,
      token,
    }
    fetch(url, {
      method: "POST",
      headers: this.getPublicHeaders(),
      body: JSON.stringify(payload),
    })
  }

  async login(email, password) {
    const url = `${ROOT_URL}api-token-auth/`

    const payload = {
      email,
      password,
    }
    return fetch(url, {
      method: "POST",
      headers: this.getPublicHeaders(),
      body: JSON.stringify(payload),
    })
  }

  async logout(token) {
    const url = `${ROOT_URL}/api/v1/customers/{id}/`

    return fetch(url, {
      method: "Delete",
      headers: this.getPrivateHeaders(),
      body: JSON.stringify(token),
    })
  }

  async deleteCustomer(id) {
    const url = `${ROOT_URL}/api/v1/customers/${id}/`
    return fetch(url, {
      method: "Delete",
      headers: this.getPrivateHeaders(),
    })
  }

  async fetchClientList() {
    const url = `${ROOT_URL}api/v1/customers`
    return fetch(url, {
      headers: this.getPrivateHeaders(),
    })
  }

  async createCustomer(payload) {
    const url = `${ROOT_URL}api/v1/customers`
    return fetch(url, {
      method: "POST",
      headers: this.getPrivateHeaders(),
      body: JSON.stringify(payload),
    })
  }

  async getCustomerById(id) {
    const url = `${ROOT_URL}api/v1/customers/${id}/`
    return fetch(url, {
      headers: this.getPrivateHeaders(),
    })
  }

  async getUser() {
    const url = `${ROOT_URL}api/v1/me`
    return fetch(url, {
      headers: this.getPrivateHeaders(),
    })
  }

  setToken(token) {
    localStorage.setItem("BUSINESS_TOKEN", token)
  }

  getToken() {
    return localStorage.getItem("BUSINESS_TOKEN")
  }

  deleteToken() {
    localStorage.removeItem("BUSINESS_TOKEN")
  }

  getPublicHeaders() {
    return {
      "content-Type": "application/json",
    }
  }

  getPrivateHeaders() {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.getToken()}`,
    }
  }
}
