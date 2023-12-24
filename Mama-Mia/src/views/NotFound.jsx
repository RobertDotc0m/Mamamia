function NotFound() {
  return (
    <>
      <div className="d-flex flex-column align-items-center justify-content-center mt-4">
        <h1>Error 404</h1>
        <p>Ups, página no encontrada</p>
        <img
          src="https://static.simpsonswiki.com/images/2/22/Luigi_Risotto.png"
          alt="Luigi Risotto"
          className="mt-3"
        />
      </div>
    </>
  );
}

export default NotFound;
