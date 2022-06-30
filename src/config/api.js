export const urlBase = "https://api.themoviedb.org/3/";

export const urlImage = "https://image.tmdb.org/t/p/original/";

const token =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0N2FjOTlkMDQ1MjY1ZDZiODQzZWU3ZTQxN2Y0ODE4ZiIsInN1YiI6IjYyMTUyOTBmMzIzZWJhMDAxZWI3Njc1YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.05CExT0KbAC1DiBGzAmqFW_CrYVgk4EY-HVfpsl7v6w";

export const headersConfig = {
  headers: {
    Authorization: token,
  },
};
