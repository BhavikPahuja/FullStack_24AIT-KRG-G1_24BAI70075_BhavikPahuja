export default function UserProfile({ userName }) {
  return (
    <section className="profile-card">
      <h2>User Profile</h2>
      <p className="user-name">{userName}</p>
    </section>
  );
}
