import React, { useEffect, useContext, useState } from "react"
import { navigate, graphql } from "gatsby"
import { generateQuiz } from "../helper/quiz"

import {
  Grid,
  CircularProgress,
  Button,
  Typography,
  Popper,
  Card,
  List,
  ListItem,
  ListItemText,
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

const MoveQuiz = ({ data }) => {
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
        const quizList = await generateQuiz(
          team,
          data.site.siteMetadata.n1Question,
          data.site.siteMetadata.n2Question
        )
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
      quizList[quizState.quizIndex].result = result
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

      <Grid
        item
        xs={12}
        md={9}
        lg={8}
        xl={8}
        style={{ textAlign: "center", paddingTop: 25 }}
      >
        {quizState.state === GENERATE_QUIZ && (
          <div>
            <CircularProgress />
            <Typography>
              <br />
              GENERATING QUIZ
            </Typography>
          </div>
        )}

        {(quizState.state === START_QUIZ ||
          quizState.state === REVEAL_ANSWER) && (
          <div>
            <Typography variant="h4">
              CURRENT SCORE: {quizState.score}
            </Typography>
            <Typography
              variant="h5"
              style={{ textAlign: "center", paddingTop: 25 }}
            >
              QUESTION{" "}
              <span style={{ color: "red" }}>{quizState.quizIndex + 1}</span>/
              {quizList.length}
            </Typography>
            <Typography
              variant="h5"
              style={{ textAlign: "center", paddingTop: 15 }}
            >
              WHICH OF YOUR POKEMONS CAN LEARN THIS MOVE
            </Typography>
            <PokemonMoveCard moveData={quizList[quizState.quizIndex].move} />
          </div>
        )}

        {quizState.state === END_QUIZ && (
          <div>
            <Typography
              variant="h3"
              style={{ textAlign: "center", paddingTop: 25 }}
            >
              FINAL SCORE:{" "}
              <span style={{ color: "green" }}>{quizState.score}</span>
            </Typography>
            <Grid container justify="center">
              <Grid item xs={12} sm={10} md={8}>
                <Card elevation={10} variant="outlined" style={{ padding: 15 }}>
                  <Grid container justify="center">
                    <Grid item xs={12}>
                      <Typography variant="h5">RESULT</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <List>
                        {quizList &&
                          quizList.slice(0, quizList.length / 2).map((q, k) => (
                            <ListItem
                              style={{
                                textAlign: "center",
                                padding: 0,
                                color: q.result ? "green" : "red",
                                textDecoration: !q.result && "line-through",
                              }}
                            >
                              <ListItemText primary={q.move.name} />
                            </ListItem>
                          ))}
                      </List>
                    </Grid>
                    <Grid item xs={6}>
                      <List>
                        {quizList &&
                          quizList
                            .slice(quizList.length / 2, quizList.length)
                            .map((q, k) => (
                              <ListItem
                                style={{
                                  textAlign: "center",
                                  padding: 0,
                                  color: q.result ? "green" : "red",
                                  textDecoration: !q.result && "line-through",
                                }}
                              >
                                <ListItemText primary={q.move.name} />
                              </ListItem>
                            ))}
                      </List>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </div>
        )}
      </Grid>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{ paddingTop: 25, paddingBottom: 25 }}
      >
        {(quizState.state === START_QUIZ ||
          quizState.state === REVEAL_ANSWER) && (
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid
              item
              xs={6}
              sm={4}
              style={{ textAlign: "right", paddingRight: 15 }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={e => submitAnswer(e)}
                disabled={quizState.state === REVEAL_ANSWER}
              >
                ANSWER
              </Button>
            </Grid>
            <Grid
              item
              xs={6}
              sm={4}
              style={{ textAlign: "left", paddingLeft: 15 }}
            >
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
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid
              item
              xs={6}
              sm={4}
              style={{ textAlign: "right", paddingRight: 15 }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={e => retry()}
              >
                RETRY
              </Button>
            </Grid>
            <Grid
              item
              xs={6}
              sm={4}
              style={{ textAlign: "left", paddingLeft: 15 }}
            >
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

      <Grid item xs={12} md={10} lg={9} xl={8}>
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
      </Grid>
      <Popper open={Boolean(anchorEl)} anchorEl={anchorEl}>
        <Typography>{resultText}</Typography>
      </Popper>
    </Layout>
  )
}

export const queryN12Question = graphql`
  {
    site {
      siteMetadata {
        n1Question
        n2Question
      }
    }
  }
`

export default MoveQuiz
