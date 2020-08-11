import React, { useReducer } from "react"

export const PokemonContext = React.createContext(initialState)

const initialState = {
  team: [],
  player: null,
}

const ADD_POKEMON = "ADD_POKEMON"
const REMOVE_POKEMON = "REMOVE_POKEMON"
const reducer = (state, action) => {
  if (action.type === ADD_POKEMON) {
    return { ...state, team: state.team.concat(action.payload.pokemonData) }
  }
  if (action.type === REMOVE_POKEMON) {
    return {
      ...state,
      team: state.team.filter(
        data => data.index !== action.payload.pokemonData.index
      ),
    }
  }
}

const PokemonContextProvider = ({ children }) => {
  const [pokemonState, dispatch] = useReducer(reducer, initialState)

  const addPokemon = pokemonData => {
    dispatch({
      type: ADD_POKEMON,
      payload: {
        pokemonData: pokemonData,
      },
    })
  }
  const removePokemon = pokemonData => {
    dispatch({
      type: REMOVE_POKEMON,
      payload: {
        pokemonData: pokemonData,
      },
    })
  }
  const value = { pokemonState, addPokemon, removePokemon }
  return (
    <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>
  )
}

export default PokemonContextProvider
