import React, { useState } from "react";
import { Animated } from "react-animated-css";
import { AnimationOnScroll } from "react-animation-on-scroll";
import Navbar from "../../layouts/Navbar/Index";
import Footer from "../../layouts/Footer/Index";
import Carousel from "./components/Carousel";
import Search from "./components/Search";
//import Pagination from "./components/Pagination";
//import FilterData from "./components/FilterData";
import Cards from "../Cards/Index";
import "./Index.css";
import SearchByProv from "./components/SearchByProv";

const Home = () => {
  // Estado para almacenar el término de búsqueda
  const [searchTerm, setSearchTerm] = useState("");
  const [filterProv, setFilterProv] = useState("");

  return (
    <>
      <Navbar />
      <Carousel />

      <main>

        <div className="container">
          <div className="buscadores">
          <Search className="buscador" onSearch={searchTerm} setSearchTerm={setSearchTerm} />
          <SearchByProv className="prov" onSearch={filterProv} setSearchTerm={setFilterProv} />
          </div>
          {/* <Pagination/>
         <FilterData /> */}
          <section className="outstanding">
            <h2 className="title">Destacados</h2>

            {/* <AnimationOnScroll
              animateIn="animate__bounceInLeft"
              animateOnce={true}
            > */}
            <Cards
              searchTerm={searchTerm}
              search={true}
              filterProv={filterProv}
            />
            {/* </AnimationOnScroll> */}
          </section>
          <section className="this-week">
            <h2 className="title">Esta semana</h2>
            <AnimationOnScroll
              animateIn="animate__bounceInRight"
              animateOnce={true}
            >
              <Cards
                searchTerm={searchTerm}
                dateFilter={true}
                filterProv={filterProv}
              />
            </AnimationOnScroll>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
