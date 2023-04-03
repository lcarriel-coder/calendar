export const initialState = {
    status: 'checking',
    user: {},
    errorMesagge: undefined
}

export const authenticatedState = {
    status: 'authenticated',
    user: {
        uid:'abc',
        name:'Fernando'
    },
    errorMesagge: undefined
}


export const notAuthenticatedState = {
    status: 'not-authenticated',
    user: {},
    errorMesagge: undefined
}