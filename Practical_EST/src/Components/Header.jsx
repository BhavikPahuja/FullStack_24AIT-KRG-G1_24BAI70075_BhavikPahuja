import Icon from "./Icon";

export default function Header({ userName }) {
  return (
    <header className="demo-card header-card">
      <h1>Prop Drilling Demo</h1>
      <Icon userName={userName} />
    </header>
  );
}
