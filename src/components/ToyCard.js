import React, { useState, useEffect } from "react";

function ToyCard() {
  const [toys, setToys] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/toys')
      .then((resp) => resp.json())
      .then((data) => {
        setToys(data);
      });
  }, []);

  // Function to handle DELETE request and update state
  function handleDeleteAllToys(id) {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: 'DELETE'
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error('Failed to delete toy');
        }
        return resp.json();
      })
      .then((data) => {
        console.log('Toy deleted successfully:', data);
        // Remove the deleted toy from state
        setToys(toys.filter(toy => toy.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting toy:', error);
        // Handle specific errors or display a message to the user
      });
  }

  // Function to handle PATCH request and update state
  function handleUpdate(id, updatedLikes) {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ likes: updatedLikes })
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error('Failed to update toy likes');
        }
        return resp.json();
      })
      .then((updatedToy) => {
        // Update the local state with the updated toy
        setToys(toys.map(toy => toy.id === updatedToy.id ? updatedToy : toy));
      })
      .catch((error) => {
        console.error('Error updating toy likes:', error);
        // Handle specific errors or display a message to the user
      });
  }

  return (
    <div className="card">
      {toys.map((toy) => (
        <div key={toy.id} className="toy-card">
          <h2>{toy.name}</h2>
          <img
            src={toy.image}
            alt={toy.name}
            className="toy-avatar"
          />
          <p>{toy.likes} Likes</p>
          <button className="like-btn" onClick={() => handleUpdate(toy.id, toy.likes + 1)}>Like</button>
          {/* Pass toy.id to handleDeleteAllToys */}
          <button className="del-btn" onClick={() => handleDeleteAllToys(toy.id)}>Donate to GoodWill</button>
        </div>
      ))}
    </div>
  );
}

export default ToyCard;
