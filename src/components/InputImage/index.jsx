// @flow
import * as React from 'react';
import classnames from 'classnames';
import Icon from 'src/components/Icon';
import importIcon from 'src/icons/import.svg';
import style from './style.scss';

const ENTER_CHAR_CODE = 13;

type Props = {
  label: string;
  successLabel: string;
  error: string;
  value: string;
  onChange: (file: File) => void;
}

type State = {
  isOver: boolean;
}

class InputImage extends React.PureComponent<Props, State> {
  static defaultProps = {
    error: '',
  }
  input: ?HTMLInputElement
  setDropZone: (reference: ?HTMLDivElement) => void
  setInput: (reference: ?HTMLInputElement) => void
  preventDrop: (event: DragEvent) => void
  fileDragEnter: (event: SyntheticDragEvent<HTMLDivElement>) => void
  fileDragLeave: (event: SyntheticDragEvent<HTMLDivElement>) => void
  fileDrop: (event: SyntheticDragEvent<HTMLDivElement>) => void
  openFileSelector: () => void
  onZoneKeyPress: (event: SyntheticInputEvent<HTMLInputElement>) => void
  changeFile: (event: SyntheticInputEvent<HTMLInputElement>) => void

  state = {
    isOver: false,
  }

  constructor(props: Props) {
    super(props);

    this.setInput = this.setInput.bind(this);
    this.preventDrop = this.preventDrop.bind(this);
    this.fileDragEnter = this.fileDragEnter.bind(this);
    this.fileDragLeave = this.fileDragLeave.bind(this);
    this.fileDrop = this.fileDrop.bind(this);
    this.openFileSelector = this.openFileSelector.bind(this);
    this.onZoneKeyPress = this.onZoneKeyPress.bind(this);
    this.changeFile = this.changeFile.bind(this);
  }

  componentDidMount() {
    window.addEventListener('dragover', this.preventDrop);
    window.addEventListener('drop', this.preventDrop);
  }

  componentWillUnmount() {
    window.removeEventListener('dragover', this.preventDrop);
    window.removeEventListener('drop', this.preventDrop);
  }

  setInput(reference: ?HTMLInputElement) {
    this.input = reference;
  }

  // eslint-disable-next-line class-methods-use-this
  preventDrop(event: DragEvent) {
    event.preventDefault();
  }

  fileDragEnter(event: SyntheticDragEvent<HTMLDivElement>) {
    event.preventDefault();
    this.setState(() => ({ isOver: true }));
  }

  fileDragLeave(event: SyntheticDragEvent<HTMLDivElement>) {
    event.preventDefault();
    this.setState(() => ({ isOver: false }));
  }

  fileDrop(event: SyntheticDragEvent<HTMLDivElement>) {
    event.preventDefault();
    this.setState(() => ({ isOver: false }));
    const fileList: FileList = event.dataTransfer.files;

    if (fileList.length > 0) {
      const file = fileList[0];
      this.props.onChange(file);
    }
  }

  openFileSelector() {
    if (this.input) {
      this.input.click();
    }
  }

  onZoneKeyPress(event: SyntheticKeyboardEvent<HTMLDivElement>) {
    if (event.charCode === ENTER_CHAR_CODE && this.input) {
      this.input.click();
    }
  }

  changeFile(event: SyntheticInputEvent<HTMLInputElement>) {
    const { currentTarget } = event;

    if (currentTarget.files.length > 0) {
      const file = currentTarget.files[0];
      this.props.onChange(file);
      currentTarget.value = '';
      const dropZone = currentTarget.parentElement && currentTarget.parentElement.parentElement;
      setTimeout(() => {
        if (dropZone instanceof HTMLElement) dropZone.blur();
      }, 50);
    }
  }

  render() {
    const {
      label, successLabel, value, error,
    } = this.props;
    const { isOver } = this.state;

    const hasValue = !!value;
    const hasError = !!error;
    const zoneLabel = hasError ? error : label;

    const successLabelClass = classnames(style.successLabel, {
      [style.successLabel_show]: hasValue,
    });
    const zoneClass = classnames(style.dropZone, {
      [style.dropZone_over]: isOver,
      [style.dropZone_invalid]: hasError,
      [style.dropZone_filled]: hasValue,
    });

    const previewStyle = hasValue
      ? { backgroundImage: `url(${value})`, opacity: 1 }
      : { backgroundImage: '', opacity: 0 };

    return (
      <div className={style.container}>
        <span className={successLabelClass}>{successLabel}</span>
        <div
          onDragOver={this.fileDragEnter}
          onDragLeave={this.fileDragLeave}
          onDrop={this.fileDrop}
          onClick={this.openFileSelector}
          onKeyPress={this.onZoneKeyPress}
          role="button"
          tabIndex={0}
          className={zoneClass}
        >
          <div className={style.imagePreview} style={previewStyle} />
          <div className={style.dropInfo}>
            {zoneLabel}
            <Icon href={importIcon} className={style.icon} />
            <input
              type="file"
              ref={this.setInput}
              onChange={this.changeFile}
              style={{ display: 'none' }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default InputImage;
