import Navbar from "./components/Navbar/Navbar";
import { AppRouter } from "./routing/AppRouter";

export default function App() {
  return (
    <>
      <Navbar></Navbar>
      <AppRouter></AppRouter>
    </>
  );
}
