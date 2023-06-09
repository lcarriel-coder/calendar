import { onLogout } from "../../../src/store/auth/authSlice";
import { calendarSlice, onAddNewEvent, onDeleteEvent, onLoadingEvents, onLogoutCalendar, onSetActiveEvent, onUpdateEvent } from "../../../src/store/calendar/calendarSlice";
import { calendarWithActiveEventState, calendarWithEventsState, events, initialState } from "../../fixtures/calendarStates";

describe('Pruebas en calendarSlice', () => {

    test('debe de regresar el estado por defecto', () => {

        expect(calendarSlice.getInitialState()).toEqual(initialState);

    });

    test('onsetActiveEvent deve de activar el evento', () => {

        const state = calendarSlice.reducer(calendarWithActiveEventState, onSetActiveEvent(events[0]));
        expect(state.activeEvent).toEqual(events[0]);

    });

    test('onAddNewEvent debe de agregar el evento', () => {

        const newEvent = [
            {
                id: '3',
                title: 'Cumpleaños de Luis',
                notes: 'Alguna nota',
                start: new Date('2022-10-21 13:00:00'),
                end: new Date('2022-10-21 15:00:00'),
            },
        ]

        const state = calendarSlice.reducer(calendarWithEventsState, onAddNewEvent(newEvent));
        expect(state.events).toEqual([...events, newEvent]);

    });


    test('onAddNewEvent debe de actualizar el evento', () => {

        const updatedEvent = {
            id: '1',
            start: new Date('2022-10-21 13:00:00'),
            end: new Date('2022-10-21 15:00:00'),
            title: 'Cumpleaños de Barcelona',
            notes: 'Alguna nota de barcelona',
        };
        

        const state = calendarSlice.reducer(calendarWithEventsState, onUpdateEvent(updatedEvent));
        
        expect(state.events).toContain(updatedEvent);

    });

  
    test('onDeleteEvent debe de borrar el evento activo', () => {

       const state = calendarSlice.reducer( calendarWithActiveEventState , onDeleteEvent());
       expect( state.activeEvent ).toBe(null);
       expect( state.events ).not.toContain(events[0]);
    });

    test('onLoadEvents debe de establecer los eventos', () => {

        const state = calendarSlice.reducer( initialState , onLoadingEvents( events));
        expect( state.isLoadingEvents ).toBeFalsy();
        expect( state.events ).toEqual( events );

        const newstate = calendarSlice.reducer( state , onLoadingEvents());
        expect( state.events.length ).toBe(events.length);

       

    });


    test('onLogoutCalendar debe de limpiar el estado', () => {

        const state = calendarSlice.reducer( calendarWithActiveEventState , onLogoutCalendar());
        expect( state ).toEqual(initialState);

    });




});