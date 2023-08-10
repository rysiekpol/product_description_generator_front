const SearchBar = ({ searchTerm, setSearchTerm }) => {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="input-group input-group-lg w-50">
          <span className="input-group-text" id="basic-addon1">?</span>
          <input 
              id="typeText"
              type="text" 
              className="form-control" 
              placeholder="Search for a product..." 
              aria-label="Search" 
              aria-describedby="basic-addon1" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
    );
  };
  
export default SearchBar;