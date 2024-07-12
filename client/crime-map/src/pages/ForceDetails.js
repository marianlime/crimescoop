import { useLocation, Link } from "react-router-dom";

const ForceDetails = () => {
  const location = useLocation();
  const { forceDetails } = location.state;

  return (
    <div className="force-details">
      <h1>{forceDetails.name}</h1>
      <p dangerouslySetInnerHTML={{ __html: forceDetails.description }}></p>
      <p>Telephone: {forceDetails.telephone}</p>
      <p>Website: <a href={forceDetails.url} target="_blank" rel="noreferrer">{forceDetails.url}</a></p>
      <Link to="/authorities">Go back</Link>
    </div>
  );
};


export default ForceDetails;
