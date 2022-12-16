import { createContext, useContext, useState } from "react";

const BoxContext = createContext();

const BoxProvider = ({ children }) => {
    const [totalBox, setTotalBox] = useState(0);
    const [selectedBtns, setSelectedBtns] = useState([]);
    return (
        <BoxContext.Provider
            value={{ totalBox, setTotalBox, selectedBtns, setSelectedBtns }}
        >
            {children}
        </BoxContext.Provider>
    );
};

export default BoxProvider;

export const useBoxes = () => {
    const { totalBox, setTotalBox, selectedBtns, setSelectedBtns } =
        useContext(BoxContext);

    const addBox = () => {
        setTotalBox(totalBox + 1);
    };
    const removeBox = () => {
        setTotalBox(totalBox - 1);
    };

    const addUniversalBtn = (btn) => {
        const newbtns = selectedBtns;
        newbtns.push(btn);
        setSelectedBtns([...newbtns]);
    };

    const removeUniversalBtn = (btn) => {
        let newbtns = selectedBtns;
        newbtns = newbtns.filter((value) => value !== btn);
        setSelectedBtns([...newbtns]);
    };

    const isInUniversalList = (btn)=>{
        return selectedBtns.includes(btn);
    }

    return {
        addBox,
        removeBox,
        totalBox,
        addUniversalBtn,
        removeUniversalBtn,
        isInUniversalList
    };
};
