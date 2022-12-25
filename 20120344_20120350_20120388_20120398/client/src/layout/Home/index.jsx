import React from "react";
import { Grid, GridItem, Text, Image } from "@chakra-ui/react";
// import ReactFullPageLoading from "react-fullpage-custom-loader";
import Schedule from "./components/Schedule";
import matchAPIs from "@/apis/match";
export default function Home() {
    const [state, setState] = React.useState({
        data: [],
        isLoading: true,
    });
    const getData = async () => {
        try {
            const { data } = await matchAPIs.getAll({});
            setState((s) => ({
                ...s,
                data,
                isLoading: false,
            }));
        } catch (error) {
            setState((s) => ({
                ...s,
                isLoading: false,
            }));
            console.log({ error });
        } finally {
        }
    };
    React.useEffect(() => {
        getData();
        return () => {};
    }, []);

    // if (state.isLoading) return <ReactFullPageLoading />;

    return (
        <Grid templateColumns="repeat(7, 1fr)" gap={6} padding={"40px"}>
            <GridItem colSpan={4}>
                <Image
                    borderRadius="20px"
                    src="https://i.imgur.com/j9iELT6.jpeg"
                />
            </GridItem>
            <GridItem colSpan={3} colStart={5}>
                <Schedule data={state.data} />
            </GridItem>
        </Grid>
    );
}
