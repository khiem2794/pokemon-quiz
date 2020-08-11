import React from "react"
import PropTypes from "prop-types"
import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Box from "@material-ui/core/Box"
import GenerationPokemonList from "../components/generation-pokemon-list"
import { Grid } from "@material-ui/core"

function GenerationPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  )
}

GenerationPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  }
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
            aria-label="simple tabs example"
          >
            {generations.map((gen, key) => {
              return (
                <Tab label={gen.generation} {...a11yProps(key)} key={key} />
              )
            })}
          </Tabs>
        </AppBar>
      </Grid>
      <Grid item xs={12}>
        {generations.map((gen, key) => {
          return (
            <GenerationPanel value={value} index={key} key={key}>
              <GenerationPokemonList generation={gen} />
            </GenerationPanel>
          )
        })}
      </Grid>
    </Grid>
  )
}
