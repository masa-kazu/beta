import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InputName = styled.input`
  font-size: 20px;
  width: 100%;
  height: 40px;
  padding: 2px 7px;
  margin: 12px 0;
`;

const CurrentStatus = styled.div`
  font-size: 19px;
  margin: 8px 0 12px 0;
  font-weight: bold;
`;

const IsCompletedButton = styled.button`
  color: #fff;
  font-weight: 500;
  font-size: 17px;
  padding: 5px 10px;
  background: #f2a115;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`;

const EditButton = styled.button`
  color: white;
  font-weight: 500;
  font-size: 17px;
  padding: 5px 10px;
  margin: 0 10px;
  background: #0ac620;
  border-radius: 3px;
  border: none;
`;

const DeleteButton = styled.button`
  color: #fff;
  font-size: 17px;
  font-weight: 500;
  padding: 5px 10px;
  background: #f54242;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`;

toast.configure();

function EditFood(props) {
  const initialFoodState = {
    id: null,
    content: "",
    complete: false,
  };

  const [currentFood, setCurrentFood] = useState(initialFoodState);

  const notify = () => {
    toast.success("Food successfully updated!", {
      position: "bottom-center",
      hideProgressBar: true,
    });
  };

  const getFood = (id) => {
    axios
      .get(`/api/v1/foods/${id}`)
      .then((resp) => {
        setCurrentFood(resp.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getFood(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentFood({ ...currentFood, [name]: value });
  };

  const updateIsCompleted = (val) => {
    var data = {
      id: val.id,
      content: val.content,
      complete: !val.complete,
    };
    axios.patch(`/api/v1/foods/${val.id}`, data).then((resp) => {
      setCurrentFood(resp.data);
    });
  };

  const updateFood = () => {
    axios
      .patch(`/api/v1/foods/${currentFood.id}`, currentFood)
      .then((resp) => {
        notify();
        props.history.push("/foods");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteFood = () => {
    const sure = window.confirm("Are you sure?");
    if (sure) {
      axios
        .delete(`/api/v1/foods/${currentFood.id}`)
        .then((resp) => {
          props.history.push("/foods");
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <>
      <h1>Editing Food</h1>
      <div>
        <div>
          <label htmlFor="name">Current Content</label>
          <InputName
            type="text"
            name="content"
            value={currentFood.content}
            onChange={handleInputChange}
          />
          <div>
            <span>Current Status</span>
            <br />
            <CurrentStatus>
              {currentFood.complete ? "Completed" : "Uncompleted"}
            </CurrentStatus>
          </div>
        </div>
        {currentFood.complete ? (
          <IsCompletedButton onClick={() => updateIsCompleted(currentFood)}>
            Uncompleted
          </IsCompletedButton>
        ) : (
          <IsCompletedButton onClick={() => updateIsCompleted(currentFood)}>
            Completed
          </IsCompletedButton>
        )}
        <EditButton onClick={updateFood}>Update</EditButton>
        <DeleteButton onClick={deleteFood}>Delete</DeleteButton>
      </div>
    </>
  );
}

export default EditFood;
