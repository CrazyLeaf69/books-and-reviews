import React from "react";
import { Card, Box, CardContent, Typography } from "@mui/material";
import Image from "next/image";

type item = {
  id: string;
  volumeInfo: {
    authors: string[];
    language: string;
    title: string;
    publishedDate: string;
    description: string;
    categories: string[];
    pageCount: number;
    publisher: string;
    imageLinks: {
      smallThumbnail: string;
      thumbnail: string;
      small: string;
      medium: string;
      large: string;
      extraLarge: string;
    };
  };
};

const BookInfoCard = ({ id, volumeInfo }: item) => {
  return (
    <Box sx={{ width: 500 }}>
      <Card variant="outlined">
        <CardContent className="flex flex-col gap-1">
          <Image
            src={
              volumeInfo.imageLinks?.large ||
              volumeInfo.imageLinks?.medium ||
              volumeInfo.imageLinks?.extraLarge ||
              volumeInfo.imageLinks?.small ||
              volumeInfo.imageLinks?.smallThumbnail ||
              volumeInfo.imageLinks?.thumbnail ||
              ""
            }
            width={275}
            height={200}
            className="aspect-[2/3] self-center"
            alt={"book cover"}
          />
          <Typography variant="h6" component="div">
            {volumeInfo.title}
          </Typography>
          <Typography variant="body2">
            {volumeInfo.authors && volumeInfo.authors.join(", ")} - {volumeInfo.publishedDate}
          </Typography>
          <Typography variant="body1">
            {volumeInfo.description?.replace(/<\/?[^>]+(>|$)/g, "") || "no description"}
          </Typography>
          <Typography variant="body2">
            <span className="font-bold">Categories: </span>
            {volumeInfo.categories ? volumeInfo.categories[0] : "none"}
          </Typography>
          <Typography variant="body2">
            <span className="font-bold">Language: </span>
            {volumeInfo?.language}
          </Typography>
          <Typography variant="body2">
            <span className="font-bold">Pages: </span>
            {volumeInfo?.pageCount}
          </Typography>
          <Typography variant="body2">
            <span className="font-bold">Publisher: </span>
            {volumeInfo?.publisher}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default BookInfoCard;
