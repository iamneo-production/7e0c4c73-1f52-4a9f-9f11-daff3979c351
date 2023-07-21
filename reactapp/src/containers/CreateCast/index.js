import React, { useState } from 'react';
import './index.css';

const CastForm = ({ onAddCast }) => {
  const [actorName, setActorName] = useState('');
  const [actorImage, setActorImage] = useState(null);

  const handleActorNameChange = (event) => {
    setActorName(event.target.value);
  };

  const handleActorImageChange = (event) => {
    setActorImage(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddCast({ name: actorName, image: actorImage });
    setActorName('');
    setActorImage(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Actor Name:
        <input type="text" value={actorName} onChange={handleActorNameChange} />
      </label>
      <br />
      <label>
        Actor Image:
        <input type="file" onChange={handleActorImageChange} />
      </label>
      <br />
      <button type="submit">Add Cast</button>
    </form>
  );
};

const CreateCast = () => {
  const [castList, setCastList] = useState([]);

  const handleAddCast = (cast) => {
    setCastList([...castList, cast]);
  };

  return (
    <div>
      <h2>Movie Review System</h2>
      <CastForm onAddCast={handleAddCast} />
      <h3>Cast List:</h3>
      {castList.map((cast, index) => (
        <div key={index}>
          <p>Actor Name: {cast.name}</p>
          <img src={URL.createObjectURL(cast.image)} alt="Actor" />
        </div>
      ))}
    </div>
  );
};

export default CreateCast;
