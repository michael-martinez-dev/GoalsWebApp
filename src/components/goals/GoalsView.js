import React from "react";
import Goal from "./Goal";
import GoalsList from "./GoalsList";

const GoalsView = () => {
    const [currentGoal, setCurrentGoal] = React.useState(null);

    if (currentGoal === null) {
        return <GoalsList setCurrentGoal={setCurrentGoal}/>;
    } else {
        return (
        <div>
            <Goal goal={currentGoal} setGoal={setCurrentGoal}/>
        </div>
        );
    }
};

export default GoalsView;