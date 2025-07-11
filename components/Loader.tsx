import { Spinner } from "flowbite-react";

const Loader = () => {
  return (
    <div className="text-center">
      <Spinner aria-label="Spinner" size="lg" />
    </div>
  );
};

export default Loader;
