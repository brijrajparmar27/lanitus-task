import { useEffect, useState } from "react";
import "./index.css";
import { useBoxes } from "./box.context";
function App() {
    const { totalBox, addBox } = useBoxes();

    return (
        <div className="btn-wrapper">
            {Array.from({ length: totalBox }).map((_, index) => {
                return <Box key={index} />;
            })}
            <button onClick={addBox}>create</button>
        </div>
    );
}

export default App;

const Box = () => {
    const btns = ["FL", "FR", "FC", "RL", "RR", "SL", "SR"];
    const [selectedBtns, setSelectedBtns] = useState([]);
    const {
        removeBox,
        addUniversalBtn,
        removeUniversalBtn,
        isInUniversalList,
    } = useBoxes();

    console.log(selectedBtns);

    const isCheckedRadio = (btn) => {
        return selectedBtns.includes(btn);
    };

    useEffect(() => {
        return () => {
            selectedBtns.forEach((value) => {
              removeUniversalBtn(value);
            });
        };
    }, []);

    return (
        <div className="box">
            <div className="1st">
                <p>select rows</p>
                <div className="btns">
                    {btns.map((btn) => {
                        return (
                            <div key={btn} className="btn-box">
                                <input
                                    type="radio"
                                    disabled={
                                        isInUniversalList(btn) &&
                                        !isCheckedRadio(btn)
                                    }
                                    checked={isCheckedRadio(btn)}
                                    onChange={(e) => {
                                        console.log(e.target.value);
                                        if (e.target.value === "on") {
                                            const newBtns = selectedBtns;
                                            if (!isCheckedRadio(btn)) {
                                                newBtns.push(btn);
                                                setSelectedBtns([...newBtns]);
                                                addUniversalBtn(btn);
                                            }
                                        } else {
                                            let newBtns = selectedBtns;
                                            newBtns = newBtns.filter(
                                                (value) => value !== btn
                                            );
                                            setSelectedBtns([...newBtns]);
                                            removeUniversalBtn(btn);
                                        }
                                    }}
                                />
                                <p>{btn}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="2nd">
                <p>base rows</p>
                <select name="btn-select">
                    {selectedBtns.map((btn) => {
                        return (
                            <option value={btn} key={btn}>
                                {btn}
                            </option>
                        );
                    })}
                </select>
            </div>
            <div className="3rd">
                <button onClick={removeBox}>Delete</button>
            </div>
        </div>
    );
};
