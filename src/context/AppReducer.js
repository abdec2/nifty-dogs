export const AppReducer = (state, action) => {
    switch(action.type) {
        case 'DELETE_ACCOUNT':
            return {
                ...state,
                account: null
            }
        case 'ADD_ACCOUNT':
            return {
                ...state,
                account: action.payload
            }

        case 'ADD_NETWORK':
            return {
                ...state,
                network: action.payload
            }

        case 'DELETE_NETWORK':
        return {
            ...state,
            network: null
        }
        case 'ADD_CONTRACT':
            return {
                ...state,
                web3: {
                    ...state.web3,
                    contract: action.payload
                }
            }

        case 'DELETE_CONTRACT':
        return {
            ...state,
            web3: {
                ...state.web3,
                contract: null
            }
        }

        case 'ADD_PROVIDER':
            return {
                ...state,
                web3: {
                    ...state.web3,
                    provider: action.payload
                }
            }

        case 'DELETE_PROVIDER':
        return {
            ...state,
            web3: {
                ...state.web3,
                provider: null
            }
        }
        default:
            return state;
    };
}