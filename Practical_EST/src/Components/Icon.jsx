import UserProfile from "./UserProfile";

export default function Icon({ userName }) {
  return (
    <div className="demo-stack">
      <p className="hint">Icon component forwarding the prop</p>
      <UserProfile userName={userName} />
    </div>
  );
}
