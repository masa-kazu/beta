import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import styled from "styled-components";
import AddFood from "./AddFood";
import FoodList from "./FoodList";
import EditFood from "./EditFood";
import "./App.css";

const Nabvar = styled.nav`
  background: #026aa7;
  min-height: 8vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Logo = styled.div`
  font-weight: bold;
  font-size: 23px;
  letter-spacing: 3px;
`;

const NavItems = styled.ul`
  display: flex;
  width: 400px;
  max-width: 40%;
  justify-content: space-around;
  list-style: none;
`;

const NavItem = styled.li`
  font-size: 19px;
  font-weight: bold;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`;

const Wrapper = styled.div`
  width: 700px;
  max-width: 85%;
  margin: 20px auto;
`;

function App() {
  return (
    <>
      <Nabvar>
        <Logo>Food</Logo>
        <NavItems>
          <NavItem>
            <Link to="/foods">Foods</Link>
          </NavItem>
          <NavItem>
            <Link to="/foods/new">Add New Food</Link>
          </NavItem>
        </NavItems>
      </Nabvar>
      <Wrapper>
        <Switch>
          <Route exact path="/foods" component={FoodList} />
          <Route exact path="/foods/new" component={AddFood} />
          <Route path="/foods/:id/edit" component={EditFood} />
        </Switch>
      </Wrapper>
    </>
  );
}

export default App;
