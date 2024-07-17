"use client"
interface DisplayObjectProps {
  obj: Record<string, any>;
}

const DisplayObject: React.FC<DisplayObjectProps> = ({ obj }) => {
  // Function to render object recursively
  const renderObject = (obj: Record<string, any>): JSX.Element => {
    return (
      <>
        <ul style={{ listStyleType: "none", paddingLeft: "20px" }}>
          {Object.entries(obj).map(([key, value]) => (
            <li key={key}>
              <strong>
                {key}:{" "}
                {typeof value === "object" && value !== null ? "{" : null}
              </strong>{" "}
              {typeof value === "object" && value !== null ? (
                <div style={{ marginLeft: "20px" }}>
                  {renderObject(value)}
                  <strong>{`}`}</strong>
                </div>
              ) : (
                String(value)
              )}
            </li>
          ))}
        </ul>
      </>
    );
  };

  return (
    <div className="bg-gray-300 p-2 rounded-md">
      <strong>{`{`}</strong>

      {renderObject(obj)}
      <strong>{`}`}</strong>
    </div>
  );
};
export default DisplayObject;
