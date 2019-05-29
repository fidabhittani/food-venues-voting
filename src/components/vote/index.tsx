import React from "react";
import { Row, Col, Icon } from "antd";
import "./index.less";
/**
 *
 *   Voter Component
 *
 */
interface IOnVote {
  placeId: number;
  userId: number;
}

type TOnVote = ({ placeId, userId }: IOnVote) => void;

interface IVote {
  userId: number;
  placeId: number;
  vote: boolean;
}

interface IVoteAction extends IVote {
  onVote: TOnVote;
}

const Vote = ({ vote, placeId, userId, onVote }: IVoteAction) => {
  return (
    <Col span={8}>
      <div
        className={`vote-item ${vote ? "active" : ""}`}
        onClick={() => onVote({ placeId, userId })}
      >
        {vote ? <Icon type="check" /> : null}
      </div>
    </Col>
  );
};

/**
 * User Votes Component
 * @param param0
 */
interface IVotes {
  votes: IVote[];
  onVote: TOnVote;
}

const UserVotes = ({ votes, onVote }: IVotes) => {
  return (
    <div className="vote-list">
      <Row gutter={16}>
        {votes &&
          votes.map((vote: IVote, key: number) => (
            <Vote key={key} {...vote} onVote={onVote} />
          ))}
      </Row>
    </div>
  );
};

export default UserVotes;
