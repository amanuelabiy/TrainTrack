import { Button } from "./components/ui/button";

function App() {
  return (
    <div>
      <h1 className="text-7xl font-bold ">App</h1>
      <Button
        variant="destructive"
        size="lg"
        onClick={() => console.log("it worked!!!")}
      >
        Click Me
      </Button>
    </div>
  );
}
export default App;
