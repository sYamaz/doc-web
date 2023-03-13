type TokenState = {
  token: string
  refleshToken: string
}

export const useTokenlessApi = () => {
  const baseURL = 'http://localhost:8888'

  const state = useState<TokenState>('tokenState', () => ({
    token: '',
    refleshToken: ''
  }))
  return {
    signUp: signUp(baseURL),
    signIn: signIn(state, baseURL)
  }
}

const signUp = (baseURL: string) => async (id: string, pass:string) => {
  const body = {
    user_id: id,
    password: pass
  }
  const response = await fetch(baseURL + "/signup", {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Conetnt-Type':'application/json'
    },
    body: JSON.stringify(body)
  })
  if (response.status !== 200) {
    throw Error(response.statusText)
  }
}

const signIn = (token: Ref<TokenState>, baseURL: string) => async (id: string, pass: string) => {
  const body = {
    user_id: id,
    password: pass
  }
  const response = await fetch(baseURL + "/login", {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify(body)
  })
  if (response.status !== 200) {
    throw Error(response.statusText)
  }

  type ResponseBody = {
    token:string
    admin:boolean
  }
  const resBody = await response.json()
  const responseBody = resBody as ResponseBody

  token.value.token = responseBody.token
}