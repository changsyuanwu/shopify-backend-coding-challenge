import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function Edit() {
  const [form, setForm] = useState({
    productCode: "",
    name: "",
    description: "",
    quantity: 0,
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(
        `http://localhost:3001/inventory/${params.id.toString()}`
      );

      if (!response.ok) {
        const message = `An error has occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const inventoryItem = await response.json();
      if (!inventoryItem) {
        window.alert(`Inventory item with id ${id} not found`);
        navigate("/");
        return;
      }

      setForm(inventoryItem);
    }

    fetchData();

    return;
  }, [params.id, navigate]);

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const editedInventoryItem = {
      productCode: form.productCode,
      name: form.name,
      description: form.description,
      quantity: form.quantity,
    };

    await fetch(`http://localhost:3001/inventory/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(editedInventoryItem),
      headers: {
        "Content-Type": "application/json",
      },
    });

    navigate("/");
  }

  return (
    <div>
      <h3>Update Inventory Item</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="Code">Product Code: </label>
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
            value="Update Inventory Item"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
