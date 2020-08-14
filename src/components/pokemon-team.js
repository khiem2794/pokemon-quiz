import React, { useContext } from "react"
import { makeStyles } from "@material-ui/core"
import PokemonCard from "../components/pokemon-card"
import { PokemonContext } from "../context/context"
import { Grid, Grow } from "@material-ui/core"
import CheckIcon from "@material-ui/icons/Check"
import CloseIcon from "@material-ui/icons/Close"
const useStyles = makeStyles(theme => ({
  icon: {
    position: "absolute",
    zIndex: 1,
    fontSize: 50,
  },
}))

export default function PokemonTeam({
  onPokemonClick,
  answers,
  correctAnswers,
  revealAnswer,
  nextQuiz,
}) {
  const classes = useStyles()
  const {
    pokemonState: { team },
  } = useContext(PokemonContext)
  return (
    <div>
      <Grid container>
        {team.map(pokemon => {
          return (
            <Grid item xs={6} xm={4} md={4} lg={2} xl={2} key={pokemon.id}>
              <Grid container justify="center" spacing={2}>
                <Grid item onClick={e => onPokemonClick(pokemon)}>
                  <div>
                    {correctAnswers && revealAnswer && (
                      <Grow
                        in={revealAnswer}
                        onEntered={() => {}}
                        onExited={() => {}}
                        className={classes.icon}
                      >
                        {correctAnswers
                          .map(p => p.index)
                          .includes(pokemon.index) ? (
                          <CheckIcon style={{ color: "green" }} />
                        ) : (
                          <CloseIcon style={{ color: "red" }} />
                        )}
                      </Grow>
                    )}
                    <PokemonCard
                      pokemonData={{ ...pokemon }}
                      isSelected={
                        answers !== undefined && answers.includes(pokemon.index)
                      }
                    />
                  </div>
                </Grid>
              </Grid>
            </Grid>
          )
        })}
      </Grid>
    </div>
  )
}
