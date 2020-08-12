import axios from "axios"
import Axios from "axios"

const updatedTeamWithMoves = async team => {
  const updatedTeam = await Promise.all(
    team.map(async pokemon => {
      return await axios
        .get("https://pokeapi.co/api/v2/pokemon/" + pokemon.index)
        .then(res => {
          return {
            ...pokemon,
            moves: res.data.moves.map(m => {
              return {
                name: m.move.name,
                url: m.move.url,
                index: parseInt(
                  new URL(m.move.url).pathname
                    .split("/")
                    .filter(e => e !== "")
                    .pop()
                ),
              }
            }),
          }
        })
        .catch(err => console.error(err))
    })
  )
  return updatedTeam
}

const getMoveList = async () => {
  return await Axios.get("https://pokeapi.co/api/v2/move?offset=0&limit=690")
    .then(res => {
      return res.data.results.map(m => {
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
      })
    })
    .catch(err => console.error(err))
}

const getMoveData = async id => {
  return await Axios.get("https://pokeapi.co/api/v2/move/" + id)
    .then(res => {
      return {
        index: res.data.id,
        power: res.data.power ?? 0,
        pp: res.data.pp,
        type: res.data.type.name,
        flavorText: res.data.flavor_text_entries
          .filter(fl => fl.language.name === "en")
          .pop().flavor_text,
        name: res.data.names.filter(n => n.language.name === "en").pop().name,
      }
    })
    .catch(err => console.error(err))
}

export const generateQuiz = async (team, n1, n2) => {
  const apiMoveList = await getMoveList()
  const updatedTeam = await updatedTeamWithMoves(team)

  const teamMoveList = (() => {
    let tml = []
    updatedTeam.forEach(pokemon => {
      tml = [...tml, ...pokemon.moves]
    })
    const indexArr = tml.map(m => m.index)
    return tml.filter((m, index) => indexArr.indexOf(m.index) === index)
  })()

  var randomMovesFromTeam = (n => {
    const randomIndexList = new Set()
    while (randomIndexList.size !== n) {
      randomIndexList.add(Math.floor(Math.random() * teamMoveList.length))
    }
    return Array.from(randomIndexList).map(i => teamMoveList[i])
  })(n1)

  var randomMovesFromApi = (n => {
    const randomIndexList = new Set()
    const excludeList = randomMovesFromTeam.map(m => m.index)
    while (randomIndexList.size !== n) {
      const randomIndex = Math.floor(Math.random() * apiMoveList.length)
      if (!excludeList.includes(randomIndex)) randomIndexList.add(randomIndex)
    }
    return Array.from(randomIndexList).map(i => apiMoveList[i])
  })(n2)

  var quizList = await Promise.all(
    [...randomMovesFromTeam, ...randomMovesFromApi].map(async m => {
      const moveData = await getMoveData(m.index)
      const answer = updatedTeam.filter(
        pokemon =>
          pokemon.moves.findIndex(move => move.index === moveData.index) !== -1
      )
      return {
        move: moveData,
        answer: answer,
      }
    })
  )
  return quizList
}
