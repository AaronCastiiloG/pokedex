import '../app/App.css';
import { Outlet } from "react-router";

export default function MainContainer() {
  return(
    <>
      <section id="center">
        <Outlet />
      </section>
    </>
  );
}