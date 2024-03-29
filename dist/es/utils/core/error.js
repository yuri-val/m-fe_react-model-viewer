import React from 'react';
export function ErrorFallback({ error, resetErrorBoundary, }) {
    React.useEffect(() => {
        console.log('>>>ErrorFallback>>>', error.message);
    });
    return (React.createElement("div", { role: "alert" },
        React.createElement("button", { onClick: resetErrorBoundary }, "Try again")));
}
//# sourceMappingURL=error.js.map