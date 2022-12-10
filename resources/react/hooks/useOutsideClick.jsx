import { useEffect } from 'react';

const useOutsideClick = (ref, onOutsideClick = () => {}, dependencies = [ref]) => {
    useEffect(() => {
        // Event handler
        const handleClickOutside = event => {
            if(ref.current && !ref.current.contains(event.target)) {
                onOutsideClick();
            }
        }

        // Bind event listener
        document.addEventListener("mousedown", handleClickOutside);

        // Unbind event listener on clean up
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, dependencies);
}

export default useOutsideClick;
