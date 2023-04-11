interface CloseButtonProps {
  callback: () => void;
}

const CloseButton = ({ callback }: CloseButtonProps) => {
  return (
    <div className="close-button" onClick={callback}>
      <i className="fa fa-close fa-2x" />
    </div>
  );
};

export default CloseButton;
