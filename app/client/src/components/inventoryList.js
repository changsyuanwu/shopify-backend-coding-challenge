import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CSVLink } from "react-csv";

const InventoryItem = (props) => (
  <tr>
    <td>{props.inventoryItem.code}</td>
    <td>{props.inventoryItem.name}</td>
    <td>{props.inventoryItem.description}</td>
    <td>{props.inventoryItem.quantity}</td>
    <td>
      <Link className="btn btn-link" to={`/edit/${props.inventoryItem._id}`}>Edit</Link> |
      <button className="btn btn-link"
        onClick={() => {
          props.deleteInventoryItem(props.inventoryItem._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

export default function InventoryItemList() {
  const [inventoryItems, setInventoryItems] = useState([]);

  useEffect(() => {
    async function getInventoryItems() {
      const response = await fetch(`http://localhost:3001/inventory/`);

      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const inventoryItems = await response.json();
      setInventoryItems(inventoryItems);
    }

    getInventoryItems();

    return; 
  }, [inventoryItems.length]);

  async function deleteInventoryItem(id) {
    await fetch(`http://localhost:3001/inventory/${id}`, {
      method: "DELETE"
    });

    const newInventoryItems = inventoryItems.filter((item) => item._id !== id);
    setInventoryItems(newInventoryItems);
  }

  function inventoryItemList() {
    return inventoryItems.map((inventoryItem) => {
      return (
        <InventoryItem
          inventoryItem={inventoryItem}
          deleteInventoryItem={() => deleteInventoryItem(inventoryItem._id)}
          key={inventoryItem._id}
        />
      );
    });
  }

  return (
    <div>
      <h3>Inventory List</h3>
      <CSVLink 
        data={inventoryItems} 
        filename={"shopify_inventory.csv"}
        className="btn btn-primary"
      >
        Export to CSV
      </CSVLink>
      <table 
        className="table table-striped" 
        style={{ marginTop: 20 }}
      >
        <thead>
          <tr>
            <th>Product Code</th>
            <th>Name</th>
            <th>Description</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>{inventoryItemList()}</tbody>
      </table>
      
    </div>
  );
}
