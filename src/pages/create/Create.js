import { useState, useEffect } from "react";
import { useCollection } from "../../hooks/useCollection";
import { useAuth } from "../../hooks/useAuth";
import { useFirestore } from "../../hooks/useFirestore";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { serverTimestamp } from "firebase/firestore";
import "./Create.css";

const categories = [
  { value: "development", label: "Development" },
  { value: "design", label: "Design" },
  { value: "sales", label: "Sales" },
  { value: "marketing", label: "Marketing" },
];

export default function Create() {
  const navigate = useNavigate();
  const { addDocuments, state } = useFirestore("projects");
  const { user } = useAuth();
  const { documents } = useCollection("users");
  const [users, setUsers] = useState([]);

  // form values
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    if (documents) {
      const options = documents.map(userDoc => {
        return { value: {...userDoc,id:userDoc.id}, label: userDoc.displayName };
      });
      setUsers(options);
    }
  }, [documents]);

  const handleSubmit = async e => {
    e.preventDefault();
    setFormError(null);
    if (!category) {
      setFormError("Please select a category before you submit");
      return;
    }
    if (assignedUsers.length < 1) {
      setFormError("You must select 1 user at least");
      return;
    }
    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid,
    };
    const assignedUsersList = assignedUsers.map(u => {
      return {
        displayName: u.value.displayName,
        photoURL: u.value.photoURL,
        id: u.value.id,
      };
    });
    const project = {
      name,
      details,
      dueDate: serverTimestamp(),
      comments: [],
      category: category.value,
      createdBy,
      assignedUsersList,
    };
    await addDocuments(project);
    if (!state.error) {
      navigate("/");
    }
	console.log(assignedUsersList,project)
  };

  return (
    <div className="create-form">
      <h2 className="page-title">Create a new Project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project name:</span>
          <input
            required
            type="text"
            onChange={e => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Project Details:</span>
          <textarea
            required
            onChange={e => setDetails(e.target.value)}
            value={details}
          ></textarea>
        </label>
        <label>
          <span>Set due date:</span>
          <input
            required
            type="date"
            onChange={e => setDueDate(e.target.value)}
            value={dueDate}
          />
        </label>
        <label>
          <span>Project category:</span>
          <Select
            onChange={option => setCategory(option)}
            options={categories}
          />
        </label>
        <label>
          <span>Assign to:</span>
          <Select
            onChange={option => setAssignedUsers(option)}
            options={users}
            isMulti
          />
        </label>

        <button className="btn">Add Project</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
}
