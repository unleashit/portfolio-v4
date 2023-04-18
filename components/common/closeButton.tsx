import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface CloseButtonProps {
  callback: () => void;
}

const CloseButton = ({ callback }: CloseButtonProps) => {
  return (
    <div className="close-button" onClick={callback}>
      {/*<i className="fa fa-close fa-2x" />*/}
      <FontAwesomeIcon icon={faClose} size="2x" />
    </div>
  );
};

export default CloseButton;
