import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {
  const [form, setForm] = useState({
    productCode: "",
    name: "",
    description: "",
    quantity: 0,
  });
  const navigate = useNavigate();

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();

    const newInventoryItem = { ...form };

    await fetch("http://localhost:3001/inventory/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newInventoryItem),
    })
    .catch(error => {
      window.alert(error);
      return;
    });

    setForm({
      productCode: "",
      name: "",
      description: "",
      quantity: 0,
    });
    navigate("/");
  }

  return (
    <div>
      <h3>Create Inventory Item</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="productCode">Product Code: </label>
          <input
            type="text"
            className="form-control"
            id="productCode"
            value={form.productCode}
            onChange={(e) => updateForm({ productCode: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description: </label>
          <input
            type="text"
            className="form-control"
            id="description"
            value={form.description}
            onChange={(e) => updateForm({ description: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity: </label>
          <input
            type="text"
            className="form-control"
            id="quantity"
            value={form.quantity}
            onChange={(e) => updateForm({ quantity: e.target.value })}
          />
        </div>
        <br />

        <div className="form-group">
          <input
            type="submit"
            value="Create Inventory Item"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
