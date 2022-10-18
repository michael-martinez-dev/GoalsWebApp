import React from "react";
import "./style/GoalsList.css";
import PropTypes from 'prop-types';

const GoalsList = ({setCurrentGoal}) => {
    const [goals, setGoals] = React.useState([]);

    const dummyData = [
        {
            id: 1,
            title: "Goal 1",
            description: "This is a description for goal 1",
            completed: false,
        },
        {
            id: 2,
            title: "Goal 2",
            description: "This is a description for goal 2",
            completed: false,
        },
        {
            id: 3,
            title: "Goal 3",
            description: "This is a description for goal 3",
            completed: false,
        },
        {
            id: 4,
            title: "Goal 4",
            description: "This is a description for goal 4",
            completed: true,
        },
        {
            id: 5,
            title: "Goal 5",
            description: "This is a description for goal 5",
            completed: false,
        },
        {
            id: 6,
            title: "Goal 6",
            description: "This is a description for goal 6",
            completed: false,
        },
        {
            id: 7,
            title: "Goal 7",
            description: "This is a description for goal 7",
            completed: true,
        },
        {
            id: 8,
            title: "Goal 8",
            description: "This is a description for goal 8",
            completed: true,
        },
        {
            id: 9,
            title: "Goal 9",
            description: "This is a description for goal 9",
            completed: false,
        },
        {
            id: 10,
            title: "Goal 10",
            description: "This is a description for goal 10",
            completed: true,
        },
        {
            id: 11,
            title: "Goal 11",
            description: "This is a description for goal 11",
            completed: false,
        },
        {
            id: 12,
            title: "Goal 12",
            description: "This is a description for goal 12",
            completed: false,
        }
    ];


    React.useEffect(() => {
        setGoals(dummyData);
    }, []);

    const handleViewGoal = (goal) => {
        setCurrentGoal(goal);
        console.log("Viewing goal...");
        console.log(goal);
    }

    const handleDeleteGoal = (goal) => {
        const newGoals = goals.filter((g) => g.id !== goal.id);
        setGoals(newGoals);
    }

    return (
        <div>
            <h1>Goals</h1>
            <div className="goals-list">
                <table className="goalsTable">
                    <thead>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Description</th>
                            <th scope="col">Completed</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {goals.map(goal => (
                            <tr key={goal.id}>
                                <td>{goal.title}</td>
                                <td>{goal.description}</td>
                                <td>{goal.completed ? "Yes" : "No"}</td>
                                <td>
                                    <button onClick={() => {handleViewGoal(goal)}}>View</button>
                                    <button onClick={() => {handleDeleteGoal(goal)}}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

GoalsList.propTypes = {
    setCurrentGoal: PropTypes.func.isRequired,
};

export default GoalsList;