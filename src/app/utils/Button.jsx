import { Button } from "antd";

function ButtonComponent({ onClick, title, danger }) {
  return (
    <Button
      type="primary"
      danger={danger ? true : false}
      size="large"
      onClick={onClick}
    >
      {title}
    </Button>
  );
}

export default ButtonComponent;
