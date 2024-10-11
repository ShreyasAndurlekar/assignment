import Navbar from "./Navbar";
import List from "./List";

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <div className="flex flex-col justify-center bg-gray-100 ">
        <p className="text-4xl font-montserrat font-bold mt-20 text-center lg:text-7xl">
          Explore the most popular mangatoons
        </p>
        <List />
      </div>
    </div>
  );
}

export default App;