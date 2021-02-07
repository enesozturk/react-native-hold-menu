import React, { memo } from "react";

// Components
import HoldItemChild from './HoldItemChild'
import type { HoldItemProps } from "./types";
import { HoldMenuContext } from '../provider'

const HoldItemComponent = ({
    disableMove,
    ...props
}: HoldItemProps) => {
    const [state, dispatch] = React.useContext(HoldMenuContext);
    const [isActive, setIsActive] = React.useState(false);

    React.useEffect(() => {
        setIsActive(state.active && state.activeItem == props.id ? true : false)
    }, [state])

    const handleActivate = () => dispatch({ type: 'active', activeItem: props.id })

    const content = React.useMemo(() => {
        return (
            <HoldItemChild
                isActive={isActive}
                theme={state.theme}
                handleActivate={handleActivate}
                {...props}
            >
                {props.children}
            </HoldItemChild>
        )
    }, [isActive])

    return content;
};

const HoldItem = memo(HoldItemComponent);

export default HoldItem;
