function Search({ search, setsearch }) {
  const handleChange = (e) => {
    // console.log(e.target.value);
    if (!e.target.value) {
      setsearch("");
      return;
    }
    setsearch(e.target.value);
  };
  return (
    <>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-8 col-lg-6 ">
            <div className="input-group mt-3 ">
              <input
                type="text"
                className="form-control"
                placeholder="Enter title..."
                aria-label="Search"
                aria-describedby="button-addon2"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
