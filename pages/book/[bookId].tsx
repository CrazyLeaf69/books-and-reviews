import React from "react";
import BookInfoCard from "../../components/BookInfoCard";
import BookReviews from "../../components/BookReviews";

type props = {
  params: {
    bookInfo: any;
    reviews?: any;
  };
};

const bookInfo = ({ params: { bookInfo, reviews } }: props) => {
  return (
    <div className="flex justify-center pt-2">
      {bookInfo ? (
        <div className="flex flex-col gap-5 items-center mb-60">
          <BookInfoCard id={bookInfo.id} volumeInfo={bookInfo.volumeInfo} />
          <BookReviews reviews={reviews} bookId={bookInfo.id} />
        </div>
      ) : (
        <div>Invalid Book Id</div>
      )}
    </div>
  );
};

bookInfo.getInitialProps = async (context: any) => {
  const { bookId } = context.query;
  const bookRes = await fetch(
    `https://www.googleapis.com/books/v1/volumes/${bookId}?key=${process.env.NEXT_PUBLIC_KEY}`
  );
  const bookInfo = await bookRes.json();

  const reviewsRes = await fetch(`http://127.0.0.1:8090/api/collections/reviews/records?filter=(bookId='${bookId}')`);
  const reviews = await reviewsRes.json();

  if (bookInfo.error) {
    return {
      params: {
        bookInfo: null,
      },
    };
  }
  return {
    params: {
      bookInfo,
      reviews,
    },
  };
};

export default bookInfo;
