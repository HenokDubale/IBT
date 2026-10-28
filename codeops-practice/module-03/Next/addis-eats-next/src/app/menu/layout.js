const layout = ({ children }) => {
  return (
    <div className="grid md:grid-cols-[1fr_minmax(0,100px)] p-6 mt-15">
      {children}
    </div>
  );
};

export default layout;
