const Axios = require("axios")

const MAX_REQUESTS_COUNT = 10
const INTERVAL_MS = 10
let PENDING_REQUESTS = 0

const api = Axios.create({})

api.interceptors.request.use(function (config) {
  return new Promise((resolve, reject) => {
    let interval = setInterval(() => {
      if (PENDING_REQUESTS < MAX_REQUESTS_COUNT) {
        PENDING_REQUESTS++
        clearInterval(interval)
        resolve(config)
      }
    }, INTERVAL_MS)
  })
})

api.interceptors.response.use(
  function (response) {
    PENDING_REQUESTS = Math.max(0, PENDING_REQUESTS - 1)
    return Promise.resolve(response)
  },
  function (error) {
    PENDING_REQUESTS = Math.max(0, PENDING_REQUESTS - 1)
    return Promise.reject(error)
  }
)

class Client {
  get(url) {
    return Axios(url)
  }
}

const client = new Client()

const getGenerations = () => {
  return api
    .get("https://pokeapi.co/api/v2/generation/")
    .then(res => {
      return res.data.results
    })
    .catch(err => console.error(err))
}

const getGenSpecies = genURL => {
  return api
    .get(genURL)
    .then(res => {
      const pokemon_species = res.data.pokemon_species
      return pokemon_species
    })
    .catch(err => console.error(err))
}

const getPokemonData = url => {
  return api
    .get(url)
    .then(res => {
      const data = {
        id: res.data.id,
        name: res.data.name,
        sprite: res.data.sprites.front_default,
        types: res.data.types,
      }
      return data
    })
    .catch(err => console.error(err))
}

exports.sourceNodes = async ({
  actions: { createNode },
  createNodeId,
  createContentDigest,
}) => {
  const gens = await getGenerations()

  const pokemonSpecies = await Promise.all(
    gens.map(async gen => {
      const species = await getGenSpecies(gen.url)
      return { generation: gen.name, species: species }
    })
  )
  const gensData = await Promise.all(
    pokemonSpecies.map(async p => {
      const data = await Promise.all(
        p.species.map(async s => {
          return await getPokemonData(
            s.url.replace("pokemon-species", "pokemon")
          )
        })
      )
      return { generation: p.generation, pokemonData: data }
    })
  )

  // var gensData = require("./temp.js").data  //use this for faster start

  return gensData.map(gen => {
    createNode({
      ...gen,
      id: createNodeId(gen.generation),
      internal: {
        type: `Pokemon`,
        contentDigest: createContentDigest(gen),
      },
    })
  })
}
