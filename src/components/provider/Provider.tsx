import React, { memo } from "react";
import { PortalHost } from '@gorhom/portal'

// Components
import Backdrop from "../backdrop";

// Utils
import { reducer, initialState } from "./reducer"
import { ProviderProps } from "./types"

export const HoldMenuContext = React.createContext(initialState)

const ProviderComponent = ({
    children,
    theme
}: ProviderProps) => {
    const [state, dispatch] = React.useReducer<any>(reducer, { active: 0, theme: theme || "light" })

    React.useEffect(() => {
        if (theme != state.theme) dispatch({ type: 'toggle-theme' })
    }, [theme])

    return (
        <HoldMenuContext.Provider value={[state, dispatch]}>
            <PortalHost>
                {children}
                <Backdrop />
            </PortalHost>
        </HoldMenuContext.Provider>
    );
};

const Provider = memo(ProviderComponent)

export default Provider;
