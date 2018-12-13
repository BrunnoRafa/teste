export default function brands(state = [], action) {
    switch (action.type) {
        case 'ADD_BRANDS':
                return [
                        ...state, { 
                        id: action.payload.id,
                        name: action.payload.name 
                    }
                ]
        break;    
        default:
            return state;
            break;
    }
}