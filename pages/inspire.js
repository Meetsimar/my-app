import React, { useState } from "react";
import Button from "react-bootstrap/Button";

export default function InspirationalQuotes() {
  const defaultQuote = `Love... to the moon and back 🌙`;

  const [quote, setQuote] = useState(defaultQuote);

  const handleClick = async () => {
    const response = await fetch("https://api.quotable.io/random");
    const data = await response.json();
    setQuote(data.content);
  };

  return (
    <div className="text-center">
      <br />
      <br />
      <br />
      <h1>Inspirational Quote</h1>
      <p id="quote">{quote}</p>
      <Button variant="outline-light" onClick={handleClick}>
        Generate Quote
      </Button>
    </div>
  );
}
