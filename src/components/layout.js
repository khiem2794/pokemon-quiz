import React from "react"
import PropTypes from "prop-types"
import Grid from "@material-ui/core/Grid"

const Layout = ({ children }) => {
  return (
    <div>
      <Grid
        container
        style={{
          padding: "24px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid
          item
          xs={12}
          style={{
            padding: "24px",
            textAlign: "center",
          }}
        ></Grid>
        {children}
      </Grid>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
