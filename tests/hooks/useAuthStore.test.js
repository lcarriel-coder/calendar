import { configureStore } from "@reduxjs/toolkit";
import { renderHook, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import { calendarApi } from "../../src/api";
import { useAuthStore } from "../../src/hooks";
import { AuthSlice } from "../../src/store";
import { notAuthenticatedState } from "../fixtures/authStates";
import { initialState } from "../fixtures/calendarStates";
import { testUserCredentials } from "../fixtures/testUser";

const getMockStore = (initialState) => {
    return configureStore({
        reducer: {
            auth: AuthSlice.reducer
        },
        preloadedState: {
            auth: { ...initialState }
        }
    })
}

describe('Pruebas en useAuthStore', () => {

    beforeEach(() =>  localStorage.clear());

    test('debe de regresar los valores por defecto', () => {
        const mockStore = getMockStore({ ...initialState });
        const { result } = renderHook(() => useAuthStore(),
            {
                wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
            }
        );

        expect(result.current).toEqual({
            status: undefined,
            user: undefined,
            errorMessage: undefined,
            checkAuthToken: expect.any(Function),
            startLogin: expect.any(Function),
            startRegister: expect.any(Function),
            startLogout: expect.any(Function)
        });

    });


    test('startlogin debe de realizar el login correctamente', async () => {
     
        const mockStore = getMockStore({ ...notAuthenticatedState });
        const { result } = renderHook(() => useAuthStore(),
            {
                wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
            }
        );

        await act(async () => {
            await result.current.startLogin(testUserCredentials);
        });

        const { errorMessage, status, user } = result.current;

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: { name: 'Luis Carriel', uid: '641f9c3e29d289e1683ea6e7' }
        });

        expect(localStorage.getItem('token')).toEqual(expect.any(String));
        expect(localStorage.getItem('token-init-date')).toEqual(expect.any(String));


    });

    test('startlogin debe de fallar la autenticacion', async () => {
       
        const mockStore = getMockStore({ ...notAuthenticatedState });
        const { result } = renderHook(() => useAuthStore(),
            {
                wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
            }
        );

        await act(async () => {
            await result.current.startLogin({ email: 'asdf@hotmail.com', password: '12345' });
        });

        const { errorMessage, status, user } = result.current;
        expect(localStorage.getItem('token')).toBe(null);
        expect({ errorMessage, status, user }).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage: 'Credenciales incorrectas',
        });

        await waitFor(
            () => expect(result.current.errorMessage).toBe(undefined)
        );



    });


    test('startRegister debe de crear un usuario', async () => {
     
        const newUser= { email: 'asdf@hotmail.com', password: '12345',name:'Test User 2' }
        const mockStore = getMockStore({ ...notAuthenticatedState });
        const { result } = renderHook(() => useAuthStore(),
            {
                wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
            }
        );

        const spy = jest.spyOn(calendarApi,'post').mockReturnValue({
            data:{
                ok: true,
                uid: "641f9c3e29d289e1683ea6e7",
                name: "Test User",
                token: "ALGUN-TOKEN"
            }
        });

        await act(async () => {
            await result.current.startRegister(newUser);
        });

        const { errorMessage, status, user } = result.current;

        expect({ errorMessage, status, user }).toEqual({
            status: 'authenticated',
            user: {
                uid: "641f9c3e29d289e1683ea6e7",
                name: "Test User"
            },
            errorMessage: undefined,
        });

        spy.mockRestore();

    });


    test('startRegister debe de fallar la creacion', async () => {
     

        const mockStore = getMockStore({ ...notAuthenticatedState });
        const { result } = renderHook(() => useAuthStore(),
            {
                wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
            }
        );

        await act(async () => {
            await result.current.startRegister(testUserCredentials);
        });

        const { errorMessage, status, user } = result.current;

        expect({ errorMessage, status, user }).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage: "Un usuario existe con ese correo",
        });

    });


    test('checkAuthToken debe de fallar si no hay token', async () => {


        const { data } = await calendarApi.post('/auth', testUserCredentials);
        localStorage.setItem('token',data.token);

        const mockStore = getMockStore({ ...notAuthenticatedState });
        const { result } = renderHook(() => useAuthStore(),
            {
                wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
            }
        );
      

        await act(async () => {
            await result.current.checkAuthToken();
        });
        const { errorMessage, status, user } = result.current;
        console.log(errorMessage, status, user);
         expect({ errorMessage, status, user }).toEqual({
            status: 'authenticated',
            user: {name:'Luis Carriel',uid:'641f9c3e29d289e1683ea6e7'},
            errorMessage:undefined,
        });

    });


})