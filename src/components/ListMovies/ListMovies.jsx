import React, { useEffect, useState } from "react";
import { urlBase, urlImage, headersConfig } from "../../config/api";
import axios from "axios";
import { Box } from "@mui/system";
import {
  Card,
  CardContent,
  CardMedia,
  Dialog,
  Divider,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ListMovies = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const theme = useTheme();
  const mobileScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const getMovies = async () => {
      try {
        const { data } = await axios.get(
          `${urlBase}/movie/now_playing`,
          headersConfig
        );
        setMovies(data.results);
      } catch (error) {
        console.log(error);
      }
    };
    getMovies();
  }, []);

  const handleSelectedMovie = (idMovie) => {
    const getSelectedMovie = async () => {
      try {
        const { data } = await axios.get(
          `${urlBase}movie/${idMovie}`,
          headersConfig
        );
        setSelectedMovie(data);
      } catch (error) {
        console.log(error);
      }
    };
    getSelectedMovie();
    handleOpen();
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Box sx={{ px: mobileScreen ? 4 : 25, py: 4 }}>
        <Typography variant="h3" color="white">
          PelisUP!
        </Typography>
        <Typography variant="body1" color="white">
          Plataforma para ver peliculas y series
        </Typography>
        <Grid
          container
          spacing={2}
          sx={{
            mt: 4,
            mb: 4,
          }}
        >
          <Grid item xs={12}>
            <Typography variant="h5" color="white">
              En cartelera
            </Typography>
          </Grid>
          {movies.slice(0, 4).map(({ id, title, poster_path }) => (
            <Grid item xs={12} sm={6} md={3} key={id}>
              <Box
                style={{ cursor: "pointer" }}
                onClick={() => handleSelectedMovie(id)}
              >
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    maxWidth: 195,
                    height: 350,
                    p: 1,
                    backgroundColor: "#121257",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={`${urlImage}${poster_path}`}
                    alt={title}
                    sx={{
                      width: "100%",
                      minHeight: "280px",
                      borderRadius: "4px",
                    }}
                  />
                  <CardContent>
                    <Typography variant="body2" color="white">
                      {title}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Dialog open={isOpen}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            {selectedMovie.title}
          </Typography>
          <CloseIcon sx={{ cursor: "pointer" }} onClick={handleClose} />
        </Box>
        <Divider />
        <Card
          sx={{
            display: "flex",
            flexDirection: "row",
            p: "10px",
          }}
        >
          <CardMedia
            component="img"
            image={`${urlImage}${selectedMovie.poster_path}`}
            alt={selectedMovie.title}
            sx={{ width: mobileScreen ? "100%" : "50%" }}
          />
          <CardContent>
            <Typography variant="body2" display="inline" fontWeight="bold">
              {selectedMovie.title}
            </Typography>
            <Typography variant="body2" sx={{ mt: "10px" }}>
              <Box component="span" fontWeight="bold">
                Titulo Original:{" "}
              </Box>
              {selectedMovie.original_title}
            </Typography>
            <Typography variant="body2" sx={{ mt: "10px" }}>
              <Box component="span" fontWeight="bold">
                Descripción:{" "}
              </Box>
              {selectedMovie.overview}
            </Typography>
            <Typography variant="body2" sx={{ mt: "10px" }}>
              <Box component="span" fontWeight="bold">
                Lanzamiento:{" "}
              </Box>
              {selectedMovie.release_date}
            </Typography>
            <Typography variant="body2" sx={{ mt: "10px" }}>
              <Box component="span" fontWeight="bold">
                Duración:{" "}
              </Box>
              {`${selectedMovie.runtime} minutos`}
            </Typography>
          </CardContent>
        </Card>
      </Dialog>
    </>
  );
};

export default ListMovies;
