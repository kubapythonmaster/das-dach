export default function Blocks({ blocks }) {
  return blocks.map((block, index) => {
    if (block.type === "h") return <h2 key={index}>{block.text}</h2>;
    if (block.type === "p") return <p key={index}>{block.text}</p>;
    if (block.type === "ul") {
      return (
        <ul className="ticks" key={index}>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    }
    return null;
  });
}
