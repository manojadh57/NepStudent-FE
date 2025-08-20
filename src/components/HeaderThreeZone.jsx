import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function QuotasLeft({ postsLeft = 1, commentsLeft = 3, dmsLeft = 1 }) {
  return (
    <div className="left">
      <div className="quota-chip">
        <span>Posts</span>
        <strong>{postsLeft}</strong>
        <span>left</span>
      </div>
      <span className="sep">·</span>
      <div className="quota-chip">
        <span>Comments</span>
        <strong>{commentsLeft}</strong>
        <span>left</span>
      </div>
      <span className="sep">·</span>
      <div className="quota-chip">
        <span>DMs</span>
        <strong>{dmsLeft}</strong>
        <span>left</span>
      </div>
    </div>
  );
}

export default function HeaderThreeZone({ quotas = {} }) {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const out = () => {
    logout();
    nav("/");
  };
  return (
    <header className="header">
      <div className="wrap bar">
        <QuotasLeft
          postsLeft={quotas.postsLeft ?? 1}
          commentsLeft={quotas.commentsLeft ?? 3}
          dmsLeft={quotas.dmsLeft ?? 1}
        />
        <Link to="/home" className="brand" aria-label="NepStudent home">
          <img src="/download.svg" alt="NepStudent" height="24" />
        </Link>
        <div className="right">
          <span className="user">
            {user?.username ? `hi, ${user.username}` : ""}
          </span>
          <button className="btn" onClick={out}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
