import { Button } from "../src/components/ui/button";
import PaintZone from "./components/ui/PaintZone";
import "./App.css";

export default function Home() {
  return (
    <div>
      <Button>Click me</Button>
      <PaintZone />
    </div>
  );
}
