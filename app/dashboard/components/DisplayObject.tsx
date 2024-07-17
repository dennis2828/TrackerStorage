"use client"
import stringify from "json-stringify-pretty-compact";

interface NestedObjectDisplayProps {
  data: any;
}
// Function to format the JSON object with each property on a new line

const NestedObjectDisplay: React.FC<NestedObjectDisplayProps> = ({ data }) => {
  return (
    <pre>
      {stringify(data, { maxLength: 80 })}
    </pre>
  );
};

export default NestedObjectDisplay;
