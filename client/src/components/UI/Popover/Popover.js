import React from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';

const popover = props => {
    const popup = <Popover id={props.popupTitle} title={props.popupTitle}>{props.children}</Popover>

    return (
        <OverlayTrigger trigger="click" rootClose placement={props.placement} overlay={popup}>
            <button className={props.buttonStyle}>{props.buttonTitle}</button>
        </OverlayTrigger>
    );
};

export default popover;