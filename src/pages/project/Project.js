import { useParams } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument";
import ProjectComments from "./ProjectComments";
import ProjectSummary from "./ProjectSummary";
import "./Project.css";

export default function Project() {
  const { id } = useParams();
  const { document, error, isPending } = useDocument('projects', id);

  if (error) {
    return <div className="error">{error}</div>;
  }
  if (isPending) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="project-details">
	{ document && <ProjectSummary project={document} /> }
	{ document && <ProjectComments project={document} /> }
    </div>
  );
}
