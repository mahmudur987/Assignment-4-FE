const Footer = () => {
  return (
    <footer className="py-6 text-center text-sm bg-[var(--chart-3)] border-t mt-10 text-gray-100">
      &copy; {new Date().getFullYear()} Advanced Note App. All rights reserved.
    </footer>
  );
};

export default Footer;
