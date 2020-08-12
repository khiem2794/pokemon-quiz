import React, { useEffect, useContext, useState } from "react"
import { generateQuiz } from "../helper/quiz"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PokemonTeam from "../components/pokemon-team"
import { Grid, CircularProgress, Button } from "@material-ui/core"
import { PokemonContext } from "../context/context"
import PokemonMoveCard from "../components/pokemon-move-card"
import { navigate } from "gatsby"

const GENERATE_QUIZ = "GENERATE_QUIZ"
const START_QUIZ = "START_QUIZ"
const END_QUIZ = "END_QUIZ"

const MoveQuiz = () => {
  const {
    pokemonState: { team },
  } = useContext(PokemonContext)
  const [quizState, setQuizState] = useState({
    state: GENERATE_QUIZ,
    quizIndex: 0,
    score: 0,
    answers: [],
    fetchSwitch: 0,
  })
  const [quizList, setQuizList] = useState([])
  useEffect(() => {
    const fetchQuiz = async () => {
      const quizList = await generateQuiz(team, 5, 7)
      setQuizList(quizList)
    }
    fetchQuiz().then(res => setQuizState({ ...quizState, state: START_QUIZ }))
  }, [quizState.fetchSwitch])

  const pickPokemon = pokemon => {
    if (quizState.state === START_QUIZ) {
      if (!quizState.answers.map(p => p.index).includes(pokemon.index)) {
        setQuizState({ ...quizState, answers: [...quizState.answers, pokemon] })
      } else {
        setQuizState({
          ...quizState,
          answers: quizState.answers.filter(p => p.index !== pokemon.index),
        })
      }
    }
  }

  const retry = () => {
    setQuizState({
      state: GENERATE_QUIZ,
      quizIndex: 0,
      score: 0,
      answers: [],
      fetchSwitch: quizState.fetchSwitch + 1,
    })
  }

  const pickNewTeam = () => {
    navigate("/select-team")
  }

  const submitAnswer = () => {
    if (quizState.state === START_QUIZ) {
      let result = true
      const answers = quizList[quizState.quizIndex].answers.map(p => p.index)
      if (answers.length === quizState.answers.length) {
        for (let i = 0; i < quizState.answers.length; i++) {
          if (!answers.includes(quizState.answers[i].index)) {
            result = false
            break
          }
        }
      } else {
        result = false
      }
      let newScore = quizState.score
      if (result) {
        newScore++
      }
      if (quizState.quizIndex + 1 < quizList.length) {
        setQuizState({
          ...quizState,
          state: START_QUIZ,
          quizIndex: quizState.quizIndex + 1,
          score: newScore,
          answers: [],
        })
      } else {
        setQuizState({
          ...quizState,
          state: END_QUIZ,
          quizIndex: 0,
          score: newScore,
          answers: [],
        })
      }
    }
  }
  return (
    <Layout>
      <SEO title="Move quiz" />

      {quizState.state === GENERATE_QUIZ && (
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <CircularProgress /> GENERATING QUIZ
        </Grid>
      )}
      {quizState.state === START_QUIZ && (
        <Grid item xs={12} style={{ textAlign: "center" }}>
          SCORE: {quizState.score}
          <br />
          QUESTION {quizState.quizIndex + 1}/{quizList.length} <br />
          WHICH POKEMONS CAN LEARN THIS MOVE
          <PokemonMoveCard moveData={quizList[quizState.quizIndex].move} />
        </Grid>
      )}
      {quizState.state === END_QUIZ && (
        <Grid item xs={12} style={{ textAlign: "center" }}>
          FINAL SCORE: {quizState.score}
        </Grid>
      )}
      <Grid item xs={12}>
        <PokemonTeam
          onPokemonClick={pickPokemon}
          answers={quizState.answers.map(e => e.index)}
        />
        {quizState.state === START_QUIZ && (
          <Button
            variant="contained"
            color="primary"
            onClick={e => submitAnswer()}
          >
            ANSWER
          </Button>
        )}
        {quizState.state === END_QUIZ && (
          <div>
            <Button variant="contained" color="primary" onClick={e => retry()}>
              RETRY WITH CURRENT TEAM
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={e => pickNewTeam()}
            >
              SELECT NEW TEAM
            </Button>
          </div>
        )}
      </Grid>
    </Layout>
  )
}

export default MoveQuiz
