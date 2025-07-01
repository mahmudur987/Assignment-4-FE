import { Link } from "react-router";

const CallToAction = () => {
  return (
    <section className="py-10 text-center bg-blue-100 rounded-lg mx-4 mt-8">
      <h2 className="text-2xl font-semibold mb-4">Ready to Get Started?</h2>
      <Link
        to="/login"
        className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
      >
        Log In Now
      </Link>
    </section>
  );
};

export default CallToAction;
