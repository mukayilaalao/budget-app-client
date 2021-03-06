import axios from "axios";
import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import NewCalendar from "./NewCalendar";
import "./NewTransaction.css";

function NewTransaction() {
  const [state, setState] = useState({
    date: "",
    name: "",
    amount: 0,
    from: "",
    category: "",
  });
  const [categories, setCategories]=useState([]);
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;
useEffect(()=>{
    axios.get(`${API_URL}/transactions/categories`)
    .then(response=> setCategories(response.data))
    .catch(e=> console.log(e));
},[]);
  const handleChange = (e) => {
    setState({ ...state, [e.target.id]: e.target.value });
  };
  const getDate=date=>{
      setState({...state, date});
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);
    axios
      .post(`${API_URL}/transactions/`, state)
      .then(() => navigate("/transactions"))
      .catch(() => navigate("/transaction/new"));
  };

  const { name, amount, category, from } = state;
  return (
    <div className="new-form">
      <NewCalendar getDate={getDate}/>
      <form onSubmit={handleSubmit}>
        <br />
        <hr />
        <label htmlFor="name">
          <strong>Name</strong>
        </label>
        <br />
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          placeholder="name"
          onChange={handleChange}
        />
        <hr />
        <label htmlFor="amount">
          <strong>Amount</strong>
        </label>
        <br />
        <input
          type="number"
          name="amount"
          id="amount"
          value={amount}
          placeholder="amount"
          onChange={handleChange}
        />
        <hr />
        <label htmlFor="from">
          <strong>From</strong>
        </label>
        <br />
        <input
          type="text"
          name="from"
          id="from"
          value={from}
          placeholder="From"
          onChange={handleChange}
        />
        <hr />
        <label htmlFor="category">
          <strong>Category</strong>
        </label>
        <br />
        <select id="category" value={category} onChange={handleChange}>
        <option value="">Please Choose category...</option>
        {categories.map((category,i)=> <option value={category.toLowerCase()} key={"category"+i}>{category}</option>)}
        </select>
         <hr />
        <div className="new-buttons">
        <button id="cancel">
          <Link to={"/transactions/"}>Cancel</Link>
        </button>
        <button id="new-submit" type="submit">
          CREATE A NEW ITEM
        </button>
      </div>
      </form>     
    </div>
  );
}

export default NewTransaction;
