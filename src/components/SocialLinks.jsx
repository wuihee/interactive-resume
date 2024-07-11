export function SocialLinksDisplay({ socialLinks }) {
  return (
    <div>
      {socialLinks.map((link, index) => (
        <a key={link.id} href={"https://" + link.value} target="_blank">
          {link.value}
          {index < socialLinks.length - 1 && " | "}
        </a>
      ))}
    </div>
  );
}

export function SocialLinksForm({
  socialLinks,
  handleAddLink,
  handleChangeLink,
  handleDeleteLink,
}) {
  return (
    <div>
      {socialLinks.map(link => (
        <div key={link.id}>
          <label htmlFor={link.id}>Link: </label>
          <input
            type="text"
            id={link.id}
            value={link.value}
            onChange={e => handleChangeLink(e)}
          />
          <button onClick={() => handleDeleteLink(link.id)}>Delete</button>
        </div>
      ))}
      <button onClick={handleAddLink}>Add Link</button>
    </div>
  );
}

export function socialLinksReducer(socialLinks, action) {
  switch (action.type) {
    case "added": {
      return [...socialLinks, { id: crypto.randomUUID(), value: "" }];
    }
    case "changed": {
      return socialLinks.map(link =>
        link.id === action.id ? { id: action.id, value: action.value } : link
      );
    }
    case "deleted": {
      return socialLinks.filter(link => link.id !== action.id);
    }
  }
}
