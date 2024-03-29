import './index.css';
import React from 'react';
export const Switch = ({ id, checked, onChange, onColor = 'rgba(255,153,0,1)', }) => {
    return (React.createElement(React.Fragment, null,
        React.createElement("input", { checked: checked, onChange: onChange, className: "react-switch-checkbox", id: `react-switch-new-${id}`, type: "checkbox" }),
        React.createElement("label", { className: "react-switch-label", htmlFor: `react-switch-new-${id}` },
            React.createElement("span", { className: `react-switch-button`, style: { background: checked && onColor } }))));
};
//# sourceMappingURL=index.js.map