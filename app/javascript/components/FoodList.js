import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import { AiFillEdit } from "react-icons/ai";

const SearchAndButtton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SearchForm = styled.input`
  font-size: 20px;
  width: 100%;
  height: 40px;
  margin: 10px 0;
  padding: 10px;
`;

const RemoveAllButton = styled.button`
  width: 20%;
  height: 40px;
  background: #f54242;
  border: none;
  font-weight: 500;
  margin-left: 10px;
  padding: 5px 10px;
  border-radius: 3px;
  color: #fff;
  cursor: pointer;
`;

const FoodName = styled.span`
  font-size: 27px;
  ${({ complete }) =>
    complete &&
    `
    opacity: 0.4;
  `}
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 7px auto;
  padding: 10px;
  font-size: 25px;
`;

const CheckedBox = styled.div`
  display: flex;
  align-items: center;
  margin: 0 7px;
  color: green;
  cursor: pointer;
`;

const UncheckedBox = styled.div`
  display: flex;
  align-items: center;
  margin: 0 7px;
  cursor: pointer;
`;

const EditButton = styled.span`
  display: flex;
  align-items: center;
  margin: 0 7px;
`;

function FoodList() {
  const [foods, setFoods] = useState([]);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    axios
      .get("/api/v1/foods.json")
      .then((resp) => {
        console.log(resp.data);
        setFoods(resp.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const removeAllFoods = () => {
    const sure = window.confirm("Are you sure?");
    if (sure) {
      axios
        .delete("/api/v1/foods/destroy_all")
        .then((resp) => {
          setFoods([]);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const updateIsCompleted = (index, val) => {
    var data = {
      id: val.id,
      content: val.content,
      complete: !val.complete,
    };
    axios.patch(`/api/v1/foods/${val.id}`, data).then((resp) => {
      const newFoods = [...foods];
      newFoods[index].complete = resp.data.complete;
      setFoods(newFoods);
    });
  };

  return (
    <>
      <h1>Food List</h1>
      <SearchAndButtton>
        <SearchForm
          type="text"
          placeholder="Search food..."
          onChange={(event) => {
            setSearchName(event.target.value);
          }}
        />
        <RemoveAllButton onClick={removeAllFoods}>Remove All</RemoveAllButton>
      </SearchAndButtton>

      <div>
        {foods
          .filter((val) => {
            if (searchName === "") {
              return val;
            } else if (
              val.content.toLowerCase().includes(searchName.toLowerCase())
            ) {
              return val;
            }
          })
          .map((val, key) => {
            return (
              <Row key={key}>
                {val.complete ? (
                  <CheckedBox>
                    <ImCheckboxChecked
                      onClick={() => updateIsCompleted(key, val)}
                    />
                  </CheckedBox>
                ) : (
                  <UncheckedBox>
                    <ImCheckboxUnchecked
                      onClick={() => updateIsCompleted(key, val)}
                    />
                  </UncheckedBox>
                )}
                <FoodName complete={val.complete}>{val.content}</FoodName>
                <Link to={"/foods/" + val.id + "/edit"}>
                  <EditButton>
                    <AiFillEdit />
                  </EditButton>
                </Link>
              </Row>
            );
          })}
      </div>
    </>
  );
}

export default FoodList;
