export const events = [
    {
        id: '1',
        title: 'Cumpleaños del Jefe',
        notes: 'Hay que comprar el pastel',
        start: new Date('2022-10-21 13:00:00'),
        end: new Date('2022-10-21 15:00:00'),
    },
    {
        id: '2',
        title: 'Cumpleaños del Mellisa',
        notes: 'Alguna nota',
        start: new Date('2022-11-09 13:00:00'),
        end: new Date('2022-11-09 15:00:00'),
    },
]

export const initialState = {
    isLoadingEvents: true,
    events: [],
    activeEvent: null
}


export const calendarWithEventsState = {
    isLoadingEvents: false,
    events: [...events],
    activeEvent: null
}

export const calendarWithActiveEventState = {
    isLoadingEvents: false,
    events: [...events],
    activeEvent: { ...events[0] }
}


