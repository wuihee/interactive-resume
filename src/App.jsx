import { useState } from "react";
import { useReducer } from "react";

import { HeaderDisplay, HeaderForm } from "./components/Header";
import {
  SocialLinksDisplay,
  SocialLinksForm,
  socialLinksReducer,
} from "./components/SocialLinks";
import { SectionDisplay, SectionForm } from "./components/Section";

import "./styles/App.css";

export default function App() {
  let [headerDetails, setHeaderDetails] = useState({
    name: "Name",
    email: "Email",
    number: "Number",
    location: "Location",
  });
  let [socialLinks, socialLinksDispatch] = useReducer(socialLinksReducer, []);
  let [sections, setSections] = useState([]);

  function handleHeaderFormInput(event) {
    let { name, value } = event.target;
    setHeaderDetails({ ...headerDetails, [name]: value });
  }

  function handleAddLink() {
    socialLinksDispatch({ type: "added" });
  }
  function handleChangeLink(event) {
    let { id, value } = event.target;
    socialLinksDispatch({ type: "changed", id: id, value: value });
  }
  function handleDeleteLink(id) {
    socialLinksDispatch({ type: "deleted", id: id });
  }

  function handleAddSection() {
    setSections([
      ...sections,
      { id: crypto.randomUUID(), title: "", items: [] },
    ]);
  }
  function handleChangeSection(event, items) {
    let { id, value } = event.target;
    setSections(
      sections.map(section =>
        section.id === id ? { id: id, title: value, items: items } : section
      )
    );
  }
  function handleDeleteSection(id) {
    setSections(sections.filter(section => section.id !== id));
  }

  function handleAddItem(id) {
    setSections(
      sections.map(section =>
        section.id === id
          ? {
              ...section,
              items: [
                ...section.items,
                {
                  id: crypto.randomUUID(),
                  job: "",
                  date: "",
                  position: "",
                  location: "",
                  points: [],
                },
              ],
            }
          : section
      )
    );
  }
  function handleChangeItem(event, sectionId, itemId) {
    let { id, value } = event.target;
    setSections(
      sections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              items: section.items.map(item =>
                item.id === itemId ? { ...item, [id]: value } : item
              ),
            }
          : section
      )
    );
  }
  function handleDeleteItem(sectionId, itemId) {
    setSections(
      sections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              items: section.items.filter(item => item.id !== itemId),
            }
          : section
      )
    );
  }

  function handleAddPoint(sectionId, itemId) {
    setSections(
      sections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              items: section.items.map(item =>
                item.id === itemId
                  ? {
                      ...item,
                      points: [
                        ...item.points,
                        { id: crypto.randomUUID(), value: "" },
                      ],
                    }
                  : item
              ),
            }
          : section
      )
    );
  }
  function handleChangePoint(event, sectionId, itemId) {
    let { id, value } = event.target;
    setSections(
      sections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              items: section.items.map(item =>
                item.id === itemId
                  ? {
                      ...item,
                      points: item.points.map(point =>
                        point.id === id ? { ...point, value: value } : point
                      ),
                    }
                  : item
              ),
            }
          : section
      )
    );
  }
  function handleDeletePoint(sectionId, itemId, pointId) {
    setSections(
      sections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              items: section.items.map(item =>
                item.id === itemId
                  ? {
                      ...item,
                      points: item.points.filter(point => point.id !== pointId),
                    }
                  : item
              ),
            }
          : section
      )
    );
  }

  return (
    <main>
      <div id="resume-form">
        <HeaderForm
          headerDetails={headerDetails}
          handleFormInput={handleHeaderFormInput}
        />
        <SocialLinksForm
          socialLinks={socialLinks}
          handleAddLink={handleAddLink}
          handleChangeLink={handleChangeLink}
          handleDeleteLink={handleDeleteLink}
        />
        <SectionForm
          sections={sections}
          handleAddSection={handleAddSection}
          handleChangeSection={handleChangeSection}
          handleDeleteSection={handleDeleteSection}
          handleAddItem={handleAddItem}
          handleChangeItem={handleChangeItem}
          handleDeleteItem={handleDeleteItem}
          handleAddPoint={handleAddPoint}
          handleChangePoint={handleChangePoint}
          handleDeletePoint={handleDeletePoint}
        />
      </div>

      <div id="resume-display">
        <HeaderDisplay headerDetails={headerDetails} />
        <SocialLinksDisplay socialLinks={socialLinks} />
        <hr />
        <SectionDisplay sections={sections} />
      </div>
    </main>
  );
}
