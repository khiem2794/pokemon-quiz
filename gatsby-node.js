exports.sourceNodes = async ({
  actions: { createNode },
  createNodeId,
  createContentDigest,
}) => {
  var gensData = require("./data.js").data

  gensData.map(gen => {
    gen.pokemonData.map(pokemon => {
      createNode({
        ...pokemon,
        id: createNodeId(pokemon.name),
        internal: {
          type: `Pokemon`,
          contentDigest: createContentDigest(pokemon),
        },
      })
    })
  })

  return gensData.map(gen => {
    const genNodeId = createNodeId(gen.generation)

    createNode({
      generation: gen.generation,
      id: genNodeId,
      index: gen.index,
      moves: gen.moves,
      children: gen.pokemonData.map(pokemon => {
        const pkmNodeId = createNodeId(pokemon.name)
        createNode({
          id: createNodeId(pokemon.name),
          parent: genNodeId,
          ...pokemon,
          internal: {
            type: `Pokemon`,
            contentDigest: createContentDigest(pokemon),
          },
        })
        return pkmNodeId
      }),
      internal: {
        type: `Generation`,
        contentDigest: createContentDigest(gen),
      },
    })
  })
}
