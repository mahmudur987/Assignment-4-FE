const FeatureHighlights = () => {
  return (
    <section className="py-12 px-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
      {[
        { title: "Organize Books", desc: "Easily manage book collections." },
        {
          title: "Track Borrows",
          desc: "Monitor borrowed books in real-time.",
        },
        {
          title: "Responsive Design",
          desc: "Use it on any device seamlessly.",
        },
      ].map((item, i) => (
        <div key={i} className="p-6 border rounded-xl shadow-sm bg-white">
          <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
          <p className="text-gray-600">{item.desc}</p>
        </div>
      ))}
    </section>
  );
};

export default FeatureHighlights;
