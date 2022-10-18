import React from "react";
import PropTypes from 'prop-types';

const Goal = ({goal, setGoal}) => {
    const [updateGoal, setUpdateGoal] = React.useState(false);
    const [title, setTitle] = React.useState(goal.title);
    const [description, setDescription] = React.useState(goal.description);
    const [completed, setCompleted] = React.useState(goal.completed);

    const handleBack = () => {
        setGoal(null);
    };

    const handleUpdate = () => {
        setUpdateGoal(true);
    };

    const handleSave = () => {
        setUpdateGoal(false);
    };

    const handleCancel = () => {
        setUpdateGoal(false);
    };

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this goal?")) {
            console.log("Deleted goal...");
        }
    };

    if (updateGoal) {
       return (
            <div className="goal">
                <button className="back-btn" onClick={handleBack}>Back</button>
                <div className="goal__title">
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="goal__description">
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="goal__completed">
                    <input type="checkbox" checked={completed} onChange={(e) => setCompleted(e.target.checked)} />
                </div>
                <div className="goal__actions">
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <button className="back-btn" onClick={handleBack}>Back</button>
                <h1>Goal Details:</h1>
                <h2>{goal.title}</h2>
                <p>{goal.description}</p>
                <p>{goal.completed ? "Completed" : "Not Completed"}</p>

                <button onClick={handleUpdate}>Update</button>
                <button onClick={handleDelete}>Delete</button>
            </div>
        );
    }
};

Goal.propTypes = {
    goal: PropTypes.object.isRequired,
    setGoal: PropTypes.func.isRequired,
};

export default Goal;