import { Button } from "react-bootstrap";
import React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios'

const Post = () => {
  const [imageLinks, setImageLinks] = useState([""]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState([""]);
  const [category, setCategory] = useState('Category');
  const [size, setSize] = useState(false);
  const [model, setModel] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [totleRatting, setTotleRatting] = useState("");
  const [rattingStar, setRattingStar] = useState("");
  const [mrp, setMrp] = useState("");
  const [price, setPrice] = useState("");
  const cate =['MAN-SHIRT','MAN-T-SHIRT','MAN-NIGHTDRESS','GIRL-SHIRT','GIRL-T-SHIRT','GIRL-NIGHTDRESS']

  const handleSubmit =async (e) => {
    const a = {
      image: imageLinks,
      title: title,
      description: description,
      category: category,
      size: size,
      model: model,
      totleRatting: totleRatting,
      star: rattingStar,
      mrp: mrp,
      price: price,
    };

    console.log(a);
    e.preventDefault();
   await axios.post('http://localhost:8080/api/product/add',(a))
   .then((response)=>{
    console.log(response)
   }).catch((errors)=>{
    console.log(errors)
   })
    setImageLinks([""]);
    setTitle("");
    setDescription([""]);
    setCategory('category')
    setSize(false);
    setModel(false)
    setTotleRatting("");
    setRattingStar("");
    setMrp("");
    setPrice("");
  };

  return (
    <div className="mt-5 p-5">
      {imageLinks?.map((imageLink, idx) => {
        return (
          // <div  className="d-flex gap-2 mb-4">
          <InputGroup className="mb-3" key={idx}>
            <InputGroup.Text>Images</InputGroup.Text>
            <Form.Control
              value={imageLink}
              onChange={(e) => {
                const currList = [...imageLinks];
                currList[idx] = e.target.value;
                setImageLinks([...currList]);
              }}
            />
            {idx === imageLinks.length - 1 ? (
              <Button
                variant="primary"
                onClick={() => {
                  setImageLinks([...imageLinks, ""]);
                }}
              >
                +
              </Button>
            ) : (
              <Button
                variant="danger"
                onClick={() => {
                  const currList = [...imageLinks];
                  currList.splice(idx, 1);
                  setImageLinks([...currList]);
                }}
              >
                -
              </Button>
            )}
          </InputGroup>
        );
      })}

      <InputGroup className="mb-3">
        <InputGroup.Text>Title</InputGroup.Text>
        <Form.Control
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </InputGroup>

      {description?.map((item, i) => (
        <InputGroup className="mb-3" key={i}>
          <InputGroup.Text>description</InputGroup.Text>
          <Form.Control
            value={item}
            onChange={(e) => {
              const currList = [...description];
              currList[i] = e.target.value;
              setDescription([...currList]);
            }}
          />
          {i === description.length - 1 ? (
            <Button
              variant="primary"
              onClick={() => {
                setDescription([...description , ""]);
              }}
            >
              +
            </Button>
          ) : (
            <Button
              variant="danger"
              onClick={() => {
                const currList = [...description];
                currList.splice(i, 1);
                setDescription([...currList]);
              }}
            >
              -
            </Button>
          )}
        </InputGroup>
      ))}

      <div className="d-flex gap-5 mb-3">
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {category}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {cate?.map((item,i)=>(<Dropdown.Item key={i} onClick={(e)=>{setCategory(e.target.innerText)}}>{item}</Dropdown.Item>))}
          </Dropdown.Menu>
        </Dropdown>
        <Button
          onClick={() => {
            size ? setSize(false) : setSize(true);
          }}
          className={`${size ? "bg-success" : "bg-danger"}`}
        >
          Size
        </Button>
        <Button
          onClick={() => {
            model ? setModel(false) : setModel(true);
          }}
          className={`${model ? "bg-success" : "bg-danger"}`}
        >
          Model
        </Button>
      </div>  

      <InputGroup className="mb-3">
        <InputGroup.Text>Totle Ratting</InputGroup.Text>
        <Form.Control
          value={totleRatting}
          onChange={(e) => {
            setTotleRatting(e.target.value);
          }}
        />
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroup.Text>Star</InputGroup.Text>
        <Form.Control
          value={rattingStar}
          onChange={(e) => {
            setRattingStar(e.target.value);
          }}
        />
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroup.Text>MRP</InputGroup.Text>
        <Form.Control
          value={mrp}
          onChange={(e) => {
            setMrp(e.target.value);
          }}
        />
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroup.Text>Price</InputGroup.Text>
        <Form.Control
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
      </InputGroup>

      <Button
        variant="primary"
        onClick={handleSubmit}
        className="w-100"
        type="submit"
      >
        Submit
      </Button>
    </div>
  );
};

export default Post;
