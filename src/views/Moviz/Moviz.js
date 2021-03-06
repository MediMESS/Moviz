import React, { Component } from "react";
import { IconButton, Grid, Typography } from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import LinearProgress from "@material-ui/core/LinearProgress";
import "common/Signed.css";
import { MovizCard } from "components";
import { SearchToolbar } from "components";
import { data } from "./data";
import { withStyles } from "@material-ui/core/styles";

const useStyles = theme => ({
  root: {
    padding: theme.spacing(3),
    paddingTop: theme.spacing(1)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  pagination: {
    marginTop: theme.spacing(3),
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  paper: {
    transition: ".2s transform",
    "&:hover": {
      cursor: "pointer",
      transform: "scale(1.06)"
    }
  },
  loading: {
    color: theme.palette.primary.main
  }
});

const options = ["GENRE", "movie", "tvSeries"];

class Moviz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: "",
      movies: data,
      genre: "GENRE",
      errorGenre: false,
      completed: true
    };
  }
  updateGenre = value => {
    this.setState({ genre: value });
    if (value != "GENRE") this.setState({ errorGenre: false });
  };
  // Teach Autosuggest how to calculate suggestions for any given input value.
  getSuggestions = value => {
    if (value === "") {
      this.setState({ movies: data });
      return data;
    }
    // fetch('https://moviz-backend.herokuapp.com/', {
    //   method: 'post',
    //   headers: {'Content-Type':'application/json'},
    //   body: JSON.stringify({
    //     input: value
    //   })
    // })
    //   .then(prom => prom.json())
    //   .then(data => {
    //     console.log(data);
    //     this.setState({products: data});
    //   });

    // this.setState({
    //   products: data.filter(d=>{
    //     return d.title.toLowerCase().includes(value)
    //   })
    // });
    // return this.state.products
    return data.filter(d => {
      return d.title.toLowerCase().includes(value.toLowerCase());
    });
  };

  onSubmit = input => {
    if (input === "") {
      return;
    }
    if (this.state.genre === "GENRE") {
      this.setState({ errorGenre: true });
      return;
    }
    this.setState({ completed: false });
    fetch("https://moviz-backend.herokuapp.com/searchMoviz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: input,
        genre: this.state.genre
      })
    })
      .then(prom => prom.json())
      .then(movies => {
        if (movies) {
          this.setState({
            movies: movies,
            completed: true
          });
        } else {
          this.setState({
            movies: []
          });
        }
      });
  };

  render() {
    const { classes } = this.props;
    console.log(this.props);
    // console.log("THIS PROPS", this.props);
    return (
      <div className={classes.root}>
        <SearchToolbar
          getSuggestions={this.getSuggestions}
          options={options}
          onSubmit={this.onSubmit}
          genre={this.state.genre}
          updateGenre={this.updateGenre}
          errorGenre={this.state.errorGenre}
        />

        <div className={classes.content}>
          {!this.state.completed ? (
            <div style={{ marginBottom: "10px" }}>
              <Typography variant="h3" className={classes.loading}>
                Loading Movies...
              </Typography>
              <LinearProgress />
            </div>
          ) : (
            <></>
          )}
          <Grid container spacing={3}>
            {this.state.movies.map(movie => (
              <Grid
                item
                key={movie.id}
                lg={4}
                md={4}
                sm={6}
                xs={12}
                className={classes.paper}
              >
                <MovizCard movie={movie} user={this.props.user} />
              </Grid>
            ))}
          </Grid>
        </div>
        <div className={classes.pagination}>
          <Typography variant="caption">1-6 of 20</Typography>
          <IconButton>
            <ChevronLeftIcon />
          </IconButton>
          <IconButton>
            <ChevronRightIcon />
          </IconButton>
        </div>
      </div>
    );
  }
}

export default withStyles(useStyles)(Moviz);
