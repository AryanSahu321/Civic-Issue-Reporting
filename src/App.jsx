import "./App.css";

let post = {
  username: "Aryan Sahu",
  description: "I is Kaizen way",
  fontSize: 50,
  loggedin: true,
};

function Like() {
  return <p>Thankyou for your like!</p>;
}
function DisLike() {
  return <p>Thankyou for your feedback!</p>;
}

export default function App() {
  return (
    <main className="intro">
      <h1>Hello world </h1>
      <br />
      <p style={{ fontSize: post.fontSize }}>username : {post.username}</p>
      <p>description: {post.description}</p>
      <DisLike />
      <Like />
      <div className="feedback"></div>
    </main>
  );
}
