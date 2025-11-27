import { useReducer } from "react";

export type Todo = {
    id: number;
    text: string;
    done: boolean;
}

type Action = 
    | { type: 'ADD'; payload: Todo; }
    | { type: 'TOGGLE'; payload: number; }

const initialState: Todo[] = []

function reducer(state: Todo[], action: Action): Todo[]{
    switch (action.type) {
        case "ADD":
            return [action.payload, ...state]
        case "TOGGLE":
            return state.map((t) => (t.id === action.payload ? {...t, done: !t.done} : t))
        default:
            return state;
    }
}

export const useTodos = () => {
    const [state, dispatch] = useReducer(reducer, initialState)

    function handleAdd(input: string) {
        const todo: Todo = { id: Date.now(), text: input.trim(), done: false }
        dispatch({ type: 'ADD', payload: todo })
    }

    function handleToggle(index: number) {
        dispatch({type: 'TOGGLE', payload: index})
    }

    return {
        state,
        handleAdd,
        handleToggle
    }
}
