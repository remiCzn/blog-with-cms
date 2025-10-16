import { useParams } from "react-router";

const ModelDetails = () => {
  const { modelId } = useParams();
  return <div>Model Details for {modelId}</div>;
};

export default ModelDetails;
