import './CustomButton.scss';

export function CustomButton(props) {
    const {text, className, children,  ...otherProps} = props;
    return (
        <button {...otherProps} className={"button " + className}>
            {text}
            {children}
        </button> 
    );
}