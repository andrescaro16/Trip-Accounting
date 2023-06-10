import { getTowns } from "./Api/api";

function App() {

  (async () => {
    const res = await getTowns();
    if(!res.loading){
      console.log(res);
    }
  })();

  return (
    <></>
  );
}

export default App;