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

const getGenSpeciesAndMoves = genURL => {
  return api
    .get(genURL)
    .then(res => {
      return {
        species: res.data.pokemon_species,
        moves: res.data.moves,
      }
    })
    .catch(err => console.error(err))
}

const getPokemonData = url => {
  return api
    .get(url)
    .then(res => {
      const data = {
        index: res.data.id,
        name: res.data.name,
        sprite: { url: res.data.sprites.front_default },
        sprite2: {
          url:
            "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/" +
            ("00" + res.data.id).slice(-3) +
            ".png",
        },
        types: res.data.types.map(t => t.type.name),
      }
      return data
    })
    .catch(err => console.error(err))
}

const fetch = async () => {
  const gens = await getGenerations()
  console.log("Get generation finished")
  const pokemonSpecies = await Promise.all(
    gens.map(async gen => {
      const { species, moves } = await getGenSpeciesAndMoves(gen.url)
      return {
        generation: gen.name,
        species: species,
        moves: moves.map(m => {
          return {
            name: m.name,
            url: m.url,
            index: parseInt(
              new URL(m.url).pathname
                .split("/")
                .filter(e => e !== "")
                .pop()
            ),
          }
        }),
      }
    })
  )
  console.log("Get species finished")
  const gensData = await Promise.all(
    pokemonSpecies.map(async (p, key) => {
      const data = await Promise.all(
        p.species.map(async s => {
          return await getPokemonData(
            s.url.replace("pokemon-species", "pokemon")
          )
        })
      )
      console.log("Get move data " + p.generation + " finished")
      return {
        generation: p.generation,
        index: key + 1,
        pokemonData: data,
        moves: p.moves,
      }
    })
  )
  console.log("Begin writing data")
  var fs = require("fs")

  fs.writeFileSync("./data.js", "exports.data = " + JSON.stringify(gensData), {
    encoding: "utf-8",
    flag: "w",
  })
  return Promise.resolve(gensData)
}

fetch().then(res => console.log("Process finished"))
