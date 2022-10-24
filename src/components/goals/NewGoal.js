import React from "react";
import '../style/NewGoal.css';


const NewGoal = () => {
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [completed, setCompleted] = React.useState("");

    const addGoalToBackend = () => {
        console.log("Adding goal to backend...");
        try {
            const newGoalsBody = {
                user_id:   localStorage.getItem("userId"),
                title:     title,
                content:   description, 
                completed: completed
            }
            fetch(`https://goals.mixedmachine.ml/api/v1/goals`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${localStorage.getItem('token')}`
                },
                body: newGoalsBody
            })
            .then(res => res.json())
            .then(data => {
                console.debug(data);
            }
            )
            .catch(err => {
                console.debug(err);
            }
            );
        } catch (error) {
            console.log(error);
        } finally {
            setTitle("");
            setDescription("");
            setCompleted("");
            console.debug("Goal added");
        }
    };

    const addGoalHandler = (event) => {
        event.preventDefault();
        const newGoal = {
            title: title,
            description: description,
            completed: completed
        }
        console.log(newGoal);
        addGoalToBackend(newGoal);
    };

    return (
        <div>
            <h1>New Goal</h1>
            {/* Form for new Goal goes here */}
            <form onSubmit={addGoalHandler}>
                <br /><label>Title</label><br />
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                <br /><label>Description</label><br />
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                <br /><label>Completed</label><br />
                <input type="checkbox" checked={completed} onChange={(e) => setCompleted(e.target.checked)} />
                <br /><button type="submit">Add Goal</button>
            </form>
        </div>
    );
};

export default NewGoal;