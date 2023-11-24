const ATMDeposit = ({ onChange, isDeposit, value }) => {
  const choice = ["Deposit", "Cash Back"];
  return (
    <div className="row">
      <div className="col">
        <div className="input-group mb-3">
          <span className="input-group-text">{choice[Number(!isDeposit)]}</span>
            <input type="number" className="form-control" aria-label="Amount (to the nearest dollar)" onChange={onChange} value={value}></input>  
        </div>
        <div className="row">
          <div className="col d-flex justify-content-center"><button className="btn btn-info">Submit</button></div>
        </div>
      </div>
    </div>
  );
};

const Account = () => {
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [deposit, setDeposit] = React.useState(0);

  let status = `Account Balance $ ${totalState} `;
  const handleChange = event => {
    const value = Number(event.target.value);
    if(value >= 0) setDeposit(value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`submit ${deposit}`);
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    if(newTotal < 0){
      console.log("es menor");
      var myModal = new bootstrap.Modal(document.getElementById('miModal'));
      myModal.toggle();
    }
    else{
      setTotalState(newTotal);
      setDeposit(0);
    }
    
    event.preventDefault();
  };

  return (
    <div  style={{ margin:"30px", width:"350px" }}>
      <div className="row">
        <div className="col d-flex justify-content-center"><h2 id="total">{status}</h2></div>
      </div>
      <div className="row mb-3">
        <div className="col d-flex justify-content-center">
          <button className="btn btn-primary" style={{ marginRight:"5px" }} onClick={() => setIsDeposit(true)}>Deposit</button>
          <button className="btn btn-danger"  style={{ marginRight:"5px" }} onClick={() => setIsDeposit(false)}>Cash Back</button>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <ATMDeposit onChange={handleChange} isDeposit={isDeposit} value={deposit}></ATMDeposit>
      </form>

      <div id="miModal" className="modal fade" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Insuficient funds!</h1>
            </div>
            <div className="modal-body">
              {`You don't have enought funds in your account to cash back $ ${deposit}`}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById("root"));
