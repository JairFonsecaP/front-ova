import React, { useEffect, useState } from "react";

const Resultado = () => {
  const [score, setScore] = useState(0);
  useEffect(() => {
    setScore(sessionStorage.getItem("score"));
  }, []);
  return <h1>{score}</h1>;
};
export default Resultado;
