import './loading-screen.css';

function LoaderComponent ():JSX.Element {
  return (
    <div className="spinner" data-testid="loader-component"></div>
  );
}

export {LoaderComponent};

