import React from "react";
import { Input, Icon } from "antd";
import "./index.less";
/**
 *
 *   Voter Component
 *
 */

interface IVoter {
  name: string;
}

const Voter = ({ name }: IVoter) => {
  return (
    <div className="voter">
      <Input
        className="voter-item"
        disabled
        prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
        value={name}
      />
    </div>
  );
};

export default Voter;
