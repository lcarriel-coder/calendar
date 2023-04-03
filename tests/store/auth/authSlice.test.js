import { AuthSlice, clearErrorMessage, onLogin, onLogout } from "../../../src/store/auth/authSlice";
import { authenticatedState, initialState } from "../../fixtures/authStates";
import { testUserCredentials } from "../../fixtures/testUser";


describe('Pruebas en authSlice', () => {

    test('debe de regresar el estado inicial', () => {

        expect(AuthSlice.getInitialState()).toEqual(initialState);
    });

    test('debe de realizar unu login', () => {

        const state = AuthSlice.reducer(initialState, onLogin(testUserCredentials));
        expect(state).toEqual({
            status: 'authenticated',
            user: testUserCredentials,
            errorMessage: undefined
        })

    });

    test('debe de realizar el logout', () => {

        const state = AuthSlice.reducer(authenticatedState, onLogout());
        expect(state).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage: undefined
        })

    });

    test('debe de realizar el logout con error mensaje', () => {
        const errorMessage = 'Credenciales no válidas';
        const state = AuthSlice.reducer(authenticatedState, onLogout(errorMessage));
        expect(state).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage
        })

    });


    test('debe de limpiar el mensaje de error', () => {
        const errorMessage = 'Credenciales no válidas';
        const state = AuthSlice.reducer(authenticatedState, onLogout(errorMessage));

        const newState = AuthSlice.reducer(state, clearErrorMessage());

        expect(newState.errorMessage).toBe(undefined);

    });


})