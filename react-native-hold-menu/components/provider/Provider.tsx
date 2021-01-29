import React, { memo } from "react";
import { PortalHost } from '@gorhom/portal'

// Components
import Backdrop from "../backdrop";

// Utils
import { reducer, initialState } from "./reducer"

export const HoldMenuContext = React.createContext(initialState)

const ProviderComponent = ({
    children,
}: { children: React.ReactElement | React.ReactElement[] }) => {
    const [state, dispatch] = React.useReducer<any>(reducer, initialState)

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
