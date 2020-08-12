import React, { useEffect, useContext, useState } from "react"
import { generateQuiz } from "../helper/quiz"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PokemonTeam from "../components/pokemon-team"
import { Grid } from "@material-ui/core"
import { PokemonContext } from "../context/context"

const MoveQuiz = () => {
  const {
    pokemonState: { team },
  } = useContext(PokemonContext)
  const [quizList, setQuizList] = useState([])

  useEffect(() => {
    const fetchQuiz = async () => {
      const quizList = await generateQuiz(team, 5, 7)
      setQuizList(quizList)
    }
    fetchQuiz()
  }, [])

  return (
    <Layout>
      <SEO title="Move quiz" />
      <Grid item xs={12} style={{ textAlign: "center" }}>
        QUESTION 1/12
      </Grid>
      <Grid item xs={12}>
        <PokemonTeam />
      </Grid>
    </Layout>
  )
}

export default MoveQuiz
