import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiSend } from "react-icons/fi";

const InputAndButton = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const InputName = styled.input`
  font-size: 20px;
  width: 100%;
  height: 40px;
  padding: 2px 7px;
`;

const Button = styled.button`
  font-size: 20px;
  border: none;
  border-radius: 3px;
  margin-left: 10px;
  padding: 2px 10px;
  background: #1e90ff;
  color: #fff;
  text-align: center;
  cursor: pointer;
  ${({ disabled }) =>
    disabled &&
    `
    opacity: 0.5;
    cursor: default;
  `}
`;

const Icon = styled.span`
  display: flex;
  align-items: center;
  margin: 0 7px;
`;

toast.configure();

function AddFood(props) {
  const initialFoodState = {
    id: null,
    content: "",
    complete: false,
  };

  const [food, setFood] = useState(initialFoodState);

  const notify = () => {
    toast.success("Food successfully created!", {
      position: "bottom-center",
      hideProgressBar: true,
    });
  };

  const handleInputChange = (event) => {
    const { content, value } = event.target;
    setFood({ ...food, [content]: value });
  };

  const saveFood = () => {
    var data = {
      content: food.content,
    };

    axios
      .post("/api/v1/foods", data)
      .then((resp) => {
        setFood({
          id: resp.data.id,
          content: resp.data.content,
          complete: resp.data.complete,
        });
        notify();
        props.history.push("/foods");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <h1>New Food</h1>
      <InputAndButton>
        <InputForName
          type="text"
          required
          value={food.content}
          onChange={handleInputChange}
          name="content"
        />
        <Button
          onClick={saveFood}
          disabled={!food.content || /^\s*$/.test(food.content)}
        >
          <Icon>
            <FiSend />
          </Icon>
        </Button>
      </InputAndButton>
    </>
  );
}

export default AddFood;
