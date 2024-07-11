import "../styles/Header.css";

export function HeaderDisplay({ headerDetails }) {
  let { name, email, number, location } = headerDetails;
  return (
    <div className="header-display">
      <h1>{name}</h1>
      <p>
        {email} {number && " | "} {number} {location && " | "} {location}
      </p>
    </div>
  );
}

export function HeaderForm({ headerDetails, handleFormInput }) {
  return (
    <div className="header-form">
      {Object.entries(headerDetails).map(([key, value]) => (
        <div key={key} className="header-form-input">
          <label htmlFor={key}>
            {`${key.at(0).toUpperCase()}${key.slice(1)}: `}
          </label>
          <input
            type="text"
            id={key}
            name={key}
            value={value}
            onChange={e => handleFormInput(e)}
          />
        </div>
      ))}
    </div>
  );
}
