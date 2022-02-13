import * as React from "react";

interface Props {
  message: string
}

const App: React.FC<Props> = ({message}: Props) => {
  return <h1>{message}</h1>;
}

export default App;