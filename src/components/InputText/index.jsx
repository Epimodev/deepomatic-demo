// @flow
import * as React from 'react';
import { CSSTransition } from 'react-transition-group';
import classnames from 'classnames';
import style from './style.scss';

type Props = {
  value: string;
  label: string;
  placeholder: string;
  error: string;
  onChange: (value: string) => void;
}

type State = {
  touched: boolean;
}

const TRANSITION_ERROR_CLASSNAMES = {
  enter: style.errorEnter,
  enterActive: style.errorEnterActive,
  exit: style.errorExit,
  exitActive: style.errorExitActive,
};

class InputText extends React.PureComponent<Props, State> {
  onChangeBind: (event: SyntheticInputEvent<HTMLInputElement>) => void
  onBlurBind: () => void
  static defaultProps = {
    placeholder: '',
    error: '',
  }
  state = {
    touched: false,
  }

  constructor(props: Props) {
    super(props);

    this.onChangeBind = this.onChange.bind(this);
    this.onBlurBind = this.onBlur.bind(this);
  }

  onChange(event: SyntheticInputEvent<HTMLInputElement>) {
    this.props.onChange(event.currentTarget.value);
  }

  onBlur() {
    if (!this.state.touched) {
      this.setState(() => ({ touched: true }));
    }
  }

  render() {
    const {
      value, label, placeholder, error,
    } = this.props;
    const { touched } = this.state;
    const hasValue = !!value;
    const hasError = !!error;
    const showError = hasError && touched;

    const inputClass = classnames(style.input, {
      [style.input_valid]: hasValue && !hasError,
      [style.input_invalid]: showError,
    });

    return (
      <div className={style.container}>
        <span className={style.label}>{label}</span>
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={this.onChangeBind}
          onBlur={this.onBlurBind}
          className={inputClass}
        />
        <hr className={style.border} />
        <CSSTransition
          in={showError}
          classNames={TRANSITION_ERROR_CLASSNAMES}
          timeout={300}
          mountOnEnter
          unmountOnExit
        >
          <span className={style.error}>{error}</span>
        </CSSTransition>
      </div>
    );
  }
}

export default InputText;
