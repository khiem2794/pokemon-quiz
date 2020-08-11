import React from "react"

export default function SelectPokemonBox({ pokemonData }) {
  return (
    <div>
      <img src={pokemonData.sprite} alt={pokemonData.name} />
    </div>
  )
}
