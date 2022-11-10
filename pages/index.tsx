import * as React from "react";
import Button from "@mui/material/Button";
import { SnackbarProvider, VariantType, useSnackbar } from "notistack";
import { Typography } from "@mui/material";
import Link from "next/link";

function MyApp() {
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = () => {
    enqueueSnackbar("I love snacks.");
  };

  const handleClickVariant = (variant: VariantType) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar("This is a " + variant + " message!", { variant });
  };

  return (
    <div className="flex flex-col justify-between items-center pt-5 h-[90%]">
      <div className="w-1/2 text-center">
        <Typography variant="h4">
          This is a demo website for searching for books and giving them reviews, made with the help of Material Ui
        </Typography>
        <Typography variant="h6">
          Go to the{" "}
          <Link href="/books" className="text-blue-400 hover:underline">
            books
          </Link>{" "}
          page, search for a book, and add a review
        </Typography>
      </div>
      <div className="flex flex-col justify-center">
        <Typography variant="h6">Check out these cool snackbars</Typography>
        <Button onClick={handleClick}>Show snackbar</Button>
        <Button onClick={handleClickVariant("success")}>Show success snackbar</Button>
        <Button onClick={handleClickVariant("error")}>Show error snackbar</Button>
        <Button onClick={handleClickVariant("warning")}>Show warning snackbar</Button>
        <Button onClick={handleClickVariant("info")}>Show info snackbar</Button>
      </div>
    </div>
  );
}

export default function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={10}>
      <MyApp />
    </SnackbarProvider>
  );
}
