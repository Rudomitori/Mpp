import React, {Dispatch, SetStateAction, useDebugValue, useMemo, useRef, useState} from "react";
import useRunOnChange from "./useRunOnChange";
import useForceUpdate from "./useForceUpdate";

/**
 * This hook works like {@link React.useState useState} but the saved state is recomputed
 * when one of {@link deps} is changed.
 */
export default function useStateWithDeps<T>(
    factory: () => T,
    deps: React.DependencyList
) {
    const state = useRef<T>();
    useRunOnChange(() => state.current = factory(), deps);
    useDebugValue(state.current);
    
    const update = useForceUpdate();
    const setState: Dispatch<SetStateAction<T>> = (value) => {
        if(value instanceof Function) {
            state.current = value(state.current!);
        } else {
            state.current = value;
        }
        update();
    }
    
    return [state.current!, setState] as [T, Dispatch<SetStateAction<T>>];
}