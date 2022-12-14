import React, { Fragment, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";

import titleSlice from "../store/title-slice";
import { useDispatch } from "react-redux";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const style = {
  box: {
    flexGrow: 1,
    mt: "7rem",
  },
  typho: {
    mt: "1.5rem",
  },
};

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(titleSlice.actions.setTitle("Kezdőoldal"));

    return () => {
      dispatch(titleSlice.actions.clearTitle());
      dispatch(titleSlice.actions.clearMachineNumberTitle());
      dispatch(titleSlice.actions.clearCenterlineTypeTitle());
    };
  }, [dispatch]);

  return (
    <Fragment>
      <Box sx={style.box}>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={6} md={8}>
            <Item>
              <Typography variant="h3">
                Centerline ellenőrző applikáció
              </Typography>
              <Typography variant="body1" gutterBottom sx={style.typho}>
                Ez az applikáció arra szolgál, hogy a létrehozott Centerline
                listák segítségével, a termelő személyzet visszajelzést tudjon
                küldjeni, hogy adott gép milyen paramétereken fut termelés
                közben.
              </Typography>
            </Item>
          </Grid>
        </Grid>
      </Box>
      <Box sx={style.box}>
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="center"
          sx={{ mt: "1.5rem" }}
        >
          <Grid item xs={6} md={8}>
            <Item>
              <Typography variant="h6" gutterBottom>
                <b>Centerline listák</b> menüpont
              </Typography>
              <Typography variant="body2" gutterBottom sx={style.typho}>
                A <b>Centerline listák</b> menüpont alatt lehet kiválasztani az
                adott gépet és a hozzá tartozó Centerline típust. A kiválasztás
                után egy táblázatban megjelennek az adatok, amire kattintva egy
                felugró ablak segítségével lehet elküldeni a paramétert.
              </Typography>
            </Item>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="center"
          sx={{ mt: "1.5rem" }}
        >
          <Grid item xs={6} md={8}>
            <Item>
              <Typography variant="h6" gutterBottom>
                <b>Centerline adatok</b> menüpont
              </Typography>
              <Typography variant="body2" gutterBottom sx={style.typho}>
                <b>Gépszám létrehozása</b> aminek segítségével új gépszámot azaz
                új gépet lehet létrehozni az adatbázisban.
              </Typography>
              <Typography variant="body2" gutterBottom>
                <b>Centerline típus létrehozása</b> aminek segítségével új
                centerline típusokat lehet létrehozni amit később hozzá lehet
                rendelni egy adott géphez.
              </Typography>
              <Typography variant="body2" gutterBottom>
                <b>Centerline lista létrehozása</b> aminek segítségével a
                kiválasztott gépszámhoz és a hozzá kiválasztott Centerline
                típushoz létre lehet hozni egy új lista elemet. A létrehozott
                listaelemek egy táblázatban jelennek meg.
              </Typography>
            </Item>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="center"
          sx={{ mt: "1.5rem", mb: "7rem" }}
        >
          <Grid item xs={6} md={8}>
            <Item>
              <Typography variant="h6" gutterBottom>
                <b>Centerline eltérések</b> menüpont
              </Typography>
              <Typography variant="body2" gutterBottom sx={style.typho}>
                A <b>Centerline eltérések</b> menüpont a bevitt adatok
                táblázatban való megjelenítésére szolgál. Itt látható ha egy
                adott gép adott paramétere nem a meghatározzott értéken futott.
              </Typography>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default HomePage;
