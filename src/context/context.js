import React, { useReducer } from "react"

const initialState = {
  team: [],
  player: null,
}

export const PokemonContext = React.createContext(initialState)

const REGISTER_PLAYER = "REGISTER_PLAYER"
const ADD_POKEMON = "ADD_POKEMON"
const REMOVE_POKEMON = "REMOVE_POKEMON"
const START_QUIZ = "START_QUIZ"
const RESET_STATE = "RESET_STATE"

const reducer = (state, action) => {
  if (action.type === REGISTER_PLAYER) {
    return { ...state, player: action.payload.playerData }
  }

  if (action.type === ADD_POKEMON) {
    return { ...state, team: [...state.team, action.payload.pokemonData] }
  }

  if (action.type === REMOVE_POKEMON) {
    return {
      ...state,
      team: state.team.filter(
        data => data.index !== action.payload.pokemonData.index
      ),
    }
  }

  if (action.type === START_QUIZ) {
    return { ...state }
  }
  if (action.type === RESET_STATE) {
    return initialState
  }
}

const PokemonContextProvider = ({ children }) => {
  const [pokemonState, dispatch] = useReducer(reducer, initialState)

  const registerPlayer = playerData => {
    dispatch({
      type: REGISTER_PLAYER,
      payload: {
        playerData: playerData,
      },
    })
  }

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

  const startQuiz = () => {
    dispatch({
      type: START_QUIZ,
      payload: {},
    })
  }

  const resetState = () => {
    dispatch({
      type: RESET_STATE,
      payload: {},
    })
  }

  const value = {
    pokemonState,
    addPokemon,
    removePokemon,
    registerPlayer,
    startQuiz,
    resetState,
  }
  return (
    <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>
  )
}

export default PokemonContextProvider
