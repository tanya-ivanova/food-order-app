import {Fragment} from 'react';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui-slice';
import classes from './Modal.module.css';

const Backdrop = (props) => {
    const dispatch = useDispatch();

    const toggleCartHandler = () => {
        dispatch(uiActions.toggle());
      };

    return (
        <div className={classes.backdrop} onClick={toggleCartHandler}></div>
    );
};

const ModalOverlay = (props) => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>
                {props.children}
            </div>
        </div>
    );
};

const portalElement = document.getElementById('overlays');

const Modal = (props) => {
    return (
        <Fragment>
            {ReactDOM.createPortal(<Backdrop/>, portalElement)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
        </Fragment>
    );
};

export default Modal;