import { useState } from "react";
import { isAlpha } from "validator";

function FirstNameHook() {

    const [firstName, setFirstName] = useState("");
    const [error, setError] = useState("")

    function handleFirstNameOnChange(e) {

        if (!isAlpha(e.target.value)) {

            setError("Cannot have special Characters or numbers")

        } if (e.target.value.length === 0) {

            setError("First name cannot be empty")

        } if (isAlpha(e.target.value)) {

            setError("");
            setFirstName(e.target.value);
        }

    }

    return [firstName, handleFirstNameOnChange, error];

}

export default FirstNameHook;