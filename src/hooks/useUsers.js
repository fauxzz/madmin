import { useState } from "react";

export default function useUser() {
    const [search, setSearch] = useState('');

    function changeHash(value) {
        console.log(value);
    }
    function viewDataVisble(value) {
        console.log(value);
    }

    return {
        search,
        changeHash,
        viewDataVisble
    }
}