import React, { useEffect, useContext, useState } from "react"
import { navigate } from "gatsby"
import { generateQuiz } from "../helper/quiz"

import {
  Grid,
  CircularProgress,
  Button,
  Typography,
  Popper,
} from "@material-ui/core"
import { PokemonContext } from "../context/context"
import PokemonMoveCard from "../components/pokemon-move-card"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PokemonTeam from "../components/pokemon-team"

const GENERATE_QUIZ = "GENERATE_QUIZ"
const START_QUIZ = "START_QUIZ"
const REVEAL_ANSWER = "REVEAL_ANSWER"
const END_QUIZ = "END_QUIZ"
const n1 = 7
const n2 = 8

const MoveQuiz = () => {
  const {
    pokemonState: { team },
  } = useContext(PokemonContext)
  const [anchorEl, setAnchorEl] = useState(null)
  const [resultText, setResultText] = useState("")
  const [quizState, setQuizState] = useState({
    state: GENERATE_QUIZ,
    quizIndex: 0,
    score: 0,
    answers: [],
    fetchSwitch: 0,
  })
  const [quizList, setQuizList] = useState([])
  useEffect(() => {
    if (team.length > 0) {
      const fetchQuiz = async () => {
        const quizList = await generateQuiz(team, n1, n2)
        setQuizList(quizList)
      }
      fetchQuiz().then(res => setQuizState({ ...quizState, state: START_QUIZ }))
    } else {
      navigate("/")
    }
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

  const submitAnswer = e => {
    if (quizState.state === START_QUIZ) {
      let result = true
      let resultText = "Wrong!"
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
        resultText = "Correct!"
      }
      setQuizState({
        ...quizState,
        state: REVEAL_ANSWER,
        score: newScore,
      })
      setAnchorEl(e.currentTarget)
      setResultText(resultText)
    }
  }

  const nextQuiz = () => {
    if (quizState.state === REVEAL_ANSWER) {
      if (quizState.quizIndex + 1 < quizList.length) {
        setQuizState({
          ...quizState,
          state: START_QUIZ,
          quizIndex: quizState.quizIndex + 1,
          answers: [],
        })
      } else {
        setQuizState({
          ...quizState,
          state: END_QUIZ,
          quizIndex: 0,
          answers: [],
        })
      }
      setAnchorEl(null)
    }
  }

  return (
    <Layout>
      <SEO title="Move quiz" />

      <Grid item xs={12} md={8} lg={8} xl={8} style={{ textAlign: "center" }}>
        {quizState.state === GENERATE_QUIZ && (
          <div>
            <CircularProgress />
            <br />
            GENERATING QUIZ
          </div>
        )}

        {(quizState.state === START_QUIZ ||
          quizState.state === REVEAL_ANSWER) && (
          <div>
            <Typography variant="h5" component="h5">
              CURRENT SCORE: {quizState.score}
            </Typography>
            <h3>
              QUESTION{" "}
              <span style={{ color: "red", fontSize: 25 }}>
                {quizState.quizIndex + 1}
              </span>
              /{quizList.length}
              <br></br>
              WHICH OF YOUR POKEMONS CAN LEARN THIS MOVE
            </h3>
            <PokemonMoveCard moveData={quizList[quizState.quizIndex].move} />
          </div>
        )}

        {quizState.state === END_QUIZ && (
          <Typography variant="h5" component="h5">
            FINAL SCORE: {quizState.score}
          </Typography>
        )}
      </Grid>

      <Grid item xs={12} md={10} lg={9} xl={8}>
        <h2>
          Your pokemons<br></br>
        </h2>
        <PokemonTeam
          onPokemonClick={pickPokemon}
          answers={quizState.answers.map(e => e.index)}
          correctAnswers={
            quizState.state === START_QUIZ || quizState.state === REVEAL_ANSWER
              ? quizList[quizState.quizIndex].answers
              : []
          }
          revealAnswer={quizState.state === REVEAL_ANSWER}
          nextQuiz={() => nextQuiz()}
        />
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          style={{ paddingTop: 25 }}
        >
          {(quizState.state === START_QUIZ ||
            quizState.state === REVEAL_ANSWER) && (
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item xs={6} sm={4} style={{ textAlign: "center" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={e => submitAnswer(e)}
                  disabled={quizState.state === REVEAL_ANSWER}
                >
                  ANSWER
                </Button>
              </Grid>
              <Grid item xs={6} sm={4} style={{ textAlign: "center" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={e => nextQuiz()}
                  disabled={quizState.state !== REVEAL_ANSWER}
                  style={{ paddingLeft: 30, paddingRight: 30 }}
                >
                  NEXT
                </Button>
              </Grid>
            </Grid>
          )}
          {quizState.state === END_QUIZ && (
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item xs={6} sm={4} style={{ textAlign: "center" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={e => retry()}
                >
                  RETRY
                </Button>
              </Grid>
              <Grid item xs={6} sm={4} style={{ textAlign: "center" }}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={e => pickNewTeam()}
                >
                  NEW TEAM
                </Button>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Popper open={Boolean(anchorEl)} anchorEl={anchorEl}>
        <Typography>{resultText}</Typography>
      </Popper>
    </Layout>
  )
}

export default MoveQuiz
