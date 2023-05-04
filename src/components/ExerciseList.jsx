import React from "react";
import { AiOutlineDelete } from "react-icons/ai";

const ExerciseList = (props) => {
  const { muscle, onDelete } = props;

  return (
    <div>
      {muscle.length === 0 ? (
        <span className="text-gray-500">No exercise.</span>
      ) : (
        muscle.map((exercise) => {
          return (
            <div key={exercise.id} className="flex items-center">
              <li>{exercise.data.name}</li>
              <AiOutlineDelete
                className="ml-2 cursor-pointer hover:text-red-700"
                onClick={() => {
                  onDelete(exercise.id, exercise.data);
                }}
              />
            </div>
          );
        })
      )}
    </div>
  );
};

export default ExerciseList;
