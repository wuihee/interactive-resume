import "../styles/SectionItem.css";

export function SectionItemDisplay({ itemDetails }) {
  let { job, position, date, location } = itemDetails;
  return (
    <div>
      <div className="item-header">
        <h3>{job}</h3>
        <p>{date}</p>
      </div>
      <div className="item-subheader">
        <em>{position}</em>
        <em>{location}</em>
      </div>
    </div>
  );
}

export function SectionItemForm({
  sectionId,
  itemId,
  itemDetails,
  points,
  handleChangeItem,
  handleAddPoint,
  handleChangePoint,
  handleDeletePoint,
}) {
  return (
    <div>
      {Object.entries(itemDetails)
        .filter(([key, value]) => key !== "id" && key !== "points")
        .map(([key, value]) => (
          <div key={key}>
            <label htmlFor={key}>
              {key.charAt(0).toUpperCase() + key.slice(1)}:{" "}
            </label>
            <input
              type="text"
              id={key}
              value={value}
              onChange={event => handleChangeItem(event, sectionId, itemId)}
            />
          </div>
        ))}
      {points.map(point => (
        <div className="point" key={point.id}>
          <input
            type="text"
            id={point.id}
            value={point.value}
            onChange={event => handleChangePoint(event, sectionId, itemId)}
          />
          <button
            onClick={() => handleDeletePoint(sectionId, itemId, point.id)}
          >
            Delete
          </button>
        </div>
      ))}
      <button onClick={handleAddPoint}>Add Point</button>
    </div>
  );
}
