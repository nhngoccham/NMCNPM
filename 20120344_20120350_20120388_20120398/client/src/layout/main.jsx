import React from "react";
import useWindowDimensions from "@/hooks/useWindowDimensions";

const MainLayout = ({ children }) => {
    const { width } = useWindowDimensions();

    const CONTENT_WIDTH = Math.min(900, width);

    return (
        <div
            style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                overflowX: "hidden",
            }}
        >
            <main
                style={{
                    width: `${CONTENT_WIDTH}px`,
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {children}
            </main>
        </div>
    );
};

export default React.memo(MainLayout);
