import React from "react"
import PropTypes from "prop-types"
import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Box from "@material-ui/core/Box"
import { Grid } from "@material-ui/core"
import ResponsiveGenerationPokemonList from "./responsive-generation-pokemon-list"

function GenerationPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box p={1}>{children}</Box>}
    </div>
  )
}

GenerationPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

export default function GenerationsTabs({ generations }) {
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
          >
            {generations.map((gen, key) => {
              return <Tab label={"GEN " + (key + 1)} key={key} />
            })}
          </Tabs>
        </AppBar>
      </Grid>
      <Grid item xs={12} style={{ border: "1px solid blue" }}>
        {generations.map((gen, key) => {
          return (
            <GenerationPanel value={value} index={key} key={key}>
              <ResponsiveGenerationPokemonList generation={gen} />
            </GenerationPanel>
          )
        })}
      </Grid>
    </Grid>
  )
}
