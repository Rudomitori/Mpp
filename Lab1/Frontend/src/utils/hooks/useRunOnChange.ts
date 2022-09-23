import React, {useRef} from "react";

/**
 * Run {@link action}, where one of {@link deps} is changed.
 *
 * @param action run at render time unlike {@link React.useEffect useEffect}.
 * And unlike {@link React.useEffect useEffect}, this callback has not a destructor.
 * @param deps like any other deps in React hooks.
 */
export default function useRunOnChange(action: () => void, deps: React.DependencyList) {
    const oldDeps = useRef<React.DependencyList>([]);

    const depsChanged =
        oldDeps.current.length !== deps.length
        || oldDeps.current.some((x, i) => x !== deps[i]);

    if(depsChanged) {
        oldDeps.current = deps;
        action();
    }
}