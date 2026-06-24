import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";

const WordDetails = ({ word }) => {
  if (!word) return <p>Loading...</p>;

  const url = `http://localhost:5173/word/${word.englishWord}`;

  return (
    <div>

      {/* ✅ SEO META */}
      <Helmet>
        <title>
          {word.englishWord} Meaning in Bangla | Pronunciation & Example
        </title>

        <meta
          name="description"
          content={`${word.englishWord} meaning in Bangla is ${word.banglaMeaning}. ${word.explanation}`}
        />

        <meta
          name="keywords"
          content={`${word.englishWord} meaning, ${word.englishWord} bangla meaning, english vocabulary`}
        />

        {/* Open Graph */}
        <meta property="og:title" content={word.englishWord} />
        <meta
          property="og:description"
          content={`${word.englishWord} meaning in Bangla`}
        />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="article" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* ✅ CONTENT */}
      <h1>{word.englishWord}</h1>

      <p><strong>Bangla Meaning:</strong> {word.banglaMeaning}</p>

      <p><strong>Explanation:</strong> {word.explanation}</p>

      {/* Audio */}
      {word.audio && (
        <audio controls>
          <source src={word.audio} type="audio/mpeg" />
        </audio>
      )}

    </div>
  );
};

export default WordDetails;