const style = {
  display: "block",
  width: 10,
  position: "absolute",
  height: 10,
  backgroundColor: "blue",
  borderRadius: "50%",
};

const Dots = ({ axleX, axleY }) => (
  <span style={{ ...style, top: axleY, left: axleX }} />
);

export default Dots;
