import Nav from "./components/Nav";
import Hero from "./components/Hero";
import ProjectShowcase from "./components/ProjectShowcase";
import ProjectGrid from "./components/ProjectGrid";
import About from "./components/About";
import Log from "./components/Log";
import Contact from "./components/Contact";

function App() {
  return (
    <div className="bg-canvas min-h-screen">
      <Nav />
      <Hero />
      <ProjectShowcase />
      <ProjectGrid />
      <About />
      <Log />
      <Contact />
    </div>
  );
}

export default App;
