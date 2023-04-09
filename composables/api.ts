type TokenState = {
  token: string
  refleshToken: string
}

const CONTENTTYPE_JSON = 'application/json'
const METHOD_POST = 'POST'
const METHOD_PUT = 'PUT'
const METHOD_GET = 'GET'
const METHOD_DELETE = 'DELETE'
const AUTHORIZATION_PREFIX = 'Bearer '
const MODE_CORS = 'cors'

export const useTokenlessApi = () => {
  const baseURL = 'http://localhost:8888'

  const state = useState<TokenState>('tokenState', () => ({
    token: '',
    refleshToken: ''
  }))
  return {
    signUp: signUp(baseURL),
    signIn: signIn(state, baseURL),
    saveDoc: saveDoc(getToken, baseURL),
    listDoc: listDoc(getToken, baseURL),
    getDoc: getDoc(getToken, baseURL),
    updateDoc: updateDoc(getToken, baseURL),
    deleteDoc: deleteDoc(getToken, baseURL)
  }
}

const signUp = (baseURL: string) => async (id: string, pass:string) => {
  const body = {
    user_id: id,
    password: pass
  }
  const response = await fetch(baseURL + "/signup", {
    method: METHOD_POST,
    mode: MODE_CORS,
    headers: {
      'Content-Type':CONTENTTYPE_JSON
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
    method: METHOD_POST,
    mode: MODE_CORS,
    headers: {
      'Content-Type':CONTENTTYPE_JSON
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
  localStorage.setItem('accessToken', responseBody.token)
}

const getToken = ():string =>  {
  return localStorage.getItem('accessToken') ?? ''
}

/**
 * 
 * @param token 
 * @param baseURL 
 * @returns new document_id
 */
const saveDoc = (tokenGetter: () => string, baseURL: string) => async (title: string, body: string) => {
  const obj = {
    title,
    body
  }

  const response = await fetch(baseURL + '/user/docs', {
    method: METHOD_POST,
    mode: MODE_CORS,
    headers: { 
      'Content-Type': CONTENTTYPE_JSON ,
      'Authorization': AUTHORIZATION_PREFIX+tokenGetter()
    },
    body: JSON.stringify(obj)
  })
  if (response.status !== 201) {
    throw Error(response.statusText)
  }

  type ResponseBody = {
    document_id: string
  }
  const resBody = await response.json()
  const responseBody = resBody as ResponseBody
  return responseBody.document_id
}

const updateDoc = (tokenGetter: () => string, baseURL: string) => async (document_id: string, title: string, body: string) => {
  const obj = {
    title,
    body
  }

  const response = await fetch(baseURL + '/user/docs/' + document_id, {
    method: METHOD_PUT,
    mode: MODE_CORS,
    headers: { 
      'Content-Type': CONTENTTYPE_JSON ,
      'Authorization': AUTHORIZATION_PREFIX+tokenGetter()
    },
    body: JSON.stringify(obj)
  })

  if (response.status !== 200) {
    throw Error(response.statusText)
  }
}

const listDoc = (tokenGetter: () => string, baseURL: string) => async () => {
  const response = await fetch(baseURL + '/user/docs', {
    method: METHOD_GET,
    mode: MODE_CORS,
    headers: {
      'Authorization': AUTHORIZATION_PREFIX+tokenGetter()
    }
  })
  if (response.status !== 200){
    throw Error(response.statusText)
  }

  type ResponseBody = {
    documents: {
      document_id: string
      title: string
    }[]
  }
  const resBody = await response.json()
  const responseBody = resBody as ResponseBody
  return responseBody.documents
}

const getDoc = (tokenGetter: () => string, baseURL: string) => async (document_id:string) => {
  const response = await fetch(baseURL + '/user/docs/' + document_id, {
    method: METHOD_GET,
    mode: MODE_CORS,
    headers: {
      'Authorization': AUTHORIZATION_PREFIX+tokenGetter()
    }
  })
  if (response.status !== 200){
    throw Error(response.statusText)
  }

  type ResponseBody = {
    document_id: string
    title: string
    body: string
  }
  const resBody = await response.json()
  const responseBody = resBody as ResponseBody
  return responseBody
}

const deleteDoc = (tokenGetter: () => string, baseURL: string) => async (document_id: string) => {
  const response = await fetch(baseURL + '/user/docs/' + document_id, {
    method: METHOD_DELETE,
    mode: MODE_CORS,
    headers: {
      'Authorization': AUTHORIZATION_PREFIX+tokenGetter()
    }
  })
  if (response.status !== 200){
    throw Error(response.statusText)
  }
}