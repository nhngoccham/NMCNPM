import React from "react";
const useWindowDimensions = () => {
    const [windowDimensions, setWindowDimensions] = React.useState({
        width: 0,
        height: 0,
    });
    function handleWindowSizeChange() {
        setWindowDimensions({
            width: document.body.clientWidth,
            height: document.body.clientHeight,
        });
    }
    React.useEffect(() => {
        if (process.browser) {
            if (!windowDimensions.width) handleWindowSizeChange();
            window.addEventListener("resize", handleWindowSizeChange);
        }
        return () => {
            if (process.browser)
                window.removeEventListener("resize", handleWindowSizeChange);
        };
    }, [windowDimensions.width]);

    return windowDimensions;
};

export default useWindowDimensions;
