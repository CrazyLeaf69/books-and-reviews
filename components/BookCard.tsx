import { Button, Card, Box, CardActions, CardContent, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type props = {
  id: string;
  title: string;
  publishedDate: string;
  authors: string[];
};

const BookCard = ({ id, title, publishedDate, authors }: props) => {
  return (
    <Box sx={{ width: 275 }} className="test">
      <Card variant="outlined" className="flex flex-col justify-between">
        <CardContent>
          <Image
            src={`https://books.google.com/books?id=${id}&printsec=frontcover&img=1&zoom=2&edge=curl&source=gbs_api`}
            width={275}
            height={200}
            className="aspect-[2/3]"
            alt={"book cover"}
          />
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          <Typography variant="body2">
            {authors && authors.join(", ")} - {publishedDate}
          </Typography>
        </CardContent>
        <CardActions>
          <Link href={`/book/${id}`}>
            <Button size="small">More Information</Button>
          </Link>
        </CardActions>
      </Card>
    </Box>
  );
};

export default BookCard;
