import React from "react";
import { Button, Input } from "antd";
/**
 *
 *   Voter Component
 *
 */
type TEvent = (...args: any) => void;

interface IAddUser {
  value: string;
  setValue: TEvent;
  addParticipant: TEvent;
}

const AddParticipant = ({ value, setValue, addParticipant }: IAddUser) => {
  return (
    <div key="add-participant">
      <Input
        className="search-item"
        value={value}
        onChange={event => {
          event.persist();
          setValue(event.target.value);
        }}
        autoFocus
      />
      <Button
        style={{ marginTop: "20px" }}
        type="primary"
        onClick={addParticipant}
      >
        Add
      </Button>
    </div>
  );
};

export default AddParticipant;
