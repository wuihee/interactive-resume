import "../styles/Section.css";
import { SectionItemDisplay, SectionItemForm } from "./SectionItem";

export function SectionDisplay({ sections }) {
  return (
    <div>
      {sections.map(section => (
        <div key={section.id} className="section-display">
          <h2>{section.title.toUpperCase()}</h2>
          <hr />
          {section.items.map(item => (
            <div key={item.id}>
              <SectionItemDisplay itemDetails={item} />
              <ul>
                {item.points.map(point => (
                  <li key={point.id}>{point.value}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export function SectionForm({
  sections,
  handleAddSection,
  handleChangeSection,
  handleDeleteSection,
  handleAddItem,
  handleChangeItem,
  handleDeleteItem,
  handleAddPoint,
  handleChangePoint,
  handleDeletePoint,
}) {
  return (
    <div>
      {sections.map(section => (
        <div key={section.id}>
          <div>
            <input
              type="text"
              id={section.id}
              value={section.title}
              onChange={e => handleChangeSection(e, section.items)}
            />
            <button onClick={() => handleDeleteSection(section.id)}>
              Delete
            </button>
          </div>
          {section.items.map(item => (
            <div key={item.id}>
              <SectionItemForm
                sectionId={section.id}
                itemId={item.id}
                itemDetails={item}
                points={item.points}
                handleChangeItem={handleChangeItem}
                handleAddPoint={() => handleAddPoint(section.id, item.id)}
                handleChangePoint={handleChangePoint}
                handleDeletePoint={handleDeletePoint}
              />
              <button onClick={() => handleDeleteItem(section.id, item.id)}>
                Delete Item
              </button>
            </div>
          ))}
          <button onClick={() => handleAddItem(section.id)}>Add Item</button>
        </div>
      ))}
      <button onClick={handleAddSection}>Add Section</button>
    </div>
  );
}
