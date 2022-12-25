import React from "react";
import axios from "axios";
import { config } from "@/config";
import { useDispatch } from "react-redux";
import { actSetUserData } from "@/redux/actions/userActions";
// import ReactFullPageLoading from "react-fullpage-custom-loader";
import authAPIs from "@/apis/auth";
import Header from "./components/Header/Header";
import moment from "moment";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { routes, noHeaderRoutes } from "./routes";

moment.defaultFormat = "DD.MM.YYYY HH:mm A";
axios.defaults.baseURL =
    process.env.NODE_ENV === "development"
        ? config.API_BASE_URL
        : config.API_BASE_URL;
const defaultToken = config.ANONYMOUS_TOKEN;
// axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem("@token_flm") || config.ANONYMOUS_TOKEN}`;
axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("@access_token_flm") || defaultToken;

        if (token) {
            // config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
            config.headers["x-access-token"] = token; // for Node.js Express back-end
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
axios.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;

        if (originalConfig.url !== "/auth/login" && err.response) {
            // Access Token was expired
            if (err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;

                try {
                    const refreshToken =
                        localStorage.getItem("@refresh_token_flm");
                    const { accessToken } = await authAPIs.refreshToken({
                        refreshToken,
                    });
                    localStorage.setItem("@access_token_flm", accessToken);
                    return axios.request(originalConfig);
                } catch (_error) {
                    return Promise.reject(_error);
                }
            }
        }

        return Promise.reject(err);
    }
);
function App() {
    const dispatch = useDispatch();
    const [state, setState] = React.useState({
        isLoading: true,
    });
    const authCheck = React.useCallback(async () => {
        const token = localStorage.getItem("@access_token_flm");
        if (token) {
            authAPIs.check().then((res) => {
                const { accessToken, refreshToken, user } = res;
                dispatch(actSetUserData({ user, accessToken }));
                localStorage.setItem("@access_token_flm", accessToken);
                localStorage.setItem("@refresh_token_flm", refreshToken);
            });
        }
        setState((s) => ({
            ...s,
            isLoading: false,
        }));
    }, []);
    React.useEffect(() => {
        authCheck();
    }, []);

    // if (state.isLoading) return <ReactFullPageLoading />;
    return (
        <>
            <Router>
                <Switch>
                    {routes.map(({ path, Component, exact }) => (
                        <Route
                            key={`${Component}-route`}
                            path={path}
                            exact={exact}
                            render={(props) => (
                                <>
                                    <Header />
                                    <Component {...props} />
                                </>
                            )}
                        />
                    ))}

                    {noHeaderRoutes.map(({ path, Component, exact }) => (
                        <Route
                            key={`${Component}-route`}
                            path={path}
                            exact={exact}
                            render={(props) => <Component {...props} />}
                        />
                    ))}
                </Switch>
            </Router>
        </>
    );
}

export default App;
